import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import nodemailer from "nodemailer";

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
}
