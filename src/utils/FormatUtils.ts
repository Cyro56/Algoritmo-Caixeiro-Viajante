import VMasker from "vanilla-masker";

export function formatToDecimalValue(value: string) {
  const number = formatToNumber(value);
  return parseFloat((number / 100).toFixed(2));
}

export function formatToMoney(value: string | number) {
  return VMasker.toMoney(value ?? 0, {
    precision: 2,
    separator: ",",
    delimiter: ".",
    unit: "R$",
    zeroCents: false,
  });
}

export function formatToNumber(value: string) {
  return VMasker.toNumber(value ?? "");
}
