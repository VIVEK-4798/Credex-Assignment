import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AuditResult } from '@/lib/utils/mock-audit-generator';
import { formatCurrency } from '@/lib/utils/formatters';

interface SavingsBreakdownProps {
  result: AuditResult;
}

export function SavingsBreakdown({ result }: SavingsBreakdownProps) {
  const optimizedPercentage =
    result.currentMonthlySpend > 0
      ? Math.round(
          (result.estimatedMonthlySpend / result.currentMonthlySpend) * 100
        )
      : 0;
  const savingsPercentage = Math.min(100, Math.max(0, result.savingsPercentage));

  return (
    <Card className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
          Spend breakdown
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Current spend to optimized spend
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <SpendBox label="Current" value={result.currentMonthlySpend} />
        <div className="flex justify-center text-slate-400">
          <ArrowRight className="h-5 w-5" />
        </div>
        <SpendBox label="Optimized" value={result.estimatedMonthlySpend} accent />
      </div>

      <div className="mt-6 space-y-3">
        <Bar
          label="Optimized monthly spend"
          value={optimizedPercentage}
          className="bg-blue-600"
        />
        <Bar
          label="Potential savings"
          value={savingsPercentage}
          className="bg-emerald-500"
        />
      </div>
    </Card>
  );
}

function SpendBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        accent ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-1 text-3xl font-bold ${
          accent ? 'text-emerald-700' : 'text-slate-950'
        }`}
      >
        {formatCurrency(value)}
      </p>
      <p className="mt-1 text-xs text-slate-500">per month</p>
    </div>
  );
}

function Bar({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium text-slate-900">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${className}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
