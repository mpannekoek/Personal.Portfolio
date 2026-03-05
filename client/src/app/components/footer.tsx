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
        <footer className="mt-10 border-t border-black/10 bg-gradient-to-b from-secondary/10 via-white to-white dark:border-white/12 dark:from-secondary/14 dark:via-zinc-950 dark:to-black">
            <div className="container mx-auto px-6 py-10 md:py-12">
                <div className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_14px_48px_-32px_rgba(0,0,0,0.6)] ring-1 ring-white/70 backdrop-blur-sm dark:border-white/12 dark:bg-zinc-950/75 dark:ring-white/8 md:p-8">
                    <div className="grid gap-8 md:grid-cols-[1.25fr_0.8fr_1fr]">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-black/65 dark:border-white/12 dark:bg-white/5 dark:text-white/70">
                                <Code size={14} />
                                Personal Brand
                            </div>
                            <p className="mt-4 text-2xl font-bold text-black dark:text-white">Martijn Pannekoek</p>
                            <p className="mt-1 text-base text-black/75 dark:text-white/75">Software Architect</p>
                            <p className="mt-4 max-w-md text-sm leading-6 text-black/65 dark:text-white/65">
                                Designing resilient digital products with modern engineering standards and product-focused execution.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-black/55 dark:text-white/55">Pages</p>
                            <div className="mt-3 flex flex-col gap-2">
                                {pageLinks.map((pageLink) => (
                                    <Link
                                        key={pageLink.href}
                                        href={pageLink.href}
                                        className="w-fit rounded-md px-1.5 py-0.5 text-black/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 dark:text-white/85 dark:hover:text-secondary">
                                        {pageLink.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-black/55 dark:text-white/55">Connect</p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                {socialLinks.map((socialLink) => (
                                    <Link
                                        key={socialLink.alt}
                                        href={socialLink.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={socialLink.alt}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/12 bg-white/85 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 dark:border-white/20 dark:bg-white/12 dark:hover:border-secondary/45 dark:hover:bg-white/16">
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
                    <div className="my-6 h-px bg-gradient-to-r from-transparent via-black/18 to-transparent dark:via-white/18" />
                    <div className="text-center text-sm text-black/65 dark:text-white/60">
                        © {currentYear}{" "}
                        <Link
                            href="/"
                            className="font-medium text-black/90 underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 dark:text-white/90 dark:hover:text-secondary">
                            Martijn Pannekoek
                        </Link>
                        . All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
