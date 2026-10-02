// HTML emails for customers and the store owner. Inline styles only (email clients ignore <style>).

const siteUrl = () => (process.env.SITE_URL || 'https://gulfashion.store').replace(/\/$/, '');

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const money = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

export const orderNumber = (order) => `#${String(order._id).substring(0, 8)}`;

export const orderRecipient = (order) => order.shippingAddress?.email || order.user?.email || null;

const button = (href, label) =>
  `<a href="${href}" style="display:inline-block;background:#2D0A4E;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;letter-spacing:1px;font-size:13px">${escapeHtml(label)}</a>`;

const layout = (heading, body) => `
<div style="background:#FDFBFD;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#333333">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #efe4ff;border-radius:16px;overflow:hidden">
    <div style="background:#2D0A4E;padding:24px;text-align:center">
      <div style="color:#D4AF37;font-family:Georgia,serif;font-size:24px;letter-spacing:3px">GUL FASHION</div>
      <div style="color:#e9ddf7;font-size:11px;letter-spacing:2px;margin-top:4px">HANDCRAFTED IN JAIPUR</div>
    </div>
    <div style="padding:28px 28px 8px">
      <h1 style="font-family:Georgia,serif;color:#2D0A4E;font-size:22px;margin:0 0 16px">${escapeHtml(heading)}</h1>
      ${body}
    </div>
    <div style="padding:20px 28px 28px;font-size:12px;color:#888888;line-height:1.6">
      Questions? Reply to this email or WhatsApp us at
      <a href="https://wa.me/919351325459" style="color:#2D0A4E">+91 93513 25459</a>.<br>
      <a href="${siteUrl()}" style="color:#2D0A4E">gulfashion.store</a>
    </div>
  </div>
</div>`;

const itemsTable = (order) => `
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px">
  ${order.orderItems
    .map(
      (item) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:64px">
      ${item.image ? `<img src="${escapeHtml(item.image)}" width="52" style="border-radius:6px;display:block" alt="">` : ''}
    </td>
    <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0">
      ${escapeHtml(item.name)}<br>
      <span style="color:#888888;font-size:12px">Qty ${item.qty}${item.selectedSize ? ` · Size ${escapeHtml(item.selectedSize)}` : ''}${item.selectedColor ? ` · ${escapeHtml(item.selectedColor)}` : ''}</span>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;white-space:nowrap">${money(item.price * item.qty)}</td>
  </tr>`
    )
    .join('')}
  ${order.discountAmount ? `<tr><td></td><td style="padding:8px;color:#15803D">Discount${order.couponCode ? ` (${escapeHtml(order.couponCode)})` : ''}</td><td style="text-align:right;color:#15803D;white-space:nowrap">-${money(order.discountAmount)}</td></tr>` : ''}
  <tr><td></td><td style="padding:8px">Shipping</td><td style="text-align:right">Free</td></tr>
  <tr><td></td><td style="padding:8px;font-weight:700">Total paid</td><td style="text-align:right;font-weight:700">${money(order.totalPrice)}</td></tr>
