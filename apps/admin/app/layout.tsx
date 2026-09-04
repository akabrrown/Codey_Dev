import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Codey Dev Admin Portal",
    template: "%s | Codey Dev Admin",
  },
  description: "Internal administration portal for Codey Dev quote management and pricing catalog.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
