import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";
import KakaoScript from "./KakaoScript";
import { MusicPlayer } from "@/components/ui/MusicPlayer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`} suppressHydrationWarning>
        <KakaoScript />
        <Header />
        <MusicPlayer />
        <main className="pt-16 pb-20 min-h-screen px-4">
          {children}
        </main>
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  );
}
