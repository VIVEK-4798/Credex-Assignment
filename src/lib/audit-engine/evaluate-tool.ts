import { UserToolInput, AuditInput, AuditRecommendation } from '@/types/audit';
import { AI_TOOLS } from '@/data/tools';
import { TOOL_ALTERNATIVES } from '@/data/tool-alternatives';
import { AITool, ToolPlan } from '@/types/tool';
import { 
  calculateMonthlySavings, 
  calculateSavingsPercentage,
  calculateAnnualSavings,
  calculateOptimalSeats
} from './calculate-savings';
import { calculateConfidenceScore, getPriorityFromConfidence } from './confidence-score';
import {
  generateReason,
  generateActionLabel,
  getRecommendationMetadata,
} from './generate-reasons';

interface ToolEvaluationResult {
  recommendations: AuditRecommendation[];
}

/**
 * Evaluate a single tool for optimization opportunities
 */
export function evaluateTool(
  tool: UserToolInput,
  input: AuditInput
): ToolEvaluationResult {
  const recommendations: AuditRecommendation[] = [];

  const aiTool = AI_TOOLS.find((t) => t.id === tool.toolId);
  if (!aiTool) return { recommendations };

  const currentPlan = aiTool.plans.find((p) => p.id === tool.planId);
  if (!currentPlan) return { recommendations };

  const downgradeRec = checkDowngrade(tool, aiTool, currentPlan, input);
  if (downgradeRec) recommendations.push(downgradeRec);

  const seatRec = checkSeatOptimization(tool, aiTool, currentPlan, input);
  if (seatRec) recommendations.push(seatRec);

  const pricingRec = checkPricingInefficiency(tool, aiTool, currentPlan);
  if (pricingRec) recommendations.push(pricingRec);

  const alternativeRec = checkAlternativeVendor(tool, aiTool, currentPlan, input);
  if (alternativeRec) recommendations.push(alternativeRec);

  return { recommendations };
}

/**
 * Check if tool can be downgraded
 */
function checkDowngrade(
  tool: UserToolInput,
  aiTool: AITool,
  currentPlan: ToolPlan,
  input: AuditInput
): AuditRecommendation | null {
  const lowerPlans = aiTool.plans.filter(
    (p) => p.monthlyPrice < currentPlan.monthlyPrice && p.monthlyPrice > 0
  );

  if (lowerPlans.length === 0) return null;

  const recommendedPlan = lowerPlans[lowerPlans.length - 1];
  const isSmallTeamOnTeamPlan =
    input.teamSize <= 2 && currentPlan.id.toLowerCase() === 'team';
  const isEnterpriseOverkill =
    input.teamSize < 10 && isEnterprisePlan(currentPlan);

  if (isSmallTeamOnTeamPlan || isEnterpriseOverkill) {
    const currentSpend = tool.monthlySpend;
    const recommendedSeats = Math.max(1, input.teamSize);
    const recommendedSpend = getPlanSpend(recommendedPlan, recommendedSeats);

    const monthlySavings = calculateMonthlySavings(currentSpend, recommendedSpend);
    if (monthlySavings > 0) {
      const savingsPercentage = calculateSavingsPercentage(monthlySavings, currentSpend);

      const confidence = calculateConfidenceScore({
        isOverspending: true,
        savingsPercentage,
        teamSizeMatch: true,
        planMismatch: isEnterpriseOverkill ? 0.9 : 0.8,
        marketValidation: 0.9,
        type: 'downgrade',
      });

      const priority = getPriorityFromConfidence(confidence, savingsPercentage);
      const metadata = getRecommendationMetadata('downgrade');

      return {
        id: `downgrade-${tool.toolId}-${recommendedPlan.id}`,
        toolId: tool.toolId,
        type: 'downgrade',
        priority,
        currentPlan: currentPlan.name,
        recommendedPlan: recommendedPlan.name,
        currentSpend,
        optimizedSpend: recommendedSpend,
        monthlySavings,
        annualSavings: calculateAnnualSavings(monthlySavings),
        savingsPercentage,
        confidenceScore: confidence,
        ...metadata,
        reason: generateReason({
          type: 'downgrade',
          toolName: aiTool.name,
          currentPlan: currentPlan.name,
          recommendedPlan: recommendedPlan.name,
          teamSize: input.teamSize,
          currentSeats: tool.seats,
          recommendedSeats,
          savingsPercentage,
          primaryUseCase: input.primaryUseCase,
        }),
        actionLabel: generateActionLabel('downgrade'),
      };
    }
  }

  return null;
}

/**
 * Check for seat over-allocation
 */
