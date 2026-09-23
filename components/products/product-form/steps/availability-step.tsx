"use client";

import { FormCheckbox } from "../form-checkbox";
import { FormSwitch } from "../form-switch";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { maxQuantitySchema, minQuantitySchema, stockSchema } from "@/lib/validation/product";
import { FormInput } from "../form-input";

interface AvailabilityStepProps {
  form: ProductFormApi;
}

export const AvailabilityStep = ({ form }: AvailabilityStepProps) => {
  return (
    <div>
      <form.Field name="available">
        {(field) => (
          <FormSwitch field={field} label="Produkt jest dostępny" wrapperClassName="border-b border-neutral-200 pb-4" />
        )}
      </form.Field>

      <form.Field name="limited">
        {(field) => (
          <>
            <FormCheckbox
              field={field}
              label="Produkt limitowany"
              wrapperClassName="border-b border-neutral-200 py-4"
              onValueChange={(checked) => {
                if (!checked) {
                  form.resetField("stock");
                }
              }}
            />

            {field.state.value && (
              <form.Field
                name="stock"
                validators={{
                  onChange: stockSchema,
                }}
              >
                {(stockField) => (
                  <div className="border-b border-neutral-200 py-4">
                    <FormInput
                      field={stockField}
                      label="Ilość na magazynie"
                      type="number"
                      step={1}
                      inputMode="numeric"
                      min={0}
                      placeholder="0"
                      wrapperClassName="sm:max-w-[calc(50%-8px)]"
                    />
                  </div>
                )}
              </form.Field>
            )}
          </>
        )}
      </form.Field>

      <section className="pt-4">
        <h3 className="text-base font-medium">Limity koszyka</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field
            name="minQuantity"
            validators={{
              onChange: minQuantitySchema,
            }}
          >
            {(field) => <FormInput field={field} label="Minimalna ilość" type="number" step={1} inputMode="numeric" />}
          </form.Field>

          <form.Field
            name="maxQuantity"
            validators={{
              onChangeListenTo: ["minQuantity"],
              onChange: ({ value, fieldApi }) => {
                const schemaResult = maxQuantitySchema.safeParse(value);

                if (!schemaResult.success) {
                  return schemaResult.error.issues[0]?.message;
                }

                const maxQuantity = schemaResult.data;
                const minQuantity = fieldApi.form.getFieldValue("minQuantity");

                if (minQuantity !== null && maxQuantity < minQuantity) {
                  return "Maksymalna ilość nie może być mniejsza od minimalnej";
                }

                return undefined;
              },
            }}
          >
            {(field) => <FormInput field={field} label="Maksymalna ilość" type="number" step={1} inputMode="numeric" />}
          </form.Field>
        </div>
      </section>
    </div>
  );
};
