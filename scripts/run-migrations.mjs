import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres.dyxvorhvxiakhspxvhaf:6Mc2b6mg9sD4XXOn@aws-1-eu-west-1.pooler.supabase.com:6543/postgres";

console.log("Connecting to Supabase PostgreSQL database...");

const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false },
  max: 1,
});

async function run() {
  try {
    const migrationsDir = path.join(rootDir, "supabase", "migrations");
    const migrationFiles = [
      "001_create_services.sql",
      "002_create_service_options.sql",
      "003_create_requests.sql",
      "004_create_request_selections.sql",
      "005_create_request_files.sql",
      "006_create_status_log.sql",
      "007_rls_policies.sql",
    ];

    console.log("Applying migrations...");
    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`- Executing ${file}...`);
        const content = fs.readFileSync(filePath, "utf-8");
        await sql.unsafe(content);
        console.log(`  ✓ Applied ${file}`);
      }
    }

    const seedPath = path.join(rootDir, "supabase", "seed.sql");
    if (fs.existsSync(seedPath)) {
      console.log("- Executing seed.sql...");
      const seedContent = fs.readFileSync(seedPath, "utf-8");
      await sql.unsafe(seedContent);
      console.log("  ✓ Applied seed.sql (services and options populated)");
    }

    console.log("\n✅ All migrations and seed data applied successfully!");
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exitCode = 1;
  } finally {
    await sql.end();
  }
}

run();
