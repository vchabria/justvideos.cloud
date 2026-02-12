import { z } from "zod";

export const contactBriefSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Service is required"),
  company: z.string().optional(),
  message: z.string().optional(),
});
