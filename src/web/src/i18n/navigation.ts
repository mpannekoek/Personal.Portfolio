import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const navigationRouting = {
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    localePrefix: routing.localePrefix,
};

export const { Link, usePathname } = createNavigation(navigationRouting);
