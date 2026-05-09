'use client';

import { useState } from 'react';
import { Check, Copy, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ShareActions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent('I ran an AI spend audit and found practical savings opportunities.');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied' : 'Copy link'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => window.print()}
      >
        <Printer className="h-4 w-4" />
        Print
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleTwitterShare}
      >
        <Share2 className="h-4 w-4" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={handleLinkedInShare}
      >
        <Share2 className="h-4 w-4" />
        LinkedIn
      </Button>
    </div>
  );
}
