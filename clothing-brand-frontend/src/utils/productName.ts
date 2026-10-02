// Product names in the catalog carry long SEO tails, e.g.
// "Bahaar Premium Light Blue Angrakha Suit Set Premium Cotton Angrakha Suit Set with Dupatta".
// The full name stays in the database (good for Google); the store shows a short title
// with the descriptive tail as a smaller subtitle.

const SEO_TAILS = [
  'Premium Embroidered Cotton Angrakha Kurta Pant Set',
  'Daily Wear Cotton Angrakha Kurta Pant Set',
  'Premium Cotton Angrakha Suit Set with Dupatta',
  'Cotton Flared Anarkali Gown Kurti',
  'Casual Printed Cotton Top',
  '3-Piece Cotton Top Set',
  'Cotton Peplum Top',
];

export interface ProductTitle {
  title: string;
  subtitle: string;
}

export function splitProductName(name = ''): ProductTitle {
  const clean = name.replace(/\s+/g, ' ').trim();

  // "Title | keyword | keyword" -> first part is the title
  if (clean.includes('|')) {
    const [title, ...rest] = clean.split('|').map((part) => part.trim()).filter(Boolean);
    return { title, subtitle: rest[0] || '' };
  }

  const lower = clean.toLowerCase();
  for (const tail of SEO_TAILS) {
    if (lower.endsWith(tail.toLowerCase()) && clean.length > tail.length + 3) {
      return { title: clean.slice(0, clean.length - tail.length).trim(), subtitle: tail };
    }
  }

  return { title: clean.replace(/ for Women$/i, ''), subtitle: '' };
}
