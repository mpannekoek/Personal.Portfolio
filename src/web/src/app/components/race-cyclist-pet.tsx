"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "../../i18n/navigation";

type PetPhase = "hidden" | "entering" | "speaking" | "sprinting";
type PetRoute = "home" | "blog" | "hire-me";

const ENTER_DURATION_MS = 800;
const SPEAK_DURATION_MS = 2_300;
const SPRINT_DURATION_MS = 1_200;
const VISITED_PATHS_STORAGE_KEY = "race-pet-visited-paths-v1";

function hasVisitedPath(pathname: string) {
    try {
        const storedPaths = window.sessionStorage.getItem(VISITED_PATHS_STORAGE_KEY);
        const visitedPaths = storedPaths ? JSON.parse(storedPaths) as string[] : [];
        return visitedPaths.includes(pathname);
    } catch {
        return false;
    }
}

function markPathAsVisited(pathname: string) {
    try {
        const storedPaths = window.sessionStorage.getItem(VISITED_PATHS_STORAGE_KEY);
        const visitedPaths = new Set<string>(storedPaths ? JSON.parse(storedPaths) as string[] : []);
        visitedPaths.add(pathname);
        window.sessionStorage.setItem(VISITED_PATHS_STORAGE_KEY, JSON.stringify([...visitedPaths]));
    } catch {
        // The animation can still run when session storage is unavailable.
    }
}

