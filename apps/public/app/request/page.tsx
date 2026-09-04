import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ServiceSelectionClient from "./ServiceSelectionClient";

export const metadata: Metadata = {
  title: "Start a Request — Step 1: Service Selection",
  description: "Choose the type of project you need from Codey Dev.",
};

async function loadServices() {
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 300 }, // cache for 5 minutes
    });
    if (!res.ok) throw new Error("Services unavailable");
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export default async function RequestPage() {
  const services = await loadServices();

  if (!services) {
    return (
      <>
        <SiteHeader />
        <main id="main-content" style={{ padding: "var(--space-16) var(--space-4)", textAlign: "center" }}>
          <h1 style={{ color: "var(--color-navy-dark)" }}>Service list unavailable</h1>
          <p style={{ color: "var(--color-muted)" }}>
            The service list could not be loaded right now. Please try again in a moment or{" "}
            <a href="/contact">contact us directly</a>.
          </p>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={1}
          aria-valuemin={1}
          aria-valuemax={6}
          aria-label="Step 1 of 6"
        >
          <div className="container">
            <div className="progress-bar__inner">
              <span className="progress-bar__label">Step 1 of 6</span>
              <div className="progress-bar__track">
                <div className="progress-bar__fill" style={{ width: "16.67%" }} />
              </div>
              <span className="progress-bar__label">Service Selection</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-12)" }}>
          <h1 style={{ marginBottom: "var(--space-2)" }}>What can we build for you?</h1>
          <p style={{ color: "var(--color-muted)", marginBottom: 0 }}>
            Select a service to get started. The form adapts to your choice.
          </p>
          <ServiceSelectionClient services={services} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
