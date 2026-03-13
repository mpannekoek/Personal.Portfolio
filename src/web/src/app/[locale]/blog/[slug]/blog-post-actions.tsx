"use client";

import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

type BlogPostActionsProps = {
    title: string;
    markdown: string;
    shareLabel: string;
    sharedLabel: string;
    copyLabel: string;
    copiedLabel: string;
};

export default function BlogPostActions({
    title,
    markdown,
    shareLabel,
    sharedLabel,
    copyLabel,
    copiedLabel,
}: BlogPostActionsProps) {
    const [hasCopied, setHasCopied] = useState(false);
    const [hasShared, setHasShared] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(markdown);
            setHasCopied(true);
            window.setTimeout(() => setHasCopied(false), 2000);
        } catch {
            setHasCopied(false);
        }
    }

    async function handleShare() {
        const currentUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({ title, url: currentUrl });
            } else {
                await navigator.clipboard.writeText(currentUrl);
            }

            setHasShared(true);
            window.setTimeout(() => setHasShared(false), 2000);
        } catch {
            setHasShared(false);
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                onClick={() => void handleShare()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text-soft)] hover:text-[var(--text)]"
            >
                <Share2 className="h-4 w-4" />
                {hasShared ? sharedLabel : shareLabel}
            </button>
            <button
                type="button"
                onClick={() => void handleCopy()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--text-soft)] hover:text-[var(--text)]"
            >
                <Copy className="h-4 w-4" />
                {hasCopied ? copiedLabel : copyLabel}
            </button>
        </div>
    );
}
