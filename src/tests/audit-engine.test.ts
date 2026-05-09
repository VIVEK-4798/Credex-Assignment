import { describe, expect, it } from 'vitest';
import { runAuditEngine } from '@/lib/audit-engine';
import {
  calculateMonthlySavings,
  calculateSavingsPercentage,
  calculateAnnualSavings,
} from '@/lib/audit-engine/calculate-savings';

describe('audit engine', () => {
  it('recommends a practical downgrade for a small team on ChatGPT Team', () => {
    const result = runAuditEngine({
      teamSize: 2,
      primaryUseCase: 'general chat/writing',
      tools: [
        {
          toolId: 'chatgpt',
          planId: 'team',
          monthlySpend: 100,
          seats: 2,
        },
      ],
    });

    const downgrade = result.recommendations.find(
      (recommendation) => recommendation.type === 'downgrade'
    );

    expect(downgrade).toMatchObject({
      toolId: 'chatgpt',
      recommendedPlan: 'Plus',
      monthlySavings: 80,
      effortLevel: 'low',
      implementationDifficulty: 'Low effort',
      estimatedMigrationTime: 'Immediate savings',
    });
    expect(downgrade?.reason).toContain('lower monthly cost');
  });

  it('suggests cautious consolidation for overlapping chat tools', () => {
    const result = runAuditEngine({
      teamSize: 5,
      primaryUseCase: 'general chat/writing',
      tools: [
        {
          toolId: 'chatgpt',
          planId: 'plus',
          monthlySpend: 20,
          seats: 1,
        },
        {
          toolId: 'claude',
          planId: 'pro',
          monthlySpend: 20,
          seats: 1,
        },
        {
          toolId: 'chatgpt',
          planId: 'team',
          monthlySpend: 150,
          seats: 3,
        },
      ],
    });

    const consolidation = result.recommendations.find(
      (recommendation) => recommendation.id === 'consolidate-chat'
    );

    expect(consolidation).toMatchObject({
      type: 'consolidation',
      effortLevel: 'medium',
      implementationDifficulty: 'Workflow review needed',
    });
    expect(consolidation?.reason).toContain('may be able to consolidate');
    expect(consolidation?.reason).not.toContain('cancel immediately');
  });

  it('calculates savings without exaggerating negative or zero values', () => {
    expect(calculateMonthlySavings(100, 75)).toBe(25);
    expect(calculateMonthlySavings(75, 100)).toBe(0);
    expect(calculateAnnualSavings(25)).toBe(300);
    expect(calculateSavingsPercentage(25, 100)).toBe(25);
    expect(calculateSavingsPercentage(25, 0)).toBe(0);
  });

  it('returns an optimized outcome when the stack has no useful recommendation', () => {
    const result = runAuditEngine({
      teamSize: 1,
      primaryUseCase: 'Research',
      tools: [
        {
          toolId: 'perplexity',
          planId: 'pro',
          monthlySpend: 20,
          seats: 1,
        },
      ],
    });

    expect(result.recommendations).toHaveLength(0);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.optimizedOutcome).toBe(
      'Your current AI stack appears reasonably optimized for your team size and usage pattern.'
    );
  });

  it('handles invalid and unknown input without throwing', () => {
    expect(() =>
      runAuditEngine({
        teamSize: -5,
        primaryUseCase: '',
        tools: [
          {
            toolId: 'unknown-tool',
            planId: 'missing-plan',
            monthlySpend: -100,
            seats: 0,
          },
        ],
      })
    ).not.toThrow();

    const result = runAuditEngine({
      teamSize: -5,
      primaryUseCase: '',
      tools: [
        {
          toolId: 'unknown-tool',
          planId: 'missing-plan',
          monthlySpend: -100,
          seats: 0,
        },
      ],
    });

    expect(result.currentMonthlySpend).toBe(0);
    expect(result.recommendations).toHaveLength(0);
    expect(result.optimizedOutcome).toContain('reasonably optimized');
  });
});
