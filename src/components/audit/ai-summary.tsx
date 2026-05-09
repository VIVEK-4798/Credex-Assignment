import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AiSummaryProps {
  summary: string;
}

export function AiSummary({ summary }: AiSummaryProps) {
  return (
    <Card className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
            AI summary
          </p>
          <h2 className="text-xl font-bold text-slate-950">Founder brief</h2>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600">{summary}</p>
    </Card>
  );
}
