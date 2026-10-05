import fs from 'fs';
import axios from 'axios';
import jwt from 'jsonwebtoken';

// Google Merchant API (successor of the Content API for Shopping, which was sunset in Aug 2026)
// Docs: https://developers.google.com/merchant/api

const MERCHANT_API = 'https://merchantapi.googleapis.com';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/content';

const CONTENT_LANGUAGE = 'en';
const FEED_LABEL = 'IN';
const COUNTRY = 'IN';
const CURRENCY = 'INR';
const DATA_SOURCE_NAME = 'Gul Fashion Website (API)';

// Must match what checkout charges (CartScreen sends shippingPrice: 0, i.e. free delivery)
const SHIPPING_FEE = 0;

// Read lazily: server.js loads .env after this module is imported
const getMerchantId = () => process.env.GOOGLE_MERCHANT_ID || '5858675165';
const getSiteUrl = () => (process.env.SITE_URL || 'https://gulfashion.store').replace(/\/$/, '');

// Service account key can be given as raw JSON, base64 JSON, or a file path
function loadServiceAccount() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const file = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || process.env.GOOGLE_APPLICATION_CREDENTIALS;

  let json = null;
  if (raw) {
    const text = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
    json = JSON.parse(text);
  } else if (file && fs.existsSync(file)) {
    json = JSON.parse(fs.readFileSync(file, 'utf8'));
  }

  if (!json || !json.client_email || !json.private_key) return null;
  // Env vars often store the key with escaped newlines
  json.private_key = json.private_key.replace(/\\n/g, '\n');
  return json;
}

export const isMerchantConfigured = () => {
  try {
    return Boolean(loadServiceAccount());
  } catch (error) {
    console.error('Google Merchant: invalid service account key -', error.message);
    return false;
  }
};

// Cached OAuth access token (valid for 1 hour)
const tokenCache = { token: null, expiresAt: 0 };

async function getAccessToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt - 60 * 1000) {
    return tokenCache.token;
  }

  const sa = loadServiceAccount();
  if (!sa) throw new Error('Google Merchant service account key is not configured');

  const now = Math.floor(Date.now() / 1000);
  const assertion = jwt.sign(
    { iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 },
    sa.private_key,
    sa.private_key_id ? { algorithm: 'RS256', keyid: sa.private_key_id } : { algorithm: 'RS256' }
  );

  let data;
  try {
    ({ data } = await axios.post(
      TOKEN_URL,
      new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ));
  } catch (error) {
    const reason = error.response?.data?.error_description || error.message;
    throw new Error(`Google auth failed for ${sa.client_email}: ${reason}`);
  }

  tokenCache.token = data.access_token;
  tokenCache.expiresAt = Date.now() + data.expires_in * 1000;
  return tokenCache.token;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retries rate-limit (429) and temporary (5xx) errors with exponential backoff
