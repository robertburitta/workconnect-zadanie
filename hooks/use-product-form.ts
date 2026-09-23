import { useForm } from "@tanstack/react-form";
import { DEFAULT_PRODUCT_VALUES } from "@/lib/product-default-values";
import { productSchema, type ValidatedProduct } from "@/lib/validation/product";

export const useProductForm = (onSubmit: (product: ValidatedProduct) => void) => {
  return useForm({
    defaultValues: {
      ...DEFAULT_PRODUCT_VALUES,
    },
    validators: { onSubmit: productSchema },
    onSubmit: ({ value }) => {
      const result = productSchema.safeParse(value);

      if (result.success) {
        onSubmit(result.data);
      }
    },
  });
};

export type ProductFormApi = ReturnType<typeof useProductForm>;
