import type { Metadata } from "next";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import ServiceStepsClient from "./ServiceStepsClient";

export const metadata: Metadata = {
  title: "Build Your Request",
  description: "Configure your project requirements and get an instant price estimate.",
};

async function loadServices() {
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error();
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const services = await loadServices();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {services ? (
          <ServiceStepsClient services={services} serviceSlug={service}>
            {children}
          </ServiceStepsClient>
        ) : (
          <div style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center" }}>
            <p style={{ color: "var(--color-muted)" }}>
              Could not load services. <a href="/contact">Contact us</a> directly.
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
