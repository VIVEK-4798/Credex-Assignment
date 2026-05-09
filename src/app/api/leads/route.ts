import { getPublicAuditResult, saveLead } from '@/lib/supabase/audits';
import { sendAuditReadyEmail } from '@/lib/email/audit-ready-email';
import {
  getRateLimitKey,
  isHoneypotFilled,
  isRateLimited,
} from '@/lib/security/rate-limit';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export async function POST(request: Request) {
  try {
    if (
      isRateLimited(getRateLimitKey(request, 'lead-save'), {
        limit: 6,
        windowMs: 60_000,
      })
    ) {
      return Response.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const input = (await request.json()) as {
      publicId: string;
      email: string;
      company?: string;
      role?: string;
      teamSize?: number;
      website?: string;
    };

    if (isHoneypotFilled(input.website)) {
      return Response.json({ saved: true });
    }

    if (!input.email) {
      return Response.json({ error: 'Email is required.' }, { status: 400 });
    }

    const result = await saveLead(input);
    const auditResult = await getPublicAuditResult(input.publicId);

    if (auditResult) {
      const origin = new URL(request.url).origin;
      await sendAuditReadyEmail({
        to: input.email,
        result: {
          ...auditResult,
          company: input.company || '',
          email: input.email,
        } as AuditResult,
        resultsUrl: `${origin}/results/${input.publicId}`,
      });
    }

    return Response.json(result);
  } catch {
    return Response.json({ error: 'Unable to save lead.' }, { status: 500 });
  }
}
