import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/prompts';
import { LATEX_TEMPLATE } from '@/lib/latexTemplate';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, provider, apiKey } = await req.json();

    if (!apiKey) {
      return new Response('Unauthorized: Missing API Key', { status: 401 });
    }

    let model;

    if (provider === 'gemini') {
      const google = createGoogleGenerativeAI({
        apiKey: apiKey,
      });
      // Use gemini-1.5-pro for best quality resume generation
      model = google('gemini-1.5-pro-latest'); 
    } else {
      const openai = createOpenAI({
        apiKey: apiKey,
      });
      model = openai('gpt-4o'); 
    }

    const result = await streamText({
      model: model as any,
      system: `${SYSTEM_PROMPT}\n\nTEMPLATE TO USE:\n\`\`\`latex\n${LATEX_TEMPLATE}\n\`\`\``,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    return new Response(error.message || 'Internal Server Error', { status: 500 });
  }
}
