import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '吵架复盘机 — AI 情绪关系助手',
  description: '不是帮你赢，而是帮你表达。AI驱动的情绪关系分析工具',
  other: {
    'theme-color': '#FDF8F6',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FDF8F6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="max-w-[430px] mx-auto min-h-screen relative overflow-x-hidden">
        {/* Ambient glow decorations */}
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[40%] bg-gradient-radial from-pink-200/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[35%] bg-gradient-radial from-purple-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="fixed top-[30%] right-[-5%] w-[30%] h-[30%] bg-gradient-radial from-rose-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
