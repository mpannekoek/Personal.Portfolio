type HeadingVariant = "editorial" | "minimal" | "reactive";

type SectionHeadingProps = {
    title: string;
    eyebrow?: string;
    meta?: string;
    variant: HeadingVariant;
};

export default function SectionHeading({ title, eyebrow, meta, variant }: SectionHeadingProps) {
    if (variant === "editorial") {
        return (
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-soft)]">
                    {eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-semibold leading-[0.98] tracking-[-0.035em] text-[var(--text)] md:text-5xl">
                    {title}
                </h2>
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <div className="mb-6">
                <div className="flex items-end justify-between gap-4">
                    <h2 className="font-mono text-[1.85rem] font-semibold leading-none tracking-[-0.035em] text-[var(--text)] md:text-[3.1rem]">
                        {`<${title} />`}
                    </h2>
                    {meta ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-soft)]">
                            {meta}
                        </p>
                    ) : null}
                </div>
                <div className="mt-3 h-px overflow-hidden bg-[var(--border)]">
                    <span className="block h-full bg-gradient-to-r from-primary/60 via-accent/60 to-highlight/55" />
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6">
            {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-soft)]">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary md:text-4xl">
                {title}
            </h2>
        </div>
    );
}
