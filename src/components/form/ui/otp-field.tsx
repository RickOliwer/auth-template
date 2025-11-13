import React from "react";
import { Label } from "@/components/ui/label";

import { useFieldContext } from "../useAppForm";
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { InputOTPGroup } from "@/components/ui/input-otp";
import { FieldErrors } from "@/components/form/ui/field-error";

export const OTPField = () => {
  const field = useFieldContext<string>();

  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <Label htmlFor={field.name} className="sr-only">
          Verification Code
        </Label>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            id={field.name}
            aria-invalid={
              field.state.meta.isTouched && field.state.meta.errors.length > 0
            }
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            onBlur={field.handleBlur}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <FieldErrors meta={field.state.meta} />
      </div>
    </div>
  );
};
