import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["nl", "en"],
    defaultLocale: "nl",
    localePrefix: "as-needed",
    pathnames: {
        "/collaborate": {
            nl: "/samenwerken",
            en: "/collaborate",
        },
    },
});

export type AppLocale = (typeof routing.locales)[number];
