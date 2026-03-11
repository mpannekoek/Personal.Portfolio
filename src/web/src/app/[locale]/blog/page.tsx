import { getTranslations } from "next-intl/server";

export default async function BlogPage() {
    const t = await getTranslations("blogPage");

    return (
        <main className="container mx-auto px-6 py-12">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 shadow-sm ring-1 ring-[var(--ring)]">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--text-soft)]">
                    {t("eyebrow")}
                </p>
                <h1 className="mt-3 text-3xl font-bold text-[var(--text)] md:text-4xl">
                    {t("title")}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-[var(--text-muted)]">
                    {t("description")}
                </p>
            </section>
        </main>
    );
}
