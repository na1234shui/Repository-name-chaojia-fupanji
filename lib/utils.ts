import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

export function getEmotionEmoji(emotion: string): string {
  const map: Record<string, string> = {
    anxious: '😰',
    angry: '😤',
    sad: '😢',
    hurt: '💔',
    defensive: '🛡️',
    calm: '😌',
    love: '💕',
    understood: '🥺',
    confused: '😕',
    tired: '😮‍💨',
    hopeful: '✨',
    cold: '🥶',
  };
  return map[emotion] || '💭';
}

export function getRiskColor(level: number): string {
  if (level >= 8) return 'from-red-500 to-rose-600';
  if (level >= 5) return 'from-orange-400 to-pink-500';
  if (level >= 3) return 'from-yellow-400 to-orange-500';
  return 'from-emerald-400 to-teal-500';
}

export function getRiskLabel(level: number): string {
  if (level >= 8) return '高危';
  if (level >= 5) return '警惕';
  if (level >= 3) return '微妙';
  return '平稳';
}

export const relationshipStatuses = [
  { value: 'dating', label: '恋爱中', emoji: '💑' },
  { value: 'crush', label: '暧昧期', emoji: '💫' },
  { value: 'long_distance', label: '异地恋', emoji: '🌍' },
  { value: 'cold_war', label: '冷战中', emoji: '🥶' },
  { value: 'recovery', label: '挽回中', emoji: '🫂' },
  { value: 'married', label: '已婚', emoji: '💒' },
];

export const goals = [
  { value: 'win', label: '我要吵赢', emoji: '🥊', icon: 'Fist' },
  { value: 'makeup', label: '我要哄好', emoji: '🌻', icon: 'Heart' },
  { value: 'understood', label: '我只想被理解', emoji: '🥺', icon: 'HeartHandshake' },
];

export const emotionAnalysis = {
  user: [
    { emotion: '委屈', emoji: '😞', percentage: 65 },
    { emotion: '焦虑', emoji: '😰', percentage: 45 },
    { emotion: '被忽视', emoji: '👻', percentage: 55 },
  ],
  partner: [
    { emotion: '防御', emoji: '🛡️', percentage: 70 },
    { emotion: '逃避', emoji: '🏃', percentage: 50 },
    { emotion: '压力', emoji: '😮‍💨', percentage: 60 },
  ],
};

export const dummyAnalysis = {
  trigger: '你回复"随便"的时候，其实是在表达失望',
  timeline: [
    { time: '14:23', event: '💬 你：今天吃什么？', type: 'normal' },
    { time: '14:25', event: '💬 对方：随便', type: 'trigger' },
    { time: '14:26', event: '💬 你：又是随便，你能不能有点主见', type: 'escalate' },
    { time: '14:30', event: '💬 对方：那你决定就好了啊', type: 'defensive' },
    { time: '14:35', event: '⏸️ 冷战开始', type: 'cold-war' },
  ],
  hiddenMessage: {
    original: '"随便"',
    meaning: '其实我希望你在意我的喜好，而不是把决定权丢给我',
  },
  summary: '你们的矛盾不是因为不爱，而是需求没有被准确表达。他说的"随便"背后是"我希望你更在意我"，你的追问背后是"我希望你更有参与感"。',
  suggestions: {
    win: [
      '用"我"开头表达感受，避免指责语气',
      '设定边界："我需要你认真回应"',
      '保持逻辑清晰，不被情绪带跑',
    ],
    makeup: [
      '先共情："你是不是也觉得有点累了？"',
      '表达需求："我希望我们能一起决定"',
      '提出具体方案："下次我们轮流选，好吗？"',
    ],
  },
};

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatAnalysis {
  emotions: string[];
  riskLevel: number;
  suggestions: string[];
}
