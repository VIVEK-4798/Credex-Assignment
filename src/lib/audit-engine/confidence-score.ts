import { RecommendationPriority, RecommendationType } from '@/types/audit';

/**
 * Confidence Score Calculation
 * 
 * Rates recommendations on a 0-100 scale based on:
 * - How clear the issue is
 * - How realistic the recommendation is
 * - How much potential savings
 */

export function calculateConfidenceScore(factors: {
  isOverspending: boolean;
  savingsPercentage: number;
  teamSizeMatch: boolean;
  planMismatch: number; // 0-1, how far from optimal
  marketValidation: number; // 0-1, how common this recommendation is
  type?: RecommendationType;
}): number {
  let score = 0;

  // Overspending detection: +40
  if (factors.isOverspending) {
    score += 40;
  }

  // Savings potential: +30
  // 5% savings = 5 points, 30% savings = 30 points
  score += Math.min(30, factors.savingsPercentage);

  // Team size match: +15
  if (factors.teamSizeMatch) {
    score += 15;
  }

  // Plan mismatch clarity: +10
  score += Math.round(factors.planMismatch * 10);

  // Market validation: +5
  score += Math.round(factors.marketValidation * 5);

  if (factors.type === 'alternative') {
    score -= 12;
  }

  if (factors.type === 'consolidation') {
    score -= 18;
  }

  return Math.max(0, Math.min(100, score));
}

export function getConfidenceBand(score: number): 'low' | 'medium' | 'high' {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

/**
 * Priority mapping based on confidence and savings
 */
export function getPriorityFromConfidence(
  score: number,
  savingsPercentage: number
): RecommendationPriority {
  // High priority: high confidence OR high savings
  if (score >= 75 || savingsPercentage >= 30) {
    return 'high';
  }

  // Medium priority: decent confidence and reasonable savings
  if (score >= 50 || savingsPercentage >= 15) {
    return 'medium';
  }

  return 'low';
}
