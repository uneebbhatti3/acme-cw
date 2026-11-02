import { AuthView } from "@/features/auth/components/auth-view";
import { authSeo } from "@/features/auth/data/seo";

export const metadata = authSeo.signUp;

export default function SignUpPage() {
  return <AuthView mode="signUp" />;
}
