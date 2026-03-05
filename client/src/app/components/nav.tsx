"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../../theme/theme-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    href: string;
    label: string;
};

const navItems: NavItem[] = [
    { href: "/", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export default function NavBar() {
    const pathname = usePathname();
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const closeTimeoutRef = useRef<number | null>(null);

    const isActivePath = (href: string) => {
        if (href === "/") {
            return pathname === href;
        }

        return pathname.startsWith(href);
    };

    const getDesktopNavItemClass = (isActive: boolean) => {
        if (isActive) {
            return isSticky
                ? "rounded-full bg-black px-3 py-1 text-white font-semibold shadow-md ring-2 ring-white/45"
                : "rounded-full bg-white/95 px-3 py-1 text-black font-semibold shadow-sm ring-1 ring-black/10";
        }

        return isSticky
            ? "rounded-full bg-white/60 px-3 py-1 text-black font-semibold ring-1 ring-black/12 transition-colors hover:bg-white/75"
            : "rounded-full px-3 py-1 text-black/80 hover:bg-black/6 hover:text-black transition-colors dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white";
    };

    const getMobileNavItemClass = (isActive: boolean) => {
        if (isActive) {
            return "rounded-lg bg-primary/12 px-3 py-2.5 text-primary font-semibold ring-1 ring-primary/25";
        }

        return "rounded-lg px-3 py-2.5 text-black/80 transition-colors hover:bg-black/6 hover:text-black dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-white";
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.pageYOffset > 50);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (closeTimeoutRef.current !== null) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        if (isMenuOpen) {
            setMenuVisible(true);
            return;
        }

        closeTimeoutRef.current = window.setTimeout(() => {
            setMenuVisible(false);
        }, 250);
    }, [isMenuOpen]);

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current !== null) {
                window.clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div className="h-6 bg-black dark:bg-secondary" />
            <nav className={isSticky ? "fixed top-0 left-0 right-0 z-[60] bg-primary/80 backdrop-blur-md shadow-sm" : "relative z-[60]"}>
                <div className="mx-auto">
                    <div className="flex justify-between mx-4 py-2">
                        <div className="flex gap-1 text-lg font-bold">
                            <Link href="/">
                                <span className="font-mono">&lt;MP /&gt;</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        aria-current={isActivePath(item.href) ? "page" : undefined}
                                        className={getDesktopNavItemClass(isActivePath(item.href))}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <ThemeToggle />
                            <button
                                type="button"
                                className="relative z-[61] cursor-pointer rounded-3xl p-1 transition-colors hover:bg-primary/85 md:hidden"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                                onClick={() => {
                                    setMenuOpen((prev) => !prev);
                                }}>
                                {isMenuOpen ? <X size="22" /> : <Menu size="22" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div
                className={`fixed inset-0 z-50 md:hidden transition-opacity duration-[250ms] ease-out ${
                    isMenuVisible ? "visible" : "invisible"
                } ${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                <button
                    type="button"
                    aria-label="Close mobile menu backdrop"
                    className="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-[250ms] ease-out"
                    onClick={() => setMenuOpen(false)}
                />
                <div
                    id="mobile-menu"
                    className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm overflow-hidden border-l border-black/10 bg-white/95 shadow-2xl transition-transform duration-[250ms] ease-out dark:border-white/10 dark:bg-zinc-950/95 ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/12 via-secondary/5 to-transparent dark:from-secondary/18 dark:via-secondary/7" />
                    <div className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-secondary/0 via-secondary/55 to-secondary/0" />
                    <div className="relative z-10 px-4 pb-4 pt-16">
                        <div className="px-1">
                            <p className="px-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black/45 dark:text-white/45">Navigation</p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActivePath(item.href) ? "page" : undefined}
                                    className={getMobileNavItemClass(isActivePath(item.href))}
                                    onClick={() => setMenuOpen(false)}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
