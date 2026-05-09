import { createSupabaseServerClient } from './server';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export type PublicAuditResult = Omit<AuditResult, 'email' | 'company'> & {
  company?: never;
  email?: never;
};

export function createPublicAuditId() {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  return `audit_${suffix}`;
}

export function sanitizeAuditResult(result: AuditResult): PublicAuditResult {
  return {
    id: result.id,
    teamSize: result.teamSize,
    primaryUseCase: result.primaryUseCase,
    currentMonthlySpend: result.currentMonthlySpend,
    currentAnnualSpend: result.currentAnnualSpend,
    estimatedMonthlySpend: result.estimatedMonthlySpend,
    estimatedAnnualSpend: result.estimatedAnnualSpend,
    estimatedMonthlySavings: result.estimatedMonthlySavings,
    estimatedAnnualSavings: result.estimatedAnnualSavings,
    savingsPercentage: result.savingsPercentage,
    optimizedOutcome: result.optimizedOutcome,
    aiSummary: '',
    tools: result.tools,
    recommendations: result.recommendations,
    generatedAt: result.generatedAt,
  };
}

export async function saveAuditResult(result: AuditResult) {
  const supabase = createSupabaseServerClient();
  const publicId = createPublicAuditId();
  const sanitizedResult = sanitizeAuditResult({
    ...result,
    id: publicId,
  });

  if (!supabase) {
    return {
      publicId,
      saved: false,
    };
  }

  const { data: audit, error: auditError } = await supabase
    .from('audits')
    .insert({
      public_id: publicId,
      results_json: sanitizedResult,
      total_monthly_savings: result.estimatedMonthlySavings,
      total_annual_savings: result.estimatedAnnualSavings,
    })
    .select('id')
    .single();

  if (auditError) {
    throw auditError;
  }

  if (result.email) {
    const { error: leadError } = await supabase.from('leads').insert({
      audit_id: audit.id,
      email: result.email,
      company: result.company || null,
      team_size: result.teamSize,
    });

    if (leadError) {
      throw leadError;
    }
  }

  return {
    publicId,
    saved: true,
  };
}

export async function getPublicAuditResult(publicId: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('audits')
    .select('results_json')
    .eq('public_id', publicId)
    .maybeSingle();

  if (error || !data) return null;

  return data.results_json as PublicAuditResult;
}

export async function saveLead(input: {
  publicId: string;
  email: string;
  company?: string;
  role?: string;
  teamSize?: number;
}) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return { saved: false };

  const { data: audit } = await supabase
    .from('audits')
    .select('id')
    .eq('public_id', input.publicId)
    .maybeSingle();

  const { error } = await supabase.from('leads').insert({
    audit_id: audit?.id || null,
    email: input.email,
    company: input.company || null,
    role: input.role || null,
    team_size: input.teamSize || null,
  });

  if (error) throw error;

  return { saved: true };
}
