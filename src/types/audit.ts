// Audit types

export type RecommendationType =
  | 'downgrade'
  | 'alternative'
  | 'consolidation'
  | 'credits'
  | 'optimized';

export type RecommendationPriority =
  | 'low'
  | 'medium'
  | 'high';

export type RecommendationEffortLevel =
  | 'low'
  | 'medium'
  | 'high';

export interface UserToolInput {
  toolId: string;
  planId: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: UserToolInput[];
  teamSize: number;
  primaryUseCase: string;
}

export interface AuditRecommendation {
  id: string;
  toolId: string;
  type: RecommendationType;
  priority: RecommendationPriority;
  currentPlan: string;
  recommendedPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  confidenceScore: number; // 0-100
  effortLevel: RecommendationEffortLevel;
  implementationDifficulty: string;
  estimatedMigrationTime: string;
  reason: string;
  actionLabel: string;
}

export interface AuditResult {
  currentMonthlySpend: number;
  optimizedMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  totalSavingsPercentage: number;
  recommendations: AuditRecommendation[];
  optimizedOutcome: string;
}
