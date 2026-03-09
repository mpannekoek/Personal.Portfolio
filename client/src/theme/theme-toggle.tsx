'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    
    return (
        <button 
            type="button"
            className="mp-focus cursor-pointer rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-1 text-[var(--text)] transition-colors hover:bg-primary/15"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun size='22' className="hidden dark:block"  />
            <Moon size='22' className="dark:hidden" />
        </button>
    );
};
