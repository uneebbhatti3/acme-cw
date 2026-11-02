import { AccountView } from "@/features/auth/components/account-view";
import { authSeo } from "@/features/auth/data/seo";

export const metadata = authSeo.account;

export default function AccountPage() {
  return <AccountView />;
}
