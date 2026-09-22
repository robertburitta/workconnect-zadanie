import { useForm } from "@tanstack/react-form";

import { DEFAULT_PRODUCT_VALUES } from "@/lib/product-default-values";

export function useProductForm() {
  return useForm({
    defaultValues: {
      ...DEFAULT_PRODUCT_VALUES,
    },
  });
}

export type ProductFormApi = ReturnType<typeof useProductForm>;
