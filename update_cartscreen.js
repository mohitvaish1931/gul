const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'clothing-brand-frontend/src/pages/CartScreen.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace local state with global state
content = content.replace(
  /const \[cartItems, setCartItems\] = useState<any\[\]>\(\[\]\);/,
  `const { state, dispatch } = useAppContext();
  const cartItems = state.cart;`
);

// Remove the `fetchItem` logic in useEffect inside CartScreen
content = content.replace(
  /useEffect\(\(\) => \{[\s\S]*?\}, \[id, qty, size, color\]\);/,
  `useEffect(() => {
    // Cart is now managed globally via AppContext
  }, []);`
);

// Update removeFromCartHandler to dispatch action
content = content.replace(
  /const removeFromCartHandler = \(removeId: any\) => \{[\s\S]*?navigate\('\/cart'\);\s*\};/,
  `const removeFromCartHandler = (removeId: any, selectedSize?: string, selectedColor?: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: removeId, selectedSize, selectedColor } });
  };`
);
content = content.replace(
  /<button onClick=\{\(\) => removeFromCartHandler\(item._id\)\} className="btn-remove">/,
  `<button onClick={() => removeFromCartHandler(item.id || item._id, item.selectedSize, item.selectedColor)} className="btn-remove">`
);

// Add quantity increment/decrement functions
content = content.replace(
  /const removeFromCartHandler/,
  `const updateQtyHandler = (id: any, selectedSize: string | undefined, selectedColor: string | undefined, newQty: number) => {
    if(newQty > 0) {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, selectedSize, selectedColor, qty: newQty } });
    }
  };
  
  const removeFromCartHandler`
);

// Add UI for quantity update
content = content.replace(
  /<span className="item-qty">Qty: \{item\.qty\}<\/span>/,
  `<div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                          <button onClick={() => updateQtyHandler(item.id || item._id, item.selectedSize, item.selectedColor, (item.qty || 1) - 1)} style={{ padding: '5px 10px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>-</button>
                          <span style={{ fontWeight: 'bold' }}>{item.qty || 1}</span>
                          <button onClick={() => updateQtyHandler(item.id || item._id, item.selectedSize, item.selectedColor, (item.qty || 1) + 1)} style={{ padding: '5px 10px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>+</button>
                        </div>`
);

// We need to change `setCartItems([])` after payment success to `dispatch({ type: 'CLEAR_CART' })`
content = content.replace(/setCartItems\(\[\]\);/g, `dispatch({ type: 'CLEAR_CART' });`);

fs.writeFileSync(file, content);
console.log('Done');
