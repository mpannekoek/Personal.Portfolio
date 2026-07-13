import "server-only";

import {
    toBlogPreviewCards,
    type BlogListItem,
    type BlogPost,
    type BlogPreviewCard,
} from "./blog";

const API_ORIGIN = process.env.API_ORIGIN ?? "http://127.0.0.1:3001";
const REVALIDATE_SECONDS = 60;

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

async function fetchBlogList(): Promise<BlogListItem[]> {
    const response = await fetch(`${API_ORIGIN}/api/blogs`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
        throw new Error(`Failed to load blog previews (${response.status})`);
    }

    return (await response.json()) as BlogListItem[];
}

export async function getAllBlogPreviews(locale: string): Promise<BlogPreviewCard[]> {
    try {
        return toBlogPreviewCards(await fetchBlogList(), locale);
    } catch {
        return [];
    }
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
    const posts = (await getAllBlogPreviews(locale)).slice(0, limit);

    return [
        ...posts,
        ...buildPlaceholderPosts({
            count: Math.max(limit - posts.length, 0),
            placeholder,
            startIndex: posts.length,
        }),
    ];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await fetch(`${API_ORIGIN}/api/blogs/${slug}`, {
        next: { revalidate: REVALIDATE_SECONDS },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to load blog post "${slug}"`);
    }

    return (await response.json()) as BlogPost;
}
