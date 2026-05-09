'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AI_TOOLS } from '@/data/tools';
import { UserToolInput } from '@/store/audit-store';
import { formatCurrency } from '@/lib/utils/formatters';

interface ToolCardProps {
  tool: UserToolInput;
  onRemove: (id: string) => void;
}

export function ToolCard({ tool, onRemove }: ToolCardProps) {
  const aiTool = AI_TOOLS.find((t) => t.id === tool.toolId);
  const plan = aiTool?.plans.find((p) => p.id === tool.planId);

  if (!aiTool || !plan) {
    return null;
  }

  return (
    <Card className="p-4 border-gray-200 hover:border-gray-300 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{aiTool.name}</h4>
              <p className="text-sm text-gray-600">{plan.name} Plan</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-50 rounded p-3">
              <p className="text-xs font-medium text-gray-600 mb-1">Monthly Spend</p>
              <p className="font-semibold text-gray-900">
                {formatCurrency(tool.monthlySpend)}
              </p>
            </div>
            {plan.seatBased && (
              <div className="bg-gray-50 rounded p-3">
                <p className="text-xs font-medium text-gray-600 mb-1">Seats</p>
                <p className="font-semibold text-gray-900">{tool.seats}</p>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(tool.id)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
