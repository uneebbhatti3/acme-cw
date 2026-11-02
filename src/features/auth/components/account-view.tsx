import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { authCopy } from "@/features/auth/data/copy";
import { auth } from "@/lib/auth/server";
import { SignOutButton } from "./sign-out-button";

const c = authCopy.account;

/** Reads the current user on the server. Signed-out visitors go to the sign-in page. */
async function AccountDetails() {
  await connection();
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");
  const { name, email } = session.user;

  return (
    <div className="max-w-md rounded-xl border bg-card p-5 sm:p-8">
      <dl className="grid gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">{c.name}</dt>
          <dd className="mt-0.5 font-medium" data-testid="account-name">
            {name}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">{c.email}</dt>
          <dd className="mt-0.5 font-medium break-words" data-testid="account-email">
            {email}
          </dd>
        </div>
      </dl>
      <div className="mt-6">
        <SignOutButton />
      </div>
    </div>
  );
}

export function AccountView() {
  return (
    <>
      <PageHero title={c.title} subtitle={c.subtitle} />
      <Band defer={false} labelledBy="account-title" className="pt-8 md:pt-12">
        <Container>
          <h2 id="account-title" className="sr-only">
            {c.title}
          </h2>
          <Suspense fallback={<Skeleton className="h-64 max-w-md rounded-xl" />}>
            <AccountDetails />
          </Suspense>
        </Container>
      </Band>
    </>
  );
}
