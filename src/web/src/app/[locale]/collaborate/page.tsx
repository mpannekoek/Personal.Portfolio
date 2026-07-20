import { ArrowRight, Hammer, MessageCircle, RefreshCw } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "../../../i18n/routing";
import { createPageMetadata } from "../../../lib/site";
import CollaborationLandscape from "../../components/collaboration-landscape";
import ContactShortcut from "../../components/contact-shortcut";
import FadeIn from "../../components/providers/fade-in-provider";

type CollaboratePageProps = {
    params: Promise<{ locale: string }>;
};

const contributions = [
    {
        key: "think",
        icon: MessageCircle,
        iconClassName: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
    },
    {
        key: "make",
        icon: Hammer,
        iconClassName: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
    },
    {
        key: "improve",
        icon: RefreshCw,
        iconClassName: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    },
] as const;

export async function generateMetadata({ params }: CollaboratePageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });

    return createPageMetadata({
        locale: locale as AppLocale,
        path: {
            nl: "/samenwerken",
            en: "/collaborate",
        },
        title: t("collaborateTitle"),
        description: t("collaborateDescription"),
    });
}

export default async function CollaboratePage() {
    const t = await getTranslations("collaboratePage");

    return (
        <main className="pb-10">
            <div className="container mx-auto px-6">
                <section className="py-8 md:py-10 lg:py-12">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:items-center lg:gap-14">
                    <FadeIn>
                        <div className="max-w-xl">
                            <h1 className="mx-auto max-w-lg text-center text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-[var(--text)] md:text-5xl lg:mx-0 lg:text-left lg:text-6xl">
                                {t("title")}
                            </h1>
                            <p className="mt-6 max-w-lg border-l-2 border-[var(--border-strong)] pl-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                                {t("description")}
                            </p>
                            <a
                                href="#contact"
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-[var(--primary-contrast)] shadow-[0_14px_28px_-24px_rgba(29,78,216,0.7)] transition-colors hover:bg-primary/90"
                            >
                                {t("cta")}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </FadeIn>

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
                <FadeIn>
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text)] md:text-4xl">
                            {t("contributions.title")}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
                            {t("contributions.description")}
                        </p>
                    </div>
                </FadeIn>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {contributions.map((contribution) => {
                        const Icon = contribution.icon;

                        return (
                            <article
                                key={contribution.key}
                                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm ring-1 ring-[var(--ring)]"
                            >
                                <span
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${contribution.iconClassName}`}
                                >
                                    <Icon className="h-4 w-4" />
                                </span>
                                <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[var(--text)]">
                                    {t(`contributions.${contribution.key}.title`)}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                                    {t(`contributions.${contribution.key}.description`)}
                                </p>
                            </article>
                        );
                    })}
                </div>
                </section>
            </div>

            <CollaborationLandscape alt={t("landscapeImage.alt")} />

            <div id="contact" className="container mx-auto mt-10 scroll-mt-24 px-6 md:mt-14">
                <ContactShortcut />
            </div>
        </main>
    );
}
