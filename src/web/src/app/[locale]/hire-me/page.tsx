import {
    ArrowRight,
    Handshake,
    MessageSquareQuote,
    MousePointerClick,
    MonitorSmartphone,
    PanelsTopLeft,
    Play,
    Search,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ContactShortcut from "../../components/contact-shortcut";
import ProcessTimeline from "../../components/process-timeline";
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
            iconClassName: "bg-sky-500/12 text-sky-700",
        },
        {
            key: "applications",
            icon: MonitorSmartphone,
            iconClassName: "bg-violet-500/12 text-violet-700 dark:text-violet-300",
        },
        {
            key: "landingPages",
            icon: MousePointerClick,
            iconClassName: "bg-amber-500/12 text-amber-700",
        },
        {
            key: "seo",
            icon: Search,
            iconClassName: "bg-emerald-500/12 text-emerald-700",
        },
    ] as const;
    return (
        <main className="container mx-auto px-6 pb-10">
            <section className="px-0 py-8 md:py-10 lg:py-12">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:items-center lg:gap-14">
                    <div className="max-w-xl">
                        <h1 className="mx-auto max-w-lg text-center text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--text)] md:text-5xl lg:mx-0 lg:text-left lg:text-6xl">
                            {t("title")}
                        </h1>
                        <div className="mt-6 max-w-lg border-l-2 border-[var(--border-strong)] pl-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                            {t("description")}
                        </div>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-[var(--primary-contrast)] shadow-[0_14px_28px_-24px_rgba(29,78,216,0.7)] transition-colors hover:bg-primary/90"
                            >
                                {t("cta")}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#process"
                                className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-primary/35 hover:text-primary"
                            >
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
                                </span>
                                {t("secondaryCta")}
                            </a>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
                        <div className="absolute inset-x-6 inset-y-8 rotate-3 rounded-[2.5rem] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_20%,white)_0%,color-mix(in_srgb,var(--primary)_16%,white)_100%)]" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_22px_56px_-42px_rgba(15,23,42,0.34)]">
                            <div className="overflow-hidden rounded-[1.6rem]">
                                <Image
                                    src="/me.jpg"
                                    alt={t("heroImage.alt")}
                                    width={1152}
                                    height={1536}
                                    className="h-auto w-full object-cover object-center"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-14 md:mt-16">
                <SectionHeading
                    title={t("principles.title")}
                    eyebrow={t("principles.eyebrow")}
                    variant="reactive"
                />

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
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

            <div className="mt-14 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent md:mt-20" />

            <div id="process" className="scroll-mt-24">
                <ProcessTimeline />
            </div>

            <div className="mt-14 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent md:mt-20" />

            <section className="mt-10 md:mt-14">
                <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                    <div className="max-w-lg">
                        <SectionHeading
                            title={t("servicesTitle")}
                            eyebrow={t("servicesEyebrow")}
                            variant="reactive"
                        />
                        <h2 className="text-3xl font-bold text-[var(--text)] md:text-4xl">
                            {t("servicesIntroTitle")}
                        </h2>
                        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                            {t("servicesIntroDescription")}
                        </p>
                    </div>

                    <div className="divide-y divide-[var(--border)]">
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.key}
                                    className="grid gap-4 py-6 transition-colors md:grid-cols-[72px_1fr] md:gap-6 md:py-7"
                                >
                                    <div className="flex items-start">
                                        <span
                                            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ring-inset ring-current/10 ${service.iconClassName}`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                    </div>

                                    <div className="max-w-2xl">
                                        <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--text)] md:text-2xl">
                                            {t(`services.${service.key}.title`)}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                                            {t(`services.${service.key}.description`)}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className="mt-14 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent md:mt-20" />

            <section className="mt-10 md:mt-14">
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

            <section id="contact" className="mt-14 scroll-mt-24 md:mt-20">
                <ContactShortcut />
            </section>
        </main>
    );
}
