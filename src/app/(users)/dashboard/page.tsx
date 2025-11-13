import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <main className="flex items-center justify-center h-screen">
        <h1>You are not logged in</h1>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <h1>Welcome, {session.user?.name}!</h1>
    </main>
  );
}
