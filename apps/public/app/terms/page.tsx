import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of service governing web development, custom software, and digital solutions by Codey Dev.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <div className="container" style={{ padding: "var(--space-12) 0", maxWidth: 760 }}>
          <h1 style={{ marginBottom: "var(--space-2)" }}>Terms &amp; Conditions</h1>
          <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-10)" }}>
            Effective date: 31 August 2026 · Accra, Ghana
          </p>

          <div className="callout" style={{ marginBottom: "var(--space-8)" }}>
            <p className="callout__text">
              These Terms &amp; Conditions govern every project undertaken by Codey Dev on behalf of a client.
              By paying a deposit, signing a Service Agreement, or instructing us to begin work, you agree to these Terms.
            </p>
          </div>

          {[
            {
              heading: "1. Definitions",
              content:
                "\"Project\" means the website, software, mobile app, or other deliverable agreed in writing (quotation, proposal, or Service Agreement). \"Deliverables\" means the specific files, systems, or documents Codey Dev will hand over on completion. \"Scope\" means the features, pages, screens, and functionality listed in the agreed quotation or Service Agreement.",
            },
            {
              heading: "2. Scope of Work",
              content:
                "Work begins only on items explicitly listed in the agreed quotation or Service Agreement. Anything not listed (extra pages, extra features, additional integrations, translated content) is treated as new work and will be quoted separately. Where a client requests changes that fall outside the agreed Scope, Codey Dev will provide a revised quotation before proceeding.",
            },
            {
              heading: "3. Payment Terms",
              content:
                "A non-refundable deposit of 50% of the total project cost is required before work begins, unless milestone-based payments are agreed for larger projects (above GH₵ 15,000). The remaining balance is due on completion, before final files, source code, or admin access are handed over. For retainers (maintenance, hosting, SEO), fees are billed monthly in advance. Accepted payment methods: Mobile Money (MTN MoMo, Vodafone/Telecel Cash, AirtelTigo Money) and bank transfer. All prices are in Ghana Cedis (GH₵) and exclude third-party fees (domain registration, cloud hosting, API credits).",
            },
            {
              heading: "4. Project Timeline",
              content:
                "Estimated delivery timelines begin once the deposit is received and all required materials (content, logos, images, credentials) are supplied by the Client. Delays caused by late feedback, missing assets, or unavailability of the Client's team will extend the delivery date accordingly and are not considered a delay on Codey Dev's part.",
            },
            {
              heading: "5. Revisions",
              content:
                "Each project includes two (2) rounds of consolidated revisions within the agreed Scope, to be requested within 14 days of a milestone or draft being delivered. Additional revision rounds or revisions that modify agreed Scope are billed separately per the Revision Policy.",
            },
            {
              heading: "6. Client Responsibilities",
              content:
                "The Client is responsible for providing accurate, complete, and timely content needed for the project; reviewing and responding to draft deliverables within a reasonable time (recommended: 5 working days); ensuring third-party accounts are accessible; and obtaining legal rights and copyright clearance for all assets supplied.",
            },
            {
              heading: "7. Intellectual Property & Ownership",
              content:
                "Upon full and final payment, ownership of custom code, design files, and content created specifically for the Client's project transfers completely to the Client. Pre-existing tools, open-source libraries, and reusable framework components remain licensed for use within the deliverable. Codey Dev reserves the right to display completed work in its portfolio and case studies unless confidentiality is requested in writing.",
            },
            {
              heading: "8. Third-Party Costs & Services",
              content:
                "Domain registration (.com, .com.gh), cloud hosting, SSL certificates, SMS gateways, and payment gateway transaction fees are the Client's responsibility unless expressly included in the contract quotation.",
            },
            {
              heading: "9. Confidentiality",
              content:
                "Codey Dev keeps confidential any non-public business information, data, or credentials shared by the Client, and will not disclose them to third parties except as required to deliver the project (e.g. hosting providers, payment gateways) or required by Ghanaian law.",
            },
            {
              heading: "10. Warranty & Post-Delivery Support",
              content:
                "Codey Dev provides a 30-day free bug-fix warranty period after final delivery, covering defects in the agreed functionality. Support beyond this period is available under an ongoing Maintenance Plan.",
            },
            {
              heading: "11. Limitation of Liability",
              content:
                "To the extent permitted by Ghanaian law, Codey Dev's total liability for any claim arising from a project is limited to the total fees paid by the Client for that specific project. Codey Dev is not liable for indirect or consequential losses, lost profits, or data loss.",
            },
            {
              heading: "12. Cancellation & Termination",
              content:
                "Either party may terminate a project in writing. If the Client cancels after work has commenced, the deposit is retained to cover work completed, and the Client is billed for any additional work delivered beyond the deposit value per the Refund Policy.",
            },
            {
              heading: "13. Force Majeure",
              content:
                "Neither party is liable for delay or failure to perform obligations caused by events beyond reasonable control, including power/internet grid disruptions, natural disasters, or service provider outages.",
            },
            {
              heading: "14. Communication",
              content:
                "Project communication is conducted via WhatsApp (0203813606), telephone (0592722997), and email (codey.it360@gmail.com). Instructions given through these channels are treated as valid client authorization.",
            },
            {
              heading: "15. Governing Law",
              content:
                "These Terms are governed by the laws of the Republic of Ghana. Any disputes shall first be addressed through good-faith negotiation before external legal resolution is pursued.",
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
              Questions regarding these Terms? Contact us via WhatsApp at{" "}
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
