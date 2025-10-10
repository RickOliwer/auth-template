import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SigninForm from "@/components/auth/signin/form";
import DashboardClientComponent from "./(users)/dashboard/client-component";

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
      <DashboardClientComponent />
      <SigninForm />
    </main>
  );
}
