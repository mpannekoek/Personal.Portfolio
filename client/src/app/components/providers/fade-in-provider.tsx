"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({ children, delay = "delay-0" }: { children: React.ReactNode, delay?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] ${delay} duration-500 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
        >
            {children}
        </div>
    );
}
