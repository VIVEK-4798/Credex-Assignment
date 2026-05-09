// Audit rules configuration
export const AUDIT_RULES = [
  {
    id: 'small-team-overpaying',
    condition: {
      maxTeamSize: 2,
      disallowedPlans: ['team', 'enterprise'],
    },
    recommendation: 'Downgrade to Pro plan',
    savingsMultiplier: 0.5,
  },
];