'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircleHeart, Home, Brain, User, BarChart3, MessageSquare } from 'lucide-react';

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
      <div className="glass rounded-[28px] px-2 py-1.5 shadow-lg shadow-black/5 border border-white/40">
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
                    layoutId="nav-bg"
                    className="absolute inset-0 rounded-2xl bg-brand-500/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={22}
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-brand-500' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-brand-500' : 'text-gray-400'
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
