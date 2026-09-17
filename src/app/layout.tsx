import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://vadimdmitriev.com";
const title = "Вадим Дмитриев — UX/UI Designer | Vibe Coding";
const description =
  "UX/UI дизайнер и Vibe Coder. Создаю современные сайты, цифровые продукты и интерфейсы от идеи до готовой реализации.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Вадим Дмитриев",
  },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Вадим Дмитриев",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      {
        url: "/favicon-dark.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-light.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <Nav />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
