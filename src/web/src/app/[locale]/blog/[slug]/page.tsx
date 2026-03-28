import Image from "next/image";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import type { BlogPost } from "../../../../lib/blog-client";
import { extractLevelTwoHeadings, slugifyHeading } from "../../../../lib/markdown";
import BlogCodeBlock from "./blog-code-block";
import BlogPostActions from "./blog-post-actions";
import BlogPostToc from "./blog-post-toc";

const API_ORIGIN = process.env.API_ORIGIN ?? "http://127.0.0.1:3001";

type BlogDetailPageProps = {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
};

function flattenText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map((child) => flattenText(child)).join("");
    }

    if (node && typeof node === "object" && "props" in node) {
        return flattenText((node as { props: { children?: ReactNode } }).props.children);
    }

    return "";
}

async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
    const response = await fetch(`${API_ORIGIN}/api/blogs/${slug}`, {
        next: { revalidate: 60 },
    });

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error(`Failed to load blog post "${slug}"`);
    }

    return (await response.json()) as BlogPost;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
    const { slug } = await params;
    const post = await fetchBlogPost(slug);

    if (!post) {
        return {};
    }

    return {
        title: `${post.title} | Blog`,
        description: post.description,
    };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { locale, slug } = await params;
    const post = await fetchBlogPost(slug);
    const t = await getTranslations({ locale, namespace: "blogDetailPage" });

    if (!post) {
        notFound();
    }

    const formattedDate = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(post.date));
    const tocItems = extractLevelTwoHeadings(post.content);

    const markdownComponents: Components = {
        h1: ({ children }) => (
            <h1 className="mt-12 text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                {children}
            </h1>
        ),
        h2: ({ node, children }) => {
            const fallbackText = flattenText(children);
            const tocItem = tocItems.find((item) => item.offset === node?.position?.start.offset);
            const fallbackId = slugifyHeading(fallbackText) || "section";
            const id = tocItem?.id ?? fallbackId;

            return (
                <h2
                    id={id}
                    className="mt-12 scroll-mt-24 border-t border-[var(--border)] pt-8 text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl"
                >
                    {children}
                </h2>
            );
        },
        h3: ({ children }) => (
            <h3 className="mt-10 text-xl font-semibold tracking-tight text-[var(--text)] md:text-2xl">
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p className="mt-6 text-base leading-8 text-[var(--text-muted)] md:text-lg">{children}</p>
        ),
        ul: ({ children }) => (
            <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-[var(--text-muted)] md:text-lg">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-8 text-[var(--text-muted)] md:text-lg">
                {children}
            </ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => (
            <blockquote className="mt-8 border-l-2 border-primary/70 pl-5 text-lg italic text-[var(--text)]">
                {children}
            </blockquote>
        ),
        a: ({ children, href }) => (
            <a
                href={href}
                className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-[var(--text)]"
            >
                {children}
            </a>
        ),
        pre: ({ children }) => (
            <BlogCodeBlock
                code={flattenText(children).replace(/\n$/, "")}
                copyLabel={t("copyCode")}
                copiedLabel={t("copiedCode")}
            >
                {children}
            </BlogCodeBlock>
        ),
        code: ({ children, className }) => {
            const codeContent = flattenText(children);
            const isBlock = Boolean(className) || codeContent.includes("\n");

            if (isBlock) {
                return <code className={className}>{children}</code>;
            }

            return (
                <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-[0.95em] text-[var(--text)]">
                    {children}
                </code>
            );
        },
        hr: () => <hr className="mt-10 border-[var(--border)]" />,
    };

    return (
        <main className="mx-auto max-w-7xl px-6 pb-20 pt-0">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start">
                <article className="overflow-hidden rounded-[2rem]">
                    <div className="px-6 pb-10 pt-0 md:px-10 md:pb-14 md:pt-1">
                        <div className="mx-auto max-w-3xl">
                            <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-soft)]">
                                <span>{formattedDate}</span>
                            </div>

                            <h1 className="mt-5 text-center text-4xl font-semibold tracking-tight text-[var(--text)] md:text-6xl">
                                {post.title}
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-[var(--text-muted)] md:text-xl">
                                {post.description}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--text-soft)]">
                                <span>{t("authorLabel", { author: post.author })}</span>
                                {post.tags.length > 0 ? (
                                    <>
                                        <span className="h-1 w-1 rounded-full bg-[var(--text-soft)]" />
                                        <span>{post.tags.join(" · ")}</span>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {post.image ? (
                        <div className="px-4 pt-4 md:px-8 md:pt-8">
                            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={1600}
                                    height={900}
                                    className="h-auto w-full object-cover object-center"
                                    priority
                                />
                            </div>
                        </div>
                    ) : null}

                    <div className="px-6 pb-10 pt-8 md:px-10 md:pb-14">
                        <div className="mx-auto max-w-3xl">
                            <div className="mb-8 xl:hidden">
                                <BlogPostToc items={tocItems} title={t("toc")} />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-soft)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-8">
                                <ReactMarkdown components={markdownComponents}>
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="xl:sticky xl:top-24 xl:self-start">
                    <div className="xl:flex xl:h-[calc(100vh-8rem)] xl:flex-col">
                        <div className="hidden xl:block">
                            <BlogPostToc items={tocItems} title={t("toc")} />
                        </div>
                        <div className="mt-4 xl:mt-auto">
                            <BlogPostActions
                                title={post.title}
                                markdown={post.content}
                                shareLabel={t("share")}
                                sharedLabel={t("shared")}
                                copyLabel={t("copy")}
                                copiedLabel={t("copied")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
