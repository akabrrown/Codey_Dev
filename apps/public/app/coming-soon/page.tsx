import Link from "next/link";
import styles from "./coming-soon.module.css";
import { WhatsAppIcon, EmailIcon } from "../../components/Icons";

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

export default function ComingSoonPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      {/* Background Geometrics (Fixed so it stays while scrolling) */}
      <div className={styles.geoOverlay} style={{ position: "fixed" }}>
        <div className={styles.mountain1}></div>
        <div className={styles.mountain2}></div>
        <div className={styles.mountain3}></div>
        <div className={styles.flare}></div>
      </div>

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
            A lot of carefully made <span className={styles.highlight}>apps</span> and
            beautiful <span className={styles.highlight}>websites</span>, crafted by a
            rare mixture of a workaholic and procrastinator.
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
