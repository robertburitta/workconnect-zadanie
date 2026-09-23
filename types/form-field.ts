export type FormField<TValue> = {
  name: string;
  state: {
    value: TValue;
    meta: { isValid: boolean; errors: unknown[] };
  };
  handleBlur: () => void;
  handleChange: (value: TValue) => void;
};
