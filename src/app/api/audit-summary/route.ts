import { generateSummary } from '@/lib/ai/generate-summary';
import {
  getRateLimitKey,
  isRateLimited,
} from '@/lib/security/rate-limit';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export async function POST(request: Request) {
  try {
    if (
      isRateLimited(getRateLimitKey(request, 'audit-summary'), {
        limit: 12,
        windowMs: 60_000,
      })
    ) {
      return Response.json(
        {
          summary:
            'Your current AI tooling stack shows practical optimization opportunities. Review plan fit, seat counts, and overlapping subscriptions before making vendor changes.',
        },
        { status: 200 }
      );
    }

    const result = (await request.json()) as AuditResult;
    const summary = await generateSummary(result);

    return Response.json({ summary });
  } catch {
    return Response.json(
      {
        summary:
          'Your current AI tooling stack shows practical optimization opportunities. Review plan fit, seat counts, and overlapping subscriptions before making vendor changes.',
      },
      { status: 200 }
    );
  }
}
