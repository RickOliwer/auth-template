import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link
        className={cn(buttonVariants({ variant: "default" }))}
        href="/signup"
      >
        Signup
      </Link>
    </main>
  );
}
