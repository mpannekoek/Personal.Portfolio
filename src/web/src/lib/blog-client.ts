import { getJson } from "./api-client";

type BlogListItem = {
    slug: string;
    title: string;
    date: string;
    description: string;
    author: string;
    tags: string[];
    image?: string;
};

export type BlogPreviewCard = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    href: string;
    author?: string;
    tags?: string[];
    image?: string;
    isPlaceholder?: boolean;
};

type PlaceholderCopy = {
    title: string;
    excerpt: string;
};

function buildPlaceholderPosts({
    count,
    title,
    excerpt,
    startIndex = 0,
}: {
    count: number;
    title: string;
    excerpt: string;
    startIndex?: number;
}): BlogPreviewCard[] {
    return Array.from({ length: count }, (_, index) => ({
        id: `placeholder-${startIndex + index}`,
        title,
        excerpt,
        date: "",
        href: "",
        isPlaceholder: true,
    }));
}

export async function getLatestBlogPreviews({
    limit,
    locale,
    placeholder,
}: {
    limit: number;
    locale: string;
    placeholder: PlaceholderCopy;
}): Promise<BlogPreviewCard[]> {
    const fallbackPosts = buildPlaceholderPosts({
        count: limit,
        title: placeholder.title,
        excerpt: placeholder.excerpt,
    });

    try {
        const blogs = await getJson<BlogListItem[]>("/api/blogs");
        const formatter = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const mappedPosts = blogs.slice(0, limit).map((blog) => {
            const parsedDate = new Date(blog.date);

            return {
                id: blog.slug,
                title: blog.title,
                excerpt: blog.description,
                date: Number.isNaN(parsedDate.getTime())
                    ? blog.date
                    : formatter.format(parsedDate),
                href: "/blog",
                author: blog.author,
                tags: blog.tags,
                image: blog.image,
            };
        });

        const placeholders = buildPlaceholderPosts({
            count: Math.max(limit - mappedPosts.length, 0),
            title: placeholder.title,
            excerpt: placeholder.excerpt,
            startIndex: mappedPosts.length,
        });

        return [...mappedPosts, ...placeholders];
    } catch {
        return fallbackPosts;
    }
}
