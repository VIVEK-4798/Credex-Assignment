import { UserToolInput } from '@/store/audit-store';
import { AI_TOOLS } from '@/data/tools';

export interface AuditRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'consolidation' | 'downgrade' | 'alternative' | 'feature-overlap';
  monthlyRealizedSavings: number;
  effort: 'low' | 'medium' | 'high';
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
  tools: UserToolInput[];
  recommendations: AuditRecommendation[];
  generatedAt: string;
}

export function generateMockAudit(
  tools: UserToolInput[],
  company: string,
  email: string,
  teamSize: number,
  primaryUseCase: string
): AuditResult {
  const currentMonthlySpend = tools.reduce((sum, t) => sum + t.monthlySpend, 0);
  const currentAnnualSpend = currentMonthlySpend * 12;

  // Mock savings calculation (typically 25-40%)
  const savingsRate = 0.25 + Math.random() * 0.15;
  const estimatedMonthlySavings = Math.round(currentMonthlySpend * savingsRate);
  const estimatedMonthlySpend = currentMonthlySpend - estimatedMonthlySavings;
  const estimatedAnnualSpend = estimatedMonthlySpend * 12;
  const estimatedAnnualSavings = currentAnnualSpend - estimatedAnnualSpend;
  const savingsPercentage = Math.round(
    (estimatedAnnualSavings / currentAnnualSpend) * 100
  );

  // Generate mock recommendations
  const recommendations: AuditRecommendation[] = [];

  // Check for consolidation opportunities
  const toolsByCategory = tools.reduce(
    (acc, tool) => {
      const aiTool = AI_TOOLS.find((t) => t.id === tool.toolId);
      if (aiTool) {
        if (!acc[aiTool.category]) {
          acc[aiTool.category] = [];
        }
        acc[aiTool.category].push(tool);
      }
      return acc;
    },
    {} as Record<string, UserToolInput[]>
  );

  // Consolidation recommendation
  Object.entries(toolsByCategory).forEach(([category, categoryTools]) => {
    if (categoryTools.length > 1) {
      const totalSpend = categoryTools.reduce((sum, t) => sum + t.monthlySpend, 0);
      recommendations.push({
        id: `consolidate-${category}`,
        title: `Consolidate ${category} tools`,
        description: `You're using ${categoryTools.length} ${category} tools costing ${totalSpend}/mo. Consider consolidating to reduce complexity and negotiate better rates.`,
        category: 'consolidation',
        monthlyRealizedSavings: Math.round(totalSpend * 0.15),
        effort: 'medium',
      });
    }
  });

  // Downgrade recommendations
  tools.slice(0, 2).forEach((tool) => {
    const aiTool = AI_TOOLS.find((t) => t.id === tool.toolId);
    if (aiTool && tool.monthlySpend > 50) {
      recommendations.push({
        id: `downgrade-${tool.id}`,
        title: `Evaluate ${aiTool.name} plan downgrade`,
        description: `Your team is spending $${tool.monthlySpend}/mo on ${aiTool.name}. Lower-tier plans might suffice based on typical usage patterns.`,
        category: 'downgrade',
        monthlyRealizedSavings: Math.round(tool.monthlySpend * 0.2),
        effort: 'low',
      });
    }
  });

  // Alternative recommendations
  if (tools.length > 0 && tools[0].monthlySpend > 30) {
    const aiTool = AI_TOOLS.find((t) => t.id === tools[0].toolId);
    if (aiTool) {
      recommendations.push({
        id: `alternative-${tools[0].id}`,
        title: `Explore open-source alternatives`,
        description: `Consider open-source alternatives to ${aiTool.name} for specific use cases. Could reduce or eliminate this $${tools[0].monthlySpend}/mo expense.`,
        category: 'alternative',
        monthlyRealizedSavings: Math.round(tools[0].monthlySpend * 0.3),
        effort: 'high',
      });
    }
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    company,
    email,
    teamSize,
    primaryUseCase,
    currentMonthlySpend,
    currentAnnualSpend,
    estimatedMonthlySpend,
    estimatedAnnualSpend,
    estimatedMonthlySavings,
    estimatedAnnualSavings,
    savingsPercentage,
    tools,
    recommendations: recommendations.slice(0, 5),
    generatedAt: new Date().toISOString(),
  };
}
