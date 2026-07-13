import "../globals.css";
import NavBar from "../components/nav";
import Footer from "../components/footer";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { routing, type AppLocale } from "../../i18n/routing";
import { createPageMetadata } from "../../lib/site";
import ThemeProvider from "../../theme/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
    display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-ibm-plex-mono",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

type LocaleLayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LocaleLayoutProps, "children">) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: "metadata" });

    return createPageMetadata({
        locale: locale as AppLocale,
        path: "/",
        title: t("title"),
        description: t("description"),
    });
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${plusJakartaSans.variable} ${ibmPlexMono.variable} bg-[var(--bg)] text-[var(--text)] antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <NavBar />
                        <div className="pt-6">
                            {children}
                        </div>
                        <div className="pt-0 md:pt-6">
                            <Footer />
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
