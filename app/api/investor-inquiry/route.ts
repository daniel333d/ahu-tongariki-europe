import { NextRequest, NextResponse } from "next/server";
import { dictionaries, isLanguageCode } from "../../i18n";

export const runtime = "nodejs";

type InvestorInquiryPayload = {
  fullName?: string;
  organization?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  website?: string;
  formStartedAt?: number;
  language?: string;
};

type SendEmailInput = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_TIME_MS = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_RECIPIENT_EMAIL = Buffer.from("YWJpa3NAd3AucGw=", "base64").toString("utf8");
const defaultServerCopy = dictionaries.pl.server.investorInquiry;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function logMailError(code: string, details: unknown) {
  console.error("[investor-inquiry]", code, details);
}

async function sendEmail(apiKey: string, input: SendEmailInput) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      reply_to: input.replyTo
    })
  });

  if (!response.ok) {
    const details = await response.text();
    return {
      data: null,
      error: {
        message: details || `Resend API error ${response.status}`
      }
    };
  }

  return {
    data: await response.json(),
    error: null
  };
}

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      {
        code: "RATE_LIMITED",
        message: defaultServerCopy.rateLimited
      },
      { status: 429 }
    );
  }

  let payload: InvestorInquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        code: "INVALID_JSON",
        message: defaultServerCopy.invalidJson
      },
      { status: 400 }
    );
  }

  const language = payload.language && isLanguageCode(payload.language) ? payload.language : "pl";
  const serverCopy = dictionaries[language].server.investorInquiry;

  if (clean(payload.website, 120)) {
    return NextResponse.json({
      code: "HONEYPOT_ACCEPTED",
      message: serverCopy.honeypotAccepted
    });
  }

  if (!payload.formStartedAt || Date.now() - payload.formStartedAt < MIN_FORM_TIME_MS) {
    return NextResponse.json(
      {
        code: "FORM_SUBMITTED_TOO_FAST",
        message: serverCopy.submittedTooFast
      },
      { status: 400 }
    );
  }

  const fullName = clean(payload.fullName, 120);
  const organization = clean(payload.organization, 160);
  const email = clean(payload.email, 180);
  const phone = clean(payload.phone, 60);
  const subject = clean(payload.subject, 180);
  const message = clean(payload.message, 4000);

  if (!fullName || !email || !subject || !message || !payload.consent) {
    return NextResponse.json(
      {
        code: "VALIDATION_ERROR",
        message: serverCopy.validationError
      },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      {
        code: "INVALID_EMAIL",
        message: serverCopy.invalidEmail
      },
      { status: 400 }
    );
  }

  const recipient = DEFAULT_RECIPIENT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || serverCopy.defaultFromEmail;

  if (!resendApiKey) {
    logMailError("MISSING_RESEND_API_KEY", serverCopy.missingResendApiKey);
    return NextResponse.json(
      {
        code: "MISSING_RESEND_API_KEY",
        details: serverCopy.missingResendApiKey,
        message: serverCopy.genericSendError
      },
      { status: 503 }
    );
  }

  const inquiryHtml = `
    <div style="font-family:Arial,sans-serif;color:#102033;line-height:1.6">
      <h2>${serverCopy.subject}</h2>
      <p><strong>${serverCopy.labels.fullName}:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>${serverCopy.labels.organization}:</strong> ${escapeHtml(organization || serverCopy.labels.notProvided)}</p>
      <p><strong>${serverCopy.labels.email}:</strong> ${escapeHtml(email)}</p>
      <p><strong>${serverCopy.labels.phone}:</strong> ${escapeHtml(phone || serverCopy.labels.notProvided)}</p>
      <p><strong>${serverCopy.labels.formSubject}:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      <hr />
      <p style="font-size:12px;color:#667085">${serverCopy.consentConfirmed}</p>
    </div>
  `;

  const autoReplyHtml = `
    <div style="font-family:Arial,sans-serif;color:#102033;line-height:1.7">
      <p>${serverCopy.autoReplyLines[0]}</p>
      <p>${serverCopy.autoReplyLines[1]}</p>
      <p>${serverCopy.autoReplyLines[2]}</p>
      <p>${serverCopy.autoReplyLines[3]}</p>
      <p>${serverCopy.autoReplyLines[4]}</p>
      <p><strong>${serverCopy.autoReplyLines[5]}<br />${serverCopy.autoReplyLines[6]}</strong></p>
      <p><a href="${serverCopy.websiteUrl}" style="color:#102033">${serverCopy.websiteLabel}</a></p>
    </div>
  `;

  const autoReplyText = [
    serverCopy.autoReplyLines[0],
    "",
    serverCopy.autoReplyLines[1],
    "",
    serverCopy.autoReplyLines[2],
    "",
    serverCopy.autoReplyLines[3],
    "",
    serverCopy.autoReplyLines[4],
    "",
    serverCopy.autoReplyLines[5],
    serverCopy.autoReplyLines[6],
    "",
    serverCopy.websiteLabel
  ].join("\n");

  try {
    const inquiryResult = await sendEmail(resendApiKey, {
      from: fromEmail,
      to: recipient,
      replyTo: email,
      subject: serverCopy.subject,
      html: inquiryHtml
    });

    if (inquiryResult.error) {
      logMailError("EMAIL_PROVIDER_ERROR", inquiryResult.error);
      return NextResponse.json(
        {
          code: "EMAIL_PROVIDER_ERROR",
          details: inquiryResult.error.message,
          message: serverCopy.genericSendError
        },
        { status: 502 }
      );
    }

    const autoReplyResult = await sendEmail(resendApiKey, {
      from: fromEmail,
      to: email,
      subject: serverCopy.autoReplySubject,
      html: autoReplyHtml,
      text: autoReplyText
    });

    if (autoReplyResult.error) {
      logMailError("AUTO_REPLY_PROVIDER_ERROR", autoReplyResult.error);
      return NextResponse.json(
        {
          code: "AUTO_REPLY_PROVIDER_ERROR",
          details: autoReplyResult.error.message,
          message: serverCopy.genericSendError
        },
        { status: 502 }
      );
    }
  } catch (error) {
    logMailError("EMAIL_SEND_EXCEPTION", error);
    return NextResponse.json(
      {
        code: "EMAIL_SEND_EXCEPTION",
        details: error instanceof Error ? error.message : serverCopy.unknownSendError,
        message: serverCopy.genericSendError
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    code: "EMAIL_SENT",
    message: serverCopy.sent
  });
}
