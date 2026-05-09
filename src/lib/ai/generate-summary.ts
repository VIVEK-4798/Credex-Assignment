import OpenAI from 'openai';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';
import { getFallbackSummary } from './fallback-summary';
import { buildSummaryPrompt } from './summary-prompt';

export async function generateSummary(result: AuditResult): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return getFallbackSummary(result);
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: process.env.OPENAI_SUMMARY_MODEL || 'gpt-4.1-mini',
      input: buildSummaryPrompt(result),
      max_output_tokens: 260,
    });

    return response.output_text?.trim() || getFallbackSummary(result);
  } catch {
    return getFallbackSummary(result);
  }
}
