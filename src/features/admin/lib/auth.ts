import "server-only";
import { compare } from "bcryptjs";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth/server";

/*
 * Admins are rows in `users` with role 'admin'. Sessions come from Neon Auth.
 *
 * Neon Auth cannot read the bcrypt hash in `users`, so the first login checks
 * that hash, creates the Neon Auth account and saves its id in auth_user_id.
 * Later logins go to Neon Auth, and the password in `users` is no longer used.
 *
 * Being an admin is decided by auth_user_id, never by email: sign-up is public
 * and emails are unverified, so anyone can register an admin's email address.
 */

export interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AdminRow extends Admin {
  password: string;
  auth_user_id: string | null;
}

/** Compared against when no admin matches, so a wrong email takes as long as a wrong password. */
const DUMMY_HASH = "$2a$10$CwTycUXWue0Thq9StjUM0uJ8e1sVhZ1jQkG0Vb7i9P8yZqJmB6Z2W";

const toAdmin = ({ id, name, email }: Admin): Admin => ({ id, name, email });

/**
 * The admin's Neon Auth account, created if needed. An account may already exist
 * if an earlier first login stopped part way. Signing in to it with the password
 * that passed the bcrypt check proves it is theirs; an account someone else
 * registered with this email has a different password, so it is refused.
 */
async function neonAccount(row: AdminRow, password: string) {
  const created = await auth.signUp.email({ name: row.name, email: row.email, password }).catch((error) => ({ data: null, error }));
  if (created.data?.user) return created.data.user;
  const existing = await auth.signIn.email({ email: row.email, password }).catch((error) => ({ data: null, error }));
  if (existing.data?.user) return existing.data.user;
  console.error("[admin] First login refused by Neon Auth", { signUp: created.error?.message, signIn: existing.error?.message, status: existing.error?.status });
  return null;
}

/** First login: checks the bcrypt hash, then links the admin to their Neon Auth account. */
async function linkFirstLogin(row: AdminRow, password: string) {
  if (!(await compare(password, row.password))) return null;
  const user = await neonAccount(row, password);
  if (!user) return null;
  await db.query("UPDATE users SET auth_user_id = $2, updated_at = now() WHERE id = $1", [row.id, user.id]);
  return toAdmin(row);
}

async function signIn(row: AdminRow, password: string) {
  const { data, error } = await auth.signIn.email({ email: row.email, password });
  if (error || data?.user?.id !== row.auth_user_id) {
    if (!error) await auth.signOut();
    return null;
  }
  return toAdmin(row);
}

/** Checks the credentials and sets the session cookie. Returns null for any failure, without saying which part failed. */
export async function loginAdmin(email: string, password: string) {
  const { rows } = await db.query<AdminRow>(
    "SELECT id, name, email, password, auth_user_id FROM users WHERE lower(email) = lower($1) AND role = 'admin'",
    [email],
  );
  const row = rows[0];
  if (!row) {
    await compare(password, DUMMY_HASH);
    return null;
  }
  try {
    return await (row.auth_user_id ? signIn(row, password) : linkFirstLogin(row, password));
  } catch (err) {
    // The SDK can throw on 4xx responses, which here means the credentials were refused.
    console.error("[admin] Login refused by Neon Auth", (err as { code?: string }).code ?? "unknown");
    return null;
  }
}

/** The signed-in admin, or null. Cached per request, so the layout and page checks cost one lookup. */
export const getCurrentAdmin = cache(async () => {
  const { data: session } = await auth.getSession();
  if (!session?.user) return null;
  const { rows } = await db.query<Admin>("SELECT id, name, email FROM users WHERE auth_user_id = $1 AND role = 'admin'", [session.user.id]);
  return rows[0] ?? null;
});

/** For pages and server actions: sends anyone who is not a signed-in admin to the login page. */
export async function requireAdmin() {
  await connection();
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}
