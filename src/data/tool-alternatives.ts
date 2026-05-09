export interface ToolAlternative {
  name: string;
  estimatedSavingsPercent: number;
  suitability: string[];
  note: string;
}

export interface ToolAlternativeSet {
  tool: string;
  alternatives: ToolAlternative[];
}

export const TOOL_ALTERNATIVES: ToolAlternativeSet[] = [
  {
    tool: 'Cursor',
    alternatives: [
      {
        name: 'GitHub Copilot',
        estimatedSavingsPercent: 20,
        suitability: ['coding'],
        note: 'A practical comparison for teams that mainly need code completion inside existing IDE workflows.',
      },
    ],
  },
  {
    tool: 'ChatGPT',
    alternatives: [
      {
        name: 'Claude',
        estimatedSavingsPercent: 10,
        suitability: ['chat', 'writing', 'research'],
        note: 'Worth evaluating for writing-heavy teams, but not a universal replacement.',
      },
      {
        name: 'Perplexity AI',
        estimatedSavingsPercent: 15,
        suitability: ['research'],
        note: 'Best suited when research and sourced answers matter more than broad assistant workflows.',
      },
    ],
  },
  {
    tool: 'Midjourney',
    alternatives: [
      {
        name: 'Runway',
        estimatedSavingsPercent: 20,
        suitability: ['mixed'],
        note: 'A reasonable comparison for teams that need broader creative media workflows.',
      },
    ],
  },
];
