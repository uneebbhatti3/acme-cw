"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authCopy } from "@/features/auth/data/copy";
import { authClient } from "@/lib/auth/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const signOut = async () => {
    setPending(true);
    await authClient.signOut();
    router.push("/auth/sign-in");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={signOut} disabled={pending}>
      {authCopy.account.signOut}
    </Button>
  );
}
