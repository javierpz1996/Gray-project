import type { Metadata } from "next";
import { Barlow_Condensed, Nunito } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./desing-system.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

const nunitoPlay = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-ds-play",
});

export const metadata: Metadata = {
  title: "Design system",
  description:
    "Referencia visual: color, tipografía, espaciado, formas, bordes y sombras.",
  robots: { index: false, follow: false },
};

export default function DesingSystemLayout({
  children,
}: LayoutProps<"/desing-system">) {
  return (
    <div
      className={`ds flex min-h-full flex-1 flex-col ${barlowCondensed.variable} ${nunitoPlay.variable}`}
    >
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </div>
  );
}
