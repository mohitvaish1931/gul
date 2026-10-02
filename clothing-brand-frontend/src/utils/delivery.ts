// Delivery estimate based on the shipping policy: dispatch in 2-3 working days,
// then 4-8 working days in transit. Orders ship from Jaipur, so Rajasthan pincodes
// (30xxxx-34xxxx) arrive faster.

const addWorkingDays = (from: Date, days: number) => {
  const date = new Date(from);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0) added++; // couriers don't deliver on Sundays
  }
  return date;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

export const isValidPincode = (pincode: string) => /^[1-9][0-9]{5}$/.test(pincode);

export function estimateDelivery(pincode?: string, from = new Date()) {
  const withinRajasthan = pincode ? /^3[0-4]/.test(pincode) : false;
  const minDays = withinRajasthan ? 4 : 6;
  const maxDays = withinRajasthan ? 7 : 11;
  return {
    minDays,
    maxDays,
    label: `${formatDate(addWorkingDays(from, minDays))} – ${formatDate(addWorkingDays(from, maxDays))}`,
  };
}
