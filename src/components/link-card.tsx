'use client';

import { useState, useEffect } from 'react';
import type { Link } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, BarChart2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LinkCard({ link }: { link: Link }) {
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

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

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this link?\n\n${link.description}\n${shortUrl}`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/links/${link.shortCode}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh the page to update the links list
        router.refresh();
      } else {
        alert('Failed to delete link. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link. Please try again.');
    } finally {
      setIsDeleting(false);
    }
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BarChart2 className="h-4 w-4" />
            <span>{link.clicks.toLocaleString()} clicks</span>
          </div>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete link</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
