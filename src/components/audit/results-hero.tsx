import type { ReactNode } from 'react';
import { BarChart3, BadgeCheck, Sparkles, Wallet } from 'lucide-react';
import { AuditResult } from '@/lib/utils/mock-audit-generator';
import { formatCurrency } from '@/lib/utils/formatters';

interface ResultsHeroProps {
  result: AuditResult;
}

export function ResultsHero({ result }: ResultsHeroProps) {
  const confidenceLevel = getConfidenceLevel(result);
  const hasSavings = result.estimatedMonthlySavings > 0;

  return (
    <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_48%,#14b8a6_100%)] px-6 py-8 text-white shadow-xl shadow-blue-950/10 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
            <Sparkles className="h-3.5 w-3.5" />
            AI spend audit complete · Updated May 2026
          </div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-100">
            Potential monthly savings
          </p>
          <h1 className="animate-in fade-in slide-in-from-bottom-2 text-5xl font-bold leading-tight duration-500 sm:text-6xl lg:text-7xl">
            {hasSavings
              ? formatCurrency(result.estimatedMonthlySavings)
              : 'Optimized'}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-50 sm:text-xl">
            {hasSavings
              ? `You could save ${formatCurrency(result.estimatedAnnualSavings)} annually by addressing the clearest plan, seat, and stack opportunities.`
              : 'Your current AI stack already appears well matched to your team size and usage pattern.'}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <HeroMetric
            icon={<Wallet className="h-4 w-4" />}
            label="Tools analyzed"
            value={result.tools.length.toString()}
          />
          <HeroMetric
            icon={<BarChart3 className="h-4 w-4" />}
            label="Opportunities"
            value={result.recommendations.length.toString()}
          />
          <HeroMetric
            icon={<BadgeCheck className="h-4 w-4" />}
            label="Confidence"
            value={confidenceLevel}
          />
        </div>
      </div>
    </section>
  );
}

function HeroMetric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-cyan-100">
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-blue-100">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function getConfidenceLevel(result: AuditResult): string {
  if (result.recommendations.length === 0) return 'High';

  const averageConfidence =
    result.recommendations.reduce(
      (sum, recommendation) => sum + recommendation.confidenceScore,
      0
    ) / result.recommendations.length;

  if (averageConfidence >= 75) return 'High';
  if (averageConfidence >= 50) return 'Medium';
  return 'Low';
}
