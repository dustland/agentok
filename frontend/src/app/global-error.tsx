'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Global app error:', error);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Application error</h1>
          <p className="max-w-lg text-sm text-muted-foreground">
            Agentok Studio failed to render this page. Try again, or return to
            the projects list.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/projects">Back to projects</Link>
          </Button>
        </div>
      </body>
    </html>
  );
}
