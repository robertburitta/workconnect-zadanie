import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
}

const STEPS = [
  {
    number: 1,
    label: "Informacje",
    description: "Dane podstawowe",
  },
  {
    number: 2,
    label: "Cena",
    description: "Dane cenowe",
  },
  {
    number: 3,
    label: "Dostępność",
    description: "Stany magazynowe",
  },
];

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div
      aria-label={`Krok ${currentStep} z 3: ${STEPS[currentStep - 1].label}`}
      className="shrink-0 border-b border-neutral-200 px-4 py-3 max-sm:mx-4 max-sm:px-0 max-sm:py-6"
    >
      {/* Mobile */}
      <div className="grid grid-cols-3 gap-4 sm:hidden">
        {STEPS.map((step) => {
          const completed = currentStep > step.number;
          const active = currentStep === step.number;

          return (
            <div
              key={step.number}
              aria-current={active ? "step" : undefined}
              className="flex min-w-0 flex-col items-start"
            >
              <div
                className={cn(
                  "mb-3 flex size-8 items-center justify-center rounded-full border text-sm font-medium",
                  completed || active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-neutral-200 bg-neutral-100 text-neutral-500",
                )}
              >
                {completed ? <Check className="size-4" strokeWidth={2} /> : step.number}
              </div>

              <span
                className={cn("text-sm font-medium", completed || active ? "text-neutral-950" : "text-neutral-500")}
              >
                {step.label}
              </span>

              <span className="mt-0.5 text-xs leading-4 text-neutral-500">{step.description}</span>
            </div>
          );
        })}
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-[146px_minmax(16px,1fr)_146px_minmax(16px,1fr)_198px] items-center sm:grid">
        {STEPS.map((step, index) => {
          const completed = currentStep > step.number;
          const active = currentStep === step.number;

          return (
            <div key={step.number} className="contents">
              <div aria-current={active ? "step" : undefined} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                    completed || active
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-neutral-200 bg-neutral-100 text-neutral-500",
                  )}
                >
                  {completed ? <Check className="size-4" strokeWidth={2} /> : step.number}
                </div>

                <div className="min-w-0">
                  <div
                    className={cn("text-sm font-medium", completed || active ? "text-neutral-950" : "text-neutral-500")}
                  >
                    {step.label}
                  </div>

                  <div className="mt-0.5 text-xs text-neutral-500">{step.description}</div>
                </div>
              </div>

              {index < STEPS.length - 1 && (
                <div className={cn("mx-4 h-px", currentStep > step.number ? "bg-blue-600" : "bg-neutral-200")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
