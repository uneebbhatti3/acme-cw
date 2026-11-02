import "server-only";
import { attachDatabasePool } from "@vercel/functions";
import { Pool } from "pg";

/**
 * Postgres pool on Neon's pooled DATABASE_URL. attachDatabasePool closes idle clients cleanly on Vercel.
 * The connection timeout stops an unreachable database leaving a page on its loading state; Neon wakes well within it.
 */
const globalForPool = globalThis as unknown as { pgPool?: Pool };

export const db = (globalForPool.pgPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5, connectionTimeoutMillis: 10_000 }));

// Neon closes idle connections when it scales to zero. Without a listener, that error would crash the process.
if (!db.listenerCount("error")) db.on("error", (err) => console.error("[db] Idle connection closed", err.message));

attachDatabasePool(db);
