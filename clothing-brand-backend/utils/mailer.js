import nodemailer from 'nodemailer';

// Works with any SMTP provider. For Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465,
// SMTP_USER=<gmail address>, SMTP_PASS=<Google "App password">.
// Emails are skipped (and logged) until SMTP is configured, so nothing else breaks.

let transporter = null;

export const isMailConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

// Where store notifications (new orders, contact messages, exchange requests) are sent
export const getStoreEmail = () => process.env.STORE_EMAIL || 'gul.fashion.jaipur@gmail.com';

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html, replyTo }) {
  if (!to) return false;
  if (!isMailConfigured()) {
    console.log(`Email skipped (SMTP not configured): "${subject}" -> ${to}`);
    return false;
  }
  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || `Gul Fashion <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      replyTo,
    });
    return true;
  } catch (error) {
    console.error(`Email failed: "${subject}" -> ${to}:`, error.message);
    return false;
  }
}

// Fire-and-forget so a slow or failing mail server never delays a customer request
export function sendMailInBackground(message) {
  sendMail(message).catch(() => {});
}
