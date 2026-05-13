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
    color: 'bg-white',
    iconColor: 'text-accent-rose',
    iconBg: 'bg-rose-50',
    badge: '更新',
    badgeColor: 'bg-rose-50 text-rose-600',
  },
  {
    id: 'history',
    icon: History,
    label: '复盘记录',
    desc: '查看历史 AI 复盘分析',
    color: 'bg-white',
    iconColor: 'text-brand-500',
    iconBg: 'bg-brand-50',
    count: 12,
  },
  {
    id: 'vip',
    icon: Crown,
    label: '会员中心',
    desc: '解锁更多 AI 分析次数和高级功能',
    color: 'bg-white',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    badge: '免费',
    badgeColor: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'privacy',
    icon: Shield,
    label: '隐私安全',
    desc: '数据加密、对话管理、隐私设置',
    color: 'bg-white',
    iconColor: 'text-accent-sage',
    iconBg: 'bg-emerald-50',
  },
  {
    id: 'settings',
    icon: Settings,
    label: '设置',
    desc: '通知偏好、语言、主题、账号管理',
    color: 'bg-white',
    iconColor: 'text-text-secondary',
    iconBg: 'bg-gray-50',
  },
];

const quickSettings = [
  { icon: Bell, label: '通知', enabled: true },
  { icon: Moon, label: '深色模式', enabled: true },
  { icon: Globe, label: '语言', value: '简体中文' },
  { icon: Lock, label: '隐私锁', enabled: true },
];

export default function MyPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-28 px-4 pt-6 bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-xl bg-white shadow-card flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-text-secondary" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-text-primary">我的</h1>
          <p className="text-xs text-text-tertiary">个人中心 · 关系助手</p>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 mb-5 rounded-[28px] bg-gradient-to-br from-brand-500 to-brand-400 shadow-profile relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <MessageCircleHeart size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white">你的情绪记录者</h2>
            <p className="text-sm text-white/70 mt-0.5">吵架复盘机 · 已陪伴 23 天</p>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} className="text-yellow-200 fill-yellow-200" />
              ))}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-medium"
          >
            编辑
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          {[
            { label: '复盘次数', value: '12' },
            { label: 'AI 对话', value: '48' },
            { label: '关系提升', value: '23%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/15 backdrop-blur-sm rounded-2xl py-2.5 text-center"
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
            >
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setExpanded(isExpanded ? null : item.id)}
                className={cn(
                  'w-full p-4 rounded-[24px] shadow-card text-left transition-all bg-white',
                  isExpanded && 'rounded-b-none shadow-card-hover'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={item.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-text-primary">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                      {item.count && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-50 text-text-tertiary font-mono">
                          {item.count}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-tertiary mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className={cn(
                      'text-text-tertiary transition-transform',
                      isExpanded && 'rotate-90'
                    )}
                  />
                </div>
              </motion.button>

              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white shadow-card rounded-b-[24px] border-t border-gray-50 p-4 -mt-[1px]">
                    {item.id === 'archive' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-xs text-text-secondary">焦虑确认型 · 高敏感</span>
                          <span className="text-xs text-brand-500 font-medium">查看完整画像 →</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-xs text-text-secondary">关系健康度</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div className="w-[65%] h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-text-primary">65%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <span className="text-xs text-text-secondary">共同成长天数</span>
                          <span className="text-xs font-medium text-text-primary">23 天</span>
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
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full p-3 bg-gray-50 rounded-xl flex items-center justify-between"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-text-tertiary">{record.date}</span>
                                <span className="text-[10px]">{record.mode}</span>
                              </div>
                              <p className="text-xs text-text-secondary mt-0.5 truncate">{record.summary}</p>
                            </div>
                            <div className="text-right shrink-0 ml-2">
                              <div className="text-xs font-bold text-text-secondary">{record.score}分</div>
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
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Crown size={16} className="text-amber-500" />
                              <span className="text-xs font-semibold text-text-primary">当前套餐</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 font-medium">免费版</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-text-tertiary">
                            <span>今日剩余 AI 分析次数</span>
                            <span className="font-bold text-amber-600">3 / 5 次</span>
                          </div>
                          <div className="mt-2 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                            <div className="w-[60%] h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                          </div>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-semibold shadow-md"
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
                            <div key={feat.label} className="p-2 bg-gray-50 rounded-xl text-center">
                              <p className="text-[10px] text-text-tertiary">{feat.label}</p>
                              <div className="flex justify-center gap-2 mt-1 text-[10px]">
                                <span className="text-text-tertiary">免费 {feat.free}</span>
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
                          <div key={privacy.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-text-primary">{privacy.label}</span>
                                {privacy.enabled ? (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">已开启</span>
                                ) : (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-text-tertiary">未开启</span>
                                )}
                              </div>
                              <p className="text-[10px] text-text-tertiary mt-0.5">{privacy.desc}</p>
                            </div>
                            <button
                              className={cn(
                                'w-10 h-6 rounded-full relative transition-colors',
                                privacy.enabled ? 'bg-brand-500' : 'bg-gray-200'
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
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                            >
                              <div className="flex items-center gap-3">
                                <SIcon size={16} className="text-text-tertiary" />
                                <span className="text-xs text-text-secondary">{setting.label}</span>
                              </div>
                              {setting.enabled !== undefined ? (
                                <button
                                  className={cn(
                                    'w-10 h-6 rounded-full relative transition-colors',
                                    setting.enabled ? 'bg-brand-500' : 'bg-gray-200'
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
                                <span className="text-xs text-text-tertiary">{setting.value}</span>
                              )}
                            </div>
                          );
                        })}
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          className="w-full py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-500 text-xs font-medium mt-3 flex items-center justify-center gap-2"
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
        transition={{ delay: 0.5 }}
        className="text-center pb-4"
      >
        <p className="text-[10px] text-text-tertiary tracking-wider">
          吵架复盘机 v1.0 · 不是帮你赢，而是帮你表达
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
