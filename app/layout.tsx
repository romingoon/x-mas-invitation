import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "성탄 연합 찬양제",
  description: "4개 교회 청년 연합 성탄 찬양제에 초대합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`} suppressHydrationWarning>
        <Header />
        <main className="pt-16 pb-20 min-h-screen px-4">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