async function merchantRequest(method, path, { params, data } = {}, attempt = 0) {
  const token = await getAccessToken();
  try {
    const res = await axios({
      method,
      url: `${MERCHANT_API}/${path}`,
      params,
      data,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    const status = error.response?.status;
    if ((status === 429 || status >= 500) && attempt < 4) {
      await sleep(1000 * 2 ** attempt);
      return merchantRequest(method, path, { params, data }, attempt + 1);
    }
    const apiError = error.response?.data?.error;
    const err = new Error(apiError?.message || error.message);
    err.status = status;
    err.details = apiError;
    throw err;
  }
}

// What the admin panel needs to show setup progress (never exposes the private key)
export function getMerchantConfig() {
  let serviceAccountEmail = null;
  let projectId = null;
  let keyError = null;
  try {
    const sa = loadServiceAccount();
    serviceAccountEmail = sa?.client_email || null;
    projectId = sa?.project_id || null;
  } catch (error) {
    keyError = `The service account key could not be read: ${error.message}`;
  }
  return {
    merchantId: getMerchantId(),
    keyConfigured: Boolean(serviceAccountEmail),
    serviceAccountEmail,
    projectId,
    keyError,
    dataSource: cachedDataSource || (process.env.GOOGLE_MERCHANT_DATA_SOURCE_ID
      ? `accounts/${getMerchantId()}/dataSources/${process.env.GOOGLE_MERCHANT_DATA_SOURCE_ID}`
      : null),
    feedLabel: FEED_LABEL,
    currency: CURRENCY,
    siteUrl: getSiteUrl(),
  };
}

// ---------- One-time setup ----------

// Links the Google Cloud project (of the service account) to the Merchant Center account.
// Required once before the Merchant API accepts calls from a new project.
export async function registerGcp(developerEmail) {
  return merchantRequest('post', `accounts/v1/accounts/${getMerchantId()}/developerRegistration:registerGcp`, {
    data: developerEmail ? { developerEmail } : {},
  });
}

export async function listDataSources() {
  const data = await merchantRequest('get', `datasources/v1/accounts/${getMerchantId()}/dataSources`);
  return data.dataSources || [];
}

let cachedDataSource = null;

// Returns `accounts/{id}/dataSources/{dsId}`, creating the API data source if it doesn't exist yet
export async function ensureDataSource() {
  if (cachedDataSource) return cachedDataSource;

  if (process.env.GOOGLE_MERCHANT_DATA_SOURCE_ID) {
    cachedDataSource = `accounts/${getMerchantId()}/dataSources/${process.env.GOOGLE_MERCHANT_DATA_SOURCE_ID}`;
    return cachedDataSource;
  }

  const existing = (await listDataSources()).find(
    (ds) => ds.input === 'API' && ds.primaryProductDataSource && ds.displayName === DATA_SOURCE_NAME
  );
  if (existing) {
    cachedDataSource = existing.name;
    return cachedDataSource;
  }

  const created = await merchantRequest('post', `datasources/v1/accounts/${getMerchantId()}/dataSources`, {
    data: {
      displayName: DATA_SOURCE_NAME,
      primaryProductDataSource: {
        contentLanguage: CONTENT_LANGUAGE,
        feedLabel: FEED_LABEL,
        countries: [COUNTRY],
      },
    },
  });
  console.log(`Google Merchant: created data source ${created.name}`);
  cachedDataSource = created.name;
  return cachedDataSource;
}

// ---------- Product mapping ----------

const absoluteUrl = (url) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${getSiteUrl()}${url.startsWith('/') ? '' : '/'}${url}`;
};

const toMicros = (amount) => String(Math.round(Number(amount) * 1_000_000));

const cleanText = (text, max) =>
  String(text || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

export function toProductInput(product) {
  const images = (product.images && product.images.length ? product.images : [product.image])
    .filter(Boolean)
    .map(absoluteUrl);
  const inStock = !product.soldOut && Number(product.countInStock || product.stock || 0) > 0;
  const price = Number(product.price || 0);

  const attributes = {
    title: cleanText(product.name, 150),
    description: cleanText(product.description || product.name, 5000),
    link: `${getSiteUrl()}/product/${product._id}`,
    imageLink: images[0],
    additionalImageLinks: images.slice(1, 11),
    availability: inStock ? 'IN_STOCK' : 'OUT_OF_STOCK',
    condition: 'NEW',
    price: { amountMicros: toMicros(price), currencyCode: CURRENCY },
    brand: product.brand || 'GUL FASHION',
    identifierExists: false, // Own-brand clothing, no GTIN/MPN
    googleProductCategory: '1604', // Apparel & Accessories > Clothing
    productTypes: [[product.category, product.subcategory].filter(Boolean).join(' > ')].filter(Boolean),
    gender: 'FEMALE',
    ageGroup: 'ADULT',
    shipping: [
      {
        country: COUNTRY,
        price: { amountMicros: toMicros(SHIPPING_FEE), currencyCode: CURRENCY },
      },
    ],
  };

  if (product.colors && product.colors.length) attributes.color = product.colors.slice(0, 3).join('/').slice(0, 100);
  if (product.materials && product.materials.length) attributes.material = product.materials.slice(0, 3).join('/').slice(0, 200);
  if (product.category) attributes.customLabel0 = product.category.slice(0, 100);

  return {
    offerId: String(product._id),
    contentLanguage: CONTENT_LANGUAGE,
    feedLabel: FEED_LABEL,
    productAttributes: attributes,
  };
}

// Products that Google would reject outright are skipped instead of sent
export function getSkipReason(product) {
  if (!product.name) return 'missing name';
  if (!(Number(product.price) > 0)) return 'price is 0';
  const image = (product.images && product.images[0]) || product.image;
  if (!image || image.includes('placeholder')) return 'missing image';
  return null;
}

// ---------- Product operations ----------

const productInputName = (offerId) => {
  // Unpadded base64url of `contentLanguage~feedLabel~offerId`, safe for any offerId characters
  const encoded = Buffer.from(`${CONTENT_LANGUAGE}~${FEED_LABEL}~${offerId}`).toString('base64url');
  return `accounts/${getMerchantId()}/productInputs/${encoded}`;
};

export async function upsertProduct(product) {
  const dataSource = await ensureDataSource();
  return merchantRequest('post', `products/v1/accounts/${getMerchantId()}/productInputs:insert`, {
    params: { dataSource },
    data: toProductInput(product),
  });
}

export async function deleteProduct(productId) {
  const dataSource = await ensureDataSource();
  try {
    await merchantRequest('delete', `products/v1/${productInputName(String(productId))}`, { params: { dataSource } });
  } catch (error) {
    if (error.status !== 404) throw error;
  }
}

export async function syncAllProducts(products, onProgress) {
  const result = { total: products.length, synced: 0, skipped: [], failed: [] };

  for (const product of products) {
    const skipReason = getSkipReason(product);
    if (skipReason) {
      result.skipped.push({ id: String(product._id), name: product.name, reason: skipReason });
    } else {
      try {
        await upsertProduct(product);
        result.synced++;
      } catch (error) {
        result.failed.push({ id: String(product._id), name: product.name, error: error.message });
      }
      await sleep(120); // stay well under the API rate limits
    }
    onProgress?.(result);
  }

  return result;
}

// ---------- Full sync runs (admin button + nightly schedule) ----------

// One full sync at a time; the admin panel polls this state while it runs
const syncState = { running: false, startedAt: null, finishedAt: null, trigger: null, progress: null, result: null, error: null };

export const getSyncState = () => ({ ...syncState });

export function startFullSync(loadProducts, trigger = 'manual') {
  if (syncState.running) return false;
  Object.assign(syncState, { running: true, startedAt: new Date(), finishedAt: null, trigger, progress: null, result: null, error: null });
  (async () => {
    try {
      const products = await loadProducts();
      syncState.result = await syncAllProducts(products, (progress) => {
        syncState.progress = { done: progress.synced + progress.skipped.length + progress.failed.length, total: progress.total };
      });
      console.log(`Google Merchant ${trigger} sync: ${syncState.result.synced} synced, ${syncState.result.failed.length} failed`);
    } catch (error) {
      syncState.error = error.message;
      console.error(`Google Merchant ${trigger} sync failed:`, error.message);
    } finally {
      syncState.running = false;
      syncState.finishedAt = new Date();
    }
  })();
  return true;
}

// Nightly safety net: full sync at about 2 AM India time, once per day
export function scheduleNightlySync(loadProducts) {
  let lastRunDay = null;
  setInterval(() => {
    if (!isMerchantConfigured()) return;
    const now = new Date();
    const hour = Number(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }));
    const day = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    if (hour === 2 && lastRunDay !== day) {
      lastRunDay = day;
      startFullSync(loadProducts, 'nightly');
    }
  }, 10 * 60 * 1000);
}

// Processed products with Google's approval status and item-level issues
export async function listMerchantProducts() {
  const products = [];
  let pageToken;
  do {
    const data = await merchantRequest('get', `products/v1/accounts/${getMerchantId()}/products`, {
      params: { pageSize: 1000, pageToken },
    });
    products.push(...(data.products || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return products;
}

export async function getMerchantStatus() {
  const products = await listMerchantProducts();
  const summary = { total: products.length, approved: 0, pending: 0, disapproved: 0 };
  const issues = [];

  for (const p of products) {
    const statuses = p.productStatus?.destinationStatuses || [];
    if (statuses.some((s) => s.disapprovedCountries?.length)) summary.disapproved++;
    else if (statuses.some((s) => s.approvedCountries?.length)) summary.approved++;
    else summary.pending++;

    for (const issue of p.productStatus?.itemLevelIssues || []) {
      issues.push({
        offerId: p.offerId,
        title: p.productAttributes?.title,
        severity: issue.severity,
        attribute: issue.attribute,
        description: issue.description,
        detail: issue.detail,
      });
    }
  }

  return { merchantId: getMerchantId(), summary, issues };
}

// Fire-and-forget helpers used by product routes so admin actions never fail because of Google
export function syncProductInBackground(product) {
  if (!isMerchantConfigured() || getSkipReason(product)) return;
  upsertProduct(product).catch((error) =>
    console.error(`Google Merchant: failed to sync product ${product._id} -`, error.message)
  );
}

export function deleteProductInBackground(productId) {
  if (!isMerchantConfigured()) return;
  deleteProduct(productId).catch((error) =>
    console.error(`Google Merchant: failed to delete product ${productId} -`, error.message)
  );
}
