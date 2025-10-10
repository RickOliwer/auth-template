"use client";

import { useSession } from "@/lib/auth-client";

export default function DashboardClientComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return <div>Welcome, {session.user.email}!</div>;
}
