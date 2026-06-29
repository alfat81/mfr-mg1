import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mfr-mg.ru"),
  title: "Кубок России по фигурному управлению мотоциклом 2026 | Комиссия МФР",
  description:
    "Официальный сайт Комиссии по фигурному управлению мотоциклом (мотоджимхане) Мотоциклетной федерации России. Календарь 6 этапов Кубка России 2026, регистрация, регламент, документы и контакты.",
  keywords: [
    "мотоджимхана",
    "фигурное управление мотоциклом",
    "ФУМ",
    "Кубок России 2026",
    "МФР",
    "Мотоциклетная федерация России",
    "мотоспорт",
    "комиссия МФР",
  ],
  authors: [{ name: "Комиссия по ФУМ МФР" }],
  icons: {
    icon: "/images/favicon.ico",
  },
  openGraph: {
    title: "Кубок России по ФУМ 2026",
    description:
      "Главные национальные соревнования по мотоджимхане. 6 этапов, регистрация открыта.",
    url: "https://mfr-mg.ru/",
    siteName: "Комиссия по ФУМ МФР",
    type: "website",
    images: [{ url: "/images/hero-moto.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кубок России по ФУМ 2026",
    description:
      "Главные национальные соревнования по мотоджимхане. 6 этапов, регистрация открыта.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
        <SonnerToaster richColors position="top-center" />
      </body>
    </html>
  );
}
