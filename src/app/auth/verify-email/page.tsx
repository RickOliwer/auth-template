import OTPForm from "@/components/auth/otp/form";

import { notFound } from "next/navigation";

type VerifyEmailPageProps = {
  searchParams: Promise<{
    email: string;
  }>;
};

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const { email } = await props.searchParams;

  if (!email) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <OTPForm email={email} />
    </div>
  );
}
