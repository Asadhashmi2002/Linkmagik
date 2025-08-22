import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="font-headline text-8xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="mt-2 text-lg text-muted-foreground">
            Sorry, the link you visited is either broken or does not exist.
        </p>
        <Button asChild className="mt-8">
            <Link href="/">Go back home</Link>
        </Button>
    </div>
  )
}
