import type { Metadata, Viewport } from "next";
import {
  Barlow_Condensed,
  Inter,
  Noto_Sans_JP,
  Oswald,
  Outfit,
} from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

/* Design system Gray — Barlow Condensed (display) + Inter (cuerpo). */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

/** greatpretender.jp — Oswald 700 (menú / títulos en inglés). */
const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-oswald",
});

/** greatpretender.jp — Noto Sans JP 400/900 (cuerpo). */
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${barlowCondensed.variable} ${oswald.variable} ${notoSansJp.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
