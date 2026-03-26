"use client";

import {
    Hammer,
    MessageCircle,
    PencilRuler,
    Rocket,
    Workflow,
    type LucideIcon,
} from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "./section-heading";

type ProcessStepKey = "step1" | "step2" | "step3" | "step4" | "step5";

type ProcessStepDefinition = {
    key: ProcessStepKey;
    icon: LucideIcon;
    toneClassName: string;
    chipClassName: string;
    highlightClassName: string;
    progressClassName: string;
    glowClassName: string;
};

const processSteps: ProcessStepDefinition[] = [
    {
        key: "step1",
        icon: MessageCircle,
        toneClassName: "text-sky-700 dark:text-sky-300",
        chipClassName: "border-sky-500/25 bg-sky-500/12 text-sky-700 dark:text-sky-300",
        highlightClassName: "border-sky-500/35 bg-sky-500/10",
        progressClassName: "from-sky-400 via-sky-500 to-cyan-400",
        glowClassName: "bg-sky-500/20",
    },
    {
        key: "step2",
        icon: Workflow,
        toneClassName: "text-teal-700 dark:text-teal-300",
        chipClassName: "border-teal-500/25 bg-teal-500/12 text-teal-700 dark:text-teal-300",
        highlightClassName: "border-teal-500/35 bg-teal-500/10",
        progressClassName: "from-teal-400 via-teal-500 to-cyan-400",
        glowClassName: "bg-teal-500/20",
    },
    {
        key: "step3",
        icon: PencilRuler,
        toneClassName: "text-amber-700 dark:text-amber-300",
        chipClassName: "border-amber-500/25 bg-amber-500/12 text-amber-700 dark:text-amber-300",
        highlightClassName: "border-amber-500/35 bg-amber-500/10",
        progressClassName: "from-amber-300 via-amber-500 to-orange-400",
        glowClassName: "bg-amber-500/20",
    },
    {
        key: "step4",
        icon: Hammer,
        toneClassName: "text-emerald-700 dark:text-emerald-300",
        chipClassName: "border-emerald-500/25 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        highlightClassName: "border-emerald-500/35 bg-emerald-500/10",
        progressClassName: "from-emerald-400 via-emerald-500 to-teal-400",
        glowClassName: "bg-emerald-500/20",
    },
    {
        key: "step5",
        icon: Rocket,
        toneClassName: "text-rose-700 dark:text-rose-300",
        chipClassName: "border-rose-500/25 bg-rose-500/12 text-rose-700 dark:text-rose-300",
        highlightClassName: "border-rose-500/35 bg-rose-500/10",
        progressClassName: "from-rose-400 via-rose-500 to-fuchsia-400",
        glowClassName: "bg-rose-500/20",
    },
];

const defaultStepKey = processSteps[0].key;

