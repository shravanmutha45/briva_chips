import { z } from "zod";

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z
    .string()
    .trim()
    .max(120)
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  address1: z.string().trim().min(5, "Enter your house / flat and street").max(160),
  address2: z.string().trim().max(160).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Enter your city").max(60),
  state: z.enum(INDIAN_STATES, { errorMap: () => ({ message: "Choose your state" }) }),
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit pincode"),
});

export const orderRequestSchema = z.object({
  customer: customerSchema,
  items: z
    .array(
      z.object({
        packId: z.enum(["single", "pack3", "pack5"]),
        qty: z.number().int().min(1).max(20),
      }),
    )
    .min(1, "Your cart is empty")
    .max(3),
});

export type Customer = z.infer<typeof customerSchema>;
export type OrderRequest = z.infer<typeof orderRequestSchema>;
