import { getSql, initDb } from "./db";

async function runTest() {
  console.log("Starting Neon PostgreSQL database integration test...");

  try {
    const sql = getSql();
    if (!sql) {
      console.error("❌ Test failed: DATABASE_URL is not set or .env cannot be read.");
      process.exit(1);
    }

    console.log("1. Initializing database schema...");
    await initDb();
    console.log("✅ Database schema initialized successfully.");

    console.log("2. Testing connection and table insert/query flow...");
    const testEmail = `test_${Date.now()}@example.com`;

    // Insert dummy record
    console.log(`Inserting test registration with email: ${testEmail}...`);
    const insertResult = await sql`
      INSERT INTO registrations (
        full_name, phone, email, city, business_name, industry, business_size,
        revenue_min, revenue_max, manual_staff, goals, source, best_time, notes
      ) VALUES (
        'Test User', '9876543210', ${testEmail}, 'Test City', 'Test Business', 'Technology', 'solo',
        0, 100000, 5, ARRAY['Save time', 'Reduce errors'], 'Google', 'morning', 'This is a test registration record.'
      ) RETURNING id;
    `;

    const recordId = insertResult[0]?.id;
    console.log(`✅ Dummy record inserted successfully, ID: ${recordId}`);

    // Select dummy record
    console.log(`Querying registration ID ${recordId}...`);
    const selectResult = await sql`
      SELECT * FROM registrations WHERE id = ${recordId};
    `;

    if (selectResult.length > 0) {
      console.log(`✅ Queried record from DB successfully:`, selectResult[0]);
    } else {
      throw new Error("No record found matching the inserted ID.");
    }

    // Clean up
    console.log(`Cleaning up test record ID ${recordId}...`);
    await sql`
      DELETE FROM registrations WHERE id = ${recordId};
    `;
    console.log("✅ Cleanup successful.");
    console.log("\n⭐️ ALL DATABASE INTEGRATION TESTS PASSED SUCCESSFULLY! ⭐️");
  } catch (error) {
    console.error("❌ Test failed with error:", error);
    process.exit(1);
  }
}

runTest();
