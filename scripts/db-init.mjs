#!/usr/bin/env node
/**
 * Cross-platform database initializer for a fresh Supabase/Postgres project.
 *
 * `supabase/baseline.sql` is the canonical schema for a new installation. The
 * upstream shell script needs `psql`; this runner uses the `pg` package that is
 * already a production dependency, so Windows, macOS and Linux all work with
 * the same command.
 */

import { existsSync, readFileSync } from "node:fs";
import { loadEnvFile } from "node:process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const file of [".env.local", ".env"]) {
  const fullPath = path.join(root, file);
  if (!existsSync(fullPath)) continue;
  try {
    loadEnvFile(fullPath);
  } catch (error) {
    console.warn(`[db:init] 无法读取 ${file}: ${error.message}`);
  }
}

const connectionString = process.env.SUPABASE_DB_URL?.trim();
if (!connectionString) {
  console.error(
    "[db:init] 缺少 SUPABASE_DB_URL。请在 .env.local 中填写 Supabase 的连接串（Settings → Database → Connection string → URI）。",
  );
  process.exit(1);
}

const baselinePath = path.join(root, "supabase", "baseline.sql");
if (!existsSync(baselinePath)) {
  console.error(`[db:init] 找不到 ${baselinePath}`);
  process.exit(1);
}

const isLocal = /(?:^|@)(?:localhost|127\.0\.0\.1|\[::1\])(?::|\/|$)/i.test(connectionString);
const client = new pg.Client({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
  connectionTimeoutMillis: 20_000,
  statement_timeout: 0,
});

async function main() {
  console.log("[db:init] 连接数据库…");
  await client.connect();

  const existing = await client.query("select to_regclass('public.organizations') as table_name");
  if (existing.rows[0]?.table_name) {
    console.log("[db:init] 检测到 public.organizations，数据库已经初始化，跳过。");
    return;
  }

  console.log("[db:init] 启用扩展 vector / citext / pg_trgm…");
  await client.query(`
    create extension if not exists vector with schema public;
    create extension if not exists citext with schema public;
    create extension if not exists pg_trgm with schema public;
  `);

  console.log("[db:init] 应用 supabase/baseline.sql（约 2 MB，首次需要几十秒）…");
  await client.query(readFileSync(baselinePath, "utf8"));

  const check = await client.query(
    "select count(*)::int as count from information_schema.tables where table_schema = 'public'",
  );
  console.log(`[db:init] 完成：public schema 共 ${check.rows[0]?.count ?? 0} 张表。`);
}

main()
  .catch((error) => {
    console.error("[db:init] 初始化失败：", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end().catch(() => {});
  });
