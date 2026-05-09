'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserToolInput } from '@/store/audit-store';
import {
  formatCurrency,
  calculateAnnualSpend,
  calculateMonthlySpend,
} from '@/lib/utils/formatters';

interface AuditSubmitButtonProps {
  tools: UserToolInput[];
  company: string;
  email: string;
  teamSize: number;
  isLoading?: boolean;
  onSubmit: () => void;
}

export function AuditSubmitButton({
  tools,
  company,
  email,
  teamSize,
  isLoading = false,
  onSubmit,
}: AuditSubmitButtonProps) {
  const totalSpend = calculateMonthlySpend(tools);
  const annualSpend = calculateAnnualSpend(totalSpend);

  const isComplete = tools.length > 0 && company.trim() && email.trim();

  const checklist = [
    { label: 'Tools Added', checked: tools.length > 0, count: tools.length },
    { label: 'Company Info', checked: company.trim().length > 0 },
    { label: 'Email', checked: email.trim().length > 0 },
    { label: 'Team Size', checked: teamSize >= 1 },
  ];

  return (
    <Card className="sticky top-32 p-6 border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Audit Summary</h3>
        <p className="text-sm text-gray-600">Review before submitting</p>
      </div>

      {/* Spend Summary */}
      <div className="space-y-3 pb-6 border-b border-gray-200">
        <div>
          <p className="text-sm text-gray-600 mb-1">Current Monthly Spend</p>
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

      {/* Checklist */}
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-3">Form Status</p>
        <div className="space-y-2">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  item.checked
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {item.checked ? '✓' : '○'}
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

      {/* Status Message */}
      {!isComplete && (
        <div className="flex gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-800">
            Add at least one tool and complete your information to generate audit.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={onSubmit}
        disabled={!isComplete || isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Generating Audit...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Generate Audit Report
          </>
        )}
      </Button>

      <p className="text-xs text-gray-600 text-center">
        ⚡ Takes about 30 seconds to analyze
      </p>
    </Card>
  );
}
