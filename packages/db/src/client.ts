import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let _db: PostgresJsDatabase<typeof schema> | null = null;

function getDb(): PostgresJsDatabase<typeof schema> {
  if (!_db) {
    const rawUrl = process.env["DATABASE_URL"];
    const connectionString =
      rawUrl && rawUrl.startsWith("postgres")
        ? rawUrl
        : "postgresql://postgres:postgres@127.0.0.1:5432/postgres";

    const queryClient = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });

    _db = drizzle(queryClient, {
      schema,
      logger: process.env["NODE_ENV"] === "development",
    });
  }
  return _db;
}

export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const val = Reflect.get(instance, prop, receiver);
    return typeof val === "function" ? val.bind(instance) : val;
  },
});

export type Database = PostgresJsDatabase<typeof schema>;
export * from "./schema";
