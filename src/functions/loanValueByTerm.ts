export function LoanTax(tax: number, term: number, value: number): number {
  const pay = value * (1 + tax) ** term;
  return Number((pay / term).toFixed(2));
}
