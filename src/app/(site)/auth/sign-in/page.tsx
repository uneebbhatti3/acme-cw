import { AuthView } from "@/features/auth/components/auth-view";
import { authSeo } from "@/features/auth/data/seo";

export const metadata = authSeo.signIn;

export default function SignInPage() {
  return <AuthView mode="signIn" />;
}
