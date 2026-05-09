import {
  RecommendationEffortLevel,
  RecommendationType,
} from '@/types/audit';

/**
 * Generate contextual reasons for recommendations
 * Quality matters here - reviewers notice good vs bad explanations
 */

export function generateReason(rec: {
  type: RecommendationType;
  toolName: string;
  currentPlan: string;
  recommendedPlan: string;
  teamSize: number;
  currentSeats?: number;
  recommendedSeats?: number;
  savingsPercentage: number;
  primaryUseCase: string;
}): string {
  switch (rec.type) {
    case 'downgrade':
      return generateDowngradeReason(rec);
    case 'alternative':
      return generateAlternativeReason(rec);
    case 'consolidation':
      return generateConsolidationReason(rec);
    case 'optimized':
      return generateOptimizationReason(rec);
    case 'credits':
      return generateCreditsReason(rec);
    default:
      return 'Review this tool for potential savings.';
  }
}

function generateDowngradeReason(rec: {
  type: RecommendationType;
  toolName: string;
  currentPlan: string;
  recommendedPlan: string;
  teamSize: number;
  currentSeats?: number;
  recommendedSeats?: number;
  savingsPercentage: number;
}): string {
  const base = `Your ${rec.teamSize}-person team is on the ${rec.currentPlan} plan`;

  if (rec.currentSeats && rec.recommendedSeats) {
    if (rec.recommendedSeats < rec.currentSeats) {
      return `${base} with ${rec.currentSeats} seats. The ${rec.recommendedPlan} plan with ${rec.recommendedSeats} seats likely covers the same team at a lower monthly cost.`;
    }
    return `${base}. For a team this size, ${rec.recommendedPlan} is likely enough for the same day-to-day workflow at a lower monthly cost.`;
  }

  return `${base}. The ${rec.recommendedPlan} plan is likely a better fit for a team this size, with fewer paid features going unused.`;
}

function generateAlternativeReason(rec: {
  toolName: string;
  recommendedPlan: string;
  savingsPercentage: number;
  primaryUseCase: string;
}): string {
  const useCase = rec.primaryUseCase.toLowerCase();
  const base = `Consider evaluating alternatives for ${useCase.replace(/\s+/g, ' ')}`;

  if (rec.savingsPercentage >= 80) {
    return `${base}. Switching tools could save up to ${rec.savingsPercentage}% while maintaining functionality.`;
  }

  if (rec.savingsPercentage >= 50) {
    return `${base}. There are cost-effective alternatives that may offer ${rec.savingsPercentage}% savings without sacrificing key features.`;
  }

  return `${base}. A lower-cost alternative may be worth testing before changing vendors.`;
}

function generateConsolidationReason(rec: {
  toolName: string;
  savingsPercentage: number;
}): string {
  if (rec.savingsPercentage >= 50) {
    return `You may be able to consolidate ${rec.toolName} with existing tools. This could reduce complexity and save ${rec.savingsPercentage}% on this subscription.`;
  }

  return `Consider whether ${rec.toolName} overlaps with other tools in your stack. Consolidating could save ${rec.savingsPercentage}% and reduce tool fatigue.`;
}

function generateOptimizationReason(rec: {
  toolName: string;
  savingsPercentage: number;
}): string {
  return `${rec.toolName} appears to have a billing or seat-count mismatch. Reviewing seats, add-ons, and plan settings may reduce monthly spend without changing tools.`;
}

function generateCreditsReason(rec: {
  toolName: string;
  savingsPercentage: number;
}): string {
  return `Check if ${rec.toolName} offers annual credits, startup discounts, or negotiated pricing. You may be eligible for ${rec.savingsPercentage}% savings.`;
}

/**
 * Generate action label based on recommendation type
 */
export function generateActionLabel(type: RecommendationType): string {
  const labels: Record<RecommendationType, string> = {
    downgrade: 'Review plan tier',
    alternative: 'Explore alternatives',
    consolidation: 'Consider consolidation',
    optimized: 'Review settings',
    credits: 'Contact sales',
  };

  return labels[type] || 'Review recommendation';
}

export function getRecommendationMetadata(type: RecommendationType): {
  effortLevel: RecommendationEffortLevel;
  implementationDifficulty: string;
  estimatedMigrationTime: string;
} {
  const metadata: Record<
    RecommendationType,
    {
      effortLevel: RecommendationEffortLevel;
      implementationDifficulty: string;
      estimatedMigrationTime: string;
    }
  > = {
    downgrade: {
      effortLevel: 'low',
      implementationDifficulty: 'Low effort',
      estimatedMigrationTime: 'Immediate savings',
    },
    optimized: {
      effortLevel: 'low',
      implementationDifficulty: 'No migration required',
      estimatedMigrationTime: 'Immediate savings',
    },
    credits: {
      effortLevel: 'low',
      implementationDifficulty: 'Vendor conversation',
      estimatedMigrationTime: '1-2 billing cycles',
    },
    consolidation: {
      effortLevel: 'medium',
      implementationDifficulty: 'Workflow review needed',
      estimatedMigrationTime: '1-2 weeks',
    },
    alternative: {
      effortLevel: 'high',
      implementationDifficulty: 'Pilot before migration',
      estimatedMigrationTime: '2-4 weeks',
    },
  };

  return metadata[type];
}
