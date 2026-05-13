'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Settings,
  Shield,
  Crown,
  History,
  Heart,
  ChevronRight,
  Bell,
  Moon,
  Globe,
  LogOut,
  MessageCircleHeart,
  Star,
  Lock,
} from 'lucide-react';
import BottomNav from '@/components/Navigation';
import EmotionCard from '@/components/EmotionCard';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    id: 'archive',
    icon: Heart,
    label: '我的关系档案',
    desc: '情绪画像、关系健康度、成长轨迹',
    color: 'from-pink-50 to-rose-50',
    iconColor: 'text-pink-500',
    accent: 'border-pink-200/30',
    badge: '更新',
  },
  {
    id: 'history',
    icon: History,
    label: '复盘记录',
    desc: '查看历史 AI 复盘分析',
    color: 'from-violet-50 to-purple-50',
    iconColor: 'text-violet-500',
    accent: 'border-violet-200/30',
    count: 12,
  },
  {
    id: 'vip',
    icon: Crown,
    label: '会员中心',
    desc: '解锁更多 AI 分析次数和高级功能',
    color: 'from-amber-50 to-orange-50',
    iconColor: 'text-amber-500',
    accent: 'border-amber-200/30',
    badge: '免费',
  },
  {
    id: 'privacy',
    icon: Shield,
    label: '隐私安全',
    desc: '数据加密、对话管理、隐私设置',
    color: 'from-blue-50 to-cyan-50',
    iconColor: 'text-blue-500',
    accent: 'border-blue-200/30',
  },
  {
    id: 'settings',
    icon: Settings,
    label: '设置',
    desc: '通知偏好、语言、主题、账号管理',
    color: 'from-gray-50 to-slate-50',
    iconColor: 'text-gray-500',
    accent: 'border-gray-200/30',
  },
];

const quickSettings = [
  { icon: Bell, label: '通知', enabled: true },
  { icon: Moon, label: '深色模式', enabled: false },
  { icon: Globe, label: '语言', value: '简体中文' },
  { icon: Lock, label: '隐私锁', enabled: true },
];

