import { formatToDecimalValue } from "../utils/FormatUtils";

export const validateInputValue = (
  insertValue: number,
  minValue: number,
  maxValue: number
) => {
  if (insertValue < minValue) return "Error below";
  else if (insertValue > maxValue) return "Error above";
  else return "Valid input";
};
