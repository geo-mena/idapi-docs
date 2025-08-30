import { ProvideLinksToolSchema } from '@/lib/chat/inkeep-qa-schema';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
import { OramaClient } from '@oramacloud/client';

interface MessagePart {
  type: string;
  text: string;
}

interface InputMessage {
  role: string;
  parts?: MessagePart[];
  content?: string;
}

export const runtime = 'edge';

const deepseek = createOpenAICompatible({
  name: 'deepseek',
  apiKey: 'sk-3e7e79fd8a4a42a89995027830302e81',
  baseURL: 'https://api.deepseek.com',
});

const orama = new OramaClient({
  endpoint: 'https://cloud.orama.run/v1/indexes/idapi-vercel-app-jrzabd',
  api_key: 'gRsNJfKMwc49L6m2I0WqZJN2dwVMeUIg',
});

export async function POST(req: Request) {
  try {
    const reqJson = await req.json();

    if (!reqJson.messages || !Array.isArray(reqJson.messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Convert messages from parts format to content format
    const convertedMessages = reqJson.messages.map((msg: InputMessage) => {
      if (msg.parts) {
        const content = msg.parts
          .filter((part: MessagePart) => part.type === 'text')
          .map((part: MessagePart) => part.text)
          .join(' ');
        return {
          role: msg.role,
          content: content,
        };
      }
      return msg;
    });

    const userMessage = convertedMessages.findLast(
      (msg: { role: string; content: string }) => msg.role === 'user',
    );
    const query = userMessage?.content || '';

    let contextText = '';

    if (query) {
      try {
        let searchResults = await orama.search({
          term: query,
          limit: 10,
        });

        if (!searchResults?.hits || searchResults.hits.length === 0) {
          const queryWords = query.toLowerCase().split(' ');
          const fallbackTerms = queryWords
            .filter((word: string) => word.length > 3)
            .join(' OR ');
          if (fallbackTerms) {
            searchResults = await orama.search({
              term: fallbackTerms,
              limit: 15,
            });
          }
        }

        if (searchResults?.hits) {
          contextText = searchResults.hits
            .map(
              (hit: {
                document: {
                  path?: string;
                  title?: string;
                  content?: string;
                  section?: string;
                  category?: string;
                  description?: string;
                  keywords?: string;
                };
                score?: number;
              }) => {
                const doc = hit.document;
                const score = hit.score
                  ? ` (Relevance: ${hit.score.toFixed(2)})`
                  : '';
                return `# ${doc.title || 'Untitled'}${score}
**Section:** ${doc.section || 'General'}
**Category:** ${doc.category || 'Documentation'}
**Path:** ${doc.path || '#'}
${doc.description ? `**Description:** ${doc.description}\n` : ''}${doc.keywords ? `**Keywords:** ${doc.keywords}\n` : ''}
**Content:**
${doc.content || 'No content available'}`;
              },
            )
            .join('\n\n---\n\n');
        }
      } catch (_error) {
        // Silently handle search errors
      }
    }

    // Add context to system message
    const systemMessage = {
      role: 'system' as const,
      content: `You are a helpful AI assistant for IDAPI documentation. Use the following documentation context to answer questions accurately and provide helpful responses:

${contextText}

Always provide accurate information based on the documentation context provided. If you can't find relevant information in the context, say so clearly.`,
    };

    const allMessages = [systemMessage, ...convertedMessages];

    if (!Array.isArray(allMessages) || allMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid messages found' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const result = streamText({
      model: deepseek('deepseek-chat'),
      tools: {
        provideLinks: {
          inputSchema: ProvideLinksToolSchema,
        },
      },
      messages: allMessages,
      toolChoice: 'auto',
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
