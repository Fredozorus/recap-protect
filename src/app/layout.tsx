import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Recap Protec",
  description: "Protection et sécurité au service de tous",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <body
        className={`${spaceGrotesk.variable} antialiased`}
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          minHeight: '100vh',
          fontFamily: 'var(--font-space-grotesk), system-ui, -apple-system, sans-serif',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ flex: 1, width: '100%' }}>
          {children}
        </div>
      </body>
    </html>
  );
}