import Link from "next/link";
import styles from "./coming-soon.module.css";
import { WhatsAppIcon, EmailIcon } from "../../components/Icons";
import BackgroundSlider from "../../components/BackgroundSlider";
import { loadApprovedReviews } from "../../lib/reviews";

export const metadata = {
  title: "Coming Soon | Codey Dev",
  description: "A lot of carefully made apps and beautiful websites are on the way.",
};

const CREDIBILITY_PILLARS = [
  {
    title: "Performance & mobile responsive",
    desc: "Engineered specifically for Ghanaian mobile networks and devices. Fast load times, responsive breakpoints, and zero bloat.",
  },
  {
    title: "Secure, reliable & SEO optimized",
    desc: "Built with security best practices, technical on-page SEO, Google Business profile setup, and Core Web Vitals optimization.",
  },
  {
    title: "Cloud hosting & payment integration",
    desc: "Direct Paystack and Mobile Money (MTN MoMo, Telecel Cash) checkout flows plus cloud infrastructure configuration.",
  },
  {
    title: "24/7 support & direct engineer contact",
    desc: "Work directly with the developers building your software via dedicated WhatsApp channels (0203813606) and weekly milestones.",
  },
];

export default async function ComingSoonPage() {
  const currentYear = new Date().getFullYear();
  const reviews = await loadApprovedReviews();

  return (
    <div className={styles.container}>
      <BackgroundSlider />

      <div className={styles.contentWrapper}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}></div>
            CODEY DEV
          </Link>

          <nav className={styles.nav}>
            <Link href="#about" className={styles.navLink}>
              About
            </Link>
            <Link href="#contact" className={styles.navLink}>
              Contact
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <main className={styles.main} style={{ minHeight: "calc(100vh - 80px)", paddingBottom: "var(--space-16)" }}>
          <h1 className={styles.title}>Coming soon</h1>
          <p className={styles.subtitle}>
            Transforming complex business needs into high-performance <span className={styles.highlight}>apps</span> and premium <span className={styles.highlight}>websites</span>. Reliable engineering with zero compromises.
          </p>

          <a 
            href="https://wa.me/233203813606" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.followBtn}
          >
            Chat on WhatsApp
          </a>
        </main>

        {/* About Section */}
        <section id="about" className={styles.section}>
          <h2 className={styles.sectionTitle}>Built on engineering rigor</h2>
          <div className={styles.aboutGrid}>
            {CREDIBILITY_PILLARS.map((pillar) => (
              <div key={pillar.title} className={styles.aboutCard}>
                <h3 className={styles.aboutCardTitle}>{pillar.title}</h3>
                <p className={styles.aboutCardDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        {reviews.length > 0 && (
          <section id="testimonials" className={styles.section}>
            <h2 className={styles.sectionTitle}>What our clients say</h2>
            <div className={styles.aboutGrid}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.aboutCard} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "var(--space-3)" }}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < review.rating ? "var(--color-teal)" : "transparent"}
                        stroke={i < review.rating ? "var(--color-teal)" : "var(--color-border)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote style={{ 
                    flex: 1,
                    margin: "0 0 var(--space-4) 0",
                    fontSize: "0.9375rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.6,
                    fontStyle: "italic"
                  }}>
                    "{review.content}"
                  </blockquote>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--color-white)" }}>{review.customerName}</div>
                    {review.companyName && (
                      <div style={{ fontSize: "0.8125rem", color: "var(--color-teal)" }}>{review.companyName}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className={styles.section}>
          <h2 className={styles.sectionTitle}>Get in touch</h2>
          <form 
            className={styles.contactForm} 
            action="https://formsubmit.co/codey.it360@gmail.com" 
            method="POST"
          >
            {/* Configuration for FormSubmit */}
            <input type="hidden" name="_subject" value="New Inquiry from Codey Dev Coming Soon Page!" />
            <input type="hidden" name="_template" value="table" />
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
              <input type="text" id="name" name="name" className={styles.formInput} required placeholder="Kwame Osei" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input type="email" id="email" name="email" className={styles.formInput} required placeholder="kwame@example.com" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message / Inquiry</label>
              <textarea id="message" name="message" className={styles.formTextarea} required placeholder="Tell us about your project..."></textarea>
            </div>

            <button type="submit" className={styles.formSubmit}>Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div>&copy; {currentYear} Codey Dev - All rights reserved</div>
          <div className={styles.social}>
            <a href="https://wa.me/233203813606" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
              <WhatsAppIcon size={24} />
            </a>
            <a href="mailto:codey.it360@gmail.com" className={styles.socialIcon} aria-label="Email">
              <EmailIcon size={24} />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