function checkSeatOptimization(
  tool: UserToolInput,
  aiTool: AITool,
  currentPlan: ToolPlan,
  input: AuditInput
): AuditRecommendation | null {
  if (!currentPlan.seatBased || tool.seats <= 1) return null;

  const optimalSeats = calculateOptimalSeats(
    input.teamSize,
    tool.seats,
    input.primaryUseCase
  );

  // Only recommend if significant seat reduction
  if (optimalSeats >= tool.seats - 1) return null;

  const currentSpend = tool.monthlySpend;
  const recommendedSpend = currentPlan.monthlyPrice * optimalSeats;
  const monthlySavings = calculateMonthlySavings(currentSpend, recommendedSpend);

  if (monthlySavings <= 10) return null; // Minimum savings threshold

  const savingsPercentage = calculateSavingsPercentage(monthlySavings, currentSpend);

  const confidence = calculateConfidenceScore({
    isOverspending: true,
    savingsPercentage,
    teamSizeMatch: true,
    planMismatch: (tool.seats - optimalSeats) / tool.seats,
    marketValidation: 0.7,
    type: 'optimized',
  });

  const priority = getPriorityFromConfidence(confidence, savingsPercentage);
  const metadata = getRecommendationMetadata('optimized');

  return {
    id: `seats-${tool.toolId}`,
    toolId: tool.toolId,
    type: 'optimized',
    priority,
    currentPlan: currentPlan.name,
    recommendedPlan: currentPlan.name,
    currentSpend,
    optimizedSpend: recommendedSpend,
    monthlySavings,
    annualSavings: calculateAnnualSavings(monthlySavings),
    savingsPercentage,
    confidenceScore: confidence,
    ...metadata,
    reason: generateReason({
      type: 'optimized',
      toolName: aiTool.name,
      currentPlan: currentPlan.name,
      recommendedPlan: currentPlan.name,
      teamSize: input.teamSize,
      currentSeats: tool.seats,
      recommendedSeats: optimalSeats,
      savingsPercentage,
      primaryUseCase: input.primaryUseCase,
    }),
    actionLabel: generateActionLabel('optimized'),
  };
}

function checkPricingInefficiency(
  tool: UserToolInput,
  aiTool: AITool,
  currentPlan: ToolPlan
): AuditRecommendation | null {
  if (tool.monthlySpend <= 0 || currentPlan.monthlyPrice < 0) return null;

  const officialSpend = getPlanSpend(currentPlan, tool.seats);
  if (officialSpend <= 0 || tool.monthlySpend <= officialSpend * 1.1) return null;

  const monthlySavings = calculateMonthlySavings(tool.monthlySpend, officialSpend);
  const savingsPercentage = calculateSavingsPercentage(
    monthlySavings,
    tool.monthlySpend
  );
  const confidence = calculateConfidenceScore({
    isOverspending: true,
    savingsPercentage,
    teamSizeMatch: false,
    planMismatch: Math.min(1, monthlySavings / tool.monthlySpend),
    marketValidation: 0.8,
    type: 'optimized',
  });
  const metadata = getRecommendationMetadata('optimized');

  return {
    id: `pricing-${tool.toolId}-${currentPlan.id}`,
    toolId: tool.toolId,
    type: 'optimized',
    priority: getPriorityFromConfidence(confidence, savingsPercentage),
    currentPlan: currentPlan.name,
    recommendedPlan: currentPlan.name,
    currentSpend: tool.monthlySpend,
    optimizedSpend: officialSpend,
    monthlySavings,
    annualSavings: calculateAnnualSavings(monthlySavings),
    savingsPercentage,
    confidenceScore: confidence,
    ...metadata,
    reason: `${aiTool.name} ${currentPlan.name} appears to cost more than the catalog price for ${tool.seats} seat${tool.seats === 1 ? '' : 's'}. Review billing, taxes, add-ons, or inactive seats before changing tools.`,
    actionLabel: generateActionLabel('optimized'),
  };
}

function checkAlternativeVendor(
  tool: UserToolInput,
  aiTool: AITool,
  currentPlan: ToolPlan,
  input: AuditInput
): AuditRecommendation | null {
  if (tool.monthlySpend < 30) return null;

  const alternative = TOOL_ALTERNATIVES.find((entry) => entry.tool === aiTool.name)
    ?.alternatives.find((candidate) =>
      candidate.suitability.includes(aiTool.category)
    );

  if (!alternative) return null;

  const monthlySavings = Math.round(
    tool.monthlySpend * (alternative.estimatedSavingsPercent / 100)
  );
  if (monthlySavings < 10) return null;

  const savingsPercentage = calculateSavingsPercentage(
    monthlySavings,
    tool.monthlySpend
  );
  const optimizedSpend = Math.max(tool.monthlySpend - monthlySavings, 0);
  const confidence = calculateConfidenceScore({
    isOverspending: true,
    savingsPercentage,
    teamSizeMatch: false,
    planMismatch: 0.4,
    marketValidation: 0.55,
    type: 'alternative',
  });
  const metadata = getRecommendationMetadata('alternative');

  return {
    id: `alternative-${tool.toolId}-${alternative.name.toLowerCase().replace(/\s+/g, '-')}`,
    toolId: tool.toolId,
    type: 'alternative',
    priority: getPriorityFromConfidence(confidence, savingsPercentage),
    currentPlan: currentPlan.name,
    recommendedPlan: alternative.name,
    currentSpend: tool.monthlySpend,
    optimizedSpend,
    monthlySavings,
    annualSavings: calculateAnnualSavings(monthlySavings),
    savingsPercentage,
    confidenceScore: confidence,
    ...metadata,
    reason: `For ${input.primaryUseCase}, ${alternative.name} may be worth evaluating against ${aiTool.name}. ${alternative.note}`,
    actionLabel: generateActionLabel('alternative'),
  };
}

function getPlanSpend(plan: ToolPlan, seats: number): number {
  if (plan.monthlyPrice <= 0) return 0;
  return plan.seatBased ? plan.monthlyPrice * Math.max(1, seats) : plan.monthlyPrice;
}

function isEnterprisePlan(plan: ToolPlan): boolean {
  const planName = `${plan.id} ${plan.name}`.toLowerCase();
  return planName.includes('enterprise');
}
