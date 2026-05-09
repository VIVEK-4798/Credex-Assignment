import { UserToolInput, AuditInput, AuditRecommendation } from '@/types/audit';
import { AI_TOOLS } from '@/data/tools';
import { calculateAnnualSavings, calculateSavingsPercentage } from './calculate-savings';
import { calculateConfidenceScore, getPriorityFromConfidence } from './confidence-score';
import { generateActionLabel, getRecommendationMetadata } from './generate-reasons';

interface StackEvaluationResult {
  recommendations: AuditRecommendation[];
}

/**
 * Evaluate the entire tool stack for overlap and consolidation opportunities
 */
export function evaluateStack(
  tools: UserToolInput[],
  input: AuditInput
): StackEvaluationResult {
  const recommendations: AuditRecommendation[] = [];
  const duplicateRec = checkDuplicatedTools(tools);
  if (duplicateRec) recommendations.push(duplicateRec);

  const toolsByCategory = groupToolsByCategory(tools);

  Object.entries(toolsByCategory).forEach(([category, categoryTools]) => {
    if (categoryTools.length >= 3) {
      const consolidationRec = checkConsolidationOpportunity(
        categoryTools,
        category,
        input
      );
      if (consolidationRec) {
        recommendations.push(consolidationRec);
      }
    }
  });

  return { recommendations };
}

/**
 * Group tools by category
 */
function groupToolsByCategory(tools: UserToolInput[]): Record<string, UserToolInput[]> {
  const grouped: Record<string, UserToolInput[]> = {};

  tools.forEach((tool) => {
    const aiTool = AI_TOOLS.find((t) => t.id === tool.toolId);
    if (aiTool) {
      if (!grouped[aiTool.category]) {
        grouped[aiTool.category] = [];
      }
      grouped[aiTool.category].push(tool);
    }
  });

  return grouped;
}

/**
 * Check for consolidation opportunity in a category
 */
function checkConsolidationOpportunity(
  categoryTools: UserToolInput[],
  category: string,
  input: AuditInput
): AuditRecommendation | null {
  if (categoryTools.length < 3 || category !== 'chat') return null;

  const totalCategorySpend = categoryTools.reduce(
    (sum, t) => sum + t.monthlySpend,
    0
  );

  // Estimate 20-30% savings from consolidation
  const estimatedSavings = Math.round(totalCategorySpend * 0.25);

  // Only recommend if meaningful savings
  if (estimatedSavings < 20) return null;

  const savingsPercentage = calculateSavingsPercentage(estimatedSavings, totalCategorySpend);

  // Pick the highest-spend tool as the "primary"
  const primaryTool = categoryTools.reduce((prev, curr) =>
    curr.monthlySpend > prev.monthlySpend ? curr : prev
  );

  const primaryAiTool = AI_TOOLS.find((t) => t.id === primaryTool.toolId);
  if (!primaryAiTool) return null;

  // Build reason
  const toolNames = categoryTools
    .map((t) => {
      const aiTool = AI_TOOLS.find((at) => at.id === t.toolId);
      return aiTool?.name;
    })
    .filter(Boolean)
    .join(', ');

  const confidence = calculateConfidenceScore({
    isOverspending: true,
    savingsPercentage,
    teamSizeMatch: false,
    planMismatch: 0.5,
    marketValidation: 0.6,
    type: 'consolidation',
  });

  const priority = getPriorityFromConfidence(confidence, savingsPercentage);
  const metadata = getRecommendationMetadata('consolidation');

  const reason =
    savingsPercentage >= 30
      ? `You may be able to consolidate ${categoryTools.length} ${category} tools for ${input.primaryUseCase}: ${toolNames}. This could save about ${savingsPercentage}% while reducing tool fatigue, but keep any tool that supports a distinct workflow.`
      : `You may be able to consolidate part of your ${category} stack for ${input.primaryUseCase}: ${toolNames}. If their use cases overlap, this could save about ${savingsPercentage}%.`;

  return {
    id: `consolidate-${category}`,
    toolId: primaryTool.toolId,
    type: 'consolidation',
    priority,
    currentPlan: 'Multiple',
    recommendedPlan: `Consolidated ${primaryAiTool.name}`,
    currentSpend: totalCategorySpend,
    optimizedSpend: totalCategorySpend - estimatedSavings,
    monthlySavings: estimatedSavings,
    annualSavings: calculateAnnualSavings(estimatedSavings),
    savingsPercentage,
    confidenceScore: confidence,
    ...metadata,
    reason,
    actionLabel: generateActionLabel('consolidation'),
  };
}

function checkDuplicatedTools(tools: UserToolInput[]): AuditRecommendation | null {
  const toolCounts = tools.reduce<Record<string, UserToolInput[]>>((acc, tool) => {
    acc[tool.toolId] = [...(acc[tool.toolId] || []), tool];
    return acc;
  }, {});
  const duplicateTools = Object.values(toolCounts).filter(
    (entries) => entries.length > 1
  );

  if (duplicateTools.length === 0) return null;

  const duplicatedGroup = duplicateTools[0];
  const aiTool = AI_TOOLS.find((tool) => tool.id === duplicatedGroup[0].toolId);
  if (!aiTool) return null;

  const totalSpend = duplicatedGroup.reduce(
    (sum, tool) => sum + tool.monthlySpend,
    0
  );
  const lowestSpend = Math.min(...duplicatedGroup.map((tool) => tool.monthlySpend));
  const monthlySavings = lowestSpend > 0 ? lowestSpend : 0;
  if (monthlySavings <= 0) return null;

  const savingsPercentage = calculateSavingsPercentage(monthlySavings, totalSpend);
  const confidence = calculateConfidenceScore({
    isOverspending: true,
    savingsPercentage,
    teamSizeMatch: false,
    planMismatch: 0.9,
    marketValidation: 0.9,
    type: 'consolidation',
  });
  const metadata = getRecommendationMetadata('consolidation');

  return {
    id: `duplicate-${aiTool.id}`,
    toolId: aiTool.id,
    type: 'consolidation',
    priority: getPriorityFromConfidence(confidence, savingsPercentage),
    currentPlan: 'Duplicate subscriptions',
    recommendedPlan: `Single ${aiTool.name} subscription`,
    currentSpend: totalSpend,
    optimizedSpend: totalSpend - monthlySavings,
    monthlySavings,
    annualSavings: calculateAnnualSavings(monthlySavings),
    savingsPercentage,
    confidenceScore: confidence,
    ...metadata,
    reason: `You appear to have ${duplicatedGroup.length} ${aiTool.name} entries. If these are duplicate subscriptions rather than separate teams, consolidating them may remove redundant spend.`,
    actionLabel: generateActionLabel('consolidation'),
  };
}
