import { Band } from "@/components/layout/band";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { authCopy } from "@/features/auth/data/copy";
import { AuthForm } from "./auth-form";

export function AuthView({ mode }: { mode: "signUp" | "signIn" }) {
  const c = authCopy[mode];
  return (
    <>
      <PageHero title={c.title} subtitle={c.subtitle} />
      <Band defer={false} labelledBy="auth-form-title" className="pt-8 md:pt-12">
        <Container>
          <h2 id="auth-form-title" className="sr-only">
            {c.title}
          </h2>
          <AuthForm mode={mode} />
        </Container>
      </Band>
    </>
  );
}
