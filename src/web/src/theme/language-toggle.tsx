"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname as useCurrentPathname } from "next/navigation";
import { useRouter } from "../i18n/navigation";
import { routing } from "../i18n/routing";

function getInternalPathname(pathname: string) {
    const localePattern = routing.locales.join("|");
    const normalizedPathname = pathname.replace(
        new RegExp(`^/(${localePattern})(?=/|$)`),
        "",
    );

    return normalizedPathname || "/";
}

export default function LanguageToggle() {
    const t = useTranslations("languageToggle");
    const locale = useLocale();
    const pathname = useCurrentPathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const localeOptions = routing.locales.map((localeOption) => ({
        value: localeOption,
        label: localeOption.toUpperCase(),
        isActive: localeOption === locale,
    }));

    const switchLocale = (nextLocale: string) => {
        if (nextLocale === locale) {
            return;
        }

        const internalPathname = getInternalPathname(pathname);
        const queryString = window.location.search;
        const hash = window.location.hash;

        startTransition(() => {
            router.replace(
                `${internalPathname}${queryString}${hash}`,
                { locale: nextLocale },
            );
            router.refresh();
        });
    };

    return (
        <div
            role="group"
            aria-label={t("label")}
            className="inline-flex items-center gap-1 rounded-3xl border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-1 shadow-sm"
        >
            <Globe size={18} className="mr-1" />
            {localeOptions.map((localeOption) => (
                <button
                    key={localeOption.value}
                    type="button"
                    title={
                        localeOption.isActive
                            ? localeOption.label
                            : t("switchTo", { locale: localeOption.label })
                    }
                    aria-pressed={localeOption.isActive}
                    aria-label={
                        localeOption.isActive
                            ? localeOption.label
                            : t("switchTo", { locale: localeOption.label })
                    }
                    disabled={isPending || localeOption.isActive}
                    onClick={() => switchLocale(localeOption.value)}
                    className={`mp-focus rounded-3xl px-2.5 py-1 text-xs font-semibold tracking-[0.08em] transition-colors ${
                        localeOption.isActive
                            ? "bg-primary text-[var(--primary-contrast)]"
                            : "text-[var(--text)] hover:bg-primary/15"
                    } disabled:cursor-default disabled:opacity-100`}
                >
                    {localeOption.label}
                </button>
            ))}
        </div>
    );
}
