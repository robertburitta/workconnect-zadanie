import { useId, type ComponentProps } from "react";
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import { cn } from "@/lib/utils";
import { FieldError } from "./field-error";
import type { FormField } from "@/types/form-field";

type SelectValue = string | number | null;

type FormSelectItem<TValue extends SelectValue> = {
  value: TValue;
  label: string;
  disabled?: boolean;
};

type FormSelectProps<TValue extends SelectValue> = Pick<
  ComponentProps<typeof Select>,
  "disabled" | "required" | "readOnly" | "autoComplete"
> & {
  field: FormField<TValue>;
  label: string;
  items: readonly FormSelectItem<TValue>[];
  placeholder?: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
  "aria-describedby"?: string;
  onValueChange?: (value: TValue) => void;
};

export const FormSelect = <TValue extends string | number | null>({
  field,
  label,
  items,
  placeholder,
  id: providedId,
  className,
  wrapperClassName,
  "aria-describedby": describedBy,
  onValueChange,
  ...selectProps
}: FormSelectProps<TValue>) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const invalid = !field.state.meta.isValid;
  const value = items.some((item) => item.value === field.state.value) ? field.state.value : null;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <Label htmlFor={id} className="text-sm font-medium leading-5">
        {label}
      </Label>

      <Select<TValue>
        {...selectProps}
        name={field.name}
        items={items}
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue === null) return;
          field.handleChange(nextValue);
          onValueChange?.(nextValue);
        }}
      >
        <SelectTrigger
          id={id}
          onBlur={field.handleBlur}
          aria-describedby={[describedBy, invalid ? errorId : undefined].filter(Boolean).join(" ") || undefined}
          aria-invalid={invalid}
          className={cn(
            "h-8 w-full rounded-full border-neutral-200 px-3 mb-0 text-sm shadow-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600",
            className,
            invalid && "border-red-500",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {items.map((item) => (
            <SelectItem key={`${typeof item.value}:${item.value}`} value={item.value} disabled={item.disabled}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldError id={errorId} errors={field.state.meta.errors} />
    </div>
  );
};
