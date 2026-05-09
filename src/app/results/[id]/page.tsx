import type { Metadata } from 'next';
import { ResultsPageClient } from './results-page-client';
import { getPublicAuditResult } from '@/lib/supabase/audits';
import { formatCurrency } from '@/lib/utils/formatters';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

type ResultsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ResultsPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getPublicAuditResult(id);
  const annualSavings = result?.estimatedAnnualSavings || 0;
  const title =
    annualSavings > 0
      ? `Potential AI Savings: ${formatCurrency(annualSavings)}/year`
      : 'AI Spend Audit Results';
  const description =
    annualSavings > 0
      ? `See a shareable AI spend audit with ${formatCurrency(annualSavings)} in potential annual savings.`
      : 'See a shareable AI spend audit with plan, seat, and stack recommendations.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AuditResultsPage({ params }: ResultsPageProps) {
  const { id } = await params;
  const result = await getPublicAuditResult(id);

  return (
    <ResultsPageClient
      publicId={id}
      initialResult={(result as AuditResult | null) || null}
    />
  );
}
