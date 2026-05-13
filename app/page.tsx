'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircleHeart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const [phase, setPhase] = useState<'intro' | 'typing' | 'complete'>('intro');
  const router = useRouter();

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('typing'), 1200);
    const t2 = setTimeout(() => setPhase('complete'), 2800);
    const t3 = setTimeout(() => router.push('/home'), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [router]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Subtle ambient glow — CSS animation, no JS needed for initial visibility */}
      <div className="absolute w-72 h-72 rounded-full bg-brand-100/40 blur-[100px] animate-splash-float pointer-events-none" style={{ top: '5%', left: '-10%' }} />
      <div className="absolute w-80 h-80 rounded-full bg-accent-lavender/20 blur-[120px] animate-splash-float2 pointer-events-none" style={{ bottom: '0%', right: '-15%' }} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Logo — SSR-visible by default, CSS entrance animation */}
        <div className="relative animate-splash-scale-in">
          <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center shadow-profile">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircleHeart size={52} className="text-white" />
            </motion.div>
          </div>
        </div>

        {/* Brand name — SSR-visible with CSS fade-in */}
        <div className="text-center animate-splash-fade-in-delay-1">
          <h1 className="text-4xl font-bold text-text-primary mb-2">吵架复盘机</h1>
          <p className="text-text-tertiary text-sm font-medium tracking-wide">
            AI 情绪关系助手
          </p>
        </div>

        {/* Typing slogan area */}
        <div className="h-12 text-center animate-splash-fade-in-delay-2">
          {phase === 'intro' && (
            <p className="text-text-tertiary text-sm">
              加载你的情绪世界中...
            </p>
          )}
          {phase === 'typing' && (
            <div className="flex items-center gap-2 justify-center">
              <Sparkles size={16} className="text-brand-400" />
              <span className="text-text-secondary text-sm font-medium">
                不是帮你赢，而是帮你表达
              </span>
              <motion.span
                className="w-[2px] h-4 bg-brand-400 inline-block"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </div>
          )}
          {phase === 'complete' && (
            <p className="text-text-tertiary text-sm flex items-center gap-2 justify-center">
              <span className="text-brand-400">❤</span>
              让每一句话都被理解
            </p>
          )}
        </div>

        {/* Loading dots — CSS bounce animation */}
        <div className="flex gap-2 animate-splash-fade-in-delay-2">
          <div className="w-2 h-2 rounded-full bg-brand-300 animate-splash-bounce" />
          <div className="w-2 h-2 rounded-full bg-brand-300 animate-splash-bounce-delay-1" />
          <div className="w-2 h-2 rounded-full bg-brand-300 animate-splash-bounce-delay-2" />
        </div>
      </div>
    </div>
  );
}
