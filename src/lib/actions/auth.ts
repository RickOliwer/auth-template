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

  redirect("/");
}

export async function signIn(email: string, password: string) {
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect("/dashboard");
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
