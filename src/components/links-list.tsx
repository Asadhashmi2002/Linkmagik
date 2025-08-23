'use client';

import { useState, useEffect } from 'react';
import { LinkCard } from '@/components/link-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Link } from '@/lib/db';

export function LinksList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LinksListSkeleton />;
  }

  if (links.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-16 py-8 rounded-lg border-2 border-dashed">
        <h3 className="font-headline text-xl">No links yet...</h3>
        <p>Your magical links will appear here once you create them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-headline text-2xl tracking-tight">Your Links</h2>
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onDelete={fetchLinks} />
      ))}
    </div>
  );
}

export function LinksListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
