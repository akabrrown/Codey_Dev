import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Codey Dev — Get an Instant Project Quote",
    template: "%s | Codey Dev",
  },
  description:
    "Describe your project, select the features you need, and get an instant price estimate from Codey Dev. Web design, custom software, mobile apps, and more.",
  keywords: ["web development Ghana", "custom software Ghana", "mobile app development", "Codey Dev", "quote portal"],
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Codey Dev",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
