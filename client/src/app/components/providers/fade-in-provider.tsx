"use client";

import { useEffect, useState, RefObject, useRef } from "react";

export default function FadeIn({ children, delay = "delay-0" }: { children: React.ReactNode, delay?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isRefIntersecting = isElementIntersecting(ref);

    return (
        <div ref={ref} className={`transition-opacity ${delay} duration-700 ease-in ${isRefIntersecting ? "opacity-100" : "opacity-0"}`}>
            {children}
        </div>
    )
};

function isElementIntersecting(ref: RefObject<HTMLElement | null>) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIntersecting(true);

                if (ref.current) {
                    // Unobserve the element after it has been intersected
                    observer.unobserve(ref.current);
                }
            }
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
};