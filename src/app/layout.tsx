import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFEBridge Business Intelligence",
  description: "Lead Acquisition, Tender Discovery & Enquiry Intelligence for LIFEBridge MedTech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
