import OTPForm from "@/components/auth/otp/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Verify your email
            </CardTitle>
            <CardDescription>
              We've sent a verification code to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <OTPForm email={email} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
