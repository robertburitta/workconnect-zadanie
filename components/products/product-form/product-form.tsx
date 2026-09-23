"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
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

export const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [lastEditedPrice, setLastEditedPrice] = useState<PriceSource>("net");
  const form = useProductForm(onSubmit);

  const formSteps = [
    {
      id: "basic-info",
      schema: basicInfoSchema,
      label: "Informacje",
      description: "Dane podstawowe",
      render: () => <BasicInfoStep form={form} />,
    },
    {
      id: "price",
      schema: priceSchema,
      label: "Cena",
      description: "Dane cenowe",
      render: () => (
        <PriceStep form={form} lastEditedPrice={lastEditedPrice} onLastEditedPriceChange={setLastEditedPrice} />
      ),
    },
    {
      id: "availability",
      schema: availabilitySchema,
      label: "Dostępność",
      description: "Stany magazynowe",
      render: () => <AvailabilityStep form={form} />,
    },
  ];

  const currentStep = formSteps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === formSteps.length - 1;

  const findFirstInvalidStep = () => {
    return formSteps.findIndex(({ schema }) => !schema.safeParse(form.state.values).success);
  };

  const handleNext = async () => {
    await form.validateAllFields("change");

    const result = currentStep.schema.safeParse(form.state.values);

    if (!result.success) {
      return;
    }

    setStepIndex((currentIndex) => Math.min(currentIndex + 1, formSteps.length - 1));
  };

  const handleBack = () => {
    setStepIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const handleSave = async () => {
    await form.validateAllFields("change");

    const productResult = productSchema.safeParse(form.state.values);

    if (!productResult.success) {
      const invalidStepIndex = findFirstInvalidStep();

      if (invalidStepIndex !== -1) {
        setStepIndex(invalidStepIndex);
      }

      return;
    }

    await form.handleSubmit();
  };

  const handleFormSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLastStep) {
      await handleSave();
      return;
    }

    await handleNext();
  };

  return (
    <form noValidate onSubmit={handleFormSubmit} className="flex min-h-0 flex-1 flex-col">
      <Stepper steps={formSteps} currentStepIndex={stepIndex} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">{currentStep.render()}</div>

      <footer className="mt-auto flex h-17 shrink-0 items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-4">
        {isFirstStep ? (
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

        <Button type="submit" className="h-9 rounded-full bg-blue-600 px-4 text-white hover:bg-blue-700">
          {isLastStep ? (
            "Zapisz produkt"
          ) : (
            <>
              Dalej
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </footer>
    </form>
  );
};
