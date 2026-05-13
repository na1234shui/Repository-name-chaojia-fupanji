'use client';

import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Thermometer } from 'lucide-react';

interface StatusBarProps {
  level?: number;
  status?: 'stable' | 'delicate' | 'cold-war' | 'recovery' | 'danger';
}

const statusConfig = {
  stable: { label: '平稳', emoji: '😊', color: 'from-accent-sage to-emerald-400', textColor: 'text-emerald-600', icon: Heart, bgAccent: 'bg-emerald-50', barColor: 'bg-gradient-to-r from-accent-sage to-emerald-400' },
  delicate: { label: '微妙', emoji: '🤔', color: 'from-accent-peach to-amber-400', textColor: 'text-amber-600', icon: Thermometer, bgAccent: 'bg-amber-50', barColor: 'bg-gradient-to-r from-accent-peach to-amber-400' },
  'cold-war': { label: '冷战中', emoji: '🥶', color: 'from-accent-sky to-blue-400', textColor: 'text-blue-600', icon: AlertTriangle, bgAccent: 'bg-blue-50', barColor: 'bg-gradient-to-r from-accent-sky to-blue-400' },
  recovery: { label: '修复期', emoji: '🫂', color: 'from-accent-lavender to-brand-400', textColor: 'text-brand-600', icon: Heart, bgAccent: 'bg-brand-50', barColor: 'bg-gradient-to-r from-accent-lavender to-brand-400' },
  danger: { label: '高危状态', emoji: '⚠️', color: 'from-accent-rose to-red-400', textColor: 'text-red-500', icon: AlertTriangle, bgAccent: 'bg-red-50', barColor: 'bg-gradient-to-r from-accent-rose to-red-400' },
};

export default function RelationshipStatus({ level = 72, status = 'delicate' }: StatusBarProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.45 }}
      className={`card overflow-hidden`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-md`}>
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-text-tertiary font-medium">今日关系状态</p>
            <p className={`text-lg font-bold ${config.textColor}`}>
              {config.emoji} {config.label}
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-xs text-text-tertiary bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          更新
        </motion.button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-text-tertiary">关系健康度</span>
          <span className={`font-semibold ${config.textColor}`}>{level}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${config.barColor}`}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 p-3.5 bg-brand-50/60 rounded-2xl"
      >
        <p className="text-xs text-text-secondary leading-relaxed">
          💡 今天适合表达需求，不适合翻旧账。你们之间有一些微妙情绪需要被看见。
        </p>
      </motion.div>
    </motion.div>
  );
}
