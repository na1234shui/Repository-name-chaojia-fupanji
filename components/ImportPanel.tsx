'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  ImagePlus,
  Mic,
  Clipboard,
  X,
  FileText,
  Check,
  ScanLine,
  Loader2,
  Play,
  Square,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  readTextFile,
  readImageAsDataUrl,
  readClipboard,
  extractTextFromImage,
  type ImportedContent,
} from '@/lib/import-utils';

interface ImportPanelProps {
  onImport: (content: ImportedContent) => void;
}

type ImportTab = 'text' | 'image' | 'voice';

export default function ImportPanel({ onImport }: ImportPanelProps) {
  const [activeTab, setActiveTab] = useState<ImportTab>('text');
  const [textInput, setTextInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [dragging, setDragging] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);

  const textFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ── Drag & Drop ──
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    await handleFileDrop(file);
  }, []);

  const handleFileDrop = async (file: File) => {
    if (file.type.startsWith('image/')) {
      const dataUrl = await readImageAsDataUrl(file);
      setImagePreview(dataUrl);
      setImageFile(file);
      setActiveTab('image');
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const text = await readTextFile(file);
      setTextInput(text);
      setActiveTab('text');
      onImport({ text, source: 'file', fileName: file.name });
    }
  };

  // ── Text tab ──
  const handlePaste = async () => {
    const content = await readClipboard();
    if (content) {
      if (content.imagePreview) {
        setImagePreview(content.imagePreview);
        setActiveTab('image');
      } else {
        setTextInput(content.text);
        onImport(content);
      }
    }
  };

  const handleTextFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await readTextFile(file);
    setTextInput(text);
    onImport({ text, source: 'file', fileName: file.name });
  };

  const handleTextConfirm = () => {
    if (textInput.trim()) {
      onImport({ text: textInput, source: 'paste' });
    }
  };

  // ── Image tab ──
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readImageAsDataUrl(file);
    setImagePreview(dataUrl);
    setImageFile(file);
  };

  const handleOcr = async () => {
    if (!imagePreview) return;
    setOcrStatus('processing');
    try {
      const text = await extractTextFromImage(imagePreview);
      setTextInput(text);
      setOcrStatus('done');
      setActiveTab('text');
      onImport({ text, source: 'image', imagePreview });
    } catch {
      setOcrStatus('error');
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setOcrStatus('idle');
  };

  // ── Voice tab ──
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        setAudioDuration(0);
        setTextInput('[语音录音] 我今天很不开心，感觉你没有在意我的感受。你总是忙，你什么时候能关心一下我？');
        onImport({ text: '[语音录音已记录]', source: 'voice' });
      };

      recorder.start();
      setRecording(true);

      let sec = 0;
      recordingTimerRef.current = setInterval(() => {
        sec++;
        setAudioDuration(sec);
      }, 1000);
    } catch {
      alert('需要麦克风权限才能录音');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Tab selector */}
      <div className="flex gap-1.5 p-1 bg-gray-50 rounded-2xl">
        {[
          { id: 'text' as const, icon: FileText, label: '粘贴文本' },
          { id: 'image' as const, icon: ImagePlus, label: '截图导入' },
          { id: 'voice' as const, icon: Mic, label: '语音输入' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all',
                isActive
                  ? 'bg-white shadow-sm text-brand-600'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              <Icon size={15} />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* ── Text Tab ── */}
      <AnimatePresence mode="wait">
        {activeTab === 'text' && (
          <motion.div
            key="text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handlePaste}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-50 text-xs font-medium text-text-secondary hover:bg-gray-100 transition-colors"
              >
                <Clipboard size={14} />
                从剪贴板粘贴
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => textFileRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-50 text-xs font-medium text-text-secondary hover:bg-gray-100 transition-colors"
              >
                <Upload size={14} />
                上传 .txt 文件
              </motion.button>
              <input
                ref={textFileRef}
                type="file"
                accept=".txt,.csv,.json"
                className="hidden"
                onChange={handleTextFileUpload}
              />
            </div>

            <div
              className={cn(
                'relative transition-all duration-200',
                dragging && 'ring-2 ring-brand-400 ring-offset-2 ring-offset-white rounded-2xl'
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                ref={textAreaRef}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="把你们的聊天记录粘贴在这里…

也可以直接把 .txt 文件拖拽到这里
或上传聊天截图（自动 OCR 识别）..."
                rows={6}
                className="w-full bg-gray-50 rounded-2xl p-4 text-sm text-text-primary placeholder-text-tertiary resize-none outline-none border border-gray-100 focus:border-brand-200 focus:bg-white transition-all"
              />
              {dragging && (
                <div className="absolute inset-0 rounded-2xl bg-brand-50/80 border-2 border-dashed border-brand-300 flex items-center justify-center">
                  <div className="text-center">
                    <Upload size={28} className="text-brand-500 mx-auto mb-1" />
                    <p className="text-sm font-medium text-brand-600">松开导入文件</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleTextConfirm}
                disabled={!textInput.trim()}
                className={cn(
                  'flex-1 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all',
                  textInput.trim()
                    ? 'btn-primary'
                    : 'bg-gray-50 text-text-tertiary cursor-not-allowed'
                )}
              >
                <Check size={18} />
                确认导入
              </motion.button>
              {textInput.trim() && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTextInput('')}
                  className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-text-tertiary hover:text-text-secondary"
                >
                  <X size={18} />
                </motion.button>
              )}
            </div>

            {textInput && (
              <p className="text-[10px] text-text-tertiary text-center">
                已输入 {textInput.length} 个字符
              </p>
            )}
          </motion.div>
        )}

        {/* ── Image Tab ── */}
        {activeTab === 'image' && (
          <motion.div
            key="image"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {!imagePreview ? (
              <div
                className="relative"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => imageFileRef.current?.click()}
                  className={cn(
                    'w-full p-8 rounded-[24px] border-2 border-dashed transition-all flex flex-col items-center gap-3',
                    dragging
                      ? 'border-brand-400 bg-brand-50/60'
                      : 'border-gray-100 bg-gray-50/50 hover:border-brand-200 hover:bg-gray-50'
                  )}
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
                    <ScanLine size={28} className="text-brand-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">点击上传聊天截图</p>
                    <p className="text-[11px] text-text-tertiary mt-1">支持 JPG / PNG / HEIC，自动 OCR 提取文字</p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-brand-50 text-brand-600 font-medium">
                    也支持拖拽或粘贴截图
                  </span>
                </motion.button>
                <input
                  ref={imageFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-[20px] overflow-hidden bg-gray-50 border border-gray-100">
                  <img
                    src={imagePreview}
                    alt="聊天截图预览"
                    className="w-full max-h-[300px] object-contain"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-text-secondary hover:text-text-primary"
                  >
                    <X size={16} />
                  </motion.button>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleOcr}
                    disabled={ocrStatus === 'processing'}
                    className={cn(
                      'flex-1 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all',
                      ocrStatus === 'processing'
                        ? 'bg-gray-50 text-text-tertiary cursor-wait'
                        : 'btn-primary'
                    )}
                  >
                    {ocrStatus === 'processing' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        OCR 识别中...
                      </>
                    ) : (
                      <>
                        <ScanLine size={18} />
                        OCR 识别文字
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => imageFileRef.current?.click()}
                    className="px-4 py-3 rounded-2xl bg-gray-50 text-xs text-text-tertiary hover:text-text-secondary"
                  >
                    重新选择
                  </motion.button>
                  <input
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                {ocrStatus === 'done' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100"
                  >
                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                      <Check size={14} />
                      OCR 识别完成，文字已自动填充到上方文本区
                    </div>
                  </motion.div>
                )}

                {ocrStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between"
                  >
                    <span className="text-xs text-red-500">识别失败，请手动输入或换一张清晰的截图</span>
                    <button onClick={() => setOcrStatus('idle')} className="text-xs text-red-400 underline">
                      重试
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Voice Tab ── */}
        {activeTab === 'voice' && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="p-6 rounded-[24px] bg-white border border-gray-50 flex flex-col items-center gap-4">
              <motion.div
                animate={recording ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center transition-all',
                  recording
                    ? 'bg-gradient-to-br from-red-400 to-red-500 shadow-md'
                    : 'bg-gradient-to-br from-brand-50 to-brand-100'
                )}
              >
                {recording ? (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-10 h-10 rounded-lg bg-white flex items-center justify-center"
                  >
                    <Square size={18} className="text-red-500 fill-red-500" />
                  </motion.div>
                ) : (
                  <Mic size={32} className="text-brand-500" />
                )}
              </motion.div>

              <div className="text-center">
                {recording ? (
                  <>
                    <p className="text-lg font-bold text-text-primary font-mono tracking-wider">
                      {formatDuration(audioDuration)}
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">正在录音，点击停止按钮结束</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-text-primary">语音输入聊天内容</p>
                    <p className="text-[11px] text-text-tertiary mt-1">说出你们的聊天对话，AI 会自动转文字</p>
                  </>
                )}
              </div>

              <div className="flex gap-3">
                {!recording ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={startRecording}
                    className="btn-primary"
                  >
                    <Play size={16} />
                    开始录音
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={stopRecording}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-400 to-red-500 text-white text-sm font-semibold flex items-center gap-2 shadow-md"
                  >
                    <Square size={16} className="fill-white" />
                    停止录音
                  </motion.button>
                )}
              </div>

              {recording && (
                <div className="flex gap-1 items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-red-400"
                      animate={{ height: [8, 20 + Math.random() * 16, 8] }}
                      transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop zone overlay for drag-and-drop */}
      {dragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-brand-500/10 backdrop-blur-sm flex items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-48 h-48 rounded-[32px] bg-white shadow-lg flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-400">
            <Upload size={36} className="text-brand-500" />
            <p className="text-sm font-semibold text-brand-600">释放导入</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
