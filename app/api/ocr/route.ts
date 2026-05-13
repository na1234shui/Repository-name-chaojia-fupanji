import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const SYSTEM_PROMPT = `你是一个聊天截图 OCR 识别专家。你的任务是从聊天截图中准确提取文字内容。

请遵循以下规则：
1. 只输出提取的文字，不要添加任何额外说明
2. 保持原始格式，用 "用户:" 和 "对方:" 标注说话方
3. 如果包含微信/QQ/Telegram 等平台格式，保留时间戳（如果有）
4. 遇到无法识别的部分用 [无法识别] 标记
5. 输出语言保持与截图一致（中文为主）

示例输出格式：
用户: 你今天为什么不回我消息？
对方: 我在忙，没看到
用户: 你每次都这么说
对方: 那你觉得是什么原因？`;

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-placeholder') {
      // Mock response when no API key
      return NextResponse.json({
        text: `用户: 你今天为什么不回我消息？\n对方: 我在忙，没看到\n用户: 你每次都这么说\n对方: 那你觉得是什么原因？\n用户: 我说的是事实\n对方: 我不想吵了\n\n⚠️ [OCR 离线模式] 请配置 OPENAI_API_KEY 获取真实识别`,
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: image, detail: 'high' } },
            { type: 'text', text: '请提取这张聊天截图中的所有文字内容' },
          ],
        } as any,
      ],
      max_tokens: 2000,
    });

    const text = response.choices[0]?.message?.content || '';
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('OCR API error:', error);
    return NextResponse.json(
      { error: error.message || 'OCR failed' },
      { status: 500 }
    );
  }
}
