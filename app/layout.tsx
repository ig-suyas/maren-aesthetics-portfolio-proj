import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const title = "Maren Aesthetics · Physician-led aesthetics in Scottsdale";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Maren Aesthetics" },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName, title, description: siteDescription, url: "/", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description: siteDescription },
};

export const viewport: Viewport = {
  themeColor: "#f3ece6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hanken.variable} ${cormorant.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Scroll reveals only hide content once we know JS can show it again */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-pill bg-ink px-5 py-3 text-sm font-medium text-stone transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
