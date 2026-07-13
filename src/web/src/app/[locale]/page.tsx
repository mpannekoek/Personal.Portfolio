import { getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "../../i18n/routing";
import { getLocalizedUrl, SITE_URL } from "../../lib/site";
import StructuredData from "../components/structured-data";
import HomePage from "./home-page";

type HomePageRouteProps = {
    params: Promise<{ locale: string }>;
};

export default async function HomePageRoute({ params }: HomePageRouteProps) {
    const { locale } = await params;
    const siteLocale = locale as AppLocale;
    const t = await getTranslations({ locale, namespace: "metadata" });
    const url = getLocalizedUrl(siteLocale, "/");
    const personUrl = getLocalizedUrl("nl", "/");
    const personId = `${SITE_URL}/#person`;
    const websiteId = `${SITE_URL}/#website`;
    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: "Martijn Pannekoek",
        alternateName: "martijnpannekoek.nl",
        inLanguage: routing.locales,
        publisher: {
            "@id": personId,
        },
    };
    const profilePage = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${url}#profile-page`,
        url,
        name: t("title"),
        description: t("description"),
        inLanguage: siteLocale,
        isPartOf: {
            "@id": websiteId,
        },
        mainEntity: {
            "@type": "Person",
            "@id": personId,
            name: "Martijn Pannekoek",
            url: personUrl,
            image: `${SITE_URL}/me.jpg`,
            jobTitle: "Software Architect",
            description: t("description"),
            sameAs: [
                "https://github.com/mpannekoek",
                "https://linkedin.com/in/martijnpannekoek",
            ],
            knowsAbout: [
                "Software architecture",
                ".NET",
                "Cloud architecture",
                "Artificial intelligence",
                "Agentic workflows",
                "Databases",
            ],
        },
    };

    return (
        <>
            {siteLocale === routing.defaultLocale ? (
                <StructuredData id="website-jsonld" data={website} />
            ) : null}
            <StructuredData id="profile-page-jsonld" data={profilePage} />
            <HomePage locale={siteLocale} />
        </>
    );
}
