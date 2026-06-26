import { createServerFn } from "@tanstack/react-start";
import { fullSchema } from "./registration-schema";
import { getSql, initDb } from "./db";

let dbInitialized = false;

export const submitRegistration = createServerFn({ method: "POST" })
  .validator((data: unknown) => fullSchema.parse(data))
  .handler(async ({ data }) => {
    if (!dbInitialized) {
      await initDb();
      dbInitialized = true;
    }

    const sql = getSql();
    if (!sql) {
      throw new Error("Database connection is not configured.");
    }

    try {
      const result = await sql`
        INSERT INTO registrations (
          full_name,
          phone,
          email,
          city,
          business_name,
          industry,
          business_size,
          revenue_min,
          revenue_max,
          manual_staff,
          goals,
          source,
          best_time,
          notes
        ) VALUES (
          ${data.fullName},
          ${data.phone},
          ${data.email},
          ${data.city},
          ${data.businessName},
          ${data.industry},
          ${data.size},
          ${data.revenue[0]},
          ${data.revenue[1]},
          ${data.manualStaff},
          ${data.goals},
          ${data.source},
          ${data.bestTime},
          ${data.notes ?? null}
        ) RETURNING id
      `;

      return { success: true, id: result[0]?.id };
    } catch (error) {
      console.error("Failed to save registration:", error);
      throw new Error("Failed to save registration to database");
    }
  });

export const getRegistrations = createServerFn({ method: "GET" })
  .handler(async () => {
    const sql = getSql();
    if (!sql) {
      throw new Error("Database connection is not configured.");
    }

    try {
      const results = await sql`
        SELECT * FROM registrations ORDER BY created_at DESC
      `;
      return results.map((r: any) => ({
        id: r.id,
        fullName: r.full_name,
        phone: r.phone,
        email: r.email,
        city: r.city,
        businessName: r.business_name,
        industry: r.industry,
        size: r.business_size,
        revenue: [r.revenue_min, r.revenue_max],
        manualStaff: r.manual_staff,
        goals: r.goals,
        source: r.source,
        bestTime: r.best_time,
        notes: r.notes,
        createdAt: r.created_at
      }));
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
      throw new Error("Failed to fetch registrations from database");
    }
  });

export const deleteRegistration = createServerFn({ method: "POST" })
  .validator((id: unknown) => typeof id === "number" ? id : -1)
  .handler(async ({ data: id }) => {
    const sql = getSql();
    if (!sql) {
      throw new Error("Database connection is not configured.");
    }

    if (id === -1) {
      throw new Error("Invalid registration ID");
    }

    try {
      await sql`
        DELETE FROM registrations WHERE id = ${id}
      `;
      return { success: true };
    } catch (error) {
      console.error("Failed to delete registration:", error);
      throw new Error("Failed to delete registration from database");
    }
  });

