export interface ChatMessageContentPart {
  type: 'text' | 'image_url' | 'input_audio';
  text?: string;
  image_url?: { url: string };
  input_audio?: { data: string; format: 'mp3' | 'wav' };
}

export interface AIChatOptions {
  systemPrompt: string;
  userPrompt: string;
  imagesBase64?: string[];
  audioBase64?: string;
  model?: string;
  apiKey?: string;
  jsonMode?: boolean;
}

export async function callMultimodalAI(options: AIChatOptions): Promise<string> {
  const apiKey =
    options.apiKey ||
    process.env.OPENROUTER_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    '';

  if (!apiKey) {
    throw new Error('NO_API_KEY_CONFIGURED');
  }

  const contentParts: ChatMessageContentPart[] = [
    { type: 'text', text: options.userPrompt },
  ];

  if (options.imagesBase64 && options.imagesBase64.length > 0) {
    for (const img of options.imagesBase64.slice(0, 4)) {
      contentParts.push({
        type: 'image_url',
        image_url: { url: img },
      });
    }
  }

  // Try preferred model first, then automatic fallback to openrouter/free for free-tier keys
  const modelsToTry = [
    options.model || 'openrouter/free',
    'openrouter/free',
  ];

  let lastError = '';
  for (const model of modelsToTry) {
    const useImages =
      model !== 'openrouter/free' &&
      options.imagesBase64 &&
      options.imagesBase64.length > 0;

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3005',
        'X-Title': 'SkillForge Dashboard',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: options.systemPrompt },
          {
            role: 'user',
            content: useImages ? contentParts : options.userPrompt,
          },
        ],
        temperature: 0.25,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || '';
      if (content) return content;
    } else {
      lastError = await res.text();
    }
  }

  throw new Error(`OpenRouter error: ${lastError}`);
}

export async function callSkillForgeAI(options: {
  prompt: string;
  systemPrompt?: string;
  jsonMode?: boolean;
  apiKey?: string;
}): Promise<string> {
  return callMultimodalAI({
    systemPrompt: options.systemPrompt || 'You are an expert Real Estate Wholesaling AI assistant.',
    userPrompt: options.prompt,
    apiKey: options.apiKey,
    jsonMode: options.jsonMode,
  });
}

