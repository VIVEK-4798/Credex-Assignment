// Tool types
export type ToolCategory =
  | 'coding'
  | 'chat'
  | 'research'
  | 'writing'
  | 'mixed';

export interface ToolPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  seatBased: boolean;
  description?: string;
}

export interface AITool {
  id: string;
  name: string;
  category: ToolCategory;
  vendor: string;
  plans: ToolPlan[];
}