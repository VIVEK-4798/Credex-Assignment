'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AiSummary } from './ai-summary';
import type { AuditResult } from '@/lib/utils/mock-audit-generator';

interface AiSummaryLoaderProps {
  result: AuditResult;
}

export function AiSummaryLoader({ result }: AiSummaryLoaderProps) {
  const [summary, setSummary] = useState(result.aiSummary);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchSummary = async () => {
    const response = await fetch('/api/audit-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    });

    if (!response.ok) {
      throw new Error('Summary request failed');
    }

    const data = (await response.json()) as { summary?: string };
    return data.summary || result.aiSummary;
  };

  const loadSummary = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      setSummary(await fetchSummary());
    } catch {
      setHasError(true);
      setSummary(result.aiSummary);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialSummary = async () => {
      try {
        setSummary(await fetchSummary());
      } catch {
        setHasError(true);
        setSummary(result.aiSummary);
      } finally {
        setIsLoading(false);
      }
    };

    void loadInitialSummary();
    // result.id is the stable boundary for a new report.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.id]);

  if (isLoading) {
    return <AiSummarySkeleton />;
  }

  return (
    <div className="space-y-3">
      <AiSummary summary={summary} />
      {hasError && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={loadSummary}
        >
          <RefreshCw className="h-4 w-4" />
          Retry summary
        </Button>
      )}
    </div>
  );
}

function AiSummarySkeleton() {
  return (
    <Card className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-md bg-slate-100" />
        <div className="space-y-2">
          <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-5 w-32 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-11/12 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
      </div>
    </Card>
  );
}
