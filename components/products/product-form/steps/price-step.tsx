"use client";

import type { ProductFormApi } from "@/hooks/use-product-form";
import { calculateGrossPrice, calculateNetPrice } from "@/lib/price";
import { CURRENCIES, VAT_RATES } from "@/lib/product-options";
import { priceSchema } from "@/lib/validation/product";
import { FormSelect } from "../form-select";
import { FormInput } from "../form-input";

export type PriceSource = "net" | "gross";

interface PriceStepProps {
  form: ProductFormApi;
  lastEditedPrice: PriceSource;
  onLastEditedPriceChange: (source: PriceSource) => void;
}

const VAT_ITEMS = VAT_RATES.map((vat) => ({
  value: vat,
  label: `${vat}%`,
}));

const CURRENCY_ITEMS = CURRENCIES.map((currency) => ({
  value: currency,
  label: currency,
}));

export const PriceStep = ({ form, lastEditedPrice, onLastEditedPriceChange }: PriceStepProps) => {
  const calculatePriceOnVatChange = (vat: number) => {
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
  };

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
      <form.Field
        name="netPrice"
        validators={{
          onChange: priceSchema.shape.netPrice,
        }}
      >
        {(field) => (
          <FormInput
            field={field}
            label="Cena netto"
            type="number"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            onValueChange={(value) => {
              onLastEditedPriceChange("net");
              form.setFieldValue(
                "grossPrice",
                value === null ? null : calculateGrossPrice(value, form.state.values.vat),
              );
            }}
          />
        )}
      </form.Field>

      <form.Field
        name="grossPrice"
        validators={{
          onChange: priceSchema.shape.grossPrice,
        }}
      >
        {(field) => (
          <FormInput
            field={field}
            label="Cena brutto"
            type="number"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            onValueChange={(value) => {
              onLastEditedPriceChange("gross");
              form.setFieldValue("netPrice", value === null ? null : calculateNetPrice(value, form.state.values.vat));
            }}
          />
        )}
      </form.Field>

      <form.Field
        name="vat"
        validators={{
          onChange: priceSchema.shape.vat,
        }}
      >
        {(field) => (
          <FormSelect field={field} label="Stawka VAT" items={VAT_ITEMS} onValueChange={calculatePriceOnVatChange} />
        )}
      </form.Field>

      <form.Field
        name="currency"
        validators={{
          onChange: priceSchema.shape.currency,
        }}
      >
        {(field) => <FormSelect field={field} label="Waluta" items={CURRENCY_ITEMS} placeholder="Wybierz walutę" />}
      </form.Field>
    </div>
  );
};
