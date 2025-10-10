import { createFormHookContexts, createFormHook } from "@tanstack/react-form";
import { TextField } from "./ui/text-field";
import { PasswordField } from "./ui/password-field";
import SubmitButton from "./ui/submit-button";

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    PasswordField,
  },
  formComponents: {
    SubmitButton,
  },
});

export default useAppForm;
