import { UserToolInput } from '@/types/audit';
import { AI_TOOLS } from '@/data/tools';

/**
 * Monthly savings calculation
 */
export function calculateMonthlySavings(current: number, optimized: number): number {
  return Math.max(current - optimized, 0);
}

export function calculateAnnualSavings(monthlySavings: number) {
  return monthlySavings * 12;
}

/**
 * Savings percentage
 */
export function calculateSavingsPercentage(
  monthlySavings: number,
  currentSpend: number
): number {
  if (currentSpend === 0) return 0;
  return Math.round((monthlySavings / currentSpend) * 100);
}

/**
 * Seat-adjusted monthly cost
 * Calculates effective cost per seat
 */
export function calculateSeatAdjustedCost(
  monthlySpend: number,
  seats: number,
  isSeatBased: boolean
): number {
  if (!isSeatBased || seats === 0) return monthlySpend;
  return monthlySpend / seats;
}

/**
 * Optimal seats for a plan
 * Suggests ideal seat count based on team size and usage
 */
export function calculateOptimalSeats(
  teamSize: number,
  currentSeats: number,
  primaryUseCase: string
): number {
  const normalizedTeamSize = Math.max(1, teamSize);
  const normalizedCurrentSeats = Math.max(1, currentSeats);

  if (normalizedCurrentSeats > normalizedTeamSize) {
    return normalizedTeamSize;
  }

  // If all team members use the tool
  if (normalizedCurrentSeats === normalizedTeamSize) {
    return normalizedTeamSize;
  }

  // For research/writing, usually 50-70% of team
  if (primaryUseCase === 'Research' || primaryUseCase === 'Content Creation') {
    return Math.max(1, Math.ceil(normalizedTeamSize * 0.6));
  }

  // For general purpose, usually 70-90%
  if (primaryUseCase === 'Mixed / Other') {
    return Math.max(1, Math.ceil(normalizedTeamSize * 0.8));
  }

  // For coding/specific use cases, varies widely
  return normalizedCurrentSeats;
}

/**
 * Total spend for recommendations
 */
export function calculateRecommendedSpend(
  tool: UserToolInput,
  recommendedPlanId: string,
  recommendedSeats: number
): number {
  const aiTool = AI_TOOLS.find((t) => t.id === tool.toolId);
  if (!aiTool) return tool.monthlySpend;

  const recommendedPlan = aiTool.plans.find((p) => p.id === recommendedPlanId);
  if (!recommendedPlan) return tool.monthlySpend;

  if (recommendedPlan.seatBased) {
    return recommendedPlan.monthlyPrice * recommendedSeats;
  }

  return recommendedPlan.monthlyPrice;
}

/**
 * Calculate total spend savings
 */
export function calculateTotalSavings(
  currentMonthlySpend: number,
  optimizedMonthlySpend: number
) {
  const monthlySavings = calculateMonthlySavings(currentMonthlySpend, optimizedMonthlySpend);
  const annualSavings = calculateAnnualSavings(monthlySavings);
  const percentage =
    currentMonthlySpend > 0
      ? Math.round((monthlySavings / currentMonthlySpend) * 100)
      : 0;

  return {
    monthlySavings,
    annualSavings,
    percentage,
  };
}
