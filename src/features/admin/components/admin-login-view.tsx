import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { AdminLoginForm } from "@/features/admin/components/admin-login-form";
import { adminCopy } from "@/features/admin/data/copy";
import { getCurrentAdmin } from "@/features/admin/lib/auth";

const c = adminCopy.login;

/** An admin who is already signed in goes straight to the dashboard. */
async function RedirectIfSignedIn() {
  await connection();
  if (await getCurrentAdmin()) redirect("/dashboard");
  return null;
}

export function AdminLoginView() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-grey-50 px-4 py-10">
      <Suspense>
        <RedirectIfSignedIn />
      </Suspense>
      <div className="w-full max-w-md rounded-xl border bg-card p-6 sm:p-8">
        <p className="text-sm text-muted-foreground">{siteConfig.shortName}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-heading">{c?.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{c?.intro}</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
