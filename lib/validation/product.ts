import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().trim().min(3, "Nazwa produktu musi mieć co najmniej 3 znaki"),
  sku: z
    .string()
    .trim()
    .min(1, "SKU produktu jest wymagane")
    .max(24, "SKU może mieć maksymalnie 24 znaki")
    .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać wyłącznie litery i cyfry"),
  description: z.string().optional(),
  manufacturer: z.string().min(1, "Wybierz producenta"),
  category: z.string().min(1, "Wybierz kategorię"),
  features: z.array(z.string()).min(1, "Wybierz co najmniej jedną cechę produktu"),
});

export const priceSchema = z.object({
  netPrice: z.number("Podaj cenę netto").nonnegative("Cena netto nie może być ujemna"),
  grossPrice: z.number("Podaj cenę brutto").nonnegative("Cena brutto nie może być ujemna"),
  vat: z.number("Wybierz stawkę VAT"),
  currency: z.string().min(1, "Wybierz walutę"),
});

export const stockSchema = z
  .number("Podaj ilość na magazynie")
  .int("Ilość na magazynie musi być liczbą całkowitą")
  .nonnegative("Ilość na magazynie nie może być ujemna");

export const minQuantitySchema = z.number("Podaj minimalną ilość").int("Minimalna ilość musi być liczbą całkowitą");

export const maxQuantitySchema = z.number("Podaj maksymalną ilość").int("Maksymalna ilość musi być liczbą całkowitą");

export const availabilitySchema = z
  .object({
    available: z.boolean(),
    limited: z.boolean(),
    stock: stockSchema.nullable(),
    minQuantity: minQuantitySchema,
    maxQuantity: maxQuantitySchema,
  })
  .superRefine((values, ctx) => {
    if (values.limited && values.stock === null) {
      ctx.addIssue({
        code: "custom",
        path: ["stock"],
        message: "Podaj ilość produktu na magazynie",
      });
    }

    if (values.minQuantity > values.maxQuantity) {
      ctx.addIssue({
        code: "custom",
        path: ["maxQuantity"],
        message: "Maksymalna ilość nie może być mniejsza od minimalnej",
      });
    }
  });

export const productSchema = basicInfoSchema.and(priceSchema).and(availabilitySchema);
export type ValidatedProduct = z.infer<typeof productSchema>;
