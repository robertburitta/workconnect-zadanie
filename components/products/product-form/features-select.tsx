import type { FormField } from "@/types/form-field";
import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { PRODUCT_FEATURES } from "@/lib/product-options";
import { FieldError } from "./field-error";

interface FeaturesSelectProps {
  field: FormField<string[]>;
}

export const FeaturesSelect = ({ field }: FeaturesSelectProps) => {
  const toggleFeature = (feature: string) => {
    const isSelected = field.state.value.includes(feature);

    if (isSelected) {
      field.handleChange(field.state.value.filter((value) => value !== feature));
      return;
    }

    field.handleChange([...field.state.value, feature]);
  };

  return (
    <div
      className="min-w-0 space-y-2 sm:col-span-2"
      aria-describedby={!field.state.meta.isValid ? "features-error" : undefined}
    >
      <Label className="text-sm font-medium leading-5">Cechy produktu</Label>

      <div className="flex flex-wrap gap-2">
        {PRODUCT_FEATURES.map((feature) => {
          const selected = field.state.value.includes(feature);

          return (
            <button
              key={feature}
              type="button"
              role="checkbox"
              aria-checked={selected}
              aria-invalid={!field.state.meta.isValid}
              aria-describedby={!field.state.meta.isValid ? "features-error" : undefined}
              onClick={() => toggleFeature(feature)}
              className={cn(
                "h-6 rounded-full border px-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
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

      <FieldError id={`${field.name}-error`} errors={field.state.meta.errors} />
    </div>
  );
};
