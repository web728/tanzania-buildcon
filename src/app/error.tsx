"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col items-center justify-center bg-brand-dark px-6 text-center text-white">
        <Container className="max-w-md">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-green">Error</p>
          <h1 className="mt-4 text-3xl font-extrabold">Something Went Wrong</h1>
          <p className="mt-4 text-white/70">
            An unexpected error occurred. Please try again, or return to the homepage.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => reset()}
              variant="outline"
              size="lg"
            >
              Try Again
            </Button>
            <Button href="/" size="lg">
              Back to Home
            </Button>
          </div>
        </Container>
      </body>
    </html>
  );
}
