import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const contactBriefSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Service is required"),
  company: z.string().optional(),
  message: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const parsed = contactBriefSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors[0].message });
  }

  const { name, email, service, company, budget, message } = parsed.data;

  const webhookUrl =
    "https://api.nodex.bubblelab.ai/webhook/user_36lWT7tSw4MOQm0gENBx8TR0Im3/4ZW6taNNeXbH";

  try {
    const webhookRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, service, company, budget, message }),
    });

    if (!webhookRes.ok) {
      console.error("Webhook error:", webhookRes.status);
      return res.status(500).json({ message: "Failed to submit. Please try again." });
    }

    return res.json({ ok: true, message: "Brief sent successfully." });
  } catch (err: any) {
    console.error("Webhook send error:", err);
    return res
      .status(500)
      .json({ message: "Failed to send. Please try again." });
  }
}
