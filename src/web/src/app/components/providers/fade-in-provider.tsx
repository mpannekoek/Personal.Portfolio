"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const visibilityCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
    if (!sharedObserver) {
        sharedObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    visibilityCallbacks.get(entry.target)?.();
                    visibilityCallbacks.delete(entry.target);
                    sharedObserver?.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
        );
    }

    return sharedObserver;
}

export default function FadeIn({
    children,
    delay = "delay-0",
}: {
    children: ReactNode;
    delay?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }

        const observer = getSharedObserver();
        visibilityCallbacks.set(node, () => setIsVisible(true));
        observer.observe(node);

        return () => {
            observer.unobserve(node);
            visibilityCallbacks.delete(node);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${delay} duration-500 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
        >
            {children}
        </div>
    );
}
