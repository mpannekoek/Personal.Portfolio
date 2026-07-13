export type BlogListItem = {
    slug: string;
    title: string;
    date: string;
    description: string;
    author: string;
    tags: string[];
    image?: string;
};

export type BlogPost = BlogListItem & {
    content: string;
};

export type BlogPreviewCard = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    sortDate?: string;
    href: string;
    author?: string;
    tags?: string[];
    image?: string;
    isPlaceholder?: boolean;
};

export function toBlogPreviewCards(
    blogs: BlogListItem[],
    locale: string,
): BlogPreviewCard[] {
    const formatter = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return blogs.map((blog) => {
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
        };
    });
}
