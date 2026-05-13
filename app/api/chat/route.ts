import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

const systemPrompt = `你是一个「吵架复盘机」AI情绪关系助手。你的角色是帮助用户分析情绪冲突，提供沟通建议。

**核心原则：**
1. 不要站队，保持中立
2. 帮助用户理解自己和对方的情绪
3. 提供具体的表达建议而非鸡汤
4. 识别潜台词："随便"="我希望你在意我"

**输出风格：**
- 温暖但有边界，像一位懂心理学的朋友
- 使用emoji增加情绪表达
- 结构化输出：情绪分析 → 潜台词识别 → 建议
- 简短精炼，移动端友好

**模式说明：**
- win模式：帮助用户逻辑清晰地表达边界、避免被情绪操控
- makeup模式：帮助用户共情、修复关系、温和表达
- understood模式：纯倾听和情绪陪伴`;

export async function POST(req: NextRequest) {
  const { messages, mode } = await req.json();

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    return new Response(
      JSON.stringify({
        error: '请先配置 .env.local 中的 OPENAI_API_KEY',
        mode,
      }),
      { status: 400 }
    );
  }

  const modePrefix = mode === 'win'
    ? '当前为吵赢模式：帮用户理性表达、设定边界。'
    : mode === 'makeup'
    ? '当前为哄好模式：帮用户共情修复、温和沟通。'
    : '当前为被理解模式：倾听和陪伴用户。';

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `${systemPrompt}\n\n${modePrefix}` },
        ...messages.slice(-10).map((m: any) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
      stream: true,
      max_tokens: 500,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'AI 服务异常' }),
      { status: 500 }
    );
  }
}
