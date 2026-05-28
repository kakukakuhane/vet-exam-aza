import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vet Exam Notes | 獣医国家試験対策",
    template: "%s | Vet Exam Notes"
  },
  description: "獣医学生向けの過去問、解説記事、科目別まとめ、問題演習サイト。",
  openGraph: {
    title: "Vet Exam Notes",
    description: "獣医国家試験の過去問と重要ポイントを、読みやすいカードUIで整理。",
    url: siteUrl,
    siteName: "Vet Exam Notes",
    locale: "ja_JP",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vet Exam Notes",
    description: "獣医国家試験対策のための学習サイト。"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
