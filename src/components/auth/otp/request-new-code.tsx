"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type RequestNewCodeProps = {
  email: string;
};

export default function RequestNewCode(props: RequestNewCodeProps) {
  return (
    <Button
      onClick={async () =>
        await authClient.emailOtp.sendVerificationOtp({
          email: props.email, // required
          type: "email-verification", // required
        })
      }
    >
      Send new code
    </Button>
  );
}
