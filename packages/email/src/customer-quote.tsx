import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface QuoteLineItem {
  label: string;
  priceImpact: number;
}

interface CustomerQuoteProps {
  referenceNo: string;
  customerName: string;
  serviceName: string;
  finalPrice: number;
  lineItems: QuoteLineItem[];
  validityDays?: number;
  termsUrl: string;
  portalUrl: string;
}

export function CustomerQuoteEmail({
  referenceNo,
  customerName,
  serviceName,
  finalPrice,
  lineItems,
  validityDays = 14,
  termsUrl,
  portalUrl,
}: CustomerQuoteProps) {
  const formattedPrice = `GH₵ ${finalPrice.toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;

  return (
    <Html>
      <Head />
      <Preview>
        Your quote for {serviceName} — {formattedPrice} · Ref: {referenceNo}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>CODEY DEV</Text>
            <Text style={headerSub}>Client Quote</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>Your Quote Is Ready</Heading>
            <Text style={bodyText}>Hi {customerName},</Text>
            <Text style={bodyText}>
              Thank you for your patience. Here is the confirmed quote for
              your <strong>{serviceName}</strong> project.
            </Text>

            <Section style={priceBlock}>
              <Text style={priceLabel}>Total Project Cost</Text>
              <Text style={priceValue}>{formattedPrice}</Text>
              <Text style={priceRef}>Reference: {referenceNo}</Text>
            </Section>

            <Heading style={breakdownHeading}>What is included</Heading>
            <Section style={breakdownTable}>
              {lineItems.map((item, i) => (
                <Row key={i} style={breakdownRow}>
                  <Text style={breakdownItem}>{item.label}</Text>
                  <Text style={breakdownAmount}>
                    GH₵ {item.priceImpact.toLocaleString("en-GH")}
                  </Text>
                </Row>
              ))}
              <Row style={totalRow}>
                <Text style={totalLabel}>Total</Text>
                <Text style={totalAmount}>{formattedPrice}</Text>
              </Row>
            </Section>

            <Section style={nextSteps}>
              <Text style={nextHeading}>Next steps</Text>
              <Text style={nextText}>
                1. Review the quote and reply to this email to confirm
                acceptance.
                <br />
                2. Pay the 50% deposit (
                <strong>
                  GH₵{" "}
                  {(finalPrice * 0.5).toLocaleString("en-GH", {
                    minimumFractionDigits: 2,
                  })}
                </strong>
                ) via Mobile Money or bank transfer — details will be shared on
                acceptance.
                <br />
                3. Sign the Service Agreement — we will send it once the
                deposit is confirmed.
              </Text>
            </Section>

            <Text style={bodyText}>
              This quote is valid for{" "}
              <strong>{validityDays} days</strong> from the date of this email.
              Please review our{" "}
              <a href={termsUrl} style={link}>
                Terms &amp; Conditions
              </a>{" "}
              before accepting.
            </Text>

            <Button href={`mailto:codey.it360@gmail.com?subject=Accepting quote ${referenceNo}`} style={ctaButton}>
              Accept This Quote
            </Button>

            <Section style={contactBlock}>
              <Text style={contactHeading}>Have questions about this quote?</Text>
              <Text style={contactText}>
                📞 Call or WhatsApp: <strong>+233 XX XXX XXXX</strong>
                <br />
                ✉️ Email: <strong>codey.it360@gmail.com</strong>
              </Text>
            </Section>

            <Text style={footerText}>
              Codey Dev · codey.it360@gmail.com · This quote was generated in
              response to request {referenceNo}. It is not a contract — the
              Service Agreement constitutes the binding agreement between
              both parties.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#F4F7FA",
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
};
const container: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "4px",
  overflow: "hidden",
};
const header: React.CSSProperties = {
  backgroundColor: "#0E2338",
  padding: "24px 32px 20px",
};
const logoText: React.CSSProperties = {
  color: "#FFFFFF",
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
};
const headerSub: React.CSSProperties = {
  color: "#35C4E0",
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  margin: "4px 0 0",
};
const content: React.CSSProperties = { padding: "32px" };
const heading: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 20px",
};
const bodyText: React.CSSProperties = {
  color: "#3A3A3A",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};
const priceBlock: React.CSSProperties = {
  backgroundColor: "#0E2338",
  padding: "24px",
  borderRadius: "4px",
  marginBottom: "28px",
  textAlign: "center" as const,
};
const priceLabel: React.CSSProperties = {
  color: "#9DCAD8",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0",
};
const priceValue: React.CSSProperties = {
  color: "#FFFFFF",
  fontSize: "32px",
  fontWeight: "700",
  margin: "4px 0 8px",
};
const priceRef: React.CSSProperties = {
  color: "#35C4E0",
  fontSize: "13px",
  letterSpacing: "1px",
  margin: "0",
};
const breakdownHeading: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0 0 12px",
};
const breakdownTable: React.CSSProperties = {
  border: "1px solid #E5E7EB",
  borderRadius: "4px",
  marginBottom: "24px",
  overflow: "hidden",
};
const breakdownRow: React.CSSProperties = {
  borderBottom: "1px solid #E5E7EB",
  padding: "10px 16px",
};
const breakdownItem: React.CSSProperties = {
  color: "#3A3A3A",
  fontSize: "14px",
  margin: "0",
};
const breakdownAmount: React.CSSProperties = {
  color: "#6B7280",
  fontSize: "14px",
  textAlign: "right" as const,
  margin: "0",
};
const totalRow: React.CSSProperties = {
  backgroundColor: "#F2F8FA",
  padding: "12px 16px",
};
const totalLabel: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0",
};
const totalAmount: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "15px",
  fontWeight: "700",
  textAlign: "right" as const,
  margin: "0",
};
const nextSteps: React.CSSProperties = {
  borderLeft: "4px solid #F0522A",
  backgroundColor: "#FDEAE4",
  padding: "16px 20px",
  borderRadius: "0 4px 4px 0",
  marginBottom: "24px",
};
const nextHeading: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "14px",
  fontWeight: "700",
  margin: "0 0 8px",
};
const nextText: React.CSSProperties = {
  color: "#3A3A3A",
  fontSize: "14px",
  lineHeight: "1.8",
  margin: "0",
};
const link: React.CSSProperties = {
  color: "#35C4E0",
  textDecoration: "underline",
};
const ctaButton: React.CSSProperties = {
  backgroundColor: "#F0522A",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "600",
  padding: "14px 28px",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "28px",
};
const contactBlock: React.CSSProperties = {
  borderLeft: "4px solid #35C4E0",
  backgroundColor: "#E7F6FA",
  padding: "16px 20px",
  borderRadius: "0 4px 4px 0",
  marginBottom: "28px",
};
const contactHeading: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "14px",
  fontWeight: "700",
  margin: "0 0 8px",
};
const contactText: React.CSSProperties = {
  color: "#3A3A3A",
  fontSize: "14px",
  lineHeight: "1.8",
  margin: "0",
};
const footerText: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: "12px",
  lineHeight: "1.6",
  borderTop: "1px solid #E5E7EB",
  paddingTop: "20px",
  margin: "0",
};
