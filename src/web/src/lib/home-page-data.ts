import "server-only";

import type { BlogPreviewCard } from "./blog-client";

const API_ORIGIN = process.env.API_ORIGIN ?? "http://127.0.0.1:3001";
const REVALIDATE_SECONDS = 60;

type BlogListItem = {
    slug: string;
    title: string;
    date: string;
    description: string;
    author: string;
    tags: string[];
    image?: string;
};

type PlaceholderCopy = {
    title: string;
    excerpt: string;
};

function buildPlaceholderPosts({
    count,
    placeholder,
    startIndex = 0,
}: {
    count: number;
    placeholder: PlaceholderCopy;
    startIndex?: number;
}): BlogPreviewCard[] {
    return Array.from({ length: count }, (_, index) => ({
        id: `placeholder-${startIndex + index}`,
        title: placeholder.title,
        excerpt: placeholder.excerpt,
        date: "",
        href: "",
        isPlaceholder: true,
    }));
}

export async function getLatestBlogPreviewsForHome({
    limit,
    locale,
    placeholder,
}: {
    limit: number;
    locale: string;
    placeholder: PlaceholderCopy;
}): Promise<BlogPreviewCard[]> {
    try {
        const response = await fetch(`${API_ORIGIN}/api/blogs`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!response.ok) {
            throw new Error(`Failed to load blog previews (${response.status})`);
        }

        const blogs = (await response.json()) as BlogListItem[];
        const formatter = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const posts = blogs.slice(0, limit).map((blog) => {
            const parsedDate = new Date(blog.date);

            return {
                id: blog.slug,
                title: blog.title,
                excerpt: blog.description,
                date: Number.isNaN(parsedDate.getTime())
                    ? blog.date
                    : formatter.format(parsedDate),
                sortDate: blog.date,
                href: `/blog/${blog.slug}`,
                author: blog.author,
                tags: blog.tags,
                image: blog.image,
            } satisfies BlogPreviewCard;
        });

        return [
            ...posts,
            ...buildPlaceholderPosts({
                count: Math.max(limit - posts.length, 0),
                placeholder,
                startIndex: posts.length,
            }),
        ];
    } catch {
        return buildPlaceholderPosts({ count: limit, placeholder });
    }
}
