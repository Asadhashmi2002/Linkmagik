'use client';

import { useState, useEffect } from 'react';
import type { Link } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, BarChart2 } from 'lucide-react';

export function LinkCard({ link }: { link: Link }) {
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // This effect runs only on the client-side after hydration
    setBaseUrl(window.location.origin);
  }, []);

  // Ensure baseUrl is available before constructing the shortUrl
  const shortUrl = baseUrl ? `${baseUrl}/${link.shortCode}` : '';

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="font-headline text-xl capitalize tracking-tight">{link.description}</CardTitle>
        <CardDescription className="truncate pt-1">{link.longUrl}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/50 p-4 rounded-b-lg">
        <div className="flex items-center gap-4">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-base text-primary hover:underline break-all">
            {shortUrl ? shortUrl.replace(/^https?:\/\//, '') : 'Generating link...'}
          </a>
          <Button size="icon" variant="ghost" onClick={handleCopy} disabled={!shortUrl}>
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy link</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart2 className="h-4 w-4" />
            <span>{link.clicks.toLocaleString()} clicks</span>
        </div>
      </CardContent>
    </Card>
  );
}
