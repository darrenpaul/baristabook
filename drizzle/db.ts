import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("DATABASE_URL is missing");
}

const connectionString = process.env.DB_CONNECTION_STRING;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

export default db;
