export { cn } from "cn";

export const getNumberInputValue = (value: string, valueAsNumber: number): number | null => {
  if (value === "" || !Number.isFinite(valueAsNumber)) {
    return null;
  }

  return valueAsNumber;
};
