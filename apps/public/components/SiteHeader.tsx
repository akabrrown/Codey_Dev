"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", exact: true },
    { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/policies", label: "Policies" },
    { href: "/terms", label: "Terms" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="site-header" role="banner">
      <div className="container">
        <div className="site-header__inner">
          <Link href="/" className="site-header__logo" aria-label="Codey Dev — Home">
            <span className="site-header__logo-mark" aria-hidden="true" />
            <span>CODEY DEV</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-header__nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href) && link.href !== "/";

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`site-header__link ${isActive ? "site-header__link--active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link href="/request" className="btn btn--primary btn--sm">
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="site-header__toggle"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`site-header__hamburger ${mobileMenuOpen ? "open" : ""}`} />
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="site-header__mobile-menu">
            <nav className="site-header__mobile-nav" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="site-header__mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ paddingTop: "var(--space-2)" }}>
                <Link
                  href="/request"
                  className="btn btn--primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start a Quote Request
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
