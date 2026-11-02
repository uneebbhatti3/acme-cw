"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { adminCopy } from "@/features/admin/data/copy";

const c = adminCopy.login;

/** Posts to /api/admin/login. The refresh drops anything the router cached while signed out. */
export function AdminLoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      if (res.ok) {
        // Next.js keeps this page mounted after navigating away, so clear the password and pending state.
        formElement.reset();
        router.replace("/dashboard");
        router.refresh();
      } else {
        setError(res.status === 401 ? c.invalid : res.status === 429 ? c.tooMany : c.failed);
      }
    } catch {
      setError(c.failed);
    }
    setPending(false);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6">
      {error && (
        <p role="alert" className="mb-6 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="admin-email">{c?.email}</FieldLabel>
          <Input id="admin-email" name="email" type="email" autoComplete="username" required autoFocus />
        </Field>
        <Field>
          <FieldLabel htmlFor="admin-password">{c.password}</FieldLabel>
          <Input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={72} />
        </Field>
      </FieldGroup>
      <Button type="submit" className="mt-6 w-full" disabled={pending}>
        {pending ? c.pending : c.submit}
      </Button>
    </form>
  );
}
