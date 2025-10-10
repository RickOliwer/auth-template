// src/components/form/ui/password-field.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/form/ui/password-input";
import { FieldErrors } from "@/components/form/ui/field-error";
import { useFieldContext } from "../useAppForm";

type PasswordFieldProps = {
  label: string;
  labelHidden?: boolean;
  disablFieldError?: boolean;
  showToggle?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordField = ({
  label,
  labelHidden = false,
  disablFieldError = false,
  showToggle = true,
  ...inputProps
}: PasswordFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <Label htmlFor={field.name} className={labelHidden ? "sr-only" : ""}>
          {label}
        </Label>
        <PasswordInput
          id={field.name}
          aria-invalid={
            field.state.meta.isTouched && field.state.meta.errors.length > 0
          }
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          showToggle={showToggle}
          {...inputProps}
        />
      </div>
      {!disablFieldError && <FieldErrors meta={field.state.meta} />}
    </div>
  );
};
