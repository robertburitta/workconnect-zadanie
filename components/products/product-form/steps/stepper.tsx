import { cn } from "@/lib/utils";
import { StepIndicator } from "./step-indicator";

interface StepperStep {
  id: string;
  label: string;
  description: string;
}

interface StepperProps {
  steps: StepperStep[];
  currentStepIndex: number;
}

export const Stepper = ({ steps, currentStepIndex }: StepperProps) => {
  const currentStep = steps[currentStepIndex];

  if (!currentStep) {
    return null;
  }

  return (
    <div
      aria-label={`Krok ${currentStepIndex + 1} z ${steps.length}: ${currentStep.label}`}
      className="shrink-0 h-15.5 border-b border-neutral-200 px-4 py-3 max-sm:h-33 max-sm:mx-4 max-sm:px-0 max-sm:py-6"
    >
      <div className="grid grid-cols-3 gap-4 sm:hidden">
        {steps.map((step, index) => {
          const completed = index < currentStepIndex;
          const active = index === currentStepIndex;

          return (
            <div key={step.id} aria-current={active ? "step" : undefined} className="flex min-w-0 flex-col items-start">
              <StepIndicator number={index + 1} completed={completed} active={active} />

              <span
                className={cn(
                  "block text-sm font-medium",
                  completed || active ? "text-neutral-950" : "text-neutral-500",
                )}
              >
                {step.label}
              </span>

              <span className="mt-0.5 text-xs leading-4 text-neutral-500 whitespace-nowrap">{step.description}</span>
            </div>
          );
        })}
      </div>

      <div className="hidden grid-cols-[146px_minmax(16px,1fr)_146px_minmax(16px,1fr)_198px] items-center sm:grid">
        {steps.map((step, index) => {
          const completed = index < currentStepIndex;
          const active = index === currentStepIndex;

          return (
            <div key={step.id} className="contents">
              <div aria-current={active ? "step" : undefined} className="flex items-center gap-3">
                <StepIndicator number={index + 1} completed={completed} active={active} compact />

                <div className="min-w-0">
                  <div
                    className={cn("text-sm font-medium", completed || active ? "text-neutral-950" : "text-neutral-500")}
                  >
                    {step.label}
                  </div>

                  <div className="mt-0.5 text-xs text-neutral-500 whitespace-nowrap">{step.description}</div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className={cn("mx-4 h-px", index < currentStepIndex ? "bg-blue-600" : "bg-neutral-200")}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
