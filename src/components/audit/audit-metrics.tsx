import type { ReactNode } from 'react';
import { Calendar, CircleDollarSign, Target, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AuditResult } from '@/lib/utils/mock-audit-generator';
import { formatCurrency } from '@/lib/utils/formatters';

interface AuditMetricsProps {
  result: AuditResult;
}

export function AuditMetrics({ result }: AuditMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={<CircleDollarSign className="h-5 w-5" />}
        label="Current annual spend"
        value={formatCurrency(result.currentAnnualSpend)}
      />
      <MetricCard
        icon={<Target className="h-5 w-5" />}
        label="Potential annual savings"
        value={formatCurrency(result.estimatedAnnualSavings)}
        accent
      />
      <MetricCard
        icon={<Users className="h-5 w-5" />}
        label="Team size"
        value={`${result.teamSize} people`}
      />
      <MetricCard
        icon={<Calendar className="h-5 w-5" />}
        label="Generated"
        value={new Date(result.generatedAt).toLocaleDateString()}
      />
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <Card
      className={`rounded-lg border p-5 ${
        accent ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700">
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${
          accent ? 'text-emerald-700' : 'text-slate-950'
        }`}
      >
        {value}
      </p>
    </Card>
  );
}
