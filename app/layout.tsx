import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { HomeButton } from "@/components/shared/HomeButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowdell Card Decks",
  description:
    "A self-coaching toolkit for career values, skills, interests, and leisure. Bộ công cụ tự khai vấn cho giá trị, kỹ năng, sở thích nghề nghiệp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HomeButton />
        <LanguageToggle />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
