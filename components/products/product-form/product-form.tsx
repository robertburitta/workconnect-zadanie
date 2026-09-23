"use client";

import { useRef, useState } from "react";
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
  const form = useProductForm(onSubmit);
  const formElement = useRef<HTMLFormElement>(null);

  function focusFirstError() {
    formElement.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }

  async function handleNext() {
    await form.validateAllFields("change");

    if (step === 1) {
      const result = basicInfoSchema.safeParse(form.state.values);

      if (!result.success) {
        focusFirstError();
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      const result = priceSchema.safeParse(form.state.values);

      if (!result.success) {
        focusFirstError();
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
      focusFirstError();
      return;
    }

    const productResult = productSchema.safeParse(form.state.values);

    if (!productResult.success) {
      setStep(basicInfoSchema.safeParse(form.state.values).success ? 2 : 1);
      await form.handleSubmit();
      focusFirstError();
      return;
    }

    await form.handleSubmit();
  }

  return (
    <form
      ref={formElement}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();

        if (step < 3) {
          void handleNext();
        } else {
          void handleSave();
        }
      }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <Stepper currentStep={step} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
        {step === 1 && <BasicInfoStep form={form} />}

        {step === 2 && (
          <PriceStep form={form} lastEditedPrice={lastEditedPrice} onLastEditedPriceChange={setLastEditedPrice} />
        )}

        {step === 3 && <AvailabilityStep form={form} />}
      </div>

      <footer className="mt-auto flex min-h-17 shrink-0 items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-4">
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
          <Button type="submit" className="h-9 rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700">
            Dalej
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" className="h-9 rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700">
            Zapisz produkt
          </Button>
        )}
      </footer>
    </form>
  );
}
