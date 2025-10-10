import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./ui/text-field";
import { PasswordField } from "./ui/password-field";
import SubmitButton from "./ui/submit-button";
import { OTPField } from "./ui/otp-field";

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    PasswordField,
    OTPField,
  },
  formComponents: {
    SubmitButton,
  },
});

export default useAppForm;
