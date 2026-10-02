// "Shop by occasion" collections. The API filters with the same name patterns
// (see OCCASIONS in clothing-brand-backend/routes/productRoutes.js).
export const OCCASIONS = [
  { key: 'festive', label: 'Festive & Designer', tagline: 'Embroidered sets for celebrations', match: /festive|wedding|party|embroider|designer|anarkali|premium/i },
  { key: 'daily', label: 'Everyday Comfort', tagline: 'Easy cotton sets for daily wear', match: /daily|everyday|casual|comfort|regular|simple/i },
  { key: 'cotton', label: 'Pure Cotton', tagline: 'Breathable, handcrafted cotton', match: /cotton/i },
  { key: 'embroidered', label: 'Embroidered', tagline: 'Handwork and thread detailing', match: /embroider/i },
] as const;

export const findOccasion = (key: string | null) => OCCASIONS.find((o) => o.key === key);
