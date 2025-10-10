// src/app/signup/page.tsx
"use client";

import { TextField } from "@/components/form/ui/text-field";
import { Button } from "@/components/ui/button";
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

export default function SignupForm() {
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
      try {
        // Validate with Zod before submission
        const validatedData = signupSchema.parse(value);
        await signUp(
          validatedData.email,
          validatedData.password,
          validatedData.name
        );
      } catch (error) {
        console.error("Signup error:", error);
        // Re-throw to prevent form submission success
        throw error;
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
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

              <Button
                type="submit"
                className="w-full"
                disabled={form.state.isSubmitting || !form.state.canSubmit}
              >
                {form.state.isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth"
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
