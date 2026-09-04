import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CustomerConfirmationProps {
  referenceNo: string;
  customerName: string;
  serviceName: string;
  estimatedMin: number;
  estimatedMax: number;
  portalUrl: string;
}

export function CustomerConfirmationEmail({
  referenceNo,
  customerName,
  serviceName,
  estimatedMin,
  estimatedMax,
  portalUrl,
}: CustomerConfirmationProps) {
  const priceRange = `GH₵ ${estimatedMin.toLocaleString("en-GH")} – ${estimatedMax.toLocaleString("en-GH")}`;

  return (
    <Html>
      <Head />
      <Preview>Your request {referenceNo} is with us — we will follow up within 24 hours</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>CODEY DEV</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>Request Received</Heading>
            <Text style={bodyText}>Hi {customerName},</Text>
            <Text style={bodyText}>
              We have received your request for <strong>{serviceName}</strong>.
              Our team will review it and get back to you within 24 hours with
              a confirmed quote and next steps.
            </Text>

            <Section style={summaryBox}>
              <Text style={summaryLabel}>Your reference number</Text>
              <Text style={summaryRef}>{referenceNo}</Text>
              <Text style={summaryLabel}>Estimated range</Text>
              <Text style={summaryPrice}>{priceRange}</Text>
              <Text style={summaryNote}>
                This is an automated estimate. Your final quote may differ
                based on the specific details of your request.
              </Text>
            </Section>

            <Text style={bodyText}>
              While you wait, you can browse our services and pricing at the
              link below.
            </Text>

            <Button href={`${portalUrl}/pricing`} style={ctaButton}>
              View Pricing
            </Button>

            <Section style={contactBlock}>
              <Text style={contactHeading}>Need to reach us sooner?</Text>
              <Text style={contactText}>
                📞 Call or WhatsApp: <strong>+233 XX XXX XXXX</strong>
                <br />
                ✉️ Email:{" "}
                <strong>codey.it360@gmail.com</strong>
              </Text>
            </Section>

            <Text style={footerText}>
              Codey Dev · codey.it360@gmail.com · You are receiving this
              because you submitted a quote request through our portal.
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
  padding: "24px 32px",
};

const logoText: React.CSSProperties = {
  color: "#FFFFFF",
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
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

const summaryBox: React.CSSProperties = {
  backgroundColor: "#0E2338",
  padding: "20px 24px",
  borderRadius: "4px",
  marginBottom: "24px",
};

const summaryLabel: React.CSSProperties = {
  color: "#9DCAD8",
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  margin: "0",
};

const summaryRef: React.CSSProperties = {
  color: "#35C4E0",
  fontSize: "18px",
  fontWeight: "700",
  margin: "2px 0 16px",
  letterSpacing: "2px",
};

const summaryPrice: React.CSSProperties = {
  color: "#FFFFFF",
  fontSize: "22px",
  fontWeight: "700",
  margin: "2px 0 8px",
};

const summaryNote: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: "12px",
  margin: "0",
  lineHeight: "1.5",
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
