import { Resend } from "resend";
import {
  render,
  AdminNewRequestEmail,
  CustomerConfirmationEmail,
  CustomerQuoteEmail,
} from "@codey/email";

function getResend() {
  const key = process.env["RESEND_API_KEY"];
  if (!key) {
    console.warn("RESEND_API_KEY not configured. Email will be simulated in development.");
    return null;
  }
  return new Resend(key);
}

const FROM = process.env["RESEND_FROM_ADDRESS"] ?? "quotes@codeydev.com";
const ADMIN_EMAIL = process.env["ADMIN_NOTIFICATION_EMAIL"] ?? "codey.it360@gmail.com";
const PUBLIC_URL = process.env["PUBLIC_PORTAL_URL"] ?? "http://localhost:3000";
const ADMIN_URL = process.env["ADMIN_PORTAL_URL"] ?? "http://localhost:3001";

export async function sendAdminNewRequestNotification(params: {
  referenceNo: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  estimatedMin: number;
  estimatedMax: number;
}) {
  const resend = getResend();
  if (!resend) {
    console.log(`[EMAIL SIMULATION] Admin notification for ${params.referenceNo}`);
    return { data: { id: "simulated" }, error: null };
  }
  const html = await render(
    AdminNewRequestEmail({ ...params, adminDashboardUrl: `${ADMIN_URL}/admin` })
  );
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New request ${params.referenceNo} — ${params.serviceName}`,
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
  const resend = getResend();
  if (!resend) {
    console.log(`[EMAIL SIMULATION] Customer confirmation for ${params.referenceNo} to ${params.customerEmail}`);
    return { data: { id: "simulated" }, error: null };
  }
  const html = await render(
    CustomerConfirmationEmail({ ...params, portalUrl: PUBLIC_URL })
  );
  return resend.emails.send({
    from: FROM,
    to: params.customerEmail,
    subject: `Your quote request is with us — ${params.referenceNo}`,
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
  const resend = getResend();
  if (!resend) {
    console.log(`[EMAIL SIMULATION] Customer quote for ${params.referenceNo} to ${params.customerEmail}`);
    return { data: { id: "simulated" }, error: null };
  }
  const html = await render(
    CustomerQuoteEmail({
      ...params,
      termsUrl: `${PUBLIC_URL}/terms`,
      portalUrl: PUBLIC_URL,
    })
  );
  return resend.emails.send({
    from: FROM,
    to: params.customerEmail,
    subject: `Your Codey Dev quote — GH₵ ${params.finalPrice.toLocaleString("en-GH")} · ${params.referenceNo}`,
    html,
  });
}
