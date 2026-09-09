"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SuccessPanel({
  title,
  message,
  referenceId,
  homeLabel = "Back to Home",
}: {
  title: string;
  message: string;
  referenceId: string;
  homeLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!referenceId) return;
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-white via-slate-50/50 to-emerald-50/30 p-8 text-center shadow-[0_20px_50px_rgba(16,185,129,0.08)] backdrop-blur-xl sm:p-12">
      {/* Subtle Ambient Background Radial Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />

      {/* Animated Animated Checkmark Icon Badge */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20 duration-1000" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-lg shadow-emerald-500/30">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Main Title & Message */}
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
        {message}
      </p>

      {/* Premium Copyable Reference Badge */}
      {referenceId && (
        <div className="group relative mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-5 py-3 shadow-sm transition-all hover:border-emerald-500/40 hover:shadow-md">
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Reference ID
            </span>
            <span className="font-mono text-sm font-semibold tracking-wider text-slate-800">
              {referenceId}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-emerald-50 hover:text-emerald-600 active:scale-95"
            title="Copy Reference ID"
          >
            {copied ? (
              <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Action CTA */}
      <div className="mt-8 flex justify-center">
        <Button
          href="/"
          variant="ghost"
          className="rounded-full px-8 py-3 text-sm font-semibold tracking-wide text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-95"
        >
          {homeLabel}
        </Button>
      </div>
    </div>
  );
}