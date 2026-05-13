'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Brain,
  Heart,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import BottomNav from '@/components/Navigation';
import EmotionCard from '@/components/EmotionCard';
import ImportPanel from '@/components/ImportPanel';
import { cn, dummyAnalysis, emotionAnalysis } from '@/lib/utils';
import type { ImportedContent } from '@/lib/import-utils';

type AnalysisPhase = 'idle' | 'analyzing' | 'complete';

export default function ReviewPage() {
  const [phase, setPhase] = useState<AnalysisPhase>('idle');
  const [showHidden, setShowHidden] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'partner'>('user');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [importedContent, setImportedContent] = useState<ImportedContent | null>(null);

  const handleImport = useCallback((content: ImportedContent) => {
    setImportedContent(content);
  }, []);

  const startAnalysis = () => {
    setPhase('analyzing');
    setTimeout(() => setPhase('complete'), 2000);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 bg-[#0D0D0F]">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 mb-5"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-xl bg-surface-card flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-text-secondary" />
        </motion.button>
        <div>
          <h1 className="text-xl font-bold text-text-primary">AI 复盘</h1>
          <p className="text-xs text-text-tertiary">让 AI 帮你理解冲突</p>
        </div>
      </motion.div>

      {/* ── Import Phase ── */}
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <EmotionCard title="导入聊天记录" emoji="📥" subtitle="粘贴文本 · 截图导入 · 语音输入" className="!p-4">
            <ImportPanel onImport={handleImport} />
          </EmotionCard>

          {/* Import status bar */}
          <AnimatePresence>
            {importedContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      {importedContent.source === 'image' ? (
                        <ImageIcon size={16} className="text-emerald-400" />
                      ) : (
                        <FileText size={16} className="text-emerald-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-xs font-medium text-text-primary">
                          {importedContent.source === 'paste' && '已粘贴文本'}
                          {importedContent.source === 'file' && `已导入文件 ${importedContent.fileName || ''}`}
                          {importedContent.source === 'image' && '已导入截图'}
                          {importedContent.source === 'voice' && '已录制语音'}
                        </span>
                      </div>
                      <p className="text-[10px] text-text-tertiary mt-0.5">
                        {importedContent.text.length} 个字符
                        {importedContent.imagePreview && ' · 含截图预览'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setImportedContent(null)}
                    className="text-[10px] text-text-tertiary underline hover:text-text-secondary"
                  >
                    清除
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analysis button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={startAnalysis}
            disabled={!importedContent}
            className={cn(
              'w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all',
              importedContent
                ? 'bg-gradient-to-r from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/20'
                : 'bg-surface-card text-text-dim cursor-not-allowed'
            )}
          >
            <Brain size={18} />
            {importedContent ? '开始 AI 复盘分析' : '请先导入聊天记录'}
          </motion.button>
        </motion.div>
      )}

      {/* ── Analyzing Phase ── */}
      {phase === 'analyzing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 gap-6"
        >
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-2xl shadow-brand-500/20">
              <Brain size={40} className="text-white" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-accent-amber to-accent-rose flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles size={14} className="text-white" />
            </motion.div>
          </motion.div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-text-primary mb-2">AI 正在深度分析</h3>
            <p className="text-sm text-text-tertiary">正在理解你们的情绪和冲突模式...</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-brand-500/40"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="space-y-2 w-full max-w-xs">
            {['扫描情绪信号...', '识别冲突模式...', '分析潜台词...', '生成修复建议...'].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="flex items-center gap-2 text-xs text-text-tertiary"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {step}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Analysis Results ── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Trigger point */}
          <EmotionCard
            emoji="🔥"
            title="导火索"
            subtitle="冲突的触发点"
            delay={0.1}
            className="border-red-500/20 bg-red-500/5"
          >
            <div className="mt-2 p-3 bg-white/[0.04] rounded-2xl">
              <p className="text-sm text-text-secondary leading-relaxed">
                &ldquo;{dummyAnalysis.trigger}&rdquo;
              </p>
            </div>
          </EmotionCard>

          {/* Timeline */}
          <EmotionCard
            emoji="⏳"
            title="情绪时间线"
            subtitle="冲突发展的关键节点"
            delay={0.2}
          >
            <div className="mt-3 space-y-3 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/[0.06]" />
              {dummyAnalysis.timeline.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10',
                    event.type === 'trigger' ? 'bg-red-500/20' :
                    event.type === 'escalate' ? 'bg-accent-amber/20' :
                    event.type === 'defensive' ? 'bg-yellow-500/20' :
                    event.type === 'cold-war' ? 'bg-blue-500/20' :
                    'bg-white/[0.06]'
                  )}>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      event.type === 'trigger' ? 'bg-red-500' :
                      event.type === 'escalate' ? 'bg-accent-amber' :
                      event.type === 'defensive' ? 'bg-yellow-500' :
                      event.type === 'cold-war' ? 'bg-blue-500' :
                      'bg-white/[0.2]'
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-tertiary font-mono">{event.time}</span>
                      {event.type === 'cold-war' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">冷战</span>
                      )}
                      {event.type === 'trigger' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium">触发</span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary mt-0.5">{event.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </EmotionCard>

          {/* Hidden Message Translation */}
          <EmotionCard
            emoji="🎭"
            title="潜台词翻译"
            subtitle="Ta 真正想说的话"
            delay={0.3}
            className="bg-violet-500/5 border-violet-500/20"
          >
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-white/[0.04] rounded-2xl relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-text-tertiary">说了什么</span>
                </div>
                <p className="text-sm text-text-secondary">&ldquo;{dummyAnalysis.hiddenMessage.original}&rdquo;</p>
              </div>
              <motion.div
                className="flex justify-center"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={20} className="text-brand-400/50" />
              </motion.div>
              <div className="p-3 bg-brand-500/10 rounded-2xl border border-brand-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-brand-400" />
                  <span className="text-xs font-medium text-brand-400">潜台词</span>
                </div>
                <p className="text-sm text-text-primary font-medium">
                  {dummyAnalysis.hiddenMessage.meaning}
                </p>
              </div>
            </div>
          </EmotionCard>

          {/* Emotion Analysis */}
          <EmotionCard
            emoji="💗"
            title="双方情绪分析"
            subtitle="你们的情绪状态"
            delay={0.35}
          >
            <div className="flex gap-2 mb-4 mt-2">
              {(['user', 'partner'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-xs font-medium transition-all',
                    activeTab === tab
                      ? 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-md'
                      : 'bg-white/[0.04] text-text-tertiary'
                  )}
                >
                  {tab === 'user' ? '你的情绪' : '对方的情绪'}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {emotionAnalysis[activeTab].map((item) => (
                <div key={item.emotion} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">{item.emoji} {item.emotion}</span>
                    <span className="text-text-tertiary">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={cn(
                        'h-full rounded-full',
                        activeTab === 'user' ? 'bg-gradient-to-r from-brand-400 to-pink-500' : 'bg-gradient-to-r from-mood-calm to-brand-500'
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </EmotionCard>

          {/* AI Summary */}
          <EmotionCard
            emoji="💡"
            title="AI 总结"
            subtitle="冲突的本质"
            delay={0.4}
            className="bg-brand-500/5 border-brand-500/10"
          >
            <div className="mt-2 p-4 bg-white/[0.04] backdrop-blur-sm rounded-2xl">
              <p className="text-sm text-text-secondary leading-relaxed">
                {dummyAnalysis.summary}
              </p>
            </div>
          </EmotionCard>

          {/* Suggestions */}
          <EmotionCard
            emoji="🎯"
            title="双模式建议"
            subtitle="吵赢 vs 哄好"
            delay={0.45}
          >
            <div className="flex gap-2 mt-3 mb-3">
              {(['win', 'makeup'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setExpandedSection(expandedSection === mode ? null : mode)}
                  className={cn(
                    'flex-1 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5',
                    expandedSection === mode
                      ? mode === 'win'
                        ? 'bg-gradient-to-br from-accent-amber to-accent-rose text-white shadow-md'
                        : 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-md'
                      : 'bg-white/[0.04] text-text-tertiary'
                  )}
                >
                  {mode === 'win' ? '🥊 吵赢' : '🌻 哄好'}
                  {expandedSection === mode ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {expandedSection && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 bg-white/[0.04] rounded-2xl space-y-2">
                    {(dummyAnalysis.suggestions[expandedSection as 'win' | 'makeup'] || []).map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5',
                          expandedSection === 'win' ? 'bg-accent-amber' : 'bg-brand-500'
                        )}>
                          {i + 1}
                        </span>
                        {s}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Re-analyze */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setPhase('idle')}
              className="btn-secondary w-full mt-4 flex items-center justify-center gap-2 text-xs"
            >
              <Brain size={14} />
              重新分析
            </motion.button>
          </EmotionCard>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}
