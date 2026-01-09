import type { Metadata } from "next";
import "./globals.css";
import HashScrollHandler from "@/components/HashScrollHandler";

export const metadata: Metadata = {
  title: "Roomfit - 데이터로 완성하는 AI 퍼스널 트레이너",
  description: "실시간 VBT 분석부터 음성 제어까지. Roomfit 앱으로 당신의 모든 움직임을 스마트하게 관리하세요.",
  keywords: ["Roomfit", "VBT", "속도 기반 트레이닝", "AI 트레이너", "피트니스 앱", "웨이트 트레이닝"],
  authors: [{ name: "Roomfit" }],
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Roomfit - 데이터로 완성하는 AI 퍼스널 트레이너",
    description: "실시간 VBT 분석부터 음성 제어까지. Roomfit 앱으로 당신의 모든 움직임을 스마트하게 관리하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.history.scrollRestoration = 'manual';
              }
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}
