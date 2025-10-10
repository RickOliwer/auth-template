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
      <div>
        <h1>You are not logged in</h1>
        <Link className={cn(buttonVariants({ variant: "default" }))} href="/">
          Login
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }))}
          href="/signup"
        >
          Signup
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <form action={signOut}>
        <Button type="submit">Signout</Button>
      </form>
    </div>
  );
}
