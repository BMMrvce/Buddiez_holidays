import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
};

export const bookingSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(5, "Enter a valid phone number").max(30),
  travel_from: z.preprocess(emptyToUndefined, z.string().max(30).optional()),
  travel_to: z.preprocess(emptyToUndefined, z.string().max(30).optional()),
  travelers: z.coerce.number().int().min(1).max(50).optional().default(2),
  destination: z.preprocess(emptyToUndefined, z.string().max(120).optional()),
  notes: z.preprocess(emptyToUndefined, z.string().max(2000).optional()),
});

export type BookingInput = z.infer<typeof bookingSchema>;
