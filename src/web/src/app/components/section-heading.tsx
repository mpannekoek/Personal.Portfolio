type SectionHeadingProps = {
    title: string;
    eyebrow?: string;
};

export default function SectionHeading({ title, eyebrow }: SectionHeadingProps) {
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
