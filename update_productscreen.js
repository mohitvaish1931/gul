const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'clothing-brand-frontend/src/pages/ProductScreen.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const addToCartHandler = \(\) => \{[\s\S]*?navigate\(`\/cart\/\$\{id\}\?qty=\$\{qty\}&size=\$\{selectedSize\}&color=\$\{selectedColor\}`\);\s*\};/,
  `const addToCartHandler = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, id: product.id || product._id, qty: qty || 1, selectedSize, selectedColor } 
    });
    navigate('/cart');
  };`
);

fs.writeFileSync(file, content);
console.log('Done');
