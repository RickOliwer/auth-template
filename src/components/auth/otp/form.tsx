"use client";

import useAppForm from "@/components/form/useAppForm";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

import z from "zod";
import RequestNewCode from "./request-new-code";
import { useRouter } from "next/navigation";

type OTPFormProps = {
  email: string;
};

const otpSchema = z.object({
  email: z.email(),
  otp: z.string().min(6, "OTP is required"),
});

type OTPFormData = z.infer<typeof otpSchema>;
export default function OTPForm(props: OTPFormProps) {
  const router = useRouter();
  const defaultValues = {
    email: props.email,
    otp: "",
  } as OTPFormData;
  const form = useAppForm({
    defaultValues: defaultValues as OTPFormData,
    validators: {
      onChange: otpSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.emailOtp.verifyEmail({
          email: value.email,
          otp: value.otp,
        });
        if (error) {
          form.reset();
          throw error;
        }
        if (data) {
          console.log(data);
          form.reset();
          router.push("/");
        }
      } catch (error) {
        throw error;
      }
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.AppField name="otp">
          {(field) => <field.OTPField />}
        </form.AppField>
        <form.AppForm>
          <form.SubmitButton className="w-full">
            {" "}
            {form.state.isSubmitting ? "Verifying OTP..." : "Verify OTP"}
          </form.SubmitButton>
        </form.AppForm>
      </form>
      <RequestNewCode email={props.email} />
    </div>
  );
}
