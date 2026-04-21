import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { HomeButton } from "@/components/shared/HomeButton";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Knowdell Card Decks",
  description:
    "A self-coaching toolkit for career values, skills, interests, and leisure. Bộ công cụ tự khai vấn cho giá trị, kỹ năng, sở thích nghề nghiệp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${spaceMono.variable}`}>
        <HomeButton />
        <LanguageToggle />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
