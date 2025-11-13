"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/actions/auth";
import Link from "next/link";
import useAppForm from "@/components/form/useAppForm";
import { SigninFormData, signinSchema } from "@/lib/schemas/auth";
import { useState } from "react";

export default function SigninForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(errorMessage);
  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } as SigninFormData,
    validators: {
      onChange: signinSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      try {
        const validatedData = signinSchema.parse(value);
        await signIn(validatedData.email, validatedData.password);
      } catch (error: unknown) {
        let errorMessage = "An error occurred. Please try again.";
        if (
          error &&
          typeof error === "object" &&
          "statusCode" in error &&
          error.statusCode === 422
        ) {
          console.log("if ", error);
          errorMessage =
            (error as { body?: { message?: string } }).body?.message ||
            (error as { message?: string }).message ||
            "Invalid email or password.";
        } else if (error instanceof Error) {
          console.log("else if", error.message);
          errorMessage = error.message;
        }
        setErrorMessage(errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-6"
            >
              <form.AppField name="email">
                {(field) => (
                  <field.TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                )}
              </form.AppField>

              <form.AppField name="password">
                {(field) => (
                  <field.PasswordField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Create a strong password"
                  />
                )}
              </form.AppField>
              {/* Display form-level error */}
              {errorMessage && (
                <div className="rounded-md bg-destructive/15 p-3">
                  <p className="text-sm font-medium text-destructive">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="">
                <form.AppForm>
                  <form.SubmitButton className="w-full">
                    {" "}
                    {form.state.isSubmitting ? "Signing in..." : "Sign in"}
                  </form.SubmitButton>
                </form.AppForm>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
