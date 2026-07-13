const DEFAULT_SITE_URL = "https://martijnpannekoek.nl";

export const SITE_URL = (process.env.SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, "");
