"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ProductFormApi } from "@/hooks/use-product-form";
import { calculateGrossPrice, calculateNetPrice } from "@/lib/price";
import { CURRENCIES, VAT_RATES } from "@/lib/product-options";
import { priceSchema } from "@/lib/validation/product";
import { cn } from "@/lib/utils";
import { FieldError } from "../field-error";

export type PriceSource = "net" | "gross";

interface PriceStepProps {
  form: ProductFormApi;
  lastEditedPrice: PriceSource;
  onLastEditedPriceChange: (source: PriceSource) => void;
}

const VAT_ITEMS = VAT_RATES.map((vat) => ({
  value: String(vat),
  label: `${vat}%`,
}));

const CURRENCY_ITEMS = CURRENCIES.map((currency) => ({
  value: currency,
  label: currency,
}));

const inputClassName =
  "h-8 rounded-full border-neutral-200 bg-white px-3 text-sm shadow-none placeholder:text-neutral-500 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600";

export function PriceStep({ form, lastEditedPrice, onLastEditedPriceChange }: PriceStepProps) {
  function getNumberInputValue(value: string, valueAsNumber: number): number | null {
    if (value === "" || Number.isNaN(valueAsNumber)) {
      return null;
    }

    return valueAsNumber;
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
      {/* Cena netto */}
      <form.Field
        name="netPrice"
        validators={{
          onChange: priceSchema.shape.netPrice,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name} className="text-sm font-medium">
              Cena netto
            </Label>

            <Input
              id={field.name}
              name={field.name}
              type="number"
              step="0.01"
              inputMode="decimal"
              value={field.state.value ?? ""}
              placeholder="0.00"
              aria-invalid={field.state.meta.errors.length > 0}
              onBlur={field.handleBlur}
              onChange={(event) => {
                const value = getNumberInputValue(event.target.value, event.target.valueAsNumber);

                field.handleChange(value);
                onLastEditedPriceChange("net");

                if (value === null) {
                  form.setFieldValue("grossPrice", null);
                  return;
                }

                form.setFieldValue("grossPrice", calculateGrossPrice(value, form.state.values.vat));
              }}
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

      {/* Cena brutto */}
      <form.Field
        name="grossPrice"
        validators={{
          onChange: priceSchema.shape.grossPrice,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name} className="text-sm font-medium">
              Cena brutto
            </Label>

            <Input
              id={field.name}
              name={field.name}
              type="number"
              step="0.01"
              inputMode="decimal"
              value={field.state.value ?? ""}
              placeholder="0.00"
              aria-invalid={field.state.meta.errors.length > 0}
              onBlur={field.handleBlur}
              onChange={(event) => {
                const value = getNumberInputValue(event.target.value, event.target.valueAsNumber);

                field.handleChange(value);
                onLastEditedPriceChange("gross");

                if (value === null) {
                  form.setFieldValue("netPrice", null);
                  return;
                }

                form.setFieldValue("netPrice", calculateNetPrice(value, form.state.values.vat));
              }}
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

      {/* VAT */}
      <form.Field
        name="vat"
        validators={{
          onChange: priceSchema.shape.vat,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Stawka VAT</Label>

            <Select
              items={VAT_ITEMS}
              value={String(field.state.value)}
              onValueChange={(value) => {
                if (value === null) {
                  return;
                }

                const vat = Number(value);

                field.handleChange(vat);

                if (lastEditedPrice === "net") {
                  const netPrice = form.state.values.netPrice;

                  if (netPrice !== null) {
                    form.setFieldValue("grossPrice", calculateGrossPrice(netPrice, vat));
                  }
                } else {
                  const grossPrice = form.state.values.grossPrice;

                  if (grossPrice !== null) {
                    form.setFieldValue("netPrice", calculateNetPrice(grossPrice, vat));
                  }
                }
              }}
            >
              <SelectTrigger
                aria-label="Stawka VAT"
                aria-invalid={field.state.meta.errors.length > 0}
                className={cn(
                  "h-8 w-full rounded-full border-neutral-200 px-3 text-sm shadow-none",
                  field.state.meta.errors.length > 0 && "border-red-500",
                )}
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {VAT_ITEMS.map((item) => (
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

      {/* Waluta */}
      <form.Field
        name="currency"
        validators={{
          onChange: priceSchema.shape.currency,
        }}
      >
        {(field) => (
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Waluta</Label>

            <Select
              items={CURRENCY_ITEMS}
              value={field.state.value || null}
              onValueChange={(value) => {
                field.handleChange(value ?? "");
              }}
            >
              <SelectTrigger
                aria-label="Waluta"
                aria-invalid={field.state.meta.errors.length > 0}
                className={cn(
                  "h-8 w-full rounded-full border-neutral-200 px-3 text-sm shadow-none",
                  field.state.meta.errors.length > 0 && "border-red-500",
                )}
              >
                <SelectValue placeholder="Wybierz walutę" />
              </SelectTrigger>

              <SelectContent>
                {CURRENCY_ITEMS.map((item) => (
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
    </div>
  );
}
