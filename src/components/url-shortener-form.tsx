'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { shortenUrl, type ShortenState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const initialState: ShortenState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Shortening...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Shorten
        </>
      )}
    </Button>
  );
}

export function UrlShortenerForm() {
  const [state, formAction] = useFormState(shortenUrl, initialState);
  const [shortUrl, setShortUrl] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: state.error,
      });
      setShortUrl(undefined);
    }
    if (state?.message && state.shortUrl) {
      setShortUrl(state.shortUrl);
      formRef.current?.reset();
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      <Card className="overflow-hidden shadow-lg border-primary/20">
        <CardContent className="p-4">
          <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="url"
              name="longUrl"
              placeholder="Enter a long URL to shorten..."
              required
              className="flex-grow text-base h-12"
            />
            <SubmitButton />
          </form>
           {state?.error && !state.message && (
             <p className="text-sm text-destructive mt-2 px-1">{state.error}</p>
          )}
        </CardContent>
      </Card>
      
      {shortUrl && (
         <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center justify-between gap-4">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-base text-primary hover:underline break-all">
                    {shortUrl.replace(/^https?:\/\//, '')}
                </a>
                <Button size="icon" variant="ghost" onClick={handleCopy}>
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy link</span>
                </Button>
            </CardContent>
         </Card>
      )}
    </div>
  );
}
