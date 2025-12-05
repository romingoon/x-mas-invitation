import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import KakaoScript from "./KakaoScript";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { SnowEffect } from "@/components/ui/SnowEffect";
import { BackButtonHandler } from "@/components/utils/BackButtonHandler";
import ImagePreloader from "./ImagePreloader";

import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL('https://x-mas-invitation.vercel.app/'),
  title: '2025 청년찬양대 연합 성탄 찬양제',
  description: '2025년 12월 20일(토) 오후 3시\n새문안교회 4층 대예배실',
  openGraph: {
    title: '2025 청년찬양대 연합 성탄 찬양제',
    description: '2025년 12월 20일(토) 오후 3시\n새문안교회 4층 대예배실',
    url: 'https://x-mas-invitation.vercel.app',
    siteName: '2025 청년찬양대 연합 성탄 찬양제',
    type: 'article',
    images: [
      {
        url: '/assets/kakao2.jpeg',
        width: 800,
        height: 400,
        alt: '미리보기 이미지 설명',
      },
    ],
    locale: 'ko_KR',
    section: '2025 청년찬양대 연합 성탄 찬양제 초대장 및 프로그램북',
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
        <Analytics />
        <SnowEffect />
        <KakaoScript />
        <BackButtonHandler />
        <ImagePreloader />
        <MusicPlayer />
        <main className="pb-20 min-h-screen relative z-10">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
