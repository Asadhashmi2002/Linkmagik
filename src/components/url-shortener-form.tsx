"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { shortenUrl, type ShortenState } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const initialState: ShortenState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto shrink-0 bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Magicking...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Create
        </>
      )}
    </Button>
  );
}

export function UrlShortenerForm() {
  const [state, formAction] = useFormState(shortenUrl, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Oops!',
        description: state.error,
      });
    }
    if (state?.message) {
      toast({
        title: 'Success!',
        description: 'Your magical link has been created.',
      });
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <Card className="overflow-hidden shadow-lg border-primary/20">
      <CardContent className="p-4">
        <form ref={formRef} action={formAction} className="flex flex-col sm:flex-row gap-2">
          <Input
            type="url"
            name="longUrl"
            placeholder="Enter a long URL to make it magical..."
            required
            className="flex-grow text-base h-12"
          />
          <SubmitButton />
        </form>
         {state?.error && (
           <p className="text-sm text-destructive mt-2 px-1">{state.error}</p>
        )}
      </CardContent>
    </Card>
  );
}
