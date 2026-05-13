import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '吵架复盘机 — AI 情绪关系助手',
  description: '不是帮你赢，而是帮你表达。AI驱动的情绪关系分析工具',
  other: {
    'theme-color': '#F5F5F7',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F5F7',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="max-w-[430px] mx-auto min-h-screen relative overflow-x-hidden">
        {/* Subtle ambient light */}
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[40%] bg-gradient-radial from-brand-100/40 via-brand-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-[-15%] right-[-15%] w-[55%] h-[35%] bg-gradient-radial from-accent-lavender/20 via-brand-50/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