export default function MyPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 bg-gradient-moodboard">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-xl bg-white/70 flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-gray-800">我的</h1>
          <p className="text-xs text-gray-400">个人中心 · 关系助手</p>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 mb-5 rounded-[28px] bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500 shadow-xl shadow-purple-500/20 relative overflow-hidden"
      >
        {/* Decorative bubbles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 blur-xl" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <MessageCircleHeart size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">你的情绪记录者</h2>
            <p className="text-sm text-white/70 mt-0.5">吵架复盘机 · 已陪伴 23 天</p>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} className="text-yellow-300 fill-yellow-300" />
              ))}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-medium"
          >
            编辑
          </motion.button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { label: '复盘次数', value: '12', unit: '次' },
            { label: 'AI 对话', value: '48', unit: '条' },
            { label: '关系提升', value: '23', unit: '%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/15 backdrop-blur-sm rounded-2xl py-2.5 text-center border border-white/10"
            >
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-white/60 text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Menu Items */}
      <div className="space-y-3 mb-6">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          const isExpanded = expanded === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpanded(isExpanded ? null : item.id)}
                className={cn(
                  'w-full p-4 rounded-[24px] bg-gradient-to-r border text-left transition-all',
                  item.color,
                  item.accent,
                  isExpanded && 'shadow-md'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shrink-0',
                  )}>
                    <Icon size={20} className={item.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                      {item.badge && (
                        <span className={cn(
                          'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
                          item.badge === '更新' && 'bg-pink-100 text-pink-600',
                          item.badge === '免费' && 'bg-amber-100 text-amber-600',
                        )}>
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/60 text-gray-400 font-mono">
                          {item.count}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={cn(
                      'text-gray-300 transition-transform',
                      isExpanded && 'rotate-90'
                    )}
                  />
                </div>
              </motion.button>

              {/* Expanded content */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className={cn(
                    'mx-4 p-4 rounded-b-2xl bg-white/70 backdrop-blur-sm border-x border-b rounded-[0_0_20px_20px] -mt-1',
                    item.accent
                  )}>
                    {item.id === 'archive' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                          <span className="text-xs text-gray-600">焦虑确认型 · 高敏感</span>
                          <span className="text-xs text-pink-500 font-medium">查看完整画像 →</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                          <span className="text-xs text-gray-600">关系健康度</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="w-[65%] h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-gray-700">65%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                          <span className="text-xs text-gray-600">共同成长天数</span>
                          <span className="text-xs font-medium text-gray-700">23 天</span>
                        </div>
                      </div>
                    )}

                    {item.id === 'history' && (
                      <div className="space-y-2">
                        {[
                          { date: '今日 14:32', summary: '聊天不回引发的情绪冲突', mode: '🥊 吵赢', score: 82 },
                          { date: '昨天 22:15', summary: '关于"随便"背后的潜台词', mode: '🌻 哄好', score: 91 },
                          { date: '3天前', summary: '冷战三天后的修复分析', mode: '🌻 哄好', score: 75 },
                          { date: '1周前', summary: '异性边界问题的边界设定', mode: '🥊 吵赢', score: 88 },
                        ].map((record, j) => (
                          <motion.button
                            key={j}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-3 bg-white/60 rounded-xl flex items-center justify-between"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">{record.date}</span>
                                <span className="text-[10px]">{record.mode}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5 truncate">{record.summary}</p>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <div className="text-xs font-bold text-gray-600">{record.score}分</div>
                            </div>
                          </motion.button>
                        ))}
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2 text-xs text-brand-500 font-medium text-center"
                        >
                          查看全部复盘记录 →
                        </motion.button>
                      </div>
                    )}

                    {item.id === 'vip' && (
                      <div className="space-y-2">
                        <div className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Crown size={16} className="text-amber-500" />
                              <span className="text-xs font-semibold text-gray-700">当前套餐</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 font-medium">免费版</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>今日剩余 AI 分析次数</span>
                            <span className="font-bold text-amber-600">3 / 5 次</span>
                          </div>
                          <div className="mt-2 h-1.5 bg-amber-100 rounded-full overflow-hidden">
                            <div className="w-[60%] h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold shadow-lg shadow-amber-500/20"
                        >
                          升级会员 — 解锁无限分析
                        </motion.button>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: '无限 AI 分析', free: '5次/天', pro: '无限' },
                            { label: '深度情绪分析', free: '基础版', pro: '专业版' },
                            { label: '关系发展报告', free: '✗', pro: '✓' },
                            { label: 'AI 回复建议', free: '3条/次', pro: '无限' },
                          ].map((feat) => (
                            <div key={feat.label} className="p-2 bg-white/60 rounded-xl text-center">
                              <p className="text-[10px] text-gray-500">{feat.label}</p>
                              <div className="flex justify-center gap-2 mt-1 text-[10px]">
                                <span className="text-gray-400">免费 {feat.free}</span>
                                <span className="text-amber-600 font-medium">Pro {feat.pro}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.id === 'privacy' && (
                      <div className="space-y-2">
                        {[
                          { label: '数据加密传输', enabled: true, desc: '所有对话采用端到端加密' },
                          { label: '匿名化处理', enabled: true, desc: 'AI 分析不会存储可识别信息' },
                          { label: '自动删除历史', enabled: false, desc: '7天后自动清除分析记录' },
                          { label: '本地优先存储', enabled: true, desc: '分析结果优先存储在本地' },
                        ].map((privacy) => (
                          <div key={privacy.label} className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-700">{privacy.label}</span>
                                {privacy.enabled ? (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600">已开启</span>
                                ) : (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400">未开启</span>
                                )}
                              </div>
                              <p className="text-[10px] text-gray-400 mt-0.5">{privacy.desc}</p>
                            </div>
                            <button
                              className={cn(
                                'w-10 h-6 rounded-full relative transition-colors',
                                privacy.enabled ? 'bg-emerald-400' : 'bg-gray-300'
                              )}
                            >
                              <div
                                className={cn(
                                  'w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all',
                                  privacy.enabled ? 'left-[18px]' : 'left-0.5'
                                )}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.id === 'settings' && (
                      <div className="space-y-2">
                        {quickSettings.map((setting) => {
                          const SIcon = setting.icon;
                          return (
                            <div
                              key={setting.label}
                              className="flex items-center justify-between p-3 bg-white/60 rounded-xl"
                            >
                              <div className="flex items-center gap-3">
                                <SIcon size={16} className="text-gray-400" />
                                <span className="text-xs text-gray-600">{setting.label}</span>
                              </div>
                              {setting.enabled !== undefined ? (
                                <button
                                  className={cn(
                                    'w-10 h-6 rounded-full relative transition-colors',
                                    setting.enabled ? 'bg-brand-400' : 'bg-gray-300'
                                  )}
                                >
                                  <div
                                    className={cn(
                                      'w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all',
                                      setting.enabled ? 'left-[18px]' : 'left-0.5'
                                    )}
                                  />
                                </button>
                              ) : (
                                <span className="text-xs text-gray-400">{setting.value}</span>
                              )}
                            </div>
                          );
                        })}
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2.5 rounded-xl bg-red-50 border border-red-100 text-red-400 text-xs font-medium mt-3 flex items-center justify-center gap-2"
                        >
                          <LogOut size={14} />
                          退出登录
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center pb-4"
      >
        <p className="text-[10px] text-gray-300 tracking-wider">
          吵架复盘机 v1.0 · 不是帮你赢，而是帮你表达
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
