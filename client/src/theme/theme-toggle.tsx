'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    
    return (
        <button 
            type="button"
            className="cursor-pointer hover:bg-gray-500/20 rounded-3xl p-1"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun size='22' className="hidden dark:block"  />
            <Moon size='22' className="dark:hidden" />
        </button>
    );
};