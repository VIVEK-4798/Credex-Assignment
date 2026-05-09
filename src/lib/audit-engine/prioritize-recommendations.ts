import { AuditRecommendation } from '@/types/audit';

const priorityRank: Record<AuditRecommendation['priority'], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const effortRank: Record<AuditRecommendation['type'], number> = {
  downgrade: 1,
  credits: 1,
  optimized: 1,
  consolidation: 2,
  alternative: 3,
};

export function prioritizeRecommendations(
  recommendations: AuditRecommendation[]
): AuditRecommendation[] {
  return [...recommendations].sort((a, b) => {
    const priorityDelta = priorityRank[b.priority] - priorityRank[a.priority];
    if (priorityDelta !== 0) return priorityDelta;

    const savingsDelta = b.monthlySavings - a.monthlySavings;
    if (savingsDelta !== 0) return savingsDelta;

    const confidenceDelta = b.confidenceScore - a.confidenceScore;
    if (confidenceDelta !== 0) return confidenceDelta;

    return effortRank[a.type] - effortRank[b.type];
  });
}
