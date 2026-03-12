"use client";

import Image from "next/image";
import { useState, useEffect, useRef, type MouseEvent } from "react";
import ThemeToggle from "../../theme/theme-toggle";
import LanguageToggle from "../../theme/language-toggle";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "../../i18n/navigation";
import { routing } from "../../i18n/routing";
import facebookIcon from "../../assets/icons/social/facebook-icon.svg";
import githubIcon from "../../assets/icons/social/github-icon.svg";
import gmailIcon from "../../assets/icons/social/gmail-icon.svg";
import instagramIcon from "../../assets/icons/social/instagram-icon.svg";
import linkedinIcon from "../../assets/icons/social/linkedin-icon.svg";

type NavItem = {
    href: string;
    labelKey: "about" | "blog" | "hireMe";
    variant?: "default" | "cta";
};

const navItems: NavItem[] = [
    { href: "/", labelKey: "about" },
    { href: "/blog", labelKey: "blog" },
    { href: "/hire-me", labelKey: "hireMe", variant: "cta" },
];

export default function NavBar() {
    const t = useTranslations("nav");
    const footerT = useTranslations("footer");
    const locale = useLocale();
    const pathname = usePathname();
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const closeTimeoutRef = useRef<number | null>(null);
    const socialLinks = [
        {
            href: "https://github.com",
            icon: githubIcon,
            alt: footerT("social.github"),
        },
        {
            href: "https://linkedin.com",
            icon: linkedinIcon,
            alt: footerT("social.linkedin"),
        },
        {
            href: "https://instagram.com",
            icon: instagramIcon,
            alt: footerT("social.instagram"),
        },
        {
            href: "https://facebook.com",
            icon: facebookIcon,
            alt: footerT("social.facebook"),
        },
        {
            href: "mailto:martijnpannekoek.development@gmail.com",
            icon: gmailIcon,
            alt: footerT("social.email"),
        },
    ];

    const clearCloseTimeout = () => {
        if (closeTimeoutRef.current !== null) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    const localizedHomeHref = locale === routing.defaultLocale ? "/" : `/${locale}`;

    const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        window.location.assign(localizedHomeHref);
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
                ? "relative px-1 py-1 font-bold text-[var(--text)] after:absolute after:left-1 after:right-1 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-highlight"
                : "relative px-1 py-1 font-bold text-[var(--text)] after:absolute after:left-1 after:right-1 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-highlight";
        }

        return isSticky
            ? "px-1 py-1 font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            : "px-1 py-1 font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]";
    };

    const getMobileNavItemClass = (item: NavItem, isActive: boolean) => {
        if (item.variant === "cta") {
            return "rounded-2xl bg-primary px-4 py-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--primary-contrast)] shadow-sm transition-colors hover:bg-primary/85";
        }

        if (isActive) {
            return "rounded-2xl bg-primary/12 px-4 py-4 text-2xl font-semibold tracking-[-0.02em] text-primary ring-1 ring-primary/25";
        }

        return "rounded-2xl px-4 py-4 text-2xl font-medium tracking-[-0.02em] text-[var(--text-muted)] transition-colors hover:bg-primary/10 hover:text-[var(--text)]";
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
                    <div className="flex items-center justify-between mx-4 py-2">
                        <div className="flex gap-1 text-lg font-bold">
                            <Link
                                href="/"
                                className={`group inline-flex items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 shadow-sm transition-colors hover:border-accent/65 hover:bg-[var(--surface-elevated)] ${
                                    isMenuOpen && !isSticky ? "opacity-0" : "opacity-100"
                                }`}
                                aria-label="Homepage"
                                onClick={handleLogoClick}
                            >
                                <span className="font-mono text-[0.98rem] font-semibold tracking-[0.04em] text-[var(--text)]">
                                    <span className="text-[var(--text-soft)]">&lt;</span>
                                    <span className="mx-0.5 text-primary transition-colors group-hover:text-highlight dark:text-accent">MP</span>
                                    <span className="text-[var(--text-soft)]">/&gt;</span>
                                </span>
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
                                        {t(item.labelKey)}
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
                                aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
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
                    aria-label={t("closeBackdrop")}
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
                    <div className="relative z-10 px-4 pb-6 pt-24">
                        <div className="px-1">
                            <p className="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">{t("mobileNavigation")}</p>
                        </div>
                        <div className="mt-5 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActivePath(item.href) ? "page" : undefined}
                                    className={getMobileNavItemClass(item, isActivePath(item.href))}
                                    onClick={closeMenu}>
                                    {t(item.labelKey)}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />
                        <div className="mt-10 flex flex-wrap justify-center gap-3 px-1">
                            {socialLinks.map((socialLink) => (
                                <Link
                                    key={socialLink.alt}
                                    href={socialLink.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={socialLink.alt}
                                    className="mp-focus inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md dark:hover:border-accent/45"
                                    onClick={closeMenu}>
                                    <Image
                                        priority
                                        src={socialLink.icon}
                                        alt={socialLink.alt}
                                        className="opacity-90 dark:invert dark:brightness-200"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
