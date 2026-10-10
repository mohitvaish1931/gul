import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, Eye, GripVertical } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext, type Product } from '../../context/AppContext';
import { API_ENDPOINTS } from '../../utils/api';
import { getImageUrl } from '../../utils/mediaHelper';
import { splitProductName } from '../../utils/productName';
import { isOutOfStock, rupees } from './adminData';

const productId = (product: Product) => String(product._id || product.id);

const AdminProducts = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const show = searchParams.get('show') || 'all';
  const setShow = (value: string) => setSearchParams(value === 'all' ? {} : { show: value }, { replace: true });

  const products = state.products;
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();
  const soldOutCount = products.filter(isOutOfStock).length;

  const needle = query.trim().toLowerCase();
  const visible = products.filter((p) => {
    if (show === 'sold-out' && !isOutOfStock(p)) return false;
    if (show !== 'all' && show !== 'sold-out' && p.category !== show) return false;
    return !needle || p.name.toLowerCase().includes(needle) || (p.category || '').toLowerCase().includes(needle);
  });

  // Reordering only makes sense on the full list, in the order the shop shows it
  const canReorder = show === 'all' && !needle;

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete "${splitProductName(product.name).title}"? This removes it from the shop.`)) return;
    try {
      const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/${productId(product)}`, { method: 'DELETE' });
      if (res.ok) dispatch({ type: 'REMOVE_PRODUCT', payload: product._id || product.id });
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleDrop = async () => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const reordered = [...products];
      const [moved] = reordered.splice(dragIndex, 1);
      reordered.splice(overIndex, 0, moved);
      dispatch({ type: 'SET_PRODUCTS', payload: reordered });
      try {
        const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/reorder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ products: reordered.map((p, idx) => ({ id: productId(p), displayOrder: idx })) }),
        });
        if (!res.ok) throw new Error('Reorder failed');
      } catch (err) {
        console.error('Drag reorder update failed:', err);
      }
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  const chips = [
    { value: 'all', label: 'All', count: products.length },
    ...categories.map((c) => ({ value: c, label: c, count: products.filter((p) => p.category === c).length })),
    ...(soldOutCount ? [{ value: 'sold-out', label: 'Out of stock', count: soldOutCount }] : []),
  ];

  return (
    <div className="adm-page">
      <div className="adm-head">
        <div>
          <h1>Products</h1>
          <p className="adm-head-note">
            {products.length} in the shop{soldOutCount ? `, ${soldOutCount} out of stock` : ''}.{' '}
            {canReorder ? 'Drag a row to change where it appears in the shop.' : 'Show all products without a search to change their order.'}
          </p>
        </div>
        <Link to="/admin/products/add" className="adm-btn">
          <Plus aria-hidden="true" />
          Add product
        </Link>
      </div>

      <div className="adm-toolbar">
        <label className="adm-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by name or category"
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="adm-chips" role="group" aria-label="Filter products">
          {chips.map((chip) => (
            <button key={chip.value} type="button" className="adm-chip" aria-pressed={show === chip.value} onClick={() => setShow(chip.value)}>
              {chip.label} <span className="adm-chip-count">{chip.count}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="adm-panel adm-products">
        {visible.length === 0 ? (
          <p className="adm-empty" style={{ paddingTop: 22 }}>
            {products.length === 0 ? 'No products yet. Add the first one to start selling.' : 'No products match. Try another search or filter.'}
          </p>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  {canReorder && <th scope="col" style={{ width: 34 }}><span className="sr-only">Order</span></th>}
                  <th scope="col" style={{ paddingTop: 16 }}>Product</th>
                  <th scope="col" className="adm-hide-md" style={{ paddingTop: 16 }}>Category</th>
                  <th scope="col" className="num" style={{ paddingTop: 16 }}>Price</th>
                  <th scope="col" style={{ paddingTop: 16 }}>Status</th>
                  <th scope="col" style={{ paddingTop: 16 }}><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((product, idx) => {
                  const { title, subtitle } = splitProductName(product.name);
                  const rowClass = [
                    dragIndex === idx ? 'adm-row-dragging' : '',
                    overIndex === idx && dragIndex !== idx ? 'adm-row-target' : '',
                  ].join(' ').trim();
                  return (
                    <tr
                      key={productId(product)}
                      className={rowClass || undefined}
                      draggable={canReorder}
                      onDragStart={() => setDragIndex(idx)}
                      onDragEnter={(e) => { e.preventDefault(); setOverIndex(idx); }}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnd={handleDrop}
                    >
                      {canReorder && (
                        <td style={{ paddingRight: 0 }}>
                          <GripVertical className="adm-grip" aria-hidden="true" />
                        </td>
                      )}
                      <td>
                        <div className="adm-item">
                          <img
                            className="adm-thumb"
                            src={getImageUrl(product.images?.[0] || product.image, 120)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                          <span style={{ minWidth: 0 }}>
                            <span className="adm-item-name adm-strong">{title}</span>
                            {subtitle && <span className="adm-sub adm-item-name">{subtitle}</span>}
                          </span>
                        </div>
                      </td>
                      <td className="adm-hide-md"><span className="adm-tag">{product.category}</span></td>
                      <td className="num">
                        {rupees(product.price)}
                        {product.originalPrice && product.originalPrice > product.price ? (
                          <span className="adm-was">{rupees(product.originalPrice)}</span>
                        ) : null}
                      </td>
                      <td>
                        <span className={`adm-state ${isOutOfStock(product) ? 'adm-state-cancelled' : 'adm-state-delivered'}`}>
                          {product.soldOut ? 'Sold out' : isOutOfStock(product) ? 'Out of stock' : 'In stock'}
                        </span>
                      </td>
                      <td>
                        <div className="adm-actions">
                          <a className="adm-icon-btn" href={`/product/${productId(product)}`} target="_blank" rel="noopener noreferrer" title="View in shop" aria-label={`View ${title} in the shop`}>
                            <Eye aria-hidden="true" />
                          </a>
                          <button type="button" className="adm-icon-btn" onClick={() => navigate(`/admin/products/${productId(product)}/edit`)} title="Edit" aria-label={`Edit ${title}`}>
                            <Pencil aria-hidden="true" />
                          </button>
                          <button type="button" className="adm-icon-btn is-danger" onClick={() => handleDelete(product)} title="Delete" aria-label={`Delete ${title}`}>
                            <Trash2 aria-hidden="true" />
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

export default AdminProducts;
