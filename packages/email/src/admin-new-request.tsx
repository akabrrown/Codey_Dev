import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface AdminNewRequestProps {
  referenceNo: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  estimatedMin: number;
  estimatedMax: number;
  adminDashboardUrl: string;
}

export function AdminNewRequestEmail({
  referenceNo,
  serviceName,
  customerName,
  customerEmail,
  customerPhone,
  estimatedMin,
  estimatedMax,
  adminDashboardUrl,
}: AdminNewRequestProps) {
  const priceRange = `GH₵ ${estimatedMin.toLocaleString("en-GH")} – ${estimatedMax.toLocaleString("en-GH")}`;

  return (
    <Html>
      <Head />
      <Preview>New request {referenceNo} — {serviceName} from {customerName}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>CODEY DEV</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>New Quote Request</Heading>
            <Text style={reference}>{referenceNo}</Text>

            <Section style={detailBox}>
              <Row>
                <Text style={detailLabel}>Service</Text>
                <Text style={detailValue}>{serviceName}</Text>
              </Row>
              <Row>
                <Text style={detailLabel}>Customer</Text>
                <Text style={detailValue}>{customerName}</Text>
              </Row>
              <Row>
                <Text style={detailLabel}>Email</Text>
                <Text style={detailValue}>{customerEmail}</Text>
              </Row>
              <Row>
                <Text style={detailLabel}>Phone</Text>
                <Text style={detailValue}>{customerPhone}</Text>
              </Row>
              <Row>
                <Text style={detailLabel}>Auto-estimate</Text>
                <Text style={{ ...detailValue, fontWeight: "700", color: "#35C4E0" }}>
                  {priceRange}
                </Text>
              </Row>
            </Section>

            <Button href={adminDashboardUrl} style={ctaButton}>
              Open in Dashboard
            </Button>

            <Text style={footer}>
              Codey Dev · codey.it360@gmail.com · This email was sent because a
              new request was submitted through the quote portal.
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

const content: React.CSSProperties = {
  padding: "32px",
};

const heading: React.CSSProperties = {
  color: "#0E2338",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 4px",
};

const reference: React.CSSProperties = {
  color: "#35C4E0",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 24px",
  letterSpacing: "1px",
};

const detailBox: React.CSSProperties = {
  borderLeft: "4px solid #35C4E0",
  backgroundColor: "#E7F6FA",
  padding: "16px 20px",
  borderRadius: "0 4px 4px 0",
  marginBottom: "28px",
};

const detailLabel: React.CSSProperties = {
  color: "#6B7280",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: "0",
};

const detailValue: React.CSSProperties = {
  color: "#3A3A3A",
  fontSize: "15px",
  margin: "0 0 12px",
};

const ctaButton: React.CSSProperties = {
  backgroundColor: "#0E2338",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "600",
  padding: "14px 28px",
  borderRadius: "4px",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "32px",
};

const footer: React.CSSProperties = {
  color: "#9CA3AF",
  fontSize: "12px",
  lineHeight: "1.6",
  borderTop: "1px solid #E5E7EB",
  paddingTop: "20px",
  margin: "0",
};
