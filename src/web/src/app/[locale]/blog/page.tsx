"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Grid3X3, List, ArrowUpDown } from "lucide-react";
import BlogListItem from "../../components/blog-list-item";
import { getAllBlogPreviews, type BlogPreviewCard } from "../../../lib/blog-client";

type SortOption = "date-desc" | "date-asc" | "title-asc";
type ViewMode = "metro" | "text";

export default function BlogPage() {
    const t = useTranslations("blogPage");
    const locale = useLocale();
    const [posts, setPosts] = useState<BlogPreviewCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("date-desc");
    const [viewMode, setViewMode] = useState<ViewMode>("metro");

    useEffect(() => {
        let isCancelled = false;

        async function loadPosts() {
            setIsLoading(true);
            const loadedPosts = await getAllBlogPreviews(locale);

            if (!isCancelled) {
                setPosts(loadedPosts);
                setIsLoading(false);
            }
        }

        void loadPosts();

        return () => {
            isCancelled = true;
        };
    }, [locale]);

    const availableTags = useMemo(() => {
        const tags = new Set<string>();

        posts.forEach((post) => {
            post.tags?.forEach((tag) => tags.add(tag));
        });

        return Array.from(tags).sort((left, right) => left.localeCompare(right));
    }, [posts]);

    const visiblePosts = useMemo(() => {
        const filtered = selectedTag
            ? posts.filter((post) => post.tags?.includes(selectedTag))
            : posts;

        return [...filtered].sort((left, right) => {
            if (sortBy === "title-asc") {
                return left.title.localeCompare(right.title);
            }

            const leftTimestamp = Date.parse(left.date);
            const rightTimestamp = Date.parse(right.date);

            if (Number.isNaN(leftTimestamp) || Number.isNaN(rightTimestamp)) {
                return left.title.localeCompare(right.title);
            }

            if (sortBy === "date-asc") {
                return leftTimestamp - rightTimestamp;
            }

            return rightTimestamp - leftTimestamp;
        });
    }, [posts, selectedTag, sortBy]);

    return (
        <main className="container mx-auto px-6 pb-10">
            <h1 className="text-4xl font-bold text-[var(--text)] md:text-5xl">
                {t("title")}
            </h1>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
                    <button
                        type="button"
                        onClick={() => setSelectedTag(null)}
                        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                            selectedTag === null
                                ? "bg-primary text-[var(--primary-contrast)]"
                                : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
                        }`}
                    >
                        {t("filters.all")}
                    </button>
                    {availableTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag(tag)}
                            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                                selectedTag === tag
                                    ? "bg-primary text-[var(--primary-contrast)]"
                                    : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 self-start lg:self-auto">
                    <label
                        htmlFor="blog-sort"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]"
                    >
                        <ArrowUpDown className="h-4 w-4" />
                        {t("sort.label")}
                    </label>
                    <select
                        id="blog-sort"
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value as SortOption)}
                        className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm text-[var(--text)]"
                    >
                        <option value="date-desc">{t("sort.newest")}</option>
                        <option value="date-asc">{t("sort.oldest")}</option>
                        <option value="title-asc">{t("sort.title")}</option>
                    </select>

                    <div className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] p-1">
                        <button
                            type="button"
                            aria-label={t("view.metro")}
                            onClick={() => setViewMode("metro")}
                            className={`rounded-md p-2 transition-colors ${
                                viewMode === "metro"
                                    ? "bg-primary text-[var(--primary-contrast)]"
                                    : "text-[var(--text-muted)]"
                            }`}
                        >
                            <Grid3X3 className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label={t("view.text")}
                            onClick={() => setViewMode("text")}
                            className={`rounded-md p-2 transition-colors ${
                                viewMode === "text"
                                    ? "bg-primary text-[var(--primary-contrast)]"
                                    : "text-[var(--text-muted)]"
                            }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <p className="mt-8 text-sm text-[var(--text-soft)]">{t("loading")}</p>
            ) : null}

            {!isLoading && visiblePosts.length === 0 ? (
                <p className="mt-8 text-sm text-[var(--text-soft)]">{t("empty")}</p>
            ) : null}

            {!isLoading && visiblePosts.length > 0 && viewMode === "metro" ? (
                <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 xl:grid-cols-2">
                    {visiblePosts.map((post) => (
                        <BlogListItem
                            key={post.id}
                            post={post}
                            titleTag="h2"
                        />
                    ))}
                </div>
            ) : null}

            {!isLoading && visiblePosts.length > 0 && viewMode === "text" ? (
                <div className="mt-8 space-y-2">
                    {visiblePosts.map((post) => (
                        <BlogListItem
                            key={post.id}
                            post={post}
                            titleTag="h2"
                        />
                    ))}
                </div>
            ) : null}
        </main>
    );
}
