"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname as useCurrentPathname } from "next/navigation";
import { routing } from "../i18n/routing";

function getInternalPathname(pathname: string) {
    const localePattern = routing.locales.join("|");
    const normalizedPathname = pathname.replace(
        new RegExp(`^/(${localePattern})(?=/|$)`),
        "",
    );

    return normalizedPathname || "/";
}

function getLocalizedPathname(pathname: string, nextLocale: string) {
    const internalPathname = getInternalPathname(pathname);

    if (internalPathname === "/samenwerken" || internalPathname === "/collaborate") {
        return nextLocale === "nl" ? "/nl/samenwerken" : "/en/collaborate";
    }

    return `/${nextLocale}${internalPathname === "/" ? "" : internalPathname}`;
}

export default function LanguageToggle() {
    const t = useTranslations("languageToggle");
    const locale = useLocale();
    const pathname = useCurrentPathname();
    const localeOptions = routing.locales.map((localeOption) => ({
        value: localeOption,
        label: localeOption.toUpperCase(),
        isActive: localeOption === locale,
    }));

    const switchLocale = (nextLocale: string) => {
        if (nextLocale === locale) {
            return;
        }

        const localizedPathname = getLocalizedPathname(pathname, nextLocale);
        const queryString = window.location.search;
        const hash = window.location.hash;

        window.location.assign(`${localizedPathname}${queryString}${hash}`);
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
                    disabled={localeOption.isActive}
                    onClick={() => switchLocale(localeOption.value)}
                    className={`mp-focus cursor-pointer rounded-3xl px-2.5 py-1 text-xs font-semibold tracking-[0.08em] transition-colors ${
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
