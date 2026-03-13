"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "../../../../lib/markdown";

type BlogPostTocProps = {
    items: TocItem[];
    title: string;
};

export default function BlogPostToc({ items, title }: BlogPostTocProps) {
    const [activeId, setActiveId] = useState(items[0]?.id ?? "");

    useEffect(() => {
        if (items.length === 0) {
            return undefined;
        }

        const headings = items
            .map((item) => document.getElementById(item.id))
            .filter((node): node is HTMLElement => node !== null);

        if (headings.length === 0) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleHeading = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

                if (visibleHeading?.target.id) {
                    setActiveId(visibleHeading.target.id);
                }
            },
            {
                rootMargin: "0px 0px -65% 0px",
                threshold: [0.1, 0.25, 0.5, 0.75, 1],
            },
        );

        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) {
        return null;
    }

    return (
        <aside className="rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                {title}
            </p>
            <nav className="mt-4">
                <ul className="space-y-3">
                    {items.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`block border-l pl-3 text-sm transition-colors ${
                                    activeId === item.id
                                        ? "border-primary text-[var(--text)]"
                                        : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
                                }`}
                            >
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
