// Audit rules configuration
export type AuditRuleId =
  | 'small-team-overpaying'
  | 'enterprise-waste'
  | 'multiple-similar-tools'
  | 'excessive-spend';

export type AuditRuleSeverity = 'low' | 'medium' | 'high';

export interface AuditRule {
  id: AuditRuleId;
  name: string;
  description: string;
  severity: AuditRuleSeverity;
}

export const AUDIT_RULES: AuditRule[] = [
  {
    id: 'small-team-overpaying',
    name: 'Small Team Overpaying',
    description:
      'If teamSize <= 2 and the selected plan is Team, evaluate a Pro downgrade.',
    severity: 'high',
  },
  {
    id: 'enterprise-waste',
    name: 'Enterprise Waste',
    description:
      'If teamSize < 10 and the selected plan is Enterprise, flag potential overkill.',
    severity: 'high',
  },
  {
    id: 'multiple-similar-tools',
    name: 'Multiple Similar Tools',
    description:
      'If the stack has 3+ overlapping chat tools, suggest cautious consolidation.',
    severity: 'medium',
  },
  {
    id: 'excessive-spend',
    name: 'Excessive Spend',
    description:
      'If reported spend is higher than official catalog pricing, flag pricing inefficiency.',
    severity: 'medium',
  },
];
