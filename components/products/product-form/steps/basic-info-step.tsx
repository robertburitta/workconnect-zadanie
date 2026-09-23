"use client";

import { Label, Textarea } from "@/components/ui";
import { CATEGORIES, MANUFACTURERS } from "@/lib/product-options";
import { basicInfoSchema } from "@/lib/validation/product";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { FormInput } from "../form-input";
import { FormSelect } from "../form-select";
import { FeaturesSelect } from "../features-select";

interface BasicInfoStepProps {
  form: ProductFormApi;
}

const MANUFACTURER_ITEMS = MANUFACTURERS.map((value) => ({
  value,
  label: value,
}));

const CATEGORY_ITEMS = CATEGORIES.map((value) => ({
  value,
  label: value,
}));

export const BasicInfoStep = ({ form }: BasicInfoStepProps) => {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
      <form.Field
        name="name"
        validators={{
          onChange: basicInfoSchema.shape.name,
        }}
      >
        {(field) => <FormInput field={field} label="Nazwa produktu" placeholder="np. MacBook Pro 14" />}
      </form.Field>

      <form.Field
        name="sku"
        validators={{
          onChange: basicInfoSchema.shape.sku,
        }}
      >
        {(field) => <FormInput field={field} label="SKU produktu" placeholder="np. MBP14M3PRO" />}
      </form.Field>

      <form.Field
        name="description"
        validators={{
          onChange: basicInfoSchema.shape.description,
        }}
      >
        {(field) => (
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={field.name} className="text-sm font-medium leading-5">
              Opis
            </Label>

            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="Krótki opis produktu"
              className="min-h-16 resize-none rounded-xl border-neutral-200 px-3 py-2 text-sm shadow-none placeholder:text-neutral-500 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600"
            />
          </div>
        )}
      </form.Field>

      <form.Field
        name="manufacturer"
        validators={{
          onChange: basicInfoSchema.shape.manufacturer,
        }}
      >
        {(field) => (
          <FormSelect field={field} label="Producent" items={MANUFACTURER_ITEMS} placeholder="Wybierz producenta" />
        )}
      </form.Field>

      <form.Field
        name="category"
        validators={{
          onChange: basicInfoSchema.shape.category,
        }}
      >
        {(field) => (
          <FormSelect field={field} label="Kategoria" items={CATEGORY_ITEMS} placeholder="Wybierz kategorię" />
        )}
      </form.Field>

      <form.Field
        name="features"
        validators={{
          onChange: basicInfoSchema.shape.features,
        }}
      >
        {(field) => <FeaturesSelect field={field} />}
      </form.Field>
    </div>
  );
};
