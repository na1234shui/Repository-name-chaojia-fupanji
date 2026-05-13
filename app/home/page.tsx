'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Upload,
  Mic,
  Swords,
  Heart,
  HeartHandshake,
  TrendingUp,
  Quote,
} from 'lucide-react';
import BottomNav from '@/components/Navigation';
import RelationshipStatus from '@/components/RelationshipStatus';
import EmotionCard from '@/components/EmotionCard';

export default function HomePage() {
  const router = useRouter();

  const quickActions = [
    { label: '我要吵赢', emoji: '🥊', icon: Swords, color: 'from-orange-400 to-rose-500', href: '/chat?mode=win' },
    { label: '我要哄好', emoji: '🌻', icon: Heart, color: 'from-violet-400 to-pink-500', href: '/chat?mode=makeup' },
    { label: '我想被理解', emoji: '🥺', icon: HeartHandshake, color: 'from-blue-400 to-cyan-500', href: '/chat?mode=understood' },
  ];

  const insightCards = [
    { emoji: '💡', title: '今日情绪提醒', subtitle: '适合温和沟通，避免翻旧账', delay: 0.3 },
    { emoji: '📊', title: '本周沟通质量', subtitle: '较上周提升 15%', delay: 0.4 },
    { emoji: '💬', title: '待处理情绪', subtitle: '3 条未回应的情绪信号', delay: 0.5 },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <motion.h1
            className="text-2xl font-bold text-gray-800"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            吵架复盘机
          </motion.h1>
          <p className="text-xs text-gray-400 mt-0.5">AI 情绪关系助手</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-xl border border-gray-200/50 flex items-center justify-center shadow-sm"
        >
          <Sparkles size={18} className="text-brand-400" />
        </motion.button>
      </motion.div>

      {/* Relationship Status */}
      <RelationshipStatus level={68} status="delicate" />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-5"
      >
        <h2 className="text-sm font-semibold text-gray-700 mb-3">快速开始</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -2 }}
              onClick={() => router.push(action.href)}
              className={`card-gradient p-4 flex flex-col items-center gap-2 group`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                <action.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Chat Import */}
      <EmotionCard
        title="导入聊天记录"
        subtitle="粘贴、截图或语音转文字"
        emoji="📥"
        delay={0.25}
        className="mt-4"
        onClick={() => router.push('/review')}
      >
        <div className="flex gap-2 mt-2">
          <div className="flex-1 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50/80 text-xs text-gray-400">
            <Upload size={14} />
            粘贴文本
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50/80 text-xs text-gray-400">
            <Mic size={14} />
            语音
          </div>
        </div>
      </EmotionCard>

      {/* AI Insights */}
      <div className="mt-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">AI 关系洞察</h2>
        <div className="space-y-3">
          {insightCards.map((card, i) => (
            <EmotionCard
              key={card.title}
              emoji={card.emoji}
              title={card.title}
              subtitle={card.subtitle}
              delay={card.delay}
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Emotional Quote */}
      <EmotionCard
        delay={0.6}
        className="mt-4 bg-gradient-to-br from-brand-50/80 to-purple-50/80 border-brand-200/30"
      >
        <div className="flex items-start gap-3">
          <Quote size={20} className="text-brand-400 mt-1 shrink-0" />
          <div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "你不是想赢，你只是害怕被忽略。"
            </p>
            <p className="text-xs text-gray-400 mt-2">— AI 情绪金句</p>
          </div>
        </div>
      </EmotionCard>

      <BottomNav />
    </div>
  );
}
