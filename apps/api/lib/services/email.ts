import { Resend } from "resend";
import {
  render,
  AdminNewRequestEmail,
  CustomerConfirmationEmail,
  CustomerQuoteEmail,
} from "@codey/email";

function getResend(): Resend | null {
  const key = process.env["RESEND_API_KEY"];
  if (!key) {
    console.warn("RESEND_API_KEY not configured. Email will be simulated in development / logs.");
    return null;
  }
  return new Resend(key.trim());
}

const PUBLIC_URL = process.env["PUBLIC_PORTAL_URL"] ?? "https://codeydev.vercel.app";
const ADMIN_URL = process.env["ADMIN_PORTAL_URL"] ?? "https://admincodeydev.vercel.app";

function getAdminRecipients(): string[] {
  const raw = process.env["ADMIN_NOTIFICATION_EMAIL"] || "codey.it360@gmail.com";
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

interface SendOptions {
  to: string | string[];
  subject: string;
  html: string;
}

async function sendWithResend({ to, subject, html }: SendOptions) {
  const resend = getResend();
  if (!resend) {
    console.log(`[EMAIL SIMULATION] To: ${Array.isArray(to) ? to.join(", ") : to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  const rawFrom = process.env["RESEND_FROM_ADDRESS"] || "quotes@codeydev.com";
  const fromName = process.env["RESEND_FROM_NAME"] || "Codey Dev Quotes";
  const primaryFrom = rawFrom.includes("<") ? rawFrom : `${fromName} <${rawFrom}>`;

  try {
    const response = await resend.emails.send({
      from: primaryFrom,
      to,
      subject,
      html,
    });

    // If Resend failed (e.g., domain unverified or sender rejected), attempt fallback to onboarding@resend.dev
    if (response.error) {
      console.warn(`[EMAIL WARNING] Resend failed with primary sender "${primaryFrom}":`, response.error);

      if (!rawFrom.includes("onboarding@resend.dev")) {
        console.info(`[EMAIL RETRY] Attempting delivery with fallback sender "Codey Dev <onboarding@resend.dev>"...`);
        const fallbackResponse = await resend.emails.send({
          from: "Codey Dev <onboarding@resend.dev>",
          to,
          subject,
          html,
        });

        if (!fallbackResponse.error) {
          console.log(`[EMAIL SUCCESS] Email delivered via fallback sender to ${to} (ID: ${fallbackResponse.data?.id})`);
          return { success: true, data: fallbackResponse.data };
        } else {
          console.error(`[EMAIL ERROR] Fallback delivery failed:`, fallbackResponse.error);
          return { success: false, error: fallbackResponse.error };
        }
      }

      return { success: false, error: response.error };
    }

    console.log(`[EMAIL SUCCESS] Email delivered to ${Array.isArray(to) ? to.join(", ") : to} (ID: ${response.data?.id})`);
    return { success: true, data: response.data };
  } catch (err: any) {
    console.error(`[EMAIL EXCEPTION] Failed to dispatch email to ${to}:`, err);
    return { success: false, error: err?.message || String(err) };
  }
}

export async function sendAdminNewRequestNotification(params: {
  referenceNo: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  estimatedMin: number;
  estimatedMax: number;
}) {
  const recipients = getAdminRecipients();
  const html = await render(
    AdminNewRequestEmail({ ...params, adminDashboardUrl: `${ADMIN_URL}/admin` })
  );

  return sendWithResend({
    to: recipients,
    subject: `New Project Request [${params.referenceNo}] — ${params.serviceName} (${params.customerName})`,
    html,
  });
}

export async function sendCustomerConfirmation(params: {
  referenceNo: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  estimatedMin: number;
  estimatedMax: number;
}) {
  const html = await render(
    CustomerConfirmationEmail({ ...params, portalUrl: PUBLIC_URL })
  );

  return sendWithResend({
    to: params.customerEmail,
    subject: `We have received your project request — ${params.referenceNo} · Codey Dev`,
    html,
  });
}

export async function sendCustomerQuote(params: {
  referenceNo: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  finalPrice: number;
  lineItems: Array<{ label: string; priceImpact: number }>;
}) {
  const html = await render(
    CustomerQuoteEmail({
      ...params,
      termsUrl: `${PUBLIC_URL}/terms`,
      portalUrl: PUBLIC_URL,
    })
  );

  return sendWithResend({
    to: params.customerEmail,
    subject: `Your Official Codey Dev Quote — GH₵ ${params.finalPrice.toLocaleString("en-GH")} · ${params.referenceNo}`,
    html,
  });
}

export async function sendAdminNewReviewNotification(params: {
  customerName: string;
  companyName?: string;
  rating: number;
  content: string;
}) {
  const recipients = getAdminRecipients();
  const companyStr = params.companyName ? ` (${params.companyName})` : "";
  const html = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="color: #0E7490;">New Customer Review Received</h2>
      <p>A new ${params.rating}-star review has been submitted and is waiting for your approval.</p>
      <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Customer:</strong> ${params.customerName}${companyStr}</p>
        <p><strong>Rating:</strong> ${params.rating} / 5</p>
        <p><strong>Review:</strong></p>
        <blockquote style="border-left: 4px solid #0E7490; padding-left: 16px; margin-left: 0; font-style: italic;">
          ${params.content}
        </blockquote>
      </div>
      <p>Please log in to the admin dashboard to approve or decline this review.</p>
      <p><a href="${ADMIN_URL}/admin/reviews" style="display: inline-block; padding: 10px 20px; background-color: #0E7490; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Review in Dashboard</a></p>
    </div>
  `;

  return sendWithResend({
    to: recipients,
    subject: `New ${params.rating}-Star Review from ${params.customerName} requires approval`,
    html,
  });
}
