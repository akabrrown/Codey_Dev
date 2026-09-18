import Link from "next/link";
import Image from "next/image";
import styles from "./coming-soon.module.css";
import { WhatsAppIcon, EmailIcon } from "../../components/Icons";
import { loadApprovedReviews } from "../../lib/reviews";

export const metadata = {
  title: "Coming Soon | Codey Dev",
  description: "A lot of carefully made apps and beautiful websites are on the way.",
};

const CREDIBILITY_PILLARS = [
  {
    title: "Performance & Responsive",
    desc: "Engineered specifically for optimal speed and perfect visual fluidity across all devices and network conditions.",
  },
  {
    title: "Secure & SEO Optimized",
    desc: "Built with security best practices, technical on-page SEO, and modern Core Web Vitals optimization.",
  },
  {
    title: "Modern Architectures",
    desc: "Utilizing the latest cloud infrastructure and robust database architectures for scalable enterprise solutions.",
  },
  {
    title: "Direct Engineer Contact",
    desc: "Work directly with the developers building your software via dedicated channels and milestone updates.",
  },
];

export default async function ComingSoonPage() {
  const currentYear = new Date().getFullYear();
  const reviews = await loadApprovedReviews();

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Header */}
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}></div>
            CODEY DEV
          </Link>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://wa.me/233203813606" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn} style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
              WhatsApp Us
            </a>
          </div>
        </header>

        {/* Bento Grid Hero */}
        <main className={styles.heroBento}>
          {/* Main Title Cell */}
          <div className={`${styles.bentoItem} ${styles.heroMain}`}>
            <h1 className={styles.title}>Crafting digital excellence.</h1>
            <p className={styles.subtitle}>
              Transforming complex needs into high-performance <span className={styles.highlight}>apps</span> and premium <span className={styles.highlight}>websites</span>. Reliable engineering with zero compromises.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="mailto:codey.it360@gmail.com" className={styles.primaryBtn}>
                Get Notified
              </a>
            </div>
          </div>

          {/* Image 1 */}
          <div className={`${styles.bentoItem} ${styles.heroImage1}`}>
            <Image 
              src="/images/0d1346fe637831714d4a0a704c4c48a8.jpg"
              alt="Premium Design"
              fill
              className={styles.bentoImage}
            />
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageContent}>
              <span className={styles.imageTag}>Visuals</span>
              <div className={styles.imageTitle}>Stunning UI</div>
            </div>
          </div>

          {/* Image 2 */}
          <div className={`${styles.bentoItem} ${styles.heroImage2}`}>
            <Image 
              src="/images/9ac4d91a49d9804d9ab1f6c63fbb8ee2.jpg"
              alt="Development"
              fill
              className={styles.bentoImage}
            />
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageContent}>
              <span className={styles.imageTag}>Code</span>
              <div className={styles.imageTitle}>Clean Arch</div>
            </div>
          </div>

          {/* Image 3 */}
          <div className={`${styles.bentoItem} ${styles.heroImage3}`}>
            <Image 
              src="/images/68e0483eb5273624d74554dfc62457c4.jpg"
              alt="Innovation"
              fill
              className={styles.bentoImage}
            />
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageContent}>
              <span className={styles.imageTag}>Scale</span>
              <div className={styles.imageTitle}>Robust Infra</div>
            </div>
          </div>

          {/* Contact Mini Cell */}
          <div className={`${styles.bentoItem} ${styles.heroContact}`}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem', color: '#FFF' }}>Ready to start?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              We are currently accepting new clients for custom projects while we rebuild our portal.
            </p>
            <a href="https://wa.me/233203813606" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              Contact Sales
            </a>
          </div>
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
          <section id="testimonials" className={styles.section} style={{ paddingTop: 0 }}>
            <h2 className={styles.sectionTitle}>What our clients say</h2>
            <div className={styles.aboutGrid}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.aboutCard} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "1.5rem" }}>
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < review.rating ? "#35C4E0" : "transparent"}
                        stroke={i < review.rating ? "#35C4E0" : "rgba(255,255,255,0.2)"}
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
                    margin: "0 0 1.5rem 0",
                    fontSize: "1rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: 1.6,
                    fontStyle: "italic"
                  }}>
                    "{review.content}"
                  </blockquote>
                  <div>
                    <div style={{ fontWeight: 600, color: "#FFF" }}>{review.customerName}</div>
                    {review.companyName && (
                      <div style={{ fontSize: "0.8125rem", color: "#35C4E0", marginTop: "4px" }}>{review.companyName}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
