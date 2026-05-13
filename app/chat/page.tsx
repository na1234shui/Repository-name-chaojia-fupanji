'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  ArrowLeft,
  Swords,
  Heart,
  Mic,
  Trash2,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import BottomNav from '@/components/Navigation';
import { cn, formatTime, getRiskColor, getRiskLabel, type Message } from '@/lib/utils';

const modeConfig = {
  win: { label: '吵赢模式', icon: Swords, color: 'from-accent-amber to-accent-rose', emoji: '🥊', accent: 'text-accent-amber', bgAccent: 'bg-accent-amber/10', borderAccent: 'border-accent-amber/20' },
  makeup: { label: '哄好模式', icon: Heart, color: 'from-brand-400 to-violet-500', emoji: '🌻', accent: 'text-brand-400', bgAccent: 'bg-brand-500/10', borderAccent: 'border-brand-500/20' },
  understood: { label: '被理解模式', icon: Sparkles, color: 'from-mood-calm to-brand-500', emoji: '🥺', accent: 'text-mood-calm', bgAccent: 'bg-mood-calm/10', borderAccent: 'border-mood-calm/20' },
};

const aiPreambles: Record<string, string> = {
  win: '🤜 冷静分析中...我会帮你理清逻辑，设定边界，让你在不失态的情况下表达需求。',
  makeup: '🌻 我在倾听...我会帮你找到共情的切入点，让对话变得温暖。',
  understood: '🥺 我在感受你的情绪...让你知道你并不孤单，你的感受值得被看见。',
};

export default function ChatPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0F]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse">
            <Sparkles size={28} className="text-white" />
          </div>
          <p className="text-sm text-text-tertiary">加载中...</p>
        </div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
}

