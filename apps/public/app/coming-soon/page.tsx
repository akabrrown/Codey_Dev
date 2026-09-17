import Link from "next/link";
import styles from "./coming-soon.module.css";

export const metadata = {
  title: "Coming Soon | Codey Dev",
  description: "A lot of carefully made apps and beautiful websites are on the way.",
};

export default function ComingSoonPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.container}>
      {/* Background Geometrics */}
      <div className={styles.geoOverlay}>
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
            <Link href="mailto:codey.it360@gmail.com" className={styles.navLink}>
              Contact
            </Link>
            <Link href="mailto:codey.it360@gmail.com" className={styles.navLink}>
              Email
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          <h1 className={styles.title}>Coming soon</h1>
          <p className={styles.subtitle}>
            A lot of carefully made <span className={styles.highlight}>apps</span> and
            beautiful <span className={styles.highlight}>websites</span>, crafted by a
            rare mixture of a workaholic and procrastinator.
          </p>

          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.followBtn}
          >
            Follow
          </a>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div>&copy; {currentYear} - All rights reserved</div>
          <div className={styles.social}>
            {/* Simple text or SVG icons for social */}
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Behance">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.22 13.53H6V11.2h2.22c.67 0 1.25.1 1.74.31.5.21.75.64.75 1.3 0 .5-.21.89-.64 1.15-.43.27-1 .4-1.85.57zm.76-4.66H6v-2h2.69c.67 0 1.18.09 1.54.27.35.18.53.53.53 1.05 0 .42-.14.75-.41 1-.27.24-.72.36-1.37.36zm5.82-2v1.5h4.63v-1.5h-4.63zm-3.4 8.7c-1.12.56-2.61.85-4.48.85H0V2.2h7.32c2.06 0 3.63.38 4.69 1.13 1.07.75 1.6 1.83 1.6 3.23 0 1.05-.33 1.93-1 2.65-.67.72-1.6 1.15-2.78 1.29 1.39.2 2.45.69 3.2 1.48.74.79 1.12 1.83 1.12 3.1 0 1.54-.58 2.76-1.75 3.65v.02c-.01.01-1.01.76-1.01.76zM15 13.06h8.89c.04-.37.05-.72.05-1.07 0-1.86-.49-3.32-1.47-4.38-.98-1.06-2.31-1.59-4.01-1.59-1.88 0-3.35.6-4.41 1.81-1.07 1.21-1.6 2.82-1.6 4.83 0 2 .54 3.59 1.62 4.78 1.08 1.19 2.59 1.79 4.54 1.79 1.44 0 2.67-.32 3.67-.97 1.01-.65 1.65-1.52 1.94-2.61h-2.12c-.22.56-.63.98-1.22 1.25-.59.27-1.31.4-2.16.4-1.14 0-1.99-.29-2.55-.87-.56-.58-.88-1.44-.95-2.59h-.22v-.78zm2.25-3.8c.6 0 1.05.21 1.34.62.29.41.44 1 .44 1.76h-3.66c.07-.8.27-1.4.61-1.79.34-.39.77-.59 1.27-.59z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
