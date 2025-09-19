"use client";

import useAppForm from "@/components/form/useAppForm";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1),
  email: z.email(),
  lastName: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AuthClient() {
  const defaultLoginValues: FormSchema = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const form = useAppForm({
    defaultValues: defaultLoginValues,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value }) => {
      await new Promise((res) => setTimeout(res, 1000));
      console.log("Form submitted:", value);

      form.reset();
    },
  });

  return (
    <form.AppField name="email">
      {(field) => <field.TextField label="Email" name="email" type="text" />}
    </form.AppField>
  );
}
