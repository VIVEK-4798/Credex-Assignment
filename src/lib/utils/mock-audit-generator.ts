import { UserToolInput } from '@/store/audit-store';
import { runAuditEngine } from '@/lib/audit-engine';
import { AI_TOOLS } from '@/data/tools';
import { AuditRecommendation as EngineRecommendation } from '@/types/audit';

export interface AuditRecommendation {
  id: string;
  title: string;
  description: string;
  category:
    | 'consolidation'
    | 'downgrade'
    | 'alternative'
    | 'feature-overlap'
    | 'optimized'
    | 'credits';
  monthlyRealizedSavings: number;
  effort: 'low' | 'medium' | 'high';
  confidenceScore: number;
  implementationDifficulty: string;
  estimatedMigrationTime: string;
  actionLabel: string;
}

export interface AuditResult {
  id: string;
  company: string;
  email: string;
  teamSize: number;
  primaryUseCase: string;
  currentMonthlySpend: number;
  currentAnnualSpend: number;
  estimatedMonthlySpend: number;
  estimatedAnnualSpend: number;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  savingsPercentage: number;
  optimizedOutcome: string;
  tools: UserToolInput[];
  recommendations: AuditRecommendation[];
  generatedAt: string;
}

export function generateAuditReport(
  tools: UserToolInput[],
  company: string,
  email: string,
  teamSize: number,
  primaryUseCase: string
): AuditResult {
  const engineResult = runAuditEngine({
    tools,
    teamSize,
    primaryUseCase,
  });

  const currentAnnualSpend = engineResult.currentMonthlySpend * 12;
  const estimatedAnnualSpend = engineResult.optimizedMonthlySpend * 12;

  return {
    id: createAuditId(),
    company,
    email,
    teamSize,
    primaryUseCase,
    currentMonthlySpend: engineResult.currentMonthlySpend,
    currentAnnualSpend,
    estimatedMonthlySpend: engineResult.optimizedMonthlySpend,
    estimatedAnnualSpend,
    estimatedMonthlySavings: engineResult.totalMonthlySavings,
    estimatedAnnualSavings: engineResult.totalAnnualSavings,
    savingsPercentage: engineResult.totalSavingsPercentage,
    optimizedOutcome: engineResult.optimizedOutcome,
    tools,
    recommendations: engineResult.recommendations
      .map(toLegacyRecommendation)
      .slice(0, 5),
    generatedAt: new Date().toISOString(),
  };
}

export const generateMockAudit = generateAuditReport;

function toLegacyRecommendation(
  recommendation: EngineRecommendation
): AuditRecommendation {
  const toolName =
    AI_TOOLS.find((tool) => tool.id === recommendation.toolId)?.name ||
    recommendation.toolId;

  return {
    id: recommendation.id,
    title: getRecommendationTitle(recommendation, toolName),
    description: recommendation.reason,
    category: recommendation.type,
    monthlyRealizedSavings: recommendation.monthlySavings,
    effort: recommendation.effortLevel,
    confidenceScore: recommendation.confidenceScore,
    implementationDifficulty: recommendation.implementationDifficulty,
    estimatedMigrationTime: recommendation.estimatedMigrationTime,
    actionLabel: recommendation.actionLabel,
  };
}

function getRecommendationTitle(
  recommendation: EngineRecommendation,
  toolName: string
): string {
  const titles: Record<EngineRecommendation['type'], string> = {
    downgrade: `Evaluate ${toolName} plan downgrade`,
    alternative: `Compare ${toolName} alternatives`,
    consolidation: `Review ${toolName} consolidation`,
    credits: `Check ${toolName} credits or discounts`,
    optimized: `Optimize ${toolName} spend`,
  };

  return titles[recommendation.type];
}

function createAuditId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.round(
    performance.now() * 1000
  ).toString(36)}`;
}
