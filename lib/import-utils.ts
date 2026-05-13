export interface ImportedContent {
  text: string;
  source: 'paste' | 'file' | 'image' | 'voice';
  fileName?: string;
  imagePreview?: string;
}

export async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file, 'UTF-8');
  });
}

export function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('图片读取失败'));
    reader.readAsDataURL(file);
  });
}

export async function readClipboard(): Promise<ImportedContent | null> {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          const dataUrl = await readImageAsDataUrl(new File([blob], 'clipboard.png', { type }));
          return {
            text: '[粘贴的截图，点击 OCR 识别文字]',
            source: 'image',
            imagePreview: dataUrl,
          };
        }
        if (type === 'text/plain') {
          const blob = await item.getType(type);
          const text = await blob.text();
          return { text, source: 'paste' };
        }
      }
    }
  } catch {
    // Clipboard API not available or permission denied
  }
  return null;
}

/**
 * Extract text from an image using OpenAI Vision API (/api/ocr)
 * Falls back to mock data if the API is unavailable
 */
export async function extractTextFromImage(imageDataUrl: string): Promise<string> {
  try {
    const response = await fetch('/api/ocr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageDataUrl }),
    });

    if (!response.ok) {
      throw new Error(`OCR API returned ${response.status}`);
    }

    const data = await response.json();
    return data.text || '[OCR 未返回文字]';
  } catch (err) {
    console.warn('OCR API failed, falling back to mock:', err);
    return `用户: 你今天为什么不回我消息？
对方: 我在忙，没看到
用户: 你每次都这么说
对方: 那你觉得是什么原因？
用户: 我说的是事实
对方: 我不想吵了

⚠️ OCR 服务暂不可用，以上为模拟数据。请配置有效的 OPENAI_API_KEY 以启用真实 OCR。`;
  }
}
