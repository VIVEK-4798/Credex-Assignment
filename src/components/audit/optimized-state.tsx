import { BadgeCheck, Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface OptimizedStateProps {
  message: string;
}

export function OptimizedState({ message }: OptimizedStateProps) {
  return (
    <Card className="rounded-lg border border-emerald-200 bg-emerald-50 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
        <BadgeCheck className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold text-slate-950">
        Your AI stack already appears well optimized.
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        {message} Keep reviewing usage as seats, vendors, and pricing change. The
        next useful step is benchmarking your stack as your team grows.
      </p>
      <Button asChild className="mt-6 gap-2">
        <Link href="/audit">
          <Bell className="h-4 w-4" />
          Stay updated
        </Link>
      </Button>
    </Card>
  );
}
