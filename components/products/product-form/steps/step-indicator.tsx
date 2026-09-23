import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  number: number;
  completed: boolean;
  active: boolean;
  compact?: boolean;
}

export const StepIndicator = ({ number, completed, active, compact = false }: StepIndicatorProps) => {
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-full border text-sm font-medium",
        !compact && "mb-3",
        completed || active
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-neutral-200 bg-neutral-100 text-neutral-500",
      )}
    >
      {completed ? <Check className="size-4" strokeWidth={2} /> : number}
    </div>
  );
};
