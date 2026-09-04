import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Company Policies",
  description:
    "Codey Dev's practical policies on payments, refunds, revisions, data protection, and maintenance.",
};

export default function PoliciesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="container" style={{ padding: "var(--space-12) 0", maxWidth: 760 }}>
          <h1 style={{ marginBottom: "var(--space-2)" }}>Company Policies</h1>
          <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-10)" }}>
            Effective date: 31 August 2026 · Accra, Ghana
          </p>

          <div className="callout" style={{ marginBottom: "var(--space-8)" }}>
            <p className="callout__text">
              These policies work alongside our Terms &amp; Conditions to explain, in practical terms,
              how payments, changes, cancellations, and data are handled on every Codey Dev project.
            </p>
          </div>

          {[
            {
              heading: "1. Payment Policy",
              content:
                "A 50% deposit is required before any work begins. The remaining 50% is due on completion, before final handover of files, source code, or admin/hosting access. For projects above GH₵ 15,000, payment may be split into milestones (e.g. 40% deposit / 40% at midpoint / 20% on delivery) as stated in the Service Agreement. Maintenance, hosting management, and SEO retainers are billed monthly in advance on the same date each month. Accepted channels: MTN Mobile Money, Vodafone/Telecel Cash, AirtelTigo Money, or bank transfer. Work is paused if a milestone payment is overdue by more than 7 days.",
            },
            {
              heading: "2. Refund & Cancellation Policy",
              content:
                "Before work begins: If the Client cancels before any work has started, the deposit is refundable minus a 10% administrative fee. After work has started: The deposit becomes non-refundable, as it covers committed engineering hours and resources; Codey Dev will invoice for all work completed beyond the deposit value at standard rates, and the Client receives all deliverables completed and paid for up to the point of cancellation. Completed projects: No refunds are issued once a project has been delivered and signed off, except where Codey Dev fails to deliver the agreed Scope and cannot remedy it within a reasonable time, in which case a partial refund may be negotiated in good faith.",
            },
            {
              heading: "3. Revision & Change Request Policy",
              content:
                "Two (2) rounds of consolidated revisions within the agreed Scope are included at no additional charge, to be submitted within 14 days of each draft. Additional revision rounds (round 3+) are billed at GH₵ 150 – 400 per round depending on complexity. Any change that adds new pages, screens, or features is treated as new work and quoted separately before proceeding. Changes requested after final sign-off are quoted as a maintenance request or new mini-project.",
            },
            {
              heading: "4. Privacy & Confidentiality Policy",
              content:
                "Any business data, login credentials, or personal information shared by the Client is used solely for the purpose of delivering the project. Credentials (hosting, domain, payment gateway) are stored securely and never shared with unrelated third parties. Codey Dev will delete credentials and data from its systems upon request once a project and warranty period have concluded. The Client remains the data controller under Ghana's Data Protection Act, 2012 (Act 843).",
            },
            {
              heading: "5. Hosting & Maintenance Policy",
              content:
                "Where Codey Dev manages hosting on the Client's behalf, hosting fees are billed annually or monthly as agreed, with renewal reminders issued at least 14 days before expiry. Clients without a maintenance plan are responsible for their own hosting renewals, backups, and security updates after handover. Emergency support outside a maintenance plan is available on a pay-per-incident basis billed at GH₵ 200 – 500 depending on severity.",
            },
            {
              heading: "6. Data Backup Policy",
              content:
                "For projects under an active Maintenance Plan, Codey Dev performs regular automated backups of database and files (Basic Care: monthly; Standard/Premium Care: weekly or better). Backups are retained on a rolling schedule for disaster recovery. For projects without a Maintenance Plan, automated backup tools can be configured as a one-time paid add-on.",
            },
          ].map((section) => (
            <section key={section.heading} style={{ marginBottom: "var(--space-8)" }}>
              <h2 style={{ fontSize: "1.125rem", marginBottom: "var(--space-3)", color: "var(--color-navy-dark)" }}>
                {section.heading}
              </h2>
              <p style={{ color: "var(--color-text)", lineHeight: 1.75, margin: 0 }}>
                {section.content}
              </p>
            </section>
          ))}

          <div className="callout" style={{ marginTop: "var(--space-6)" }}>
            <p className="callout__text">
              Questions about these policies? Contact our technical team before signing your agreement — WhatsApp{" "}
              <a href="https://wa.me/233203813606" target="_blank" rel="noopener noreferrer">0203813606</a>, call{" "}
              <a href="tel:0592722997">0592722997</a>, or email{" "}
              <a href="mailto:codey.it360@gmail.com">codey.it360@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
