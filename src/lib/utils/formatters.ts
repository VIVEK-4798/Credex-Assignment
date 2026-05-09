/**
 * Currency Formatting
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyDetailed(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Spend Calculations
 */
export function calculateAnnualSpend(monthlySpend: number): number {
  return monthlySpend * 12;
}

export function calculateMonthlySpend(tools: { monthlySpend: number }[]): number {
  return tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);
}

/**
 * Percentage Calculations
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function calculateSavingsPercentage(savings: number, originalSpend: number): number {
  if (originalSpend === 0) return 0;
  return Math.round((savings / originalSpend) * 100);
}

/**
 * Savings Estimate (mock)
 */
export function estimateSavings(monthlySpend: number): number {
  // Mock: typically 20-40% savings on AI tool spend
  const savingsRate = 0.25 + Math.random() * 0.15; // 25-40%
  return Math.round(monthlySpend * savingsRate);
}

/**
 * Tool Count Formatting
 */
export function formatToolCount(count: number): string {
  return `${count} tool${count !== 1 ? 's' : ''}`;
}
