"use client";

import { Check, Copy } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type BlogCodeBlockProps = {
    children: ReactNode;
    code: string;
    copyLabel: string;
    copiedLabel: string;
};

export default function BlogCodeBlock({
    children,
    code,
    copyLabel,
    copiedLabel,
}: BlogCodeBlockProps) {
    const [hasCopied, setHasCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code);
            setHasCopied(true);
            window.setTimeout(() => setHasCopied(false), 2000);
        } catch {
            setHasCopied(false);
        }
    }

    return (
        <div className="relative mt-8">
            <button
                type="button"
                onClick={() => void handleCopy()}
                className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(7,15,35,0.92)] px-3 py-1.5 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--text-soft)]"
                aria-label={hasCopied ? copiedLabel : copyLabel}
            >
                {hasCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {hasCopied ? copiedLabel : copyLabel}
            </button>
            <pre className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 pb-4 pt-14 text-sm leading-7 text-[var(--text)]">
                {children}
            </pre>
        </div>
    );
}
