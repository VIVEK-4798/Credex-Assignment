'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AiSummaryLoader } from '@/components/audit/ai-summary-loader';
import { AuditMetrics } from '@/components/audit/audit-metrics';
import { CredexCta } from '@/components/audit/credex-cta';
import { LeadCaptureModal } from '@/components/audit/lead-capture-modal';
import { OptimizedState } from '@/components/audit/optimized-state';
import { RecommendationCard } from '@/components/audit/recommendation-card';
import { ResultsHero } from '@/components/audit/results-hero';
import { SavingsBreakdown } from '@/components/audit/savings-breakdown';
import { ShareActions } from '@/components/audit/share-actions';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

interface ResultsPageClientProps {
  publicId: string;
  initialResult: AuditResult | null;
}

export function ResultsPageClient({
  publicId,
  initialResult,
}: ResultsPageClientProps) {
  const [result, setResult] = useState<AuditResult | null>(initialResult);
  const [isLoading, setIsLoading] = useState(!initialResult);

  useEffect(() => {
    if (initialResult) return;

    const loadResult = async () => {
      const response = await fetch(`/api/audits/${publicId}`);
      if (response.ok) {
        const data = (await response.json()) as { result?: AuditResult };
        if (data.result) {
          setResult(data.result);
          setIsLoading(false);
          return;
        }
      }

      const localResult = localStorage.getItem('audit-result');
      if (localResult) {
        const parsedResult = JSON.parse(localResult) as AuditResult;
        if (parsedResult.id === publicId) {
          setResult(parsedResult);
        }
      }

      setIsLoading(false);
    };

    void loadResult();
  }, [initialResult, publicId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="h-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-lg bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="mb-4 text-slate-600">No audit found</p>
          <Button asChild>
            <Link href="/audit">Start New Audit</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/"
                className="mb-3 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
              <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                AI Spend Audit
              </h1>
              <p className="mt-1 text-sm text-slate-600">Public audit report</p>
            </div>
            <ShareActions />
          </div>
        </div>
      </div>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <ResultsHero result={result} />
          <AuditMetrics result={result} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <SavingsBreakdown result={result} />

              {result.recommendations.length > 0 ? (
                <div>
                  <div className="mb-4">
                    <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                      Recommendations
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                      Highest-impact actions
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {result.recommendations.map((recommendation) => (
                      <RecommendationCard
                        key={recommendation.id}
                        recommendation={recommendation}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <OptimizedState
                  message={
                    result.optimizedOutcome ||
                    'Your current AI stack appears reasonably optimized for your team size and usage pattern.'
                  }
                />
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <AiSummaryLoader result={result} />
              <CredexCta />
              <LeadCaptureModal publicId={publicId} teamSize={result.teamSize} />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
