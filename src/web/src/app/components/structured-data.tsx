type StructuredDataProps = {
    id: string;
    data: Record<string, unknown>;
};

export default function StructuredData({ id, data }: StructuredDataProps) {
    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
