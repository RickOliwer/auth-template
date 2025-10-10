"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export async function signUp(email: string, password: string, name: string) {
  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  redirect(`/auth/verify-email?email=${encodeURIComponent(email)}`);
}

export async function signIn(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/dashboard");
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "statusCode" in error &&
      error.statusCode === 403
    ) {
      await auth.api.sendVerificationOTP({
        body: {
          email: email,
          type: "email-verification",
        },
      });
      redirect(`/auth/verify-email?email=${encodeURIComponent(email)}`);
    }

    throw error;
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
