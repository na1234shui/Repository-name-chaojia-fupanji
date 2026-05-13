'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-brand-100/40 blur-[100px]"
        animate={{ x: [0, 20, -15, 0], y: [0, -30, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '5%', left: '-10%' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-accent-lavender/20 blur-[120px]"
        animate={{ x: [0, -20, 30, 0], y: [0, 20, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '0%', right: '-15%' }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, duration: 1.2 }}
          className="relative"
        >
          <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center shadow-profile">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircleHeart size={52} className="text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-text-primary mb-2">吵架复盘机</h1>
          <p className="text-text-tertiary text-sm font-medium tracking-wide">
            AI 情绪关系助手
          </p>
        </motion.div>

        {/* Typing slogan */}
        <div className="h-12">
          <AnimatePresence mode="wait">
            {phase === 'intro' && (
              <motion.p
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-text-tertiary text-sm"
              >
                加载你的情绪世界中...
              </motion.p>
            )}
            {phase === 'typing' && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Sparkles size={16} className="text-brand-400" />
                <span className="text-text-secondary text-sm font-medium">
                  不是帮你赢，而是帮你表达
                </span>
                <motion.span
                  className="w-[2px] h-4 bg-brand-400 inline-block"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>
            )}
            {phase === 'complete' && (
              <motion.p
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-text-tertiary text-sm flex items-center gap-2"
              >
                <span className="text-brand-400">❤</span>
                让每一句话都被理解
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Loading dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-brand-300"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
