export type TocItem = {
    id: string;
    title: string;
    offset: number;
};

function stripInlineMarkdown(text: string): string {
    return text
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[`*_~]/g, "")
        .replace(/<[^>]+>/g, "")
        .trim();
}

export function slugifyHeading(text: string): string {
    return text
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");
}

export function extractLevelTwoHeadings(markdown: string): TocItem[] {
    const headings: TocItem[] = [];
    const seenIds = new Map<string, number>();
    let inCodeBlock = false;
    let offset = 0;

    for (const line of markdown.split("\n")) {
        if (/^(```|~~~)/.test(line.trim())) {
            inCodeBlock = !inCodeBlock;
        } else if (!inCodeBlock) {
            const match = line.match(/^##\s+(.+)$/);

            if (match) {
                const title = stripInlineMarkdown(match[1]);
                const baseId = slugifyHeading(title) || "section";
                const currentCount = seenIds.get(baseId) ?? 0;
                seenIds.set(baseId, currentCount + 1);

                headings.push({
                    id: currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`,
                    title,
                    offset,
                });
            }
        }

        offset += line.length + 1;
    }

    return headings;
}
