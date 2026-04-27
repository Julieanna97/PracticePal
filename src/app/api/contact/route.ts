import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactRequest = {
  subject?: string;
  message?: string;
  fromEmail?: string;
  source?: string;
};

type EmailPayload = {
  subject: string;
  message: string;
  fromEmail: string;
  source: string;
};

function sanitize(value: string, max = 2000): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendWithResend(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Missing RESEND_API_KEY" };
  }

  const toEmail = process.env.PORTFOLIO_CONTACT_TO ?? "kisamae1997@gmail.com";
  const fromAddress = process.env.PORTFOLIO_CONTACT_FROM ?? "Portfolio Bot <onboarding@resend.dev>";

  const text = [
    `Source: ${payload.source}`,
    payload.fromEmail ? `Reply-To: ${payload.fromEmail}` : "Reply-To: not provided",
    "",
    payload.message,
  ].join("\n");

  const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <p><strong>Source:</strong> ${payload.source}</p>
        <p><strong>Reply-To:</strong> ${payload.fromEmail || "not provided"}</p>
        <hr />
        <p>${payload.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")}</p>
      </div>
    `;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [toEmail],
      subject: payload.subject,
      text,
      html,
      reply_to: payload.fromEmail || undefined,
    }),
    cache: "no-store",
  });

  if (!resendRes.ok) {
    const errorText = await resendRes.text();
    return { ok: false, error: `Resend failed: ${errorText}` };
  }

  return { ok: true };
}

async function sendWithSmtp(payload: EmailPayload): Promise<{ ok: boolean; error?: string }> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.PORTFOLIO_CONTACT_TO ?? "kisamae1997@gmail.com";
  const smtpFrom = process.env.SMTP_FROM ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return { ok: false, error: "Missing SMTP config" };
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: toEmail,
    subject: payload.subject,
    text: [
      `Source: ${payload.source}`,
      payload.fromEmail ? `Reply-To: ${payload.fromEmail}` : "Reply-To: not provided",
      "",
      payload.message,
    ].join("\n"),
    replyTo: payload.fromEmail || undefined,
  });

  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRequest;
    const subject = sanitize(body.subject ?? "Portfolio Message", 180) || "Portfolio Message";
    const message = sanitize(body.message ?? "", 4000);
    const fromEmail = sanitize(body.fromEmail ?? "", 180);
    const source = sanitize(body.source ?? "portfolio", 120);

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    if (fromEmail && !isEmail(fromEmail)) {
      return NextResponse.json({ error: "Invalid sender email." }, { status: 400 });
    }

    const payload: EmailPayload = { subject, message, fromEmail, source };

    const resendResult = await sendWithResend(payload);
    if (!resendResult.ok) {
      try {
        const smtpResult = await sendWithSmtp(payload);
        if (!smtpResult.ok) {
          return NextResponse.json(
            {
              error:
                "Email is not configured. Add RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS in your environment.",
            },
            { status: 500 }
          );
        }
      } catch {
        return NextResponse.json(
          {
            error:
              "Email send failed. Check RESEND_API_KEY or SMTP settings and restart the server.",
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
