import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SigninForm from "@/components/auth/signin/form";
import DashboardClientComponent from "./(users)/dashboard/client-component";

export default function Home() {
  return (
    <main>
      <SigninForm />
    </main>
  );
}
