"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, MANUFACTURERS, PRODUCT_FEATURES } from "@/lib/product-options";
import { basicInfoSchema } from "@/lib/validation/product";
import { cn } from "@/lib/utils";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { FieldError } from "../field-error";

interface BasicInfoStepProps {
  form: ProductFormApi;
}

const inputClassName =
  "h-8 rounded-full border-neutral-200 bg-white px-3 text-sm shadow-none placeholder:text-neutral-500 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600";

const MANUFACTURER_ITEMS = MANUFACTURERS.map((value) => ({
  value,
  label: value,
}));

const CATEGORY_ITEMS = CATEGORIES.map((value) => ({
  value,
  label: value,
}));

export function BasicInfoStep({ form }: BasicInfoStepProps) {
  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
      {/* Nazwa */}
      <form.Field
        name="name"
        validators={{
          onChange: basicInfoSchema.shape.name,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name} className="text-sm font-medium">
              Nazwa produktu
            </Label>

            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="np. MacBook Pro 14"
              aria-invalid={field.state.meta.errors.length > 0}
              className={cn(
                inputClassName,
                field.state.meta.errors.length > 0 &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
              )}
            />

            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* SKU */}
      <form.Field
        name="sku"
        validators={{
          onChange: basicInfoSchema.shape.sku,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name} className="text-sm font-medium">
              SKU produktu
            </Label>

            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              placeholder="np. MBP14M3PRO"
              aria-invalid={field.state.meta.errors.length > 0}
              className={cn(
                inputClassName,
                field.state.meta.errors.length > 0 &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
              )}
            />

            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Opis */}
      <form.Field
        name="description"
        validators={{
          onChange: basicInfoSchema.shape.description.unwrap(),
        }}
      >
        {(field) => (
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor={field.name} className="text-sm font-medium">
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

      {/* Producent */}
      <form.Field
        name="manufacturer"
        validators={{
          onChange: basicInfoSchema.shape.manufacturer,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Producent</Label>

            <Select
              items={MANUFACTURER_ITEMS}
              value={field.state.value || null}
              onValueChange={(value) => {
                field.handleChange(value ?? "");
              }}
            >
              <SelectTrigger
                aria-label="Producent"
                aria-invalid={field.state.meta.errors.length > 0}
                className={cn(
                  "h-8 w-full rounded-full border-neutral-200 px-3 text-sm shadow-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600",
                  field.state.meta.errors.length > 0 && "border-red-500",
                )}
              >
                <SelectValue placeholder="Wybierz producenta" />
              </SelectTrigger>

              <SelectContent>
                {MANUFACTURER_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Kategoria */}
      <form.Field
        name="category"
        validators={{
          onChange: basicInfoSchema.shape.category,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Kategoria</Label>

            <Select
              items={CATEGORY_ITEMS}
              value={field.state.value || null}
              onValueChange={(value) => {
                field.handleChange(value ?? "");
              }}
            >
              <SelectTrigger
                aria-label="Kategoria"
                aria-invalid={field.state.meta.errors.length > 0}
                className={cn(
                  "h-8 w-full rounded-full border-neutral-200 px-3 text-sm shadow-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600",
                  field.state.meta.errors.length > 0 && "border-red-500",
                )}
              >
                <SelectValue placeholder="Wybierz kategorię" />
              </SelectTrigger>

              <SelectContent>
                {CATEGORY_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      {/* Cechy */}
      <form.Field
        name="features"
        validators={{
          onChange: basicInfoSchema.shape.features,
        }}
      >
        {(field) => {
          function toggleFeature(feature: string) {
            const isSelected = field.state.value.includes(feature);

            if (isSelected) {
              field.handleChange(field.state.value.filter((value) => value !== feature));
              return;
            }

            field.handleChange([...field.state.value, feature]);
          }

          return (
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-sm font-medium">Cechy produktu</Label>

              <div className="flex flex-wrap gap-2">
                {PRODUCT_FEATURES.map((feature) => {
                  const selected = field.state.value.includes(feature);

                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={cn(
                        "h-6 rounded-full border px-2 text-xs transition-colors",
                        selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100",
                      )}
                    >
                      {feature}
                    </button>
                  );
                })}
              </div>

              <FieldError errors={field.state.meta.errors} />
            </div>
          );
        }}
      </form.Field>
    </div>
  );
}
