'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserToolInput } from '@/store/audit-store';
import {
  calculateAnnualSpend,
  calculateMonthlySpend,
  formatCurrency,
} from '@/lib/utils/formatters';

interface AuditSubmitButtonProps {
  tools: UserToolInput[];
  teamSize: number;
  isLoading?: boolean;
  onSubmit: () => void;
}

export function AuditSubmitButton({
  tools,
  teamSize,
  isLoading = false,
  onSubmit,
}: AuditSubmitButtonProps) {
  const totalSpend = calculateMonthlySpend(tools);
  const annualSpend = calculateAnnualSpend(totalSpend);
  const isComplete = tools.length > 0 && teamSize >= 1;

  const checklist = [
    { label: 'Tools Added', checked: tools.length > 0, count: tools.length },
    { label: 'Team Size', checked: teamSize >= 1 },
    { label: 'Email Capture', checked: true },
  ];

  return (
    <Card className="sticky top-32 space-y-6 border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div>
        <h3 className="mb-1 text-lg font-bold text-gray-900">Audit Summary</h3>
        <p className="text-sm text-gray-600">Review before submitting</p>
      </div>

      <div className="space-y-3 border-b border-gray-200 pb-6">
        <div>
          <p className="mb-1 text-sm text-gray-600">Current Monthly Spend</p>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(totalSpend)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Annual Spend</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(annualSpend)}
          </p>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-gray-900">Form Status</p>
        <div className="space-y-2">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  item.checked
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {item.checked ? 'OK' : '-'}
              </div>
              <span className="text-sm text-gray-700">{item.label}</span>
              {item.count !== undefined && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.count}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {!isComplete && (
        <div className="flex gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600" />
          <p className="text-xs text-yellow-800">
            Add at least one tool to generate your audit.
          </p>
        </div>
      )}

      <Button
        onClick={onSubmit}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Generating Audit...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Generate Audit Report
          </>
        )}
      </Button>

      <p className="text-center text-xs text-gray-600">
        Email is optional after your results are ready.
      </p>
    </Card>
  );
}
