"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../../theme/theme-toggle";
import LanguageToggle from "../../theme/language-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    href: string;
    label: string;
    variant?: "default" | "cta";
};

const navItems: NavItem[] = [
    { href: "/", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/hire-me", label: "Hire Me", variant: "cta" },
];

export default function NavBar() {
    const pathname = usePathname();
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const closeTimeoutRef = useRef<number | null>(null);

    const clearCloseTimeout = () => {
        if (closeTimeoutRef.current !== null) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const openMenu = () => {
        clearCloseTimeout();
        setMenuVisible(true);
        setMenuOpen(true);
    };

    const closeMenu = () => {
        clearCloseTimeout();
        setMenuOpen(false);
        closeTimeoutRef.current = window.setTimeout(() => {
            setMenuVisible(false);
            closeTimeoutRef.current = null;
        }, 250);
    };

    const isActivePath = (href: string) => {
        if (href.includes("#")) {
            return false;
        }

        if (href === "/") {
            return pathname === href;
        }

        return pathname.startsWith(href);
    };

    const getDesktopNavItemClass = (item: NavItem, isActive: boolean) => {
        if (item.variant === "cta") {
            return isSticky
                ? "rounded-full bg-primary px-4 py-1.5 font-semibold text-[var(--primary-contrast)] shadow-md transition-colors hover:bg-primary/85"
                : "rounded-full bg-primary px-4 py-1.5 font-semibold text-[var(--primary-contrast)] shadow-sm transition-colors hover:bg-primary/85";
        }

        if (isActive) {
            return isSticky
                ? "rounded-full bg-[var(--surface)] px-3 py-1 font-semibold text-[var(--text)] shadow-md ring-1 ring-[var(--ring)]"
                : "rounded-full bg-[var(--surface-elevated)] px-3 py-1 font-semibold text-[var(--text)] shadow-sm ring-1 ring-[var(--ring)]";
        }

        return isSticky
            ? "rounded-full bg-[var(--surface)]/70 px-3 py-1 font-semibold text-[var(--text)] ring-1 ring-[var(--border)] transition-colors hover:bg-[var(--surface-elevated)]"
            : "rounded-full px-3 py-1 text-[var(--text-muted)] transition-colors hover:bg-primary/10 hover:text-[var(--text)]";
    };

    const getMobileNavItemClass = (item: NavItem, isActive: boolean) => {
        if (item.variant === "cta") {
            return "rounded-lg bg-primary px-3 py-2.5 font-semibold text-[var(--primary-contrast)] shadow-sm transition-colors hover:bg-primary/85";
        }

        if (isActive) {
            return "rounded-lg bg-primary/12 px-3 py-2.5 font-semibold text-primary ring-1 ring-primary/25";
        }

        return "rounded-lg px-3 py-2.5 text-[var(--text-muted)] transition-colors hover:bg-primary/10 hover:text-[var(--text)]";
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
        return () => {
            clearCloseTimeout();
        };
    }, []);

    useEffect(() => {
        document.body.dataset.mobileMenuOpen = isMenuOpen ? "true" : "false";

        return () => {
            delete document.body.dataset.mobileMenuOpen;
        };
    }, [isMenuOpen]);

    return (
        <div>
            <div className="h-6 bg-gradient-to-r from-primary via-accent to-highlight" />
            <nav className={isSticky ? "fixed top-0 left-0 right-0 z-[60] border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md shadow-sm" : "relative z-[60]"}>
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
                                        className={getDesktopNavItemClass(item, isActivePath(item.href))}>
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            <LanguageToggle />
                            <ThemeToggle />
                            <button
                                type="button"
                                className="relative z-[61] cursor-pointer rounded-3xl p-1 transition-colors hover:bg-primary/85 md:hidden"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                                aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                                onClick={() => {
                                    if (isMenuOpen) {
                                        closeMenu();
                                        return;
                                    }

                                    openMenu();
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
                    className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-sm transition-opacity duration-[250ms] ease-out"
                    onClick={closeMenu}
                />
                <div
                    id="mobile-menu"
                    className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm overflow-hidden border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl transition-transform duration-[250ms] ease-out ${
                        isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/12 via-accent/5 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-6 left-0 w-px bg-gradient-to-b from-accent/0 via-accent/55 to-accent/0" />
                    <div className="relative z-10 px-4 pb-6 pt-16">
                        <div className="px-1">
                            <p className="px-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-soft)]">Navigation</p>
                        </div>
                        <div className="mt-2 flex flex-col gap-1.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActivePath(item.href) ? "page" : undefined}
                                    className={getMobileNavItemClass(item, isActivePath(item.href))}
                                    onClick={closeMenu}>
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1.5 text-[var(--text-muted)] shadow-sm ring-1 ring-[var(--ring)] transition-colors hover:bg-[var(--surface)]"
                                onClick={closeMenu}>
                                <span className="font-mono text-sm font-semibold tracking-[0.08em]">&lt;MP /&gt;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