export default function RaceCyclistPet() {
    const t = useTranslations("pet");
    const pathname = usePathname();
    const [phase, setPhase] = useState<PetPhase>("hidden");
    const timeoutRefs = useRef<number[]>([]);
    const animationFrameRef = useRef<number | null>(null);

    const normalizedPathname = pathname.replace(/^\/(?:nl|en)(?=\/|$)/, "") || "/";
    const route: PetRoute = normalizedPathname.startsWith("/blog")
        ? "blog"
        : normalizedPathname.startsWith("/hire-me")
            ? "hire-me"
            : "home";
    const contextualMessage = route === "blog"
        ? t("speech.blog")
        : route === "hire-me"
            ? t("speech.hireMe")
            : t("speech.home");

    const clearSequence = useCallback(() => {
        timeoutRefs.current.forEach((timeout) => window.clearTimeout(timeout));
        timeoutRefs.current = [];

        if (animationFrameRef.current !== null) {
            window.cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    const schedule = useCallback((callback: () => void, delay: number) => {
        const timeout = window.setTimeout(callback, delay);
        timeoutRefs.current.push(timeout);
    }, []);

    const startSequence = useCallback(() => {
        clearSequence();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        animationFrameRef.current = window.requestAnimationFrame(() => {
            setPhase("hidden");
            animationFrameRef.current = window.requestAnimationFrame(() => {
                animationFrameRef.current = null;

                if (reducedMotion) {
                    setPhase("speaking");
                    schedule(() => setPhase("hidden"), SPEAK_DURATION_MS);
                    return;
                }

                setPhase("entering");
                schedule(() => setPhase("speaking"), ENTER_DURATION_MS);
                schedule(() => setPhase("sprinting"), ENTER_DURATION_MS + SPEAK_DURATION_MS);
                schedule(
                    () => setPhase("hidden"),
                    ENTER_DURATION_MS + SPEAK_DURATION_MS + SPRINT_DURATION_MS,
                );
            });
        });
    }, [clearSequence, schedule]);

    useEffect(() => {
        if (hasVisitedPath(normalizedPathname)) {
            clearSequence();
            animationFrameRef.current = window.requestAnimationFrame(() => {
                animationFrameRef.current = null;
                setPhase("hidden");
            });
        } else {
            startSequence();
            schedule(() => markPathAsVisited(normalizedPathname), 0);
        }

        return clearSequence;
    }, [clearSequence, normalizedPathname, schedule, startSequence]);

    return (
        <div className="race-pet-shell">
            <div
                className={`race-pet race-pet--${phase}`}
                aria-hidden="true"
            >
                <span className="race-pet-speech">
                    {contextualMessage}
                </span>
                <svg
                    className="race-pet-art"
                    viewBox="0 0 220 135"
                    aria-hidden="true"
                >
                    <g className="race-pet-speed-lines" fill="none" strokeLinecap="round">
                        <path d="M10 58h34" />
                        <path d="M18 70h24" />
                        <path d="M7 82h30" />
                    </g>

                    <ellipse className="race-pet-shadow" cx="111" cy="126" rx="91" ry="5" />
                    <path className="race-pet-ground" d="M19 127h184" />

                    <g className="race-pet-rider">
                        <g className="race-pet-wheel race-pet-wheel--rear">
                            <circle className="race-pet-tire" cx="57" cy="98" r="32" />
                            <circle className="race-pet-rim" cx="57" cy="98" r="27" />
                            <g className="race-pet-spokes">
                                <path d="M57 71v54M30 98h54M38 79l38 38M76 79l-38 38" />
                            </g>
                            <circle className="race-pet-hub" cx="57" cy="98" r="3" />
                        </g>

                        <g className="race-pet-wheel race-pet-wheel--front">
                            <circle className="race-pet-tire" cx="167" cy="98" r="32" />
                            <circle className="race-pet-rim" cx="167" cy="98" r="27" />
                            <g className="race-pet-spokes">
                                <path d="M167 71v54M140 98h54M148 79l38 38M186 79l-38 38" />
                            </g>
                            <circle className="race-pet-hub" cx="167" cy="98" r="3" />
                        </g>

                        <g className="race-pet-bike" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path className="race-pet-frame" d="M57 98 88 58l22 40H57Zm31-40 57 2-35 38 38-7" />
                            <path className="race-pet-fork" d="m145 60 22 38M142 55l8 4" />
                            <path className="race-pet-handlebar" d="m142 55 12-4 6 2c-7 0-8 7-3 10" />
                            <path className="race-pet-seat" d="M80 55h17" />
                            <path className="race-pet-chain" d="M57 98h53" />
                        </g>

                        <g className="race-pet-crank">
                            <circle cx="110" cy="98" r="7" />
                            <path d="M110 98 99 89M99 89h-7M110 98l11 9M121 107h7" />
                        </g>

                        <g className="race-pet-person" strokeLinecap="round" strokeLinejoin="round">
                            <path className="race-pet-leg race-pet-leg--back" d="M96 58 86 76l13 13" />
                            <path className="race-pet-leg race-pet-leg--front" d="m96 58 20 19-6 21" />
                            <path className="race-pet-shoe" d="m104 99 13 1M94 88l9 4" />
                            <path className="race-pet-torso" d="M98 36c9 2 22 10 28 21L99 62c-8-8-9-17-1-26Z" />
                            <path className="race-pet-jersey-stripe" d="m102 41 15 16" />
                            <path className="race-pet-arm race-pet-arm--back" d="m113 44 13 12 18 1" />
                            <path className="race-pet-arm race-pet-arm--front" d="m106 43 16 17 27-7" />
                            <circle className="race-pet-hand" cx="149" cy="53" r="2.6" />
                            <path className="race-pet-neck" d="m102 37 2-7" />
                            <g className="race-pet-head-group">
                                <circle className="race-pet-ear" cx="95" cy="25" r="3.3" />
                                <path className="race-pet-head" d="M96 14c4-6 14-7 20-1 4 4 4 12 1 18-3 6-8 9-13 7-7-2-11-10-8-24Z" />
                                <path className="race-pet-helmet" d="M93 17c1-8 7-13 15-13 7 0 12 4 14 11l-5 3c-6-3-15-4-24-1Z" />
                                <path className="race-pet-helmet-detail" d="m101 7 2 9M111 6l-2 10M119 11l-7 6" />
                                <path className="race-pet-hair" d="M96 18c1-5 5-8 10-9 5-1 9 1 12 5-5-2-8-2-11-1-3 3-6 4-11 5Z" />
                                <circle className="race-pet-cheek" cx="112" cy="28" r="3" />
                                <circle className="race-pet-eye" cx="106" cy="22" r="1.45" />
                                <circle className="race-pet-eye" cx="114" cy="22" r="1.45" />
                                <path className="race-pet-nose" d="m111 23 2 3-2 1" />
                                <path className="race-pet-smile" d="M106 29c3 5 8 6 12 1-4 2-8 2-12-1Z" />
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    );
}
