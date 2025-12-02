import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import KakaoScript from "./KakaoScript";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { BackButtonHandler } from "@/components/utils/BackButtonHandler";

export const metadata: Metadata = {
  metadataBase: new URL('https://x-mas-invitation.vercel.app/'),
  title: '성탄 연합 찬양제',
  description: '2025년 12월 20일(토) 오후 3시 새문안교회 4층 대예배당',
  openGraph: {
    title: '성탄 연합 찬양제',
    description: '2025년 12월 20일(토) 오후 3시 새문안교회 4층 대예배당',
    url: 'https://x-mas-invitation.vercel.app',
    siteName: '성탄 연합 찬양제',
    type: 'article',
    images: [
      {
        url: '/images/thumbnail.jpg',
        width: 800,
        height: 400,
        alt: '미리보기 이미지 설명',
      },
    ],
    locale: 'ko_KR',
    section: '성탄 연합 찬양제 초대장 및 프로그램북',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <SnowEffect />
        <KakaoScript />
        <BackButtonHandler />
        <Header />
        <MusicPlayer />
        <main className="pt-16 pb-20 min-h-screen px-4 relative z-10">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
