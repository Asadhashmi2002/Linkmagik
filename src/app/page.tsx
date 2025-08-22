import { UrlShortenerForm } from "@/components/url-shortener-form";
import { LinksList, LinksListSkeleton } from "@/components/links-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center p-4 selection:bg-primary/20 md:p-8">
      <div className="w-full max-w-2xl space-y-12">
        <header className="text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            LinkMagik
          </h1>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            Shorten URLs with a touch of AI magic.
          </p>
        </header>

        <UrlShortenerForm />

        <Suspense fallback={<LinksListSkeleton />}>
          <LinksList />
        </Suspense>
      </div>
    </main>
  );
}
