import { z } from "zod";

export const lawyerSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  barRegistration: z.string().min(1, "Bar registration number is required"),
  district: z.string().min(1, "District is required"),
  experience: z.string().min(0, "Experience must be non-negative"),
});
