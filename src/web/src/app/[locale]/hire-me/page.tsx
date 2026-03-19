import {
    Hammer,
    Handshake,
    ImageIcon,
    MessageCircle,
    MessageSquareQuote,
    MousePointerClick,
    PanelsTopLeft,
    PencilRuler,
    Rocket,
    Search,
    Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import ContactShortcut from "../../components/contact-shortcut";
import SectionHeading from "../../components/section-heading";

export default async function HireMePage() {
    const t = await getTranslations("hireMePage");
    const principles = [
        {
            key: "honestStory",
            icon: MessageSquareQuote,
            className:
                "border-highlight/35 bg-[linear-gradient(135deg,rgba(245,158,11,0.14),rgba(255,255,255,0.02))]",
            iconClassName: "bg-highlight/15 text-highlight",
        },
        {
            key: "idealSolution",
            icon: Handshake,
            className:
                "border-primary/35 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(16,185,129,0.08))]",
            iconClassName: "bg-primary/15 text-primary",
        },
    ] as const;
    const services = [
        {
            key: "websites",
            icon: PanelsTopLeft,
            numberTone: "text-sky-700/80",
            iconClassName: "bg-sky-500/12 text-sky-700",
        },
        {
            key: "landingPages",
            icon: MousePointerClick,
            numberTone: "text-amber-700/80",
            iconClassName: "bg-amber-500/12 text-amber-700",
        },
        {
            key: "seo",
            icon: Search,
            numberTone: "text-emerald-700/80",
            iconClassName: "bg-emerald-500/12 text-emerald-700",
        },
    ] as const;
    const processSteps = [
        {
            key: "step1",
            icon: MessageCircle,
            tone: "text-sky-700",
            chipClassName: "border-sky-500/20 bg-sky-500/12 text-sky-700",
            badgeClassName: "bg-sky-600 text-white",
            cardClassName: "hover:border-sky-500/30",
        },
        {
            key: "step2",
            icon: Workflow,
            tone: "text-teal-700",
            chipClassName: "border-teal-500/20 bg-teal-500/12 text-teal-700",
            badgeClassName: "bg-teal-600 text-white",
            cardClassName: "hover:border-teal-500/30",
        },
        {
            key: "step3",
            icon: PencilRuler,
            tone: "text-amber-700",
            chipClassName: "border-amber-500/20 bg-amber-500/12 text-amber-700",
            badgeClassName: "bg-amber-500 text-white",
            cardClassName: "hover:border-amber-500/30",
        },
        {
            key: "step4",
            icon: Hammer,
            tone: "text-emerald-700",
            chipClassName: "border-emerald-500/20 bg-emerald-500/12 text-emerald-700",
            badgeClassName: "bg-emerald-600 text-white",
            cardClassName: "hover:border-emerald-500/30",
        },
        {
            key: "step5",
            icon: Rocket,
            tone: "text-rose-700",
            chipClassName: "border-rose-500/20 bg-rose-500/12 text-rose-700",
            badgeClassName: "bg-rose-600 text-white",
            cardClassName: "hover:border-rose-500/30",
        },
    ] as const;

    return (
        <main className="container mx-auto px-6 pb-10">
            <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-soft)]">
                        {t("eyebrow")}
                    </p>
                    <h1 className="mt-2 mb-6 font-bold text-3xl text-[var(--text)] md:text-5xl">
                        {t("title")}
                    </h1>
                    <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                        {t("description")}
                    </p>
                    <a
                        href="#contact"
                        className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--primary-contrast)] transition-colors hover:bg-primary/85"
                    >
                        {t("cta")}
                    </a>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-elevated)] p-6 shadow-sm ring-1 ring-[var(--ring)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%),linear-gradient(135deg,rgba(59,130,246,0.08),transparent_55%,rgba(16,185,129,0.08))]" />
                    <div className="relative flex aspect-[4/5] flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center">
                        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <ImageIcon className="h-7 w-7" />
                        </span>
                        <p className="mt-5 text-lg font-semibold text-[var(--text)]">
                            {t("heroImage.title")}
                        </p>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
                            {t("heroImage.description")}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <SectionHeading
                    title={t("principles.title")}
                    eyebrow={t("principles.eyebrow")}
                    variant="reactive"
                />

                <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    {principles.map((principle) => {
                        const Icon = principle.icon;

                        return (
                            <article
                                key={principle.key}
                                className={`relative overflow-hidden rounded-2xl border p-6 shadow-sm ring-1 ring-[var(--ring)] transition-all hover:-translate-y-0.5 hover:shadow-md ${principle.className}`}
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-white/8 blur-2xl" />
                                <span
                                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${principle.iconClassName}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h2 className="mt-5 text-2xl font-bold text-[var(--text)]">
                                    {t(`principles.${principle.key}.title`)}
                                </h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                                    {t(`principles.${principle.key}.description`)}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="mt-14">
                <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                    <div className="max-w-xl lg:sticky lg:top-24">
                        <SectionHeading
                            title={t("process.title")}
                            eyebrow={t("process.eyebrow")}
                            variant="reactive"
                        />
                        <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                            {t("process.description")}
                        </p>

                        <div className="relative mt-10 py-2">
                            <div className="absolute bottom-10 left-5 top-10 w-px bg-gradient-to-b from-sky-500/75 via-teal-500/65 via-amber-500/65 via-emerald-500/65 to-rose-500/75" />
                            <div className="space-y-8">
                                {processSteps.map((step, index) => {
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.key} className="relative flex min-h-16 items-center gap-4">
                                            <span
                                                className={`relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-[var(--background)] text-sm font-bold shadow-[0_8px_20px_rgba(15,23,42,0.06)] ${step.chipClassName}`}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <p className="text-base font-semibold text-[var(--text)]">
                                                    {t(`process.steps.${step.key}.title`)}
                                                </p>
                                                <p
                                                    className={`mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${step.tone}`}
                                                >
                                                    {t("process.stepLabel", { number: index + 1 })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {processSteps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.key}
                                    className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5 shadow-sm ring-1 ring-[var(--ring)] transition-all hover:-translate-y-0.5 hover:shadow-md ${step.cardClassName}`}
                                >
                                    <div className="flex gap-4">
                                        <span
                                            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${step.badgeClassName}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <p
                                                className={`text-xs font-semibold uppercase tracking-[0.12em] ${step.tone}`}
                                            >
                                                {t("process.stepLabel", { number: index + 1 })}
                                            </p>
                                            <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">
                                                {t(`process.steps.${step.key}.title`)}
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                                                {t(`process.steps.${step.key}.description`)}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="mt-14">
                <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(255,255,255,0.02)_32%,rgba(16,185,129,0.08))] px-6 py-8 md:px-8 md:py-10">
                    <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="relative grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                        <div className="max-w-lg">
                            <SectionHeading
                                title={t("servicesTitle")}
                                eyebrow={t("servicesEyebrow")}
                                variant="reactive"
                            />
                            <h2 className="text-3xl font-bold text-[var(--text)] md:text-4xl">
                                {t("servicesIntroTitle")}
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                                {t("servicesIntroDescription")}
                            </p>
                        </div>

                        <div className="space-y-7">
                            {services.map((service, index) => {
                                const Icon = service.icon;

                                return (
                                    <div key={service.key}>
                                        <article className="grid gap-4 md:grid-cols-[112px_1fr] md:gap-6">
                                            <div className="flex items-center gap-3 md:block">
                                                <p
                                                    className={`text-5xl font-black leading-none tracking-[-0.05em] md:text-6xl ${service.numberTone}`}
                                                >
                                                    0{index + 1}
                                                </p>
                                                <span
                                                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${service.iconClassName}`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </span>
                                            </div>

                                            <div className="max-w-2xl">
                                                <h3 className="text-2xl font-semibold text-[var(--text)]">
                                                    {t(`services.${service.key}.title`)}
                                                </h3>
                                                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                                                    {t(`services.${service.key}.description`)}
                                                </p>
                                            </div>
                                        </article>

                                        {index < services.length - 1 ? (
                                            <div className="mt-7 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-14">
                <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] px-6 py-8 shadow-sm ring-1 ring-[var(--ring)] md:px-8 md:py-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_38%)]" />

                    <div className="relative grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                        <div className="max-w-lg">
                            <SectionHeading
                                title={t("pricing.title")}
                                eyebrow={t("pricing.eyebrow")}
                                variant="reactive"
                            />
                        </div>

                        <div className="max-w-2xl space-y-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary md:text-base">
                                {t("pricing.intro")}
                            </p>
                            <p className="text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                                {t("pricing.description")}
                            </p>
                            <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-sm ring-1 ring-[var(--ring)]">
                                <p className="text-sm font-medium leading-relaxed text-[var(--text)] md:text-base">
                                    {t("pricing.note")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="mt-14 scroll-mt-24">
                <div className="mb-8 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />
                <ContactShortcut />
            </section>
        </main>
    );
}
