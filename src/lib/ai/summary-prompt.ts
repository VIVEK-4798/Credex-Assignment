import type { AuditResult } from '@/lib/utils/mock-audit-generator';

export function buildSummaryPrompt(result: AuditResult): string {
  const recommendations = result.recommendations
    .map(
      (recommendation) =>
        `- ${recommendation.toolName}: ${recommendation.description} Monthly savings: $${recommendation.monthlyRealizedSavings}. Effort: ${recommendation.effort}.`
    )
    .join('\n');

  return `Summarize this AI spend audit for a startup founder.

Be concise, practical, and financially grounded.
Avoid hype language.
Avoid generic AI transformation language.
Mention major savings opportunities and stack inefficiencies.
Do not invent recommendations, vendors, pricing, or savings.
Keep the summary to 2 short paragraphs.

Audit data:
Company: ${result.company || 'Unknown'}
Team size: ${result.teamSize}
Primary use case: ${result.primaryUseCase}
Tools analyzed: ${result.tools.length}
Current monthly spend: $${result.currentMonthlySpend}
Optimized monthly spend: $${result.estimatedMonthlySpend}
Estimated monthly savings: $${result.estimatedMonthlySavings}
Estimated annual savings: $${result.estimatedAnnualSavings}
Savings percentage: ${result.savingsPercentage}%

Recommendations:
${recommendations || '- No material recommendations. The stack appears reasonably optimized.'}`;
}
