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
    const data = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/dashboard");
  } catch (error: any) {
    if (error.statusCode === 403) {
      // Note: statusCode, not status
      await auth.api.sendVerificationOTP({
        body: {
          email: email, // required
          type: "email-verification", // required
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
