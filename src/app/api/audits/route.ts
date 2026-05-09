import { saveAuditResult } from '@/lib/supabase/audits';
import {
  getRateLimitKey,
  isHoneypotFilled,
  isRateLimited,
} from '@/lib/security/rate-limit';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export async function POST(request: Request) {
  try {
    if (
      isRateLimited(getRateLimitKey(request, 'audit-save'), {
        limit: 10,
        windowMs: 60_000,
      })
    ) {
      return Response.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const result = (await request.json()) as AuditResult & { website?: string };
    if (isHoneypotFilled(result.website)) {
      return Response.json({ publicId: result.id, saved: false });
    }

    const savedAudit = await saveAuditResult(result);

    return Response.json(savedAudit);
  } catch {
    return Response.json(
      { error: 'Unable to save audit result.' },
      { status: 500 }
    );
  }
}
