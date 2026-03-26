import Image from "next/image";
import { Link } from "../../i18n/navigation";
import type { BlogPreviewCard } from "../../lib/blog-client";

type BlogListItemProps = {
    post: BlogPreviewCard;
    className?: string;
    linkLabel?: string;
    placeholderMetaLabel?: string;
    titleTag?: "h2" | "h3";
};

const rootClassName =
    "block rounded-[1.5rem] p-3 transition-all duration-200";

const interactiveClassName =
    "group mp-focus hover:bg-[var(--surface)]/78 hover:shadow-[0_16px_40px_-30px_rgba(15,23,42,0.32)]";

export default function BlogListItem({
    post,
    className = "",
    linkLabel,
    placeholderMetaLabel,
    titleTag = "h3",
}: BlogListItemProps) {
    const TitleTag = titleTag;
    const metaText = post.isPlaceholder ? placeholderMetaLabel : post.date;
    const tileContent = post.image ? (
        <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 112px, 96px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        />
    ) : (
        <div className="h-full w-full bg-[linear-gradient(145deg,rgba(248,250,252,0.95),rgba(226,232,240,0.92))]" />
    );
    const content = (
        <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-elevated)] md:h-28 md:w-28">
                {tileContent}
            </div>

            <div className="min-w-0 pt-1">
                <TitleTag className="text-xl font-semibold leading-tight tracking-[-0.02em] text-[var(--text)] transition-colors group-hover:text-primary md:text-[1.7rem]">
                    {post.title}
                </TitleTag>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">
                    {post.excerpt}
                </p>
                {metaText ? (
                    <p className="mt-3 text-sm text-[var(--text-soft)]">
                        {metaText}
                    </p>
                ) : null}
            </div>
        </div>
    );

    if (post.isPlaceholder || !post.href) {
        return (
            <article className={`${rootClassName} ${className}`.trim()}>
                {content}
            </article>
        );
    }

    return (
        <Link
            href={post.href}
            aria-label={linkLabel ? `${linkLabel}: ${post.title}` : post.title}
            className={`${rootClassName} ${interactiveClassName} ${className}`.trim()}
        >
            {content}
        </Link>
    );
}
