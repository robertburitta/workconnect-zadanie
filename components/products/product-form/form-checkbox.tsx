import { useId, type ComponentProps } from "react";
import { Checkbox, Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { FieldError } from "./field-error";
import type { FormField } from "../../../types/form-field";

type FormCheckboxProps = Pick<ComponentProps<typeof Checkbox>, "disabled" | "required"> & {
  field: FormField<boolean>;
  label: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
  "aria-describedby"?: string;
  onValueChange?: (value: boolean) => void;
};

export const FormCheckbox = ({
  field,
  label,
  id: providedId,
  className,
  wrapperClassName,
  "aria-describedby": describedBy,
  onValueChange,
  ...controlProps
}: FormCheckboxProps) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const invalid = !field.state.meta.isValid;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <div className="flex items-center gap-2">
        <Checkbox
          {...controlProps}
          id={id}
          name={field.name}
          checked={field.state.value}
          onBlur={field.handleBlur}
          onCheckedChange={(checked) => {
            field.handleChange(checked);
            onValueChange?.(checked);
          }}
          aria-describedby={[describedBy, invalid ? errorId : undefined].filter(Boolean).join(" ") || undefined}
          aria-invalid={invalid}
          className={cn(
            "border-neutral-300 data-checked:border-blue-600 data-checked:bg-blue-600",
            className,
            invalid && "border-red-500",
          )}
        />
        <Label htmlFor={id} className="cursor-pointer text-sm font-medium leading-5">
          {label}
        </Label>
      </div>
      <FieldError id={errorId} errors={field.state.meta.errors} />
    </div>
  );
};
