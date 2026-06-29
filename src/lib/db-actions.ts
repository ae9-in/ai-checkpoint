import { createServerFn } from "@tanstack/react-start";
import { fullSchema } from "./registration-schema";
import { getSql, initDb } from "./db";

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY || (globalThis as any).RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Email simulation logged.");
    return { success: false, status: "simulated" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "AI CheckPoint <onboarding@resend.dev>",
        to: to,
        subject: subject,
        html: html
      })
    });

    if (response.ok) {
      console.log(`Email successfully sent to ${to} via Resend.`);
      return { success: true, status: "sent" };
    } else {
      console.error("Resend API returned error:", await response.text());
      return { success: false, status: "failed" };
    }
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return { success: false, status: "error" };
  }
}

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

      // Send confirmation email
      try {
        const auditHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00F5D4; margin-top: 0; background-color: #06070C; padding: 15px; border-radius: 8px; text-align: center;">AI CheckPoint Audit Booked</h2>
            <p>Hello ${data.fullName},</p>
            <p>Thank you for requesting a custom AI Operations Audit for <strong>${data.businessName}</strong>. Our operations automation specialist will review your parameters and contact you within 24 hours.</p>
            
            <h4 style="border-bottom: 1px solid #eee; padding-bottom: 8px; color: #333;">Registration details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #666;">Industry</td>
                <td style="padding: 6px 0; font-weight: bold; text-align: right;">${data.industry}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;">Repetitive Manual Staff</td>
                <td style="padding: 6px 0; font-weight: bold; text-align: right;">${data.manualStaff} workers</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;">Preferred Contact Time</td>
                <td style="padding: 6px 0; font-weight: bold; text-align: right; capitalize">${data.bestTime}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; background-color: #fcfcfc; padding: 15px; border-radius: 8px; border: 1px solid #f0f0f0;">
              <p style="margin: 0; font-size: 13px; color: #555;"><strong>What happens next:</strong> We will call you to schedule your 2-hour deep-dive audit. Your custom AI Roadmap will be generated within 48 hours of our call.</p>
            </div>
            
            <p style="font-size: 11px; color: #999; margin-top: 25px; text-align: center;">AI CheckPoint Solutions · India</p>
          </div>
        `;
        await sendEmail(data.email, "AI Audit Request Received — AI CheckPoint", auditHtml);
      } catch (emailErr) {
        console.error("Failed to send audit confirmation email:", emailErr);
      }

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

