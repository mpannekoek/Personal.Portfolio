import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://martijnpannekoek.nl";

export const SITE_URL = (process.env.SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, "");

type SiteLocale = "nl" | "en";

type PageMetadataOptions = {
    locale: SiteLocale;
    path: string;
    title: string;
    description: string;
    article?: {
        publishedTime: string;
        authors: string[];
        tags: string[];
    };
};

export function getLocalizedUrl(locale: SiteLocale, path: string): string {
    const normalizedPath = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
    const localePrefix = locale === "en" ? "/en" : "";
    const trailingSlash = locale === "nl" && !normalizedPath ? "/" : "";

    return `${SITE_URL}${localePrefix}${normalizedPath}${trailingSlash}`;
}

export function createPageMetadata({
    locale,
    path,
    title,
    description,
    article,
}: PageMetadataOptions): Metadata {
    const canonical = getLocalizedUrl(locale, path);
    const dutchUrl = getLocalizedUrl("nl", path);
    const englishUrl = getLocalizedUrl("en", path);
    const sharedOpenGraph = {
        title,
        description,
        url: canonical,
        siteName: "Martijn Pannekoek",
        locale: locale === "nl" ? "nl_NL" : "en_US",
        alternateLocale: [locale === "nl" ? "en_US" : "nl_NL"],
    };

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        alternates: {
            canonical,
            languages: {
                nl: dutchUrl,
                en: englishUrl,
                "x-default": dutchUrl,
            },
        },
        openGraph: article
            ? {
                ...sharedOpenGraph,
                type: "article",
                publishedTime: article.publishedTime,
                authors: article.authors,
                tags: article.tags,
            }
            : {
                ...sharedOpenGraph,
                type: "website",
            },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}
