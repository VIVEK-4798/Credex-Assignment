import { ArrowRight, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function CredexCta() {
  return (
    <Card className="rounded-lg border border-slate-900 bg-slate-950 p-6 text-white">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-cyan-200">
        <MessageSquareText className="h-5 w-5" />
      </div>
      <h2 className="text-xl font-bold">Want help validating these savings?</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Credex can review vendor fit, billing details, and implementation effort
        before you change plans.
      </p>
      <Button asChild className="mt-5 w-full gap-2 bg-white text-slate-950 hover:bg-slate-100">
        <a href="mailto:hello@credex.ai?subject=AI%20Spend%20Audit%20Follow-up">
          Get expert help
          <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </Card>
  );
}
