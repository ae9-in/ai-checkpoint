import { getSql } from "./db";

async function checkDb() {
  console.log("Fetching registrations from Neon database...");
  try {
    const sql = getSql();
    if (!sql) {
      console.error("❌ DATABASE_URL is not set.");
      return;
    }
    const results = await sql`
      SELECT * FROM registrations ORDER BY created_at DESC;
    `;
    console.log(`Found ${results.length} registration(s):`);
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error("❌ Failed to query database:", error);
  }
}

checkDb();
