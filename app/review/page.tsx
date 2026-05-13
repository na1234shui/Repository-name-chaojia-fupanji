'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Brain,
  Heart,
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
          <h1 className="text-xl font-bold text-text-primary">AI 复盘</h1>
          <p className="text-xs text-text-tertiary">让 AI 帮你理解冲突</p>
        </div>
      </motion.div>

      {/* ── Import Phase ── */}
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <EmotionCard title="导入聊天记录" emoji="📥" subtitle="粘贴文本 · 截图导入 · 语音输入" className="!p-4">
            <ImportPanel onImport={handleImport} />
          </EmotionCard>

          <AnimatePresence>
            {importedContent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                      {importedContent.source === 'image' ? (
                        <ImageIcon size={16} className="text-emerald-600" />
                      ) : (
                        <FileText size={16} className="text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Check size={14} className="text-emerald-600" />
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

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={startAnalysis}
            disabled={!importedContent}
            className={cn(
              'w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all',
              importedContent
                ? 'btn-primary'
                : 'bg-white text-text-tertiary shadow-card cursor-not-allowed'
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
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-brand-500 to-brand-400 flex items-center justify-center shadow-profile">
              <Brain size={40} className="text-white" />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-accent-peach to-accent-rose flex items-center justify-center shadow-md"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles size={12} className="text-white" />
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
                className="w-3 h-3 rounded-full bg-brand-300"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="space-y-2 w-full max-w-xs">
            {['扫描情绪信号...', '识别冲突模式...', '分析潜台词...', '生成修复建议...'].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -8 }}
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
            className="bg-red-50/80"
          >
            <div className="mt-2 p-3 bg-red-50/60 rounded-2xl">
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
            delay={0.15}
          >
            <div className="mt-3 space-y-3 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100" />
              {dummyAnalysis.timeline.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-3 items-start"
                >
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10',
                    event.type === 'trigger' ? 'bg-red-100' :
                    event.type === 'escalate' ? 'bg-amber-100' :
                    event.type === 'defensive' ? 'bg-yellow-100' :
                    event.type === 'cold-war' ? 'bg-blue-100' :
                    'bg-gray-100'
                  )}>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      event.type === 'trigger' ? 'bg-red-500' :
                      event.type === 'escalate' ? 'bg-amber-500' :
                      event.type === 'defensive' ? 'bg-yellow-500' :
                      event.type === 'cold-war' ? 'bg-blue-500' :
                      'bg-gray-300'
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-tertiary font-mono">{event.time}</span>
                      {event.type === 'cold-war' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">冷战</span>
                      )}
                      {event.type === 'trigger' && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">触发</span>
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
            delay={0.2}
            className="bg-brand-50/60"
          >
            <div className="mt-2 space-y-2">
              <div className="p-3 bg-white rounded-2xl">
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
                <ChevronDown size={20} className="text-brand-300" />
              </motion.div>
              <div className="p-3 bg-brand-50/80 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-brand-500" />
                  <span className="text-xs font-medium text-brand-600">潜台词</span>
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
            delay={0.25}
          >
            <div className="flex gap-2 mb-4 mt-2">
              {(['user', 'partner'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-xs font-medium transition-all',
                    activeTab === tab
                      ? 'bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-md'
                      : 'bg-gray-50 text-text-tertiary'
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
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className={cn(
                        'h-full rounded-full',
                        activeTab === 'user'
                          ? 'bg-gradient-to-r from-brand-500 to-accent-rose'
                          : 'bg-gradient-to-r from-accent-lavender to-brand-400'
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
            delay={0.3}
            className="bg-brand-50/50"
          >
            <div className="mt-2 p-4 bg-white rounded-2xl">
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
            delay={0.35}
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
                        ? 'bg-gradient-to-br from-accent-peach to-accent-rose text-white shadow-md'
                        : 'bg-gradient-to-br from-brand-500 to-brand-400 text-white shadow-md'
                      : 'bg-gray-50 text-text-tertiary'
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
                  <div className="p-3 bg-gray-50 rounded-2xl space-y-2">
                    {(dummyAnalysis.suggestions[expandedSection as 'win' | 'makeup'] || []).map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5',
                          expandedSection === 'win' ? 'bg-accent-peach' : 'bg-brand-500'
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
