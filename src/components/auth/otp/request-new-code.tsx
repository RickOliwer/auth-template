"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

type RequestNewCodeProps = {
  email: string;
};

export default function RequestNewCode(props: RequestNewCodeProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setIsLoading(true);
        const { data, error } = await authClient.emailOtp.sendVerificationOtp({
          email: props.email,
          type: "email-verification",
        });
        if (error) {
          setIsLoading(false);
          throw error;
        }
        if (data.success) {
          setIsLoading(false);
        }
      }}
      disabled={isLoading}
    >
      {isLoading ? "Sending new code..." : "Resend code"}
    </Button>
  );
}
