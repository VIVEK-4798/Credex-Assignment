// Audit types
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
  toolId: string;
  currentPlan: string;
  recommendedPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
}

export interface AuditResult {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: AuditRecommendation[];
}