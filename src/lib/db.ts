import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";

// Attempt to read DATABASE_URL from .env file manually if not populated by runtime
function getDatabaseUrl(): string | undefined {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/^DATABASE_URL=["']?([^"\n\r]+)["']?/m);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.error("Error reading .env file manually:", err);
  }

  return undefined;
}

export function getSql() {
  const url = getDatabaseUrl();
  if (!url) {
    console.warn("DATABASE_URL is not set. Database queries will fail.");
    return null;
  }
  return neon(url);
}

export async function initDb() {
  const sql = getSql();
  if (!sql) {
    throw new Error("DATABASE_URL is not configured.");
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        business_name VARCHAR(255) NOT NULL,
        industry VARCHAR(100) NOT NULL,
        business_size VARCHAR(50) NOT NULL,
        revenue_min INT NOT NULL,
        revenue_max INT NOT NULL,
        manual_staff INT NOT NULL,
        goals TEXT[] NOT NULL,
        source VARCHAR(100) NOT NULL,
        best_time VARCHAR(50) NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Database registrations table initialized successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}
