import { connection } from "next/server";
import { getCurrentAdmin } from "@/features/admin/lib/auth";
import { json } from "@/lib/api";

/** The signed-in admin. Responses: 200 { admin } | 401. */
export async function GET() {
  await connection();
  const admin = await getCurrentAdmin();
  return admin ? json({ admin }) : json({ error: "unauthorized" }, 401);
}
