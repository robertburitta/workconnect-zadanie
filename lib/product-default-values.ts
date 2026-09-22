import type { ProductFormValues } from "@/types/product";

export const DEFAULT_PRODUCT_VALUES: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  manufacturer: "",
  category: "",
  features: [],
  netPrice: null,
  grossPrice: null,
  vat: 23,
  currency: "PLN",
  available: true,
  limited: false,
  stock: null,
  minQuantity: 1,
  maxQuantity: 10,
};
