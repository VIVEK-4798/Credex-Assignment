import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export function getFallbackSummary(result: AuditResult): string {
  if (result.recommendations.length === 0 || result.estimatedMonthlySavings <= 0) {
    return 'Your current AI tooling stack appears well matched to your team size and usage pattern. Continue monitoring seat counts, usage, and billing changes as your team grows.';
  }

  const topRecommendation = result.recommendations[0];
  const savings = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(result.estimatedMonthlySavings);

  return `Your AI tooling stack shows practical savings potential of about ${savings} per month. The clearest opportunity is ${topRecommendation.title.toLowerCase()}, with additional review focused on plan fit, seat counts, and overlapping subscriptions.`;
}
