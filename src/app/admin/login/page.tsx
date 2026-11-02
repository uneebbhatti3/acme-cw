import { AdminLoginView } from "@/features/admin/components/admin-login-view";
import { adminSeo } from "@/features/admin/data/seo";

export const metadata = adminSeo.login;

export default function AdminLoginPage() {
  return <AdminLoginView />;
}
