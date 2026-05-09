import type { ReactNode } from 'react';
import { ArrowRight, BadgeCheck, Clock, Gauge, PiggyBank } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AuditRecommendation } from '@/lib/utils/mock-audit-generator';
import { formatCurrency } from '@/lib/utils/formatters';

interface RecommendationCardProps {
  recommendation: AuditRecommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-950">
              {recommendation.toolName}
            </h3>
            <PriorityBadge priority={recommendation.priority} />
            <Badge variant="outline" className="gap-1">
              <BadgeCheck className="h-3 w-3" />
              {recommendation.confidenceScore}% confidence
            </Badge>
          </div>
          <p className="text-sm font-medium text-slate-600">
            {recommendation.title}
          </p>
        </div>
        <div className="rounded-md bg-emerald-50 px-3 py-2 text-left sm:text-right">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-emerald-700">
            Monthly savings
          </p>
          <p className="text-2xl font-bold text-emerald-700">
            {formatCurrency(recommendation.monthlyRealizedSavings)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {recommendation.description}
      </p>

      <div className="mt-5 grid gap-3 border-y border-slate-100 py-4 sm:grid-cols-3">
        <MetadataItem
          icon={<Gauge className="h-4 w-4" />}
          label="Effort"
          value={formatLabel(recommendation.effort)}
        />
        <MetadataItem
          icon={<PiggyBank className="h-4 w-4" />}
          label="Difficulty"
          value={recommendation.implementationDifficulty}
        />
        <MetadataItem
          icon={<Clock className="h-4 w-4" />}
          label="Timeline"
          value={recommendation.estimatedMigrationTime}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">
          {recommendation.currentPlan} <ArrowRight className="mx-1 inline h-3.5 w-3.5" />{' '}
          <span className="font-medium text-slate-800">
            {recommendation.recommendedPlan}
          </span>
        </div>
        <Button className="gap-2 sm:w-auto">
          {recommendation.actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: AuditRecommendation['priority'];
}) {
  const variant =
    priority === 'high'
      ? 'destructive'
      : priority === 'medium'
        ? 'default'
        : 'secondary';

  return (
    <Badge variant={variant} className="capitalize">
      {priority} priority
    </Badge>
  );
}

function MetadataItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 text-slate-400">{icon}</div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function formatLabel(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)} effort`;
}
