export { cn } from "cn";

export function getNumberInputValue(value: string, valueAsNumber: number): number | null {
  if (value === "" || Number.isNaN(valueAsNumber)) {
    return null;
  }

  return valueAsNumber;
}