</table>`;

const addressBlock = (order) => {
  const a = order.shippingAddress || {};
  return `<p style="font-size:14px;line-height:1.6;margin:0 0 16px"><strong>Delivering to</strong><br>
    ${escapeHtml(a.name)}<br>${escapeHtml(a.address)}<br>${escapeHtml(a.city)} - ${escapeHtml(a.postalCode)}<br>${escapeHtml(a.phoneNumber)}</p>`;
};

export function orderConfirmedEmail(order) {
  return {
    subject: `Order confirmed ${orderNumber(order)} – Gul Fashion`,
    html: layout(
      `Thank you, ${order.shippingAddress?.name || 'there'}!`,
      `<p style="font-size:14px;line-height:1.6">Your order <strong>${orderNumber(order)}</strong> is confirmed. We'll pack it with care and send you the tracking details as soon as it ships (usually within 2–3 working days).</p>
       ${itemsTable(order)}
       ${addressBlock(order)}
       <p style="margin:24px 0">${button(`${siteUrl()}/track-order`, 'TRACK YOUR ORDER')}</p>`
    ),
  };
}

export function newOrderOwnerEmail(order) {
  return {
    subject: `New order ${orderNumber(order)} – ${money(order.totalPrice)}`,
    html: layout(
      `New paid order ${orderNumber(order)}`,
      `${itemsTable(order)}
       ${addressBlock(order)}
       <p style="font-size:14px">Customer email: ${escapeHtml(orderRecipient(order) || '-')}</p>
       <p style="margin:24px 0">${button(`${siteUrl()}/admin/orders`, 'OPEN ORDERS')}</p>`
    ),
  };
}

export function orderShippedEmail(order) {
  const tracking = order.trackingUrl
    ? `<p style="margin:24px 0">${button(order.trackingUrl, 'TRACK SHIPMENT')}</p>`
    : `<p style="margin:24px 0">${button(`${siteUrl()}/track-order`, 'TRACK YOUR ORDER')}</p>`;
  return {
    subject: `Your order ${orderNumber(order)} has shipped`,
    html: layout(
      'Your order is on its way',
      `<p style="font-size:14px;line-height:1.6">Good news! Order <strong>${orderNumber(order)}</strong> has been shipped${order.courierName ? ` with <strong>${escapeHtml(order.courierName)}</strong>` : ''}${order.awbNumber ? ` (tracking number <strong>${escapeHtml(order.awbNumber)}</strong>)` : ''}. Delivery usually takes 4–8 working days.</p>
       ${tracking}
       ${itemsTable(order)}`
    ),
  };
}

export function orderDeliveredEmail(order) {
  const reviewLinks = order.orderItems
    .map(
      (item) =>
        `<li style="margin:6px 0"><a href="${siteUrl()}/product/${item.product}#reviews" style="color:#2D0A4E">${escapeHtml(item.name)}</a></li>`
    )
    .join('');
  return {
    subject: `Delivered: how do you like your Gul Fashion order?`,
    html: layout(
      'Your order has been delivered',
      `<p style="font-size:14px;line-height:1.6">We hope you love it! It would mean a lot if you shared a quick review — photos of you wearing it are extra special to us.</p>
       <ul style="font-size:14px;padding-left:18px">${reviewLinks}</ul>
       <p style="font-size:14px;line-height:1.6">Not the right size? You can request a size exchange within 7 days from <a href="${siteUrl()}/profile" style="color:#2D0A4E">My Account</a>.</p>`
    ),
  };
}

export function contactOwnerEmail(message) {
  return {
    subject: `Website enquiry: ${message.subject || 'New message'} – ${message.name}`,
    html: layout(
      'New message from the website',
      `<p style="font-size:14px;line-height:1.7">
        <strong>Name:</strong> ${escapeHtml(message.name)}<br>
        <strong>Email:</strong> ${escapeHtml(message.email)}<br>
        <strong>Phone:</strong> ${escapeHtml(message.phone || '-')}<br>
        <strong>Subject:</strong> ${escapeHtml(message.subject || '-')}
      </p>
      <p style="font-size:14px;line-height:1.7;white-space:pre-line;background:#FDFBFD;padding:16px;border-radius:8px">${escapeHtml(message.message)}</p>
      <p style="margin:24px 0">${button(`${siteUrl()}/admin/messages`, 'OPEN MESSAGES')}</p>`
    ),
  };
}

export function backInStockEmail(product) {
  return {
    subject: `Back in stock: ${product.name}`,
    html: layout(
      "It's back in stock!",
      `<p style="font-size:14px;line-height:1.6">You asked us to let you know — <strong>${escapeHtml(product.name)}</strong> is available again. Popular sizes tend to sell out quickly.</p>
       ${product.image ? `<p><img src="${escapeHtml(product.image)}" width="220" style="border-radius:12px" alt=""></p>` : ''}
       <p style="margin:24px 0">${button(`${siteUrl()}/product/${product._id}`, 'SHOP NOW')}</p>`
    ),
  };
}

export function exchangeRequestOwnerEmail(order) {
  const r = order.exchangeRequest || {};
  return {
    subject: `Exchange request for order ${orderNumber(order)}`,
    html: layout(
      `Exchange request ${orderNumber(order)}`,
      `<p style="font-size:14px;line-height:1.7">
        <strong>Reason:</strong> ${escapeHtml(r.reason)}<br>
        <strong>Size wanted:</strong> ${escapeHtml(r.preferredSize || '-')}<br>
        <strong>Details:</strong> ${escapeHtml(r.details || '-')}
      </p>
      ${itemsTable(order)}
      ${addressBlock(order)}
      <p style="margin:24px 0">${button(`${siteUrl()}/admin/orders`, 'OPEN ORDERS')}</p>`
    ),
  };
}

export function exchangeRequestCustomerEmail(order) {
  return {
    subject: `We received your exchange request ${orderNumber(order)}`,
    html: layout(
      'Exchange request received',
      `<p style="font-size:14px;line-height:1.6">We've received your size exchange request for order <strong>${orderNumber(order)}</strong>. Our team will contact you within 24 hours with pickup details. Please keep the garment unworn with its original tags.</p>`
    ),
  };
}