function ChatPageContent() {
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') as keyof typeof modeConfig) || 'makeup';
  const config = modeConfig[mode];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'ai-welcome',
      role: 'assistant',
      content: `你好，我是你的 AI 情绪助手。当前处于 ${config.label}。\n\n${aiPreambles[mode]}\n\n你可以把想说的话、或者对方发来的消息告诉我，我会帮你分析情绪并给出建议。`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [riskLevel, setRiskLevel] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    // Simulated streaming AI response (fallback when no API key)
    const responseText = getSimulatedResponse(input.trim(), mode);
    const riskSim = Math.min(9, Math.max(1, Math.floor(Math.random() * 7) + 2));
    setRiskLevel(riskSim);

    const assistantMsg: Message = {
      id: 'ai-' + Date.now(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMsg]);

    // Streaming effect
    let index = 0;
    const words = responseText.split('');
    const streamInterval = setInterval(() => {
      if (index < words.length) {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + words[index] };
          }
          return updated;
        });
        index++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 15);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col bg-[#0D0D0F]">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-20 px-4 pt-4 pb-3 bg-[#0D0D0F]/90 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => window.history.back()}
            className="w-9 h-9 rounded-xl bg-surface-card flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-text-secondary" />
          </motion.button>
          <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg shadow-black/20`}>
            <config.icon size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-text-primary text-sm">{config.label}</h2>
            <p className="text-[10px] text-text-tertiary">AI 情绪关系助手</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMessages([{
              id: 'ai-welcome',
              role: 'assistant',
              content: `对话已重置。${aiPreambles[mode]}`,
              timestamp: new Date(),
            }])}
            className="w-9 h-9 rounded-xl bg-surface-card flex items-center justify-center"
          >
            <Trash2 size={16} className="text-text-tertiary" />
          </motion.button>
        </div>

        {/* Risk Meter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`card-gradient p-3 flex items-center gap-3 ${config.borderAccent}`}
        >
          <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-gradient-to-r ${getRiskColor(riskLevel)} text-white text-xs font-bold`}>
            <AlertTriangle size={12} />
            {getRiskLabel(riskLevel)}
          </div>
          <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${riskLevel * 10}%` }}
              className={`h-full rounded-full bg-gradient-to-r ${getRiskColor(riskLevel)}`}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
          <span className="text-xs text-text-tertiary font-mono">{riskLevel}/10</span>
        </motion.div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 px-4 overflow-y-auto space-y-4 pb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                'flex',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-3xl px-4 py-3',
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/20'
                    : 'card-gradient'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{config.emoji}</span>
                    <span className="text-[10px] text-text-tertiary font-medium uppercase tracking-wider">AI</span>
                  </div>
                )}
                <p className={cn(
                  'text-sm leading-relaxed whitespace-pre-wrap',
                  msg.role === 'user' ? 'text-white' : 'text-text-primary'
                )}>
                  {msg.content}
                  {msg.role === 'assistant' && msg.id === messages[messages.length - 1]?.id && isStreaming && (
                    <motion.span
                      className="inline-block w-[2px] h-4 bg-brand-400 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    />
                  )}
                </p>
                <p className={cn(
                  'text-[10px] mt-1.5',
                  msg.role === 'user' ? 'text-white/50' : 'text-text-tertiary'
                )}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky bottom-24 px-4 pb-2"
      >
        <div className="glass rounded-2xl p-2 flex items-end gap-2">
          <button className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0">
            <Mic size={16} className="text-text-tertiary" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你想说的话或对方的消息..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-dim resize-none outline-none py-2 max-h-32"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming}
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all',
              input.trim() && !isStreaming
                ? 'bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-md'
                : 'bg-white/[0.04] text-text-dim'
            )}
          >
            <Send size={16} />
          </motion.button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}

function getSimulatedResponse(input: string, mode: string): string {
  const hasEmotion = /生气|伤心|难过|委屈|烦|讨厌|恨|失望|焦虑|累/.test(input);
  const isQuestion = input.includes('?') || input.includes('？');

  if (mode === 'win') {
    if (hasEmotion) {
      return `我感受到你现在的情绪很强。在这种状态下直接表达可能会让冲突升级。\n\n**建议策略：**\n1️⃣ 先深呼吸，用"我"开头表达感受，而不是"你"开头指责\n2️⃣ 设定边界："当你这样说的时候，我感到不被尊重"\n3️⃣ 保持逻辑：把事件和感受分开说\n\n**示例回复：**\n"我理解你有你的想法，但刚才那句话让我觉得我的感受被忽略了。我希望我们能好好沟通。"`;
    }
    return `**分析：**\n这段话透露出你希望被重视的需求。对方可能没有意识到这一点。\n\n**建议回复方向：**\n• 用事实说话，避免情绪化标签\n• 明确表达你的边界\n• 给对方台阶，保持对话开放性\n\n需要我帮你具体改写回复吗？`;
  }

  if (mode === 'makeup') {
    if (hasEmotion) {
      return `我能感觉到你有些委屈和难过。先别急着自责或道歉，让我们先理解发生了什么。\n\n**共情角度：**\n• 对方可能也在情绪中，不是故意伤害你\n• 你们需要的可能不是争对错，而是被理解\n\n**温和表达示例：**\n"我知道刚才我们都有些情绪。其实我很在乎你，刚才的话不是我的本意，我们可以重新聊聊吗？"`;
    }
    return `🌻 **共情分析：**\n对方的核心需求可能是被理解和被重视。\n\n**和好建议：**\n1️⃣ 先确认对方的感受："你是不是也觉得有点难过？"\n2️⃣ 表达你的在乎："我很在意我们的关系，不想因为误会疏远"\n3️⃣ 提出具体修复方案\n\n需要我帮你生成一段温和的回复吗？`;
  }

  // understood mode
  if (hasEmotion) {
    return `我听到了。你的感受是真实且重要的。\n\n**你现在的情绪：**\n• 你感到有些受伤和委屈\n• 你希望对方能主动理解你\n• 你累了，不想再争了\n\n**我想告诉你：**\n这不是你的错。感情中感到疲惫是很正常的，不意味着你不够好。有时候我们需要的不是解决方案，而是一个"我懂你"的拥抱。\n\n你愿意多说说吗？我在这里听。`;
  }
  return `我在听。无论你想说什么都可以告诉我。\n\n有时候我们只需要一个安全的空间来表达自己，不需要评判，不需要建议。\n\n你想聊聊发生了什么，还是只是想倾诉一下心情？`;
}
