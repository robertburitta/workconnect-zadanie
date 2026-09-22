export function roundPrice(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateGrossPrice(netPrice: number, vat: number): number {
  return roundPrice(netPrice * (1 + vat / 100));
}

export function calculateNetPrice(grossPrice: number, vat: number): number {
  return roundPrice(grossPrice / (1 + vat / 100));
}
