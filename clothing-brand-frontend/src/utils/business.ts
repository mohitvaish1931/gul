// Gul Fashion's store location, as listed on Google Maps.
// Keep this, index.html and Google Merchant Center's business info identical.

export const STORE_ADDRESS = {
  street: 'Sanga Setu Rd, in front of Wireless Office',
  locality: 'Sanganer',
  city: 'Jaipur',
  state: 'Rajasthan',
  postalCode: '302029',
  country: 'IN',
};

export const STORE_ADDRESS_LINE = `${STORE_ADDRESS.street}, ${STORE_ADDRESS.locality}, ${STORE_ADDRESS.city}, ${STORE_ADDRESS.state} ${STORE_ADDRESS.postalCode}`;

export const STORE_GEO = { latitude: 26.8188126, longitude: 75.7933991 };

// Google Maps place for the store (opens the listing with directions)
export const STORE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Gul+Fashion+Sanga+Setu+Rd+Sanganer+Jaipur&query_place_id=ChIJJ3cn1BHLbTkRvYPU1lum6tk';

export const STORE_MAPS_EMBED_URL =
  `https://maps.google.com/maps?q=${encodeURIComponent(`Gul Fashion, ${STORE_ADDRESS_LINE}`)}&ll=${STORE_GEO.latitude},${STORE_GEO.longitude}&z=16&output=embed`;
