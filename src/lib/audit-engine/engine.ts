import { AuditInput, AuditResult } from '@/types/audit';
import { evaluateStack } from './evaluate-stack';
import { evaluateTool } from './evaluate-tool';
import { prioritizeRecommendations } from './prioritize-recommendations';

const OPTIMIZED_OUTCOME =
  'Your current AI stack appears reasonably optimized for your team size and usage pattern.';

export async function generateAudit(input: AuditInput): Promise<AuditResult> {
  return runAuditEngine(input);
}

export function runAuditEngine(input: AuditInput): AuditResult {
  const normalizedInput = normalizeAuditInput(input);
  const toolRecommendations = normalizedInput.tools.flatMap(
    (tool) => evaluateTool(tool, normalizedInput).recommendations
  );
  const stackRecommendations = evaluateStack(
    normalizedInput.tools,
    normalizedInput
  ).recommendations;
  const recommendations = prioritizeRecommendations([
    ...toolRecommendations,
    ...stackRecommendations,
  ]);

  const currentMonthlySpend = normalizedInput.tools.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );
  const totalMonthlySavings = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.monthlySavings,
    0
  );
  const totalAnnualSavings = totalMonthlySavings * 12;
  const totalSavingsPercentage =
    currentMonthlySpend > 0
      ? Math.round((totalMonthlySavings / currentMonthlySpend) * 100)
      : 0;

  return {
    currentMonthlySpend,
    optimizedMonthlySpend: Math.max(currentMonthlySpend - totalMonthlySavings, 0),
    totalMonthlySavings,
    totalAnnualSavings,
    totalSavingsPercentage,
    recommendations,
    optimizedOutcome: recommendations.length === 0 ? OPTIMIZED_OUTCOME : '',
  };
}

function normalizeAuditInput(input: AuditInput): AuditInput {
  const teamSize = Math.max(1, Math.floor(Number(input.teamSize) || 1));

  return {
    ...input,
    teamSize,
    primaryUseCase: input.primaryUseCase || 'Mixed / Other',
    tools: input.tools.map((tool) => ({
      ...tool,
      monthlySpend: Math.max(0, Number(tool.monthlySpend) || 0),
      seats: Math.max(1, Math.floor(Number(tool.seats) || 1)),
    })),
  };
}
