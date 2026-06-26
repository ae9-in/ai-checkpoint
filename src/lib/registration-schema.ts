import { z } from "zod";

export const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Enter a valid email").max(120),
  city: z.string().trim().min(2, "City is required").max(60),
});

export const step2Schema = z.object({
  businessName: z.string().trim().min(2, "Business name is required").max(80),
  industry: z.string().min(1, "Please pick an industry"),
  size: z.enum(["solo", "2-10", "11-50", "50+"]),
  revenue: z.tuple([z.number(), z.number()]),
  manualStaff: z.coerce.number().min(0).max(200),
});

export const step3Schema = z.object({
  goals: z.array(z.string()).min(1, "Pick at least one goal"),
  source: z.string().min(1, "Please pick one"),
  bestTime: z.enum(["morning", "afternoon", "evening"]),
  notes: z.string().max(800).optional(),
});

export const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
export type RegistrationData = z.infer<typeof fullSchema>;