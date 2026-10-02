import { sendMailInBackground, getStoreEmail } from './mailer.js';
import {
  orderConfirmedEmail,
  newOrderOwnerEmail,
  orderShippedEmail,
  orderDeliveredEmail,
  orderRecipient,
} from './emailTemplates.js';

// After a successful payment: confirmation to the customer, alert to the store
export function notifyOrderPaid(order) {
  sendMailInBackground({ to: orderRecipient(order), ...orderConfirmedEmail(order) });
  sendMailInBackground({ to: getStoreEmail(), replyTo: orderRecipient(order) || undefined, ...newOrderOwnerEmail(order) });
}

// Customer emails when an order moves to Shipped or Delivered (admin panel or courier webhook)
export function notifyOrderStatusChange(order, previousStatus) {
  if (order.status === previousStatus) return;
  const to = orderRecipient(order);
  if (order.status === 'Shipped') {
    sendMailInBackground({ to, ...orderShippedEmail(order) });
  } else if (order.status === 'Delivered') {
    sendMailInBackground({ to, ...orderDeliveredEmail(order) });
  }
}
