import { useId, type ComponentProps } from "react";
import { Input, Label } from "@/components/ui";
import { cn, getNumberInputValue } from "@/lib/utils";
import { FieldError } from "./field-error";
import type { FormField } from "@/types/form-field";

type CommonProps = Omit<
  ComponentProps<typeof Input>,
  "name" | "type" | "value" | "defaultValue" | "onChange" | "onBlur" | "aria-invalid"
> & {
  label: string;
  wrapperClassName?: string;
};

type FormInputProps = CommonProps &
  (
    | {
        type?: "text" | "email" | "password" | "search" | "tel" | "url";
        field: FormField<string>;
        onValueChange?: (value: string) => void;
      }
    | {
        type: "number";
        field: FormField<number | null>;
        onValueChange?: (value: number | null) => void;
      }
  );

export const FormInput = (props: FormInputProps) => {
  const generatedId = useId();
  const {
    field,
    label,
    type,
    id = generatedId,
    className,
    wrapperClassName,
    "aria-describedby": describedBy,
    onValueChange,
    ...inputProps
  } = props;
  const invalid = !field.state.meta.isValid;
  const errorId = `${id}-error`;

  const handleChange: NonNullable<ComponentProps<typeof Input>["onChange"]> = (event) => {
    if (type === "number") {
      const value = getNumberInputValue(event.target.value, event.target.valueAsNumber);

      field.handleChange(value);
      onValueChange?.(value);
    } else {
      field.handleChange(event.target.value);
      onValueChange?.(event.target.value);
    }
  };

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <Label htmlFor={id} className="text-sm font-medium leading-5">
        {label}
      </Label>

      <Input
        {...inputProps}
        id={id}
        name={field.name}
        type={type ?? "text"}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={handleChange}
        aria-describedby={[describedBy, invalid ? errorId : undefined].filter(Boolean).join(" ") || undefined}
        aria-invalid={invalid}
        className={cn(className, invalid && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500")}
      />

      <FieldError id={errorId} errors={field.state.meta.errors} />
    </div>
  );
};
