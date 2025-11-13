// src/app/signup/page.tsx
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/actions/auth";
import Link from "next/link";
import useAppForm from "@/components/form/useAppForm";
import { SignupFormData, signupSchema } from "@/lib/schemas/auth";
import { useState } from "react";

export default function SignupForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as SignupFormData,
    validators: {
      onChange: signupSchema,
    },
    onSubmit: async ({ value }) => {
      // Clear any previous errors
      setErrorMessage(null);

      try {
        const validatedData = signupSchema.parse(value);
        await signUp(
          validatedData.email,
          validatedData.password,
          validatedData.name
        );
      } catch (error: unknown) {
        // Handle APIError from Better Auth
        let errorMessage = "An error occurred. Please try again.";

        if (
          error &&
          typeof error === "object" &&
          "statusCode" in error &&
          error.statusCode === 422
        ) {
          // Extract error message from the error object
          errorMessage =
            (error as { body?: { message?: string } }).body?.message ||
            (error as { message?: string }).message ||
            "User already exists. Use another email.";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        // Set the error on the email field using setFieldMeta
        form.setFieldMeta("email", (prev) => ({
          ...prev,
          isTouched: true,
          errors: [{ message: errorMessage }],
        }));

        // Also set as form-level error for general display
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
              Create your account
            </CardTitle>
            <CardDescription>
              Sign up to get started with your account
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
              <form.AppField name="name">
                {(field) => (
                  <field.TextField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                )}
              </form.AppField>

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

              <form.AppField name="confirmPassword">
                {(field) => (
                  <field.PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
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
                    {form.state.isSubmitting
                      ? "Creating Account..."
                      : "Create Account"}
                  </form.SubmitButton>
                </form.AppForm>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
