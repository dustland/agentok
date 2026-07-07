'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App route error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
      <Icons.alert className="h-10 w-10 text-destructive" />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="max-w-lg text-sm text-muted-foreground">
          The page hit an unexpected error. You can retry the render or go back
          to the projects list.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/projects">Back to projects</Link>
        </Button>
      </div>
    </div>
  );
}
