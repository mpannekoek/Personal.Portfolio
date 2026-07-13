import { getTranslations } from "next-intl/server";
import { getAllBlogPreviews } from "../../../lib/blog-server";
import BlogExplorer, { type BlogExplorerLabels } from "./blog-explorer";

type BlogPageProps = {
    params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
    const { locale } = await params;
    const [t, posts] = await Promise.all([
        getTranslations({ locale, namespace: "blogPage" }),
        getAllBlogPreviews(locale),
    ]);
    const labels: BlogExplorerLabels = {
        empty: t("empty"),
        searchLabel: t("search.label"),
        searchPlaceholder: t("search.placeholder"),
        allFilter: t("filters.all"),
        sortLabel: t("sort.label"),
        newestSort: t("sort.newest"),
        oldestSort: t("sort.oldest"),
        titleSort: t("sort.title"),
        metroView: t("view.metro"),
        textView: t("view.text"),
    };

    return (
        <main className="pb-10">
            <div className="container mx-auto px-6">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <div className="pt-4 md:pt-6">
                        <h1 className="mb-8 text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--text)] md:text-5xl">
                            {t("title")}
                        </h1>
                    </div>
                </div>
                <BlogExplorer posts={posts} labels={labels} />
            </div>
        </main>
    );
}
