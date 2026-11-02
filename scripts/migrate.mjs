/**
 * Applies the SQL files in db/migrations once each, in name order.
 * Run with `npm run db:migrate`. Uses a direct connection, as Neon advises for schema changes.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import pg from "pg";

config({ path: ".env.local", quiet: true });
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const dir = path.join(process.cwd(), "db", "migrations");
const client = new pg.Client({ connectionString: process.env.DATABASE_URL.replace("-pooler.", ".") });

await client.connect();
try {
  await client.query("CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())");
  const { rows } = await client.query("SELECT name FROM schema_migrations");
  const applied = new Set(rows.map((r) => r.name));
  const pending = (await readdir(dir)).filter((f) => f.endsWith(".sql") && !applied.has(f)).sort();

  for (const name of pending) {
    await client.query("BEGIN");
    try {
      await client.query(await readFile(path.join(dir, name), "utf8"));
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
      await client.query("COMMIT");
      console.log(`Applied ${name}`);
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  }
  if (!pending.length) console.log("No pending migrations");
} finally {
  await client.end();
}
