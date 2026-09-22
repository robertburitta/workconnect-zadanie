"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  availabilitySchema,
  basicInfoSchema,
  priceSchema,
  productSchema,
  ValidatedProduct,
} from "@/lib/validation/product";
import { Stepper } from "./steps/stepper";
import { BasicInfoStep } from "./steps/basic-info-step";
import { useProductForm } from "@/hooks/use-product-form";
import { PriceStep, type PriceSource } from "./steps/price-step";
import { AvailabilityStep } from "./steps/availability-step";

interface ProductFormProps {
  onSubmit: (product: ValidatedProduct) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [step, setStep] = useState(1);
  const [lastEditedPrice, setLastEditedPrice] = useState<PriceSource>("net");
  const form = useProductForm();

  async function handleNext() {
    await form.validateAllFields("change");

    if (step === 1) {
      const result = basicInfoSchema.safeParse(form.state.values);

      if (!result.success) {
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      const result = priceSchema.safeParse(form.state.values);

      if (!result.success) {
        return;
      }

      setStep(3);
    }
  }

  function handleBack() {
    setStep((currentStep) => Math.max(1, currentStep - 1));
  }

  async function handleSave() {
    await form.validateAllFields("change");

    const availabilityResult = availabilitySchema.safeParse(form.state.values);

    if (!availabilityResult.success) {
      return;
    }

    const productResult = productSchema.safeParse(form.state.values);

    if (!productResult.success) {
      return;
    }

    onSubmit(productResult.data);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Stepper currentStep={step} />

      <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:flex-none">
        {step === 1 && <BasicInfoStep form={form} />}

        {step === 2 && (
          <PriceStep form={form} lastEditedPrice={lastEditedPrice} onLastEditedPriceChange={setLastEditedPrice} />
        )}

        {step === 3 && <AvailabilityStep form={form} />}
      </main>

      <footer className="mt-auto flex h-17 shrink-0 items-center justify-between border-t border-neutral-200 px-4">
        {step === 1 ? (
          <div />
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="h-9 rounded-full border-neutral-200 px-4 shadow-none"
          >
            <ArrowLeft className="size-4" />
            Wstecz
          </Button>
        )}

        {step < 3 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="h-9 rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700"
          >
            Dalej
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSave}
            className="h-9 rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700"
          >
            Zapisz produkt
          </Button>
        )}
      </footer>
    </div>
  );
}
