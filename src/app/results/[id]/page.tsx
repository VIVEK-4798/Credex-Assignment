'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingDown, Calendar, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils/formatters';
import { AuditResult } from '@/lib/utils/mock-audit-generator';

interface AuditResultsPageProps {
  params: {
    id: string;
  };
}

export default function AuditResultsPage({ params }: AuditResultsPageProps) {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock loading audit result
    const timer = setTimeout(() => {
      // In a real app, fetch from API using params.id
      const mockResult = localStorage.getItem('audit-result');
      if (mockResult) {
        setResult(JSON.parse(mockResult));
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your AI spend...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No audit found</p>
          <Link href="/audit">
            <Button>Start New Audit</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{result.company}</h1>
          <p className="text-gray-600 mt-1">Audit Report</p>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Current Spend */}
            <Card className="p-6 border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current Annual Spend</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(result.currentAnnualSpend)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Potential Savings */}
            <Card className="p-6 border-gray-200 bg-green-50 border-green-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-green-700 font-semibold mb-2">
                    Potential Annual Savings
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(result.estimatedAnnualSavings)}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-green-500 opacity-50" />
              </div>
            </Card>

            {/* Savings Percentage */}
            <Card className="p-6 border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Savings Percentage</p>
                <p className="text-3xl font-bold text-blue-600">
                  {result.savingsPercentage}%
                </p>
              </div>
            </Card>

            {/* Tools Analyzed */}
            <Card className="p-6 border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-2">Tools Analyzed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {result.tools.length}
                </p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Recommendations */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Top Recommendations
              </h2>

              <div className="space-y-4">
                {result.recommendations.length > 0 ? (
                  result.recommendations.map((rec) => (
                    <Card key={rec.id} className="p-6 border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {rec.title}
                          </h3>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div>
                          <p className="text-xs text-gray-500">Monthly Savings</p>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(rec.monthlyRealizedSavings)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Effort</p>
                          <Badge
                            variant={
                              rec.effort === 'low'
                                ? 'secondary'
                                : rec.effort === 'medium'
                                  ? 'default'
                                  : 'destructive'
                            }
                            className="text-xs capitalize"
                          >
                            {rec.effort}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-6 border-gray-200 text-center text-gray-500">
                    No recommendations at this time.
                  </Card>
                )}
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              {/* Audit Details */}
              <Card className="p-6 border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Audit Details</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Company</p>
                    <p className="font-medium text-gray-900">{result.company}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-1">Team Size</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">
                        {result.teamSize} people
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-1">Primary Use Case</p>
                    <p className="font-medium text-gray-900">
                      {result.primaryUseCase}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-1">Generated</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900 text-sm">
                        {new Date(result.generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Monthly Comparison */}
              <Card className="p-6 border-gray-200 bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-4">Monthly Comparison</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Current</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(result.currentMonthlySpend)}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 mb-1">Optimized</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.estimatedMonthlySpend)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-blue-200">
                    <p className="text-xs text-gray-600 mb-1">Monthly Savings</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.estimatedMonthlySavings)}
                    </p>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <Button
                onClick={() => {
                  window.location.href =
                    'mailto:hello@credex.ai?subject=AI%20Spend%20Audit%20Follow-up';
                }}
                className="w-full"
                size="lg"
              >
                Get Expert Help
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
