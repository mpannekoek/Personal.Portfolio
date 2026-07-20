"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CollaborationLandscape({ alt }: { alt: string }) {
    const figureRef = useRef<HTMLElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const figure = figureRef.current;
        const parallaxLayer = parallaxRef.current;

        if (!figure || !parallaxLayer) {
            return;
        }

        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (reducedMotionQuery.matches) {
            animationFrameRef.current = window.requestAnimationFrame(() => {
                animationFrameRef.current = null;
                setIsVisible(true);
            });

            return () => {
                if (animationFrameRef.current !== null) {
                    window.cancelAnimationFrame(animationFrameRef.current);
                }
            };
        }

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    visibilityObserver.disconnect();
                }
            },
            { threshold: 0.12 },
        );

        const updateParallax = () => {
            animationFrameRef.current = null;

            const bounds = figure.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const imageCenter = bounds.top + bounds.height / 2;
            const progress = Math.max(
                -1,
                Math.min(1, (imageCenter - viewportCenter) / window.innerHeight),
            );

            parallaxLayer.style.transform = `translate3d(0, ${progress * -18}px, 0)`;
        };

        const scheduleParallaxUpdate = () => {
            if (animationFrameRef.current === null) {
                animationFrameRef.current = window.requestAnimationFrame(updateParallax);
            }
        };

        visibilityObserver.observe(figure);
        updateParallax();
        window.addEventListener("scroll", scheduleParallaxUpdate, { passive: true });
        window.addEventListener("resize", scheduleParallaxUpdate);

        return () => {
            visibilityObserver.disconnect();
            window.removeEventListener("scroll", scheduleParallaxUpdate);
            window.removeEventListener("resize", scheduleParallaxUpdate);

            if (animationFrameRef.current !== null) {
                window.cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <figure
            ref={figureRef}
            className={`relative mt-14 h-[clamp(14rem,37.5vw,48rem)] w-full overflow-hidden bg-[var(--surface-elevated)] shadow-[0_22px_56px_-42px_rgba(15,23,42,0.34)] transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none md:mt-20 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
        >
            <div
                ref={parallaxRef}
                className="absolute -inset-y-6 inset-x-0 will-change-transform motion-reduce:transform-none motion-reduce:will-change-auto"
            >
                <div
                    className={`absolute inset-0 transition-transform duration-1000 ease-out motion-reduce:scale-100 motion-reduce:transition-none ${
                        isVisible ? "scale-100" : "scale-[1.035]"
                    }`}
                >
                    <Image
                        src="/cycling-route-landscape.webp"
                        alt={alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </figure>
    );
}
