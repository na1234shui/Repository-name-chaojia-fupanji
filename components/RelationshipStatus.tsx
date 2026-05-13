'use client';

import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Thermometer } from 'lucide-react';

interface StatusBarProps {
  level?: number; // 0-100 health
  status?: 'stable' | 'delicate' | 'cold-war' | 'recovery' | 'danger';
}

const statusConfig = {
  stable: { label: '平稳', emoji: '😊', color: 'from-emerald-500 to-teal-500', gradient: 'from-emerald-500/10 to-teal-500/5', textColor: 'text-emerald-400', icon: Heart, bgAccent: 'bg-emerald-500/10' },
  delicate: { label: '微妙', emoji: '🤔', color: 'from-yellow-500 to-orange-500', gradient: 'from-yellow-500/10 to-orange-500/5', textColor: 'text-yellow-400', icon: Thermometer, bgAccent: 'bg-yellow-500/10' },
  'cold-war': { label: '冷战中', emoji: '🥶', color: 'from-blue-500 to-indigo-600', gradient: 'from-blue-500/10 to-indigo-500/5', textColor: 'text-blue-400', icon: AlertTriangle, bgAccent: 'bg-blue-500/10' },
  recovery: { label: '修复期', emoji: '🫂', color: 'from-violet-500 to-pink-500', gradient: 'from-violet-500/10 to-pink-500/5', textColor: 'text-violet-400', icon: Heart, bgAccent: 'bg-violet-500/10' },
  danger: { label: '高危状态', emoji: '⚠️', color: 'from-red-500 to-rose-600', gradient: 'from-red-500/10 to-rose-500/5', textColor: 'text-red-400', icon: AlertTriangle, bgAccent: 'bg-red-500/10' },
};

export default function RelationshipStatus({ level = 72, status = 'delicate' }: StatusBarProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className={`card-gradient overflow-hidden bg-gradient-to-br ${config.gradient}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg shadow-black/20`}>
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
          className="text-xs text-text-tertiary bg-white/[0.06] px-3 py-1.5 rounded-full hover:bg-white/[0.10] transition-colors"
        >
          更新
        </motion.button>
      </div>

      {/* Health bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-text-tertiary">关系健康度</span>
          <span className={`font-semibold ${config.textColor}`}>{level}%</span>
        </div>
        <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full bg-gradient-to-r ${config.color}`}
          />
        </div>
      </div>

      {/* AI Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 p-3 bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.04]"
      >
        <p className="text-xs text-text-secondary leading-relaxed">
          💡 今天适合表达需求，不适合翻旧账。你们之间有一些微妙情绪需要被看见。
        </p>
      </motion.div>
    </motion.div>
  );
}
