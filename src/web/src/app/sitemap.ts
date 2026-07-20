import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";

const API_ORIGIN = process.env.API_ORIGIN ?? "http://127.0.0.1:3001";
const STATIC_PATHS = [
    { nl: "", en: "" },
    { nl: "/blog", en: "/blog" },
    { nl: "/samenwerken", en: "/collaborate" },
] as const;

type PublishedBlog = {
    slug: string;
    date: string;
};

export const dynamic = "force-dynamic";

function localizedEntry(
    path: { nl: string; en: string },
    lastModified?: Date,
): MetadataRoute.Sitemap[number] {
    const dutchUrl = `${SITE_URL}${path.nl || "/"}`;
    const englishUrl = `${SITE_URL}/en${path.en}`;

    return {
        url: dutchUrl,
        ...(lastModified ? { lastModified } : {}),
        alternates: {
            languages: {
                nl: dutchUrl,
                en: englishUrl,
                "x-default": dutchUrl,
            },
        },
    };
}

async function getPublishedBlogs(): Promise<PublishedBlog[]> {
    const response = await fetch(`${API_ORIGIN}/api/blogs`, {
        cache: "no-store",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to load published blogs for the sitemap (${response.status})`);
    }

    return (await response.json()) as PublishedBlog[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await getPublishedBlogs();
    const staticEntries = STATIC_PATHS.flatMap((path) => {
        const entry = localizedEntry(path);

        return [
            entry,
            {
                ...entry,
                url: entry.alternates?.languages?.en ?? `${SITE_URL}/en${path.en}`,
            },
        ];
    });
    const blogEntries = blogs.flatMap((blog) => {
        const path = `/blog/${blog.slug}`;
        const parsedDate = new Date(blog.date);
        const entry = localizedEntry(
            { nl: path, en: path },
            Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate,
        );

        return [
            entry,
            {
                ...entry,
                url: entry.alternates?.languages?.en ?? `${SITE_URL}/en${path}`,
            },
        ];
    });

    return [...staticEntries, ...blogEntries];
}
