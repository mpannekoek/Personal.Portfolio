import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import type { AppLocale } from "../../../i18n/routing";
import { createPageMetadata } from "../../../lib/site";

type BlogLayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<BlogLayoutProps, "children">) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });

    return createPageMetadata({
        locale: locale as AppLocale,
        path: "/blog",
        title: t("blogTitle"),
        description: t("blogDescription"),
    });
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    return children;
}
