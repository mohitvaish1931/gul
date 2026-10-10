import { Pencil } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext, type Product } from '../../context/AppContext';
import { getImageUrl } from '../../utils/mediaHelper';
import { splitProductName } from '../../utils/productName';
import { LOW_STOCK, isOutOfStock, stockOf } from './adminData';

const productId = (product: Product) => String(product._id || product.id);

const FILTERS = [
  { value: 'all', label: 'All', test: () => true },
  { value: 'low', label: `Running low (${LOW_STOCK} or fewer)`, test: (p: Product) => !isOutOfStock(p) && stockOf(p) <= LOW_STOCK },
  { value: 'out', label: 'Out of stock', test: isOutOfStock },
];

const AdminInventory = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const show = searchParams.get('show') || 'all';
  const filter = FILTERS.find((f) => f.value === show) || FILTERS[0];
  const setShow = (value: string) => setSearchParams(value === 'all' ? {} : { show: value }, { replace: true });

  const products = state.products;
  const outCount = products.filter(FILTERS[2].test).length;
  const lowCount = products.filter(FILTERS[1].test).length;

  // Least stock first: that is what needs restocking
  const visible = products
    .filter(filter.test)
    .sort((a, b) => (isOutOfStock(a) ? -1 : stockOf(a)) - (isOutOfStock(b) ? -1 : stockOf(b)));

  return (
    <div className="adm-page">
      <div className="adm-head">
        <div>
          <h1>Inventory</h1>
          <p className="adm-head-note">
            {products.length} products.{' '}
            {outCount || lowCount
              ? [outCount && `${outCount} out of stock`, lowCount && `${lowCount} running low`].filter(Boolean).join(', ') + '. Edit a product to update its stock.'
              : 'Everything is in stock.'}
          </p>
        </div>
      </div>

      <div className="adm-chips" role="group" aria-label="Filter inventory">
        {FILTERS.map((f) => (
          <button key={f.value} type="button" className="adm-chip" aria-pressed={show === f.value} onClick={() => setShow(f.value)}>
            {f.label} <span className="adm-chip-count">{products.filter(f.test).length}</span>
          </button>
        ))}
      </div>

      <section className="adm-panel adm-products">
        {visible.length === 0 ? (
          <p className="adm-empty" style={{ paddingTop: 22 }}>Nothing here. Every product has enough stock.</p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col" style={{ paddingTop: 16 }}>Product</th>
                  <th scope="col" className="adm-hide-md" style={{ paddingTop: 16 }}>Category</th>
                  <th scope="col" className="num" style={{ paddingTop: 16 }}>In stock</th>
                  <th scope="col" style={{ paddingTop: 16 }}>Status</th>
                  <th scope="col" style={{ paddingTop: 16 }}><span className="sr-only">Edit</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((product) => {
                  const { title } = splitProductName(product.name);
                  const out = isOutOfStock(product);
                  const low = !out && stockOf(product) <= LOW_STOCK;
                  return (
                    <tr key={productId(product)}>
                      <td>
                        <div className="adm-item">
                          <img className="adm-thumb" src={getImageUrl(product.images?.[0] || product.image, 120)} alt="" loading="lazy" decoding="async" />
                          <span className="adm-item-name adm-strong">{title}</span>
                        </div>
                      </td>
                      <td className="adm-hide-md"><span className="adm-tag">{product.category}</span></td>
                      <td className="num">{out && product.soldOut ? 'Sold out' : stockOf(product)}</td>
                      <td>
                        <span className={`adm-state ${out ? 'adm-state-cancelled' : low ? 'adm-state-to-ship' : 'adm-state-delivered'}`}>
                          {out ? 'Out of stock' : low ? 'Running low' : 'In stock'}
                        </span>
                      </td>
                      <td>
                        <div className="adm-actions">
                          <button type="button" className="adm-icon-btn" onClick={() => navigate(`/admin/products/${productId(product)}/edit`)} aria-label={`Edit ${title}`} title="Edit stock">
                            <Pencil aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminInventory;
