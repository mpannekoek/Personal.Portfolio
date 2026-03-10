"use client";

import { Globe } from "lucide-react";

export default function LanguageToggle() {
    return (
        <button
            type="button"
            title="Language support coming soon"
            aria-label="Language support coming soon"
            className="mp-focus inline-flex cursor-pointer items-center gap-1.5 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] px-2.5 py-1 text-[var(--text)] transition-colors hover:bg-primary/15"
        >
            <Globe size={18} />
            <span className="text-xs font-semibold tracking-[0.08em]">NL/EN</span>
        </button>
    );
}
