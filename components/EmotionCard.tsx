'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface EmotionCardProps {
  icon?: LucideIcon;
  emoji?: string;
  title?: string;
  subtitle?: string;
  gradient?: string;
  className?: string;
  delay?: number;
  onClick?: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function EmotionCard({
  icon: Icon,
  emoji,
  title,
  subtitle,
  gradient = 'from-white/90 to-white/60',
  className,
  delay = 0,
  onClick,
  children,
  size = 'md',
}: EmotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        'card-gradient-hover',
        size === 'sm' && 'p-4',
        size === 'md' && 'p-5',
        size === 'lg' && 'p-6',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {(Icon || emoji) && (
        <div className="flex items-center gap-3 mb-3">
          {emoji ? (
            <span className="text-2xl">{emoji}</span>
          ) : Icon ? (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-100 to-purple-100 flex items-center justify-center">
              <Icon size={20} className="text-brand-500" />
            </div>
          ) : null}
          <div>
            <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
            {subtitle && (
              <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      {!Icon && !emoji && title && (
        <h3 className="font-semibold text-gray-800 text-sm mb-2">{title}</h3>
      )}
      {children}
    </motion.div>
  );
}
