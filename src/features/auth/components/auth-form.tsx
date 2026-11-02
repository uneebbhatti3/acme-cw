"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authCopy } from "@/features/auth/data/copy";
import { authClient } from "@/lib/auth/client";

const f = authCopy.fields;

/** Email and password form for signing up or signing in. */
export function AuthForm({ mode }: { mode: "signUp" | "signIn" }) {
  const c = authCopy[mode];
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    setPending(true);
    setError(null);
    try {
      const { error: failed } =
        mode === "signUp"
          ? await authClient.signUp.email({ name: String(form.get("name")).trim(), email, password })
          : await authClient.signIn.email({ email, password });
      if (failed) {
        setError(failed.message ?? authCopy.genericError);
        setPending(false);
        return;
      }
      // Next.js keeps this page mounted after navigating away, so clear the password and pending state.
      formElement.reset();
      setPending(false);
      router.push("/account");
      router.refresh();
    } catch (err) {
      // The SDK throws on 4xx responses, with the auth server's message.
      setError((err as { message?: string }).message || authCopy.genericError);
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md rounded-xl border bg-card p-5 sm:p-8">
      {error && (
        <p role="alert" className="mb-6 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </p>
      )}
      <FieldGroup>
        {mode === "signUp" && (
          <Field>
            <FieldLabel htmlFor="auth-name">{f.name}</FieldLabel>
            <Input id="auth-name" name="name" autoComplete="name" required maxLength={120} />
          </Field>
        )}
        <Field>
          <FieldLabel htmlFor="auth-email">{f.email}</FieldLabel>
          <Input id="auth-email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="auth-password">{f.password}</FieldLabel>
          <Input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={mode === "signUp" ? "new-password" : "current-password"}
            required
            minLength={8}
            aria-describedby={mode === "signUp" ? "auth-password-hint" : undefined}
          />
          {mode === "signUp" && <FieldDescription id="auth-password-hint">{f.passwordHint}</FieldDescription>}
        </Field>
      </FieldGroup>
      <Button type="submit" className="mt-6 w-full" disabled={pending}>
        {pending ? c.pending : c.submit}
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        {c.switchText}{" "}
        <Link href={c.switchHref} className="text-link underline-offset-4 hover:underline">
          {c.switchLink}
        </Link>
      </p>
    </form>
  );
}
