import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '吵架复盘机 — AI 情绪关系助手',
  description: '不是帮你赢，而是帮你表达。AI驱动的情绪关系分析工具',
  other: {
    'theme-color': '#0D0D0F',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0D0D0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="max-w-[430px] mx-auto min-h-screen relative overflow-x-hidden">
        {/* Dark ambient glow decorations */}
        <div className="fixed top-[-15%] left-[-20%] w-[70%] h-[45%] bg-gradient-radial from-brand-500/10 via-brand-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-[-15%] right-[-20%] w-[65%] h-[40%] bg-gradient-radial from-violet-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="fixed top-[40%] right-[-10%] w-[35%] h-[30%] bg-gradient-radial from-accent-amber/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
