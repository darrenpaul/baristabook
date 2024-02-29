import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("DB_CONNECTION_STRING is missing");
}

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  connectionString: process.env.DB_CONNECTION_STRING,
} satisfies Config;
