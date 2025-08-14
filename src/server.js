import express from "express";
import cors from "cors";
import { z } from "zod";
import nodemailer from "nodemailer";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Resend } from "resend";

const app = express();
app.use(express.json({ limit: "1mb" }));

// CORS
const allow = new Set((process.env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean));
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allow.has(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-form-proof"],
    credentials: false,
  })
);

// Simple in-memory rate-limit (per IP)
const hits = new Map();
const WINDOW_MS = 60_000; // 1 min
const LIMIT = 20;
app.use((req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const arr = (hits.get(key) || []).filter(t => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(key, arr);
  if (arr.length > LIMIT) return res.status(429).json({ ok: false, error: "Too many requests" });
  next();
});

// Schema
const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().nullable(),
  topic: z.enum(["General enquiry", "Services / partnership", "Support", "Careers"]),
  message: z.string().min(10).max(5000),
  // honeypot (must be empty)
  website: z.string().max(0).optional().nullable(),
});

// Choose mailer: SES (default) or Resend
const useResend = !!process.env.RESEND_API_KEY;

async function sendWithSES({ from, to, subject, text, html }) {
  const ses = new SESClient({ region: process.env.AWS_REGION });
  const cmd = new SendEmailCommand({
    Source: from,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        Html: { Data: html, Charset: "UTF-8" },
        Text: { Data: text, Charset: "UTF-8" },
      },
    },
  });
  await ses.send(cmd);
}

async function sendWithResend({ from, to, subject, html, text }) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({ from, to, subject, html, text });
}

app.post("/api/contact", async (req, res) => {
  try {
    // Basic proof header (optional: set a secret or compare referer)
    const proof = req.headers["x-form-proof"];
    if (!proof || String(proof).length < 4) {
      // keep soft fail to not leak signal to bots
    }

    // Validate
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: "Invalid input", details: parsed.error.flatten() });
    }
    const { name, email, phone, topic, message } = parsed.data;

    // Build email
    const subject = `New Contact: ${topic} — ${name}`;
    const text =
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nTopic: ${topic}\n\nMessage:\n${message}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu;line-height:1.5">
        <h2 style="margin:0 0 8px">New Contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>Phone:</strong> ${escapeHtml(phone || "-")}<br/>
        <strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>`;

    if (useResend) {
      await sendWithResend({
        from: process.env.MAIL_FROM_RESEND,
        to: process.env.MAIL_TO_RESEND,
        subject,
        html,
        text,
      });
    } else {
      // SES via nodemailer alternative (works too), but we already used AWS SDK above.
      await sendWithSES({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject,
        html,
        text,
      });
    }

    res.json({ ok: true, message: "Delivered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

// Health
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Start
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));

// util
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
