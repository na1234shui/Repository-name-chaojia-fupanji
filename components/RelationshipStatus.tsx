'use client';

import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Thermometer } from 'lucide-react';

interface StatusBarProps {
  level?: number; // 0-100 health
  status?: 'stable' | 'delicate' | 'cold-war' | 'recovery' | 'danger';
}

const statusConfig = {
  stable: { label: '平稳', emoji: '😊', color: 'from-emerald-400 to-teal-500', gradient: 'from-emerald-50 to-teal-50/50', textColor: 'text-emerald-600', icon: Heart },
  delicate: { label: '微妙', emoji: '🤔', color: 'from-yellow-400 to-orange-400', gradient: 'from-yellow-50 to-orange-50/50', textColor: 'text-amber-600', icon: Thermometer },
  'cold-war': { label: '冷战中', emoji: '🥶', color: 'from-blue-400 to-indigo-500', gradient: 'from-blue-50 to-indigo-50/50', textColor: 'text-blue-600', icon: AlertTriangle },
  recovery: { label: '修复期', emoji: '🫂', color: 'from-violet-400 to-pink-400', gradient: 'from-violet-50 to-pink-50/50', textColor: 'text-violet-600', icon: Heart },
  danger: { label: '高危状态', emoji: '⚠️', color: 'from-red-400 to-rose-500', gradient: 'from-red-50 to-rose-50/50', textColor: 'text-red-600', icon: AlertTriangle },
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
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
            <Icon size={22} className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">今日关系状态</p>
            <p className={`text-lg font-bold ${config.textColor}`}>
              {config.emoji} {config.label}
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-xs text-gray-400 bg-white/60 px-3 py-1.5 rounded-full"
        >
          更新
        </motion.button>
      </div>

      {/* Health bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">关系健康度</span>
          <span className={`font-semibold ${config.textColor}`}>{level}%</span>
        </div>
        <div className="h-2.5 bg-white/50 rounded-full overflow-hidden">
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
        className="mt-4 p-3 bg-white/50 backdrop-blur-sm rounded-2xl"
      >
        <p className="text-xs text-gray-500 leading-relaxed">
          💡 今天适合表达需求，不适合翻旧账。你们之间有一些微妙情绪需要被看见。
        </p>
      </motion.div>
    </motion.div>
  );
}
