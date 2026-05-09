'use client';

import { FormEvent, useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface LeadCaptureModalProps {
  publicId: string;
  teamSize: number;
}

export function LeadCaptureModal({ publicId, teamSize }: LeadCaptureModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '');
    const company = String(formData.get('company') || '');
    const role = String(formData.get('role') || '');
    const website = String(formData.get('website') || '');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicId,
          email,
          company,
          role,
          teamSize,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error('Lead save failed');
      }

      setIsSaved(true);
    } catch {
      setError('We could not save this right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Mail className="h-4 w-4" />
          Send me updates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Stay ahead of AI pricing changes</DialogTitle>
          <DialogDescription>
            Get occasional benchmarks and savings checks. Your report stays ungated.
          </DialogDescription>
        </DialogHeader>

        {isSaved ? (
          <div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
            Saved. We&apos;ll send practical updates when there is something worth
            reviewing.
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="company" placeholder="Company optional" />
            <Input name="role" placeholder="Role optional" />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Keep me updated'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
