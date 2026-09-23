"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { maxQuantitySchema, minQuantitySchema, stockSchema } from "@/lib/validation/product";
import { cn, getNumberInputValue } from "@/lib/utils";
import { FieldError } from "../field-error";

interface AvailabilityStepProps {
  form: ProductFormApi;
}

const inputClassName =
  "h-8 rounded-full border-neutral-200 bg-white px-3 text-sm shadow-none placeholder:text-neutral-500 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600";

export function AvailabilityStep({ form }: AvailabilityStepProps) {
  return (
    <div>
      {/* Dostępność */}
      <form.Field name="available">
        {(field) => (
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-4">
            <Switch
              id={field.name}
              name={field.name}
              checked={field.state.value}
              onCheckedChange={field.handleChange}
              className="data-checked:bg-blue-600"
            />

            <Label htmlFor={field.name} className="cursor-pointer text-sm font-medium leading-5">
              Produkt jest dostępny
            </Label>
          </div>
        )}
      </form.Field>

      {/* Produkt limitowany */}
      <form.Field name="limited">
        {(field) => (
          <>
            <div className="flex items-center gap-2 border-b border-neutral-200 py-4">
              <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onCheckedChange={(checked) => {
                  field.handleChange(checked);

                  if (!checked) {
                    form.resetField("stock");
                  }
                }}
                className="border-neutral-300 data-checked:border-blue-600 data-checked:bg-blue-600"
              />

              <Label htmlFor={field.name} className="cursor-pointer text-sm font-medium leading-5">
                Produkt limitowany
              </Label>
            </div>

            {/* Stan magazynowy */}
            {field.state.value && (
              <form.Field
                name="stock"
                validators={{
                  onChange: stockSchema,
                }}
              >
                {(stockField) => (
                  <div className="border-b border-neutral-200 py-4">
                    <div className="space-y-2 sm:max-w-[calc(50%-8px)]">
                      <Label htmlFor={stockField.name} className="text-sm font-medium leading-5">
                        Ilość na magazynie
                      </Label>

                      <Input
                        id={stockField.name}
                        name={stockField.name}
                        type="number"
                        min={0}
                        step={1}
                        inputMode="numeric"
                        value={stockField.state.value ?? ""}
                        placeholder="0"
                        aria-describedby={stockField.state.meta.errors.length > 0 ? `${stockField.name}-error` : undefined}
                        aria-invalid={stockField.state.meta.errors.length > 0}
                        onBlur={stockField.handleBlur}
                        onChange={(event) => {
                          const value = getNumberInputValue(event.target.value, event.target.valueAsNumber);

                          stockField.handleChange(value);
                        }}
                        className={cn(
                          inputClassName,
                          stockField.state.meta.errors.length > 0 &&
                            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
                        )}
                      />

                      <FieldError id={`${stockField.name}-error`} errors={stockField.state.meta.errors} />
                    </div>
                  </div>
                )}
              </form.Field>
            )}
          </>
        )}
      </form.Field>

      {/* Limity koszyka */}
      <section className="pt-5">
        <h3 className="text-base font-medium">Limity koszyka</h3>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Minimum */}
          <form.Field
            name="minQuantity"
            validators={{
              onChange: minQuantitySchema,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium leading-5">
                  Minimalna ilość
                </Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step={1}
                  inputMode="numeric"
                  value={field.state.value ?? ""}
                  aria-describedby={field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined}
                  aria-invalid={field.state.meta.errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = getNumberInputValue(event.target.value, event.target.valueAsNumber);

                    field.handleChange(value);
                  }}
                  className={cn(
                    inputClassName,
                    field.state.meta.errors.length > 0 &&
                      "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
                  )}
                />

                <FieldError id={`${field.name}-error`} errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>

          {/* Maximum */}
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
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium leading-5">
                  Maksymalna ilość
                </Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  step={1}
                  inputMode="numeric"
                  value={field.state.value ?? ""}
                  aria-describedby={field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined}
                  aria-invalid={field.state.meta.errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = getNumberInputValue(event.target.value, event.target.valueAsNumber);

                    field.handleChange(value);
                  }}
                  className={cn(
                    inputClassName,
                    field.state.meta.errors.length > 0 &&
                      "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
                  )}
                />

                <FieldError id={`${field.name}-error`} errors={field.state.meta.errors} />
              </div>
            )}
          </form.Field>
        </div>
      </section>
    </div>
  );
}
