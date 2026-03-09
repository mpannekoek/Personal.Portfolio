import Link from "next/link";
import Image from "next/image";
import { Code } from "lucide-react";
import facebookIcon from "../../../public/images/icons/social/facebook-icon.svg";
import githubIcon from "../../../public/images/icons/social/github-icon.svg";
import gmailIcon from "../../../public/images/icons/social/gmail-icon.svg";
import instagramIcon from "../../../public/images/icons/social/instagram-icon.svg";
import linkedinIcon from "../../../public/images/icons/social/linkedin-icon.svg";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const pageLinks = [
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];
    const socialLinks = [
        {
            href: "https://github.com",
            icon: githubIcon,
            alt: "Check my code on GitHub",
        },
        {
            href: "https://linkedin.com",
            icon: linkedinIcon,
            alt: "Follow me on LinkedIn",
        },
        {
            href: "https://instagram.com",
            icon: instagramIcon,
            alt: "Follow me on Instagram",
        },
        {
            href: "https://facebook.com",
            icon: facebookIcon,
            alt: "Follow me on Facebook",
        },
        {
            href: "mailto:martijnpannekoek.development@gmail.com",
            icon: gmailIcon,
            alt: "Mail me",
        },
    ];

    return (
        <footer className="mt-4 md:mt-10 border-t border-[var(--border)] bg-gradient-to-b from-accent/8 via-[var(--bg)] to-highlight/6">
            <div className="container mx-auto px-6 py-10 md:py-12">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-[0_14px_48px_-32px_rgba(0,0,0,0.6)] ring-1 ring-[var(--ring)] backdrop-blur-sm md:p-8">
                    <div className="grid gap-8 md:grid-cols-[1.25fr_0.8fr_1fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-highlight/35 bg-highlight/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-highlight">
                                <Code size={14} />
                                Personal Brand
                            </div>
                            <p className="mt-4 text-2xl font-bold text-[var(--text)]">Martijn Pannekoek</p>
                            <p className="mt-1 text-base text-[var(--text-muted)]">Software Architect</p>
                            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-soft)]">
                                Designing resilient digital products with modern engineering standards and product-focused execution.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text-soft)]">Pages</p>
                            <div className="mt-3 flex flex-col gap-2">
                                {pageLinks.map((pageLink) => (
                                    <Link
                                        key={pageLink.href}
                                        href={pageLink.href}
                                        className="mp-focus w-fit rounded-md px-1.5 py-0.5 text-[var(--text-muted)] transition-colors hover:text-primary">
                                        {pageLink.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[var(--text-soft)]">Connect</p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {socialLinks.map((socialLink) => (
                                    <Link
                                        key={socialLink.alt}
                                        href={socialLink.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={socialLink.alt}
                                        className="mp-focus inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md dark:hover:border-accent/45">
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
                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
                    <div className="text-center text-sm text-[var(--text-soft)]">
                        © {currentYear}{" "}
                        <Link
                            href="/"
                            className="mp-focus font-medium text-[var(--text)] underline-offset-4 transition-colors hover:text-primary hover:underline">
                            Martijn Pannekoek
                        </Link>
                        . All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
