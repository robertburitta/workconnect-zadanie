export function roundPrice(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateGrossPrice(netPrice: number, vat: number): number {
  return roundPrice(netPrice * (1 + vat / 100));
}

export function calculateNetPrice(grossPrice: number, vat: number): number {
  return roundPrice(grossPrice / (1 + vat / 100));
}

export function formatPrice(price: number, currency: string): string {
  const formattedPrice = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(price);

  return `${formattedPrice} ${currency}`;
}
