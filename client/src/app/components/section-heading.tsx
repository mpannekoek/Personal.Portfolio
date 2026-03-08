"use client";

import { useEffect, useRef, useState } from "react";

type HeadingVariant = "editorial" | "minimal" | "reactive";

type SectionHeadingProps = {
    title: string;
    eyebrow?: string;
    meta?: string;
    variant: HeadingVariant;
};

export default function SectionHeading({ title, eyebrow, meta, variant }: SectionHeadingProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = rootRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.25 }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    if (variant === "editorial") {
        return (
            <div
                ref={rootRef}
                className={`mb-6 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-white/55">
                    {eyebrow}
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-zinc-900 dark:text-white md:text-5xl">
                    {title}
                </h2>
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <div ref={rootRef} className="mb-6">
                <div className="flex items-end justify-between gap-4">
                    <h2 className="font-mono text-2xl font-bold text-zinc-900 dark:text-white md:text-4xl">
                        {`<${title} />`}
                    </h2>
                    {meta ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-white/55">
                            {meta}
                        </p>
                    ) : null}
                </div>
                <div className="mt-3 h-px overflow-hidden bg-zinc-200 dark:bg-white/15">
                    <span
                        className={`block h-full bg-gradient-to-r from-primary/60 to-secondary/60 transition-transform duration-700 ${isVisible ? "scale-x-100" : "scale-x-0"}`}
                        style={{ transformOrigin: "left center" }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div ref={rootRef} className="mb-6">
            {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-white/55">
                    {eyebrow}
                </p>
            ) : null}
            <h2
                className={`mt-2 text-2xl font-bold transition-all duration-500 md:text-4xl ${
                    isVisible
                        ? "translate-y-0 scale-100 text-primary dark:text-secondary"
                        : "translate-y-2 scale-[0.98] text-zinc-900 dark:text-white"
                }`}
            >
                {title}
            </h2>
        </div>
    );
}
