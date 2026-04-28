import type { Express } from "express";
import type { Server } from "http";
import { contactBriefSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
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
  });

  return httpServer;
}
