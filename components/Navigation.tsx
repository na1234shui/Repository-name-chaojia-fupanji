'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Brain, BarChart3, User } from 'lucide-react';

const navItems = [
  { href: '/home', icon: Home, label: '首页' },
  { href: '/chat', icon: MessageSquare, label: '实时辅助' },
  { href: '/review', icon: Brain, label: '复盘' },
  { href: '/portrait', icon: BarChart3, label: '画像' },
  { href: '/my', icon: User, label: '我的' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-3 pb-[env(safe-area-inset-bottom,8px)] pt-2">
      <div className="rounded-[28px] px-2 py-1.5 shadow-2xl shadow-black/40"
        style={{
          background: 'rgba(18, 18, 22, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-[56px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-bg-dark"
                    className="absolute inset-0 rounded-2xl bg-brand-500/15"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-brand-400' : 'text-text-tertiary'
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-brand-400' : 'text-text-tertiary'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
