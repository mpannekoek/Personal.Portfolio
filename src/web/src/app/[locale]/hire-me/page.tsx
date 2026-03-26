import {
    Handshake,
    ImageIcon,
    MessageSquareQuote,
    MousePointerClick,
    MonitorSmartphone,
    PanelsTopLeft,
    Search,
} from "lucide-react";
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

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />

            <ProcessTimeline />

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />

            <section className="mt-8">
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

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />

            <section className="mt-8">
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

            <section id="contact" className="mt-8 scroll-mt-24">
                <ContactShortcut />
            </section>
        </main>
    );
}
