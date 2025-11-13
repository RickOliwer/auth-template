import { auth } from "@/lib/auth";

import { headers } from "next/headers";

import { Button } from "../ui/button";
import { signOut } from "@/lib/actions/auth";
import { LogOutIcon } from "lucide-react";

export default async function LoginLogoutButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }
  return (
  
  );
}
