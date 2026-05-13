'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Shield,
  MessageCircle,
  Timer,
  Battery,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import BottomNav from '@/components/Navigation';
import EmotionCard from '@/components/EmotionCard';
import { cn } from '@/lib/utils';

const healthMetrics = [
  { label: '安全感', value: 55, icon: Shield, color: 'from-accent-sage to-emerald-400', bgColor: 'bg-emerald-50' },
  { label: '沟通质量', value: 62, icon: MessageCircle, color: 'from-brand-500 to-accent-rose', bgColor: 'bg-brand-50' },
  { label: '修复速度', value: 40, icon: Timer, color: 'from-accent-peach to-amber-400', bgColor: 'bg-amber-50' },
  { label: '情绪消耗', value: 70, icon: Battery, color: 'from-accent-rose to-red-400', bgColor: 'bg-red-50', inverted: true },
];

export default function PortraitPage() {
  const [activeCycle, setActiveCycle] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-28 px-4 pt-6 bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-5"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-xl bg-white shadow-card flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-text-secondary" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-text-primary">关系画像</h1>
          <p className="text-xs text-text-tertiary">你们的关系数据全景</p>
        </div>
      </motion.div>

      {/* Personality Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <EmotionCard emoji="🧑‍🎨" title="你的画像" delay={0.1}>
          <div className="space-y-2 mt-2">
            <div className="px-3 py-2 bg-brand-50 rounded-xl">
              <span className="text-xs font-medium text-brand-600">焦虑确认型</span>
            </div>
            <div className="px-3 py-2 bg-amber-50 rounded-xl">
              <span className="text-xs font-medium text-amber-600">高敏感型</span>
            </div>
          </div>
        </EmotionCard>
        <EmotionCard emoji="👤" title="对方的画像" delay={0.13}>
          <div className="space-y-2 mt-2">
            <div className="px-3 py-2 bg-blue-50 rounded-xl">
              <span className="text-xs font-medium text-blue-600">回避压力型</span>
            </div>
            <div className="px-3 py-2 bg-gray-50 rounded-xl">
              <span className="text-xs font-medium text-text-tertiary">冷处理型</span>
            </div>
          </div>
        </EmotionCard>
      </div>

      {/* Health Dashboard */}
      <EmotionCard emoji="📊" title="关系健康度" subtitle="四大维度评估" delay={0.15}>
        <div className="mt-3 space-y-4">
          {healthMetrics.map((metric, i) => {
            const Icon = metric.icon;
            const displayValue = metric.inverted ? 100 - metric.value : metric.value;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                      <Icon size={14} className="text-text-secondary" />
                    </div>
                    <span className="text-xs text-text-secondary">{metric.label}</span>
                  </div>
                  <span className={cn(
                    'text-xs font-bold',
                    displayValue >= 70 ? 'text-emerald-600' :
                    displayValue >= 40 ? 'text-amber-600' :
                    'text-red-500'
                  )}>
                    {metric.value}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${displayValue}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </EmotionCard>

      {/* Conflict Cycle */}
      <EmotionCard emoji="🔄" title="冲突循环分析" subtitle="你们的吵架模式" delay={0.2}>
        <div className="mt-3 space-y-2">
          {[
            { label: '追问', emoji: '❓', desc: '你主动发起沟通', color: 'bg-brand-50' },
            { label: '回避', emoji: '🏃', desc: '对方退缩不回应', color: 'bg-blue-50' },
            { label: '焦虑', emoji: '😰', desc: '你感到被忽视更焦虑', color: 'bg-amber-50' },
            { label: '冷战', emoji: '🥶', desc: '双方陷入沉默', color: 'bg-gray-50' },
          ].map((step, i) => (
            <motion.button
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCycle(activeCycle === i ? null : i)}
              className={cn(
                'w-full p-3 rounded-2xl text-left transition-all',
                step.color,
                activeCycle === i && 'ring-2 ring-brand-200 shadow-md'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{step.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-text-primary">{step.label}</p>
                  <p className="text-[10px] text-text-tertiary">{step.desc}</p>
                </div>
                {i < 3 && (
                  <motion.span
                    className="ml-auto text-text-tertiary"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </EmotionCard>

      {/* Common Topics */}
      <EmotionCard emoji="📋" title="高频冲突主题" delay={0.25}>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { label: '消息不回', count: 12, color: 'bg-red-50 text-red-600' },
            { label: '情绪价值', count: 8, color: 'bg-brand-50 text-brand-600' },
            { label: '时间分配', count: 6, color: 'bg-blue-50 text-blue-600' },
            { label: '异性问题', count: 4, color: 'bg-amber-50 text-amber-600' },
          ].map((topic) => (
            <div
              key={topic.label}
              className={`px-3 py-2 rounded-2xl ${topic.color} text-xs font-medium flex items-center gap-1.5`}
            >
              {topic.label}
              <span className="opacity-60">{topic.count}次</span>
            </div>
          ))}
        </div>
      </EmotionCard>

      {/* AI Growth Tips */}
      <EmotionCard
        emoji="🌱"
        title="AI 成长建议"
        delay={0.3}
        className="bg-emerald-50/80"
      >
        <div className="mt-2 space-y-3">
          <div className="p-3 bg-white rounded-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles size={14} className="text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600">本周重点</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              你们的冲突模式是&ldquo;追问-回避&rdquo;循环。当对方说&ldquo;随便&rdquo;时，试着先确认情绪再做决定。
            </p>
          </div>
          <div className="p-3 bg-white rounded-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <TrendingUp size={14} className="text-brand-500" />
              <span className="text-xs font-medium text-brand-600">可提升项</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              你的&ldquo;修复速度&rdquo;偏低（40%），建议在冷战后的24小时内主动释放一次温和信号。
            </p>
          </div>
        </div>
      </EmotionCard>

      <BottomNav />
    </div>
  );
}