export default function ProcessTimeline() {
    const t = useTranslations("hireMePage");
    const tabsBaseId = useId();
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const [selectedStepKey, setSelectedStepKey] = useState<ProcessStepKey>(defaultStepKey);
    const [previewStepKey, setPreviewStepKey] = useState<ProcessStepKey | null>(null);

    const activeStepKey = previewStepKey ?? selectedStepKey;
    const activeStepIndex = processSteps.findIndex((step) => step.key === activeStepKey);
    const activeStep = processSteps[activeStepIndex];
    const ActiveIcon = activeStep.icon;
    const progressRatio = processSteps.length > 1 ? activeStepIndex / (processSteps.length - 1) : 0;

    function focusStep(index: number) {
        const boundedIndex = (index + processSteps.length) % processSteps.length;
        const step = processSteps[boundedIndex];

        setSelectedStepKey(step.key);
        setPreviewStepKey(step.key);
        buttonRefs.current[boundedIndex]?.focus();
    }

    function handleStepKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            focusStep(index + 1);
            return;
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            focusStep(index - 1);
            return;
        }

        if (event.key === "Home") {
            event.preventDefault();
            focusStep(0);
            return;
        }

        if (event.key === "End") {
            event.preventDefault();
            focusStep(processSteps.length - 1);
        }
    }

    return (
        <section className="mt-10 md:mt-14">
            <div>
                <div className="max-w-3xl">
                    <SectionHeading
                        title={t("process.title")}
                        eyebrow={t("process.eyebrow")}
                        variant="reactive"
                    />
                    <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                        {t("process.description")}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">
                        {t("process.interactionHint")}
                    </p>
                </div>

                <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm ring-1 ring-[var(--ring)] md:mt-12">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.09),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_58%)]" />

                    <div className="relative grid gap-7 p-6 md:p-7 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] xl:gap-10">
                        <div
                            className="relative min-h-full"
                            onMouseLeave={() => setPreviewStepKey(null)}
                        >
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute bottom-7 left-5 top-7 w-px bg-gradient-to-b from-sky-500/70 via-teal-500/60 via-amber-500/60 via-emerald-500/60 to-rose-500/70"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-[0.8rem] h-6 w-6 -translate-x-1/2 rounded-full bg-[var(--surface)] shadow-[0_0_0_1px_var(--border),0_12px_24px_rgba(8,17,38,0.18)] transition-[top] duration-500 ease-out"
                                style={{
                                    top: `calc(1.75rem + (100% - 3.5rem) * ${progressRatio} - 0.75rem)`,
                                }}
                            >
                                <span className="absolute inset-[0.28rem] rounded-full bg-gradient-to-br from-primary via-accent to-highlight opacity-90" />
                            </div>

                            <div role="tablist" aria-orientation="vertical" className="space-y-3">
                                {processSteps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = activeStep.key === step.key;
                                    const title = t(`process.steps.${step.key}.title`);
                                    const stepLabel = t("process.stepLabel", { number: index + 1 });
                                    const tabId = `${tabsBaseId}-${step.key}-tab`;
                                    const panelId = `${tabsBaseId}-${step.key}-panel`;

                                    return (
                                        <button
                                            key={step.key}
                                            ref={(node) => {
                                                buttonRefs.current[index] = node;
                                            }}
                                            id={tabId}
                                            type="button"
                                            role="tab"
                                            aria-selected={isActive}
                                            aria-controls={panelId}
                                            tabIndex={isActive ? 0 : -1}
                                            onClick={() => {
                                                setSelectedStepKey(step.key);
                                                setPreviewStepKey(step.key);
                                            }}
                                            onMouseEnter={() => setPreviewStepKey(step.key)}
                                            onFocus={() => setPreviewStepKey(step.key)}
                                            onBlur={() => setPreviewStepKey(null)}
                                            onKeyDown={(event) => handleStepKeyDown(event, index)}
                                            className={`group relative flex w-full items-start gap-4 rounded-[1.6rem] border p-4 text-left transition-all duration-300 ease-out ${
                                                isActive
                                                    ? `${step.highlightClassName} translate-x-2 shadow-[0_20px_45px_-28px_rgba(8,17,38,0.55)]`
                                                    : "border-transparent bg-transparent hover:border-[var(--border)] hover:bg-[var(--surface)]/70"
                                            }`}
                                        >
                                            <span
                                                className={`relative z-10 mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all duration-300 ${step.chipClassName} ${
                                                    isActive ? "scale-110" : "group-hover:scale-105"
                                                }`}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                                                        isActive
                                                            ? `${step.glowClassName} opacity-100 animate-[process-node-pulse_2.8s_ease-in-out_infinite]`
                                                            : "opacity-0"
                                                    }`}
                                                />
                                                <Icon className="relative h-4 w-4" />
                                            </span>

                                            <span className="min-w-0">
                                                <span
                                                    className={`text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${step.toneClassName}`}
                                                >
                                                    {stepLabel}
                                                </span>
                                                <span className="mt-1 block text-base font-semibold text-[var(--text)]">
                                                    {title}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="xl:pl-3">
                            <article
                                key={activeStep.key}
                                id={`${tabsBaseId}-${activeStep.key}-panel`}
                                role="tabpanel"
                                aria-labelledby={`${tabsBaseId}-${activeStep.key}-tab`}
                                className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_26px_70px_-42px_rgba(8,17,38,0.7)] ring-1 ring-[var(--ring)] animate-[process-detail-in_320ms_cubic-bezier(0.16,1,0.3,1)] md:p-7"
                            >
                                <div
                                    aria-hidden="true"
                                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${activeStep.progressClassName}`}
                                />
                                <div
                                    aria-hidden="true"
                                    className={`absolute -right-12 top-0 h-32 w-32 rounded-full blur-3xl ${activeStep.glowClassName}`}
                                />

                                <div className="flex items-start gap-4">
                                    <span
                                        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm ${activeStep.chipClassName}`}
                                    >
                                        <ActiveIcon className="h-5 w-5" />
                                    </span>

                                    <div className="min-w-0">
                                        <p
                                            className={`text-xs font-semibold uppercase tracking-[0.14em] ${activeStep.toneClassName}`}
                                        >
                                            {t("process.stepLabel", { number: activeStepIndex + 1 })}
                                        </p>
                                        <h3 className="mt-2 text-2xl font-semibold text-[var(--text)] md:text-[2rem]">
                                            {t(`process.steps.${activeStep.key}.title`)}
                                        </h3>
                                    </div>
                                </div>

                                <p className="mt-5 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                                    {t(`process.steps.${activeStep.key}.description`)}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {processSteps.map((step, index) => {
                                        const isActive = step.key === activeStep.key;

                                        return (
                                            <span
                                                key={step.key}
                                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                                                    isActive
                                                        ? `${step.highlightClassName} ${step.toneClassName}`
                                                        : "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--text-soft)]"
                                                }`}
                                            >
                                                {t("process.stepLabel", { number: index + 1 })}
                                            </span>
                                        );
                                    })}
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
