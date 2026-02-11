import type { Express } from "express";
import { createServer, type Server } from "http";
import { contactBriefSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the JustVideos.cloud assistant — a helpful, concise guide for Hemant Chabria's video production studio.

About JustVideos.cloud:
- Founded by Hemant Chabria, based in Kolkata, India
- Premium video production: brand films, corporate videos, product videos, safety/training videos, explainers, event coverage
- AI-powered video: storyboards, animatics, dubbing, localization using controlled AI pipelines
- Voice agents: lead qualification, FAQ automation, scheduling, routing
- Agentic workflows: brief intake → approvals → versioning → publishing automation
- AI websites & apps: fast-launch sites for SMEs, custom enterprise tools

Clients include: L&T, Tata Steel, Emami, GRSE, Haldia Petrochemicals, ITC, Aditya Birla Group, Reliance, IndianOil, GAIL, JSW, Hindalco, Marico, Britannia, Nestlé, and more.

Industries: Manufacturing, Infrastructure, FMCG, Government/PSU, Retail, Education.

Packages:
- Video Starter: 1 core video + 2 cutdowns + basic brand alignment
- Video Scale: 2-6 videos/month + cutdown factory + approval workflow
- Video Enterprise: SLA + governance + localization + dedicated producer
- Workflows Starter: Lead capture + routing + email/WhatsApp follow-up + basic reporting
- Workflows Scale: Approvals + versioning + templates + team dashboards
- Workflows Enterprise: Security + audit + integrations + change control

Turnaround: 3-10 days. Multi-language support. Built-in governance and approval workflows.

Contact: hemant@chabria.com | WhatsApp: +91 98300 22890

Guidelines:
- Be warm, professional, and concise (2-4 sentences per response)
- Guide users to submit a brief (contact form) or reach out via WhatsApp for next steps
- For booking calls, direct them to WhatsApp: https://wa.me/919830022890
- If asked about things outside JustVideos services, politely redirect to relevant offerings
- Never make up pricing numbers — say "pricing depends on scope" and suggest submitting a brief
- Do not provide medical, legal, or financial advice`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    const parsed = contactBriefSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }

    const { name, email, service, company, message } = parsed.data;

    const body = [
      `Service: ${service}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "-"}`,
      "",
      message || "-",
    ].join("\n");

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log("SMTP not configured — logging brief to console:");
      console.log("Subject: JustVideos.cloud — New brief");
      console.log(body);
      return res.json({
        ok: true,
        message: "Brief received (email delivery pending SMTP setup).",
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587", 10),
        secure: smtpPort === "465",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"JustVideos.cloud" <${smtpUser}>`,
        replyTo: email,
        to: "hemant@chabria.com",
        subject: "JustVideos.cloud — New brief",
        text: body,
      });

      return res.json({ ok: true, message: "Brief sent successfully." });
    } catch (err: any) {
      console.error("Email send error:", err);
      return res
        .status(500)
        .json({ message: "Failed to send email. Please try again." });
    }
  });

  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Messages array is required." });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res.json({
        reply:
          "Our AI assistant is being set up. In the meantime, please submit your brief using the contact form or reach us on WhatsApp at +91 98300 22890.",
      });
    }

    try {
      const client = new Anthropic({ apiKey });

      const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      });

      const textBlock = response.content.find((b) => b.type === "text");
      const reply = textBlock ? textBlock.text : "I couldn't generate a response. Please try again.";

      return res.json({ reply });
    } catch (err: any) {
      console.error("Chat API error:", err?.message || err);
      return res.json({
        reply:
          "Sorry, I'm having trouble right now. Please try the contact form or WhatsApp us at +91 98300 22890.",
      });
    }
  });

  return httpServer;
}
