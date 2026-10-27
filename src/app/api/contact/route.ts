import nodemailer from "nodemailer";
import { company } from "@/content/site";

// Form submissions are emailed over SMTP from this serverless route. Credentials stay
// server-side in environment variables (see .env.example); nothing secret reaches the browser.

const subjects: Record<string, string> = {
  worker: "New worker application",
  employer: "New employer request",
  contact: "New website enquiry",
};

// Only these fields are emailed, in this order, with these labels.
const fields: [key: string, label: string][] = [
  ["company", "Company"],
  ["name", "Name"],
  ["phone", "Phone / Telegram"],
  ["email", "Email"],
  ["age", "Age"],
  ["gender", "Gender"],
  ["job", "Job interest"],
  ["country", "Country"],
  ["industry", "Industry"],
  ["quantity", "Workers needed"],
  ["subject_line", "Subject"],
  ["message", "Message"],
  ["page_language", "Site language"],
];

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FORM_TO_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    return Response.json({ success: false, message: "Email is not configured." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  // Hidden honeypot field: bots fill it, people don't. Pretend success so bots move on.
  if (body.botcheck) return Response.json({ success: true });

  const formType = typeof body.form_type === "string" && body.form_type in subjects ? body.form_type : "contact";
  const rows = fields
    .map(([key, label]) => [label, typeof body[key] === "string" ? (body[key] as string).trim().slice(0, 2000) : ""] as const)
    .filter(([, value]) => value);

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  if (!name || !phone) {
    return Response.json({ success: false, message: "Name and phone are required." }, { status: 400 });
  }
  const replyTo = typeof body.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ? body.email : undefined;

  const subject = `[AA Labour] ${subjects[formType]}: ${name.slice(0, 80)}`;
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd;background:#f5f2ec;font-weight:bold;vertical-align:top">${escape(label)}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escape(value)}</td></tr>`,
    )
    .join("")}</table>`;

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    // Google displays App Passwords in groups of four; the spaces are not part of the password.
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s+/g, "") },
  });

  try {
    await transporter.sendMail({
      from: `"AA Labour website" <${SMTP_USER}>`,
      to: FORM_TO_EMAIL || company.email,
      replyTo,
      subject,
      text,
      html,
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error("Form email failed:", err);
    return Response.json({ success: false, message: "Could not send email." }, { status: 502 });
  }
}
