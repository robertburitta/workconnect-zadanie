interface FieldErrorProps {
  id?: string;
  errors: unknown[];
}

function getErrorMessage(error: unknown): string | null {
  if (!error) {
    return null;
  }

  if (typeof error === "string") {
    return error;
  }

  if (Array.isArray(error)) {
    for (const item of error) {
      const message = getErrorMessage(item);

      if (message) {
        return message;
      }
    }

    return null;
  }

  if (typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return null;
}

export function FieldError({ id, errors }: FieldErrorProps) {
  const message = getErrorMessage(errors);

  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}
