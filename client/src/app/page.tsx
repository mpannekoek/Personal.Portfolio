import FadeIn from './components/providers/fade-in-provider';
import Image from "next/image";
import Link from "next/link";
import martijnImage from "../../public/images/about/martijn.jpg";
import { HandMetal, Minus } from "lucide-react";

type LatestPostPreview = {
    title: string;
    excerpt: string;
    date: string;
    href: string;
};

const latestPosts: LatestPostPreview[] = [
    {
        title: "Designing Reliable Event-Driven Systems",
        excerpt: "A pragmatic walkthrough of building resilient event pipelines without overcomplicating your architecture.",
        date: "March 1, 2026",
        href: "/blog",
    },
    {
        title: "Choosing the Right Boundaries in a Modular Monolith",
        excerpt: "How to define module boundaries that stay maintainable as teams and product complexity grow.",
        date: "February 16, 2026",
        href: "/blog",
    },
    {
        title: "From Prototype to Production: A Backend Checklist",
        excerpt: "The essential technical checks I use to turn proof-of-concepts into dependable production services.",
        date: "February 2, 2026",
        href: "/blog",
    },
];

export default function Page() {
    return (
        <main>
            <div className="container mx-auto px-6">
                <div className="lg:max-w-3xl">
                    <FadeIn delay="delay-100">
                        <h1 className="font-bold mb-6 text-3xl md:text-5xl">
                            Hi and welcome. Let&apos;s build something amazing together!
                        </h1>
                    </FadeIn>
                </div>
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="md:basis-64 mx-6">
                        <FadeIn delay="delay-300">
                            <Image
                                src={martijnImage}
                                alt="Picture of Martijn"
                                className="rounded-full border-10 border-primary" />
                        </FadeIn>
                    </div>
                    <div className="md:basis-128 mt-6">
                        <FadeIn delay="delay-500">
                            <div className="flex">
                                <span className="font-mono">
                                    Hi there
                                </span>
                                <span className="ml-2 text-primary">
                                    <HandMetal />
                                </span>
                            </div>
                            <h2 className="font-bold text-primary mb-6 text-2xl md:text-4xl">
                                Who am I?
                            </h2>
                            <p className="text-xl">
                                I&apos;m Martijn, a software architect with a passion for building scalable and efficient systems.
                                I have experience in various programming languages and frameworks, and I enjoy exploring new technologies.
                                Feel free to check out my <Link href="/blog"><b>blog</b></Link> for insights on software development, architecture, and more!
                            </p>
                        </FadeIn>
                    </div>
                </div>
                <div className="min-h-160 mt-6">
                    <FadeIn delay="delay-700">
                        <div className="flex">
                            <div className="text-primary h-min my-auto">
                                <Minus />
                            </div>
                            <div>
                                <h2 className="font-bold mb-6 text-2xl md:text-4xl">
                                    <span className="text-primary">L</span>atest posts
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            {latestPosts.map((post, index) => (
                                <article
                                    key={post.title}
                                    className={`basis-1/3 min-h-80 rounded-xl border border-zinc-200 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md ${index < latestPosts.length - 1 ? "mb-6 md:mb-0 md:mr-6" : "md:ml-0"}`}
                                >
                                    <p className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-wide text-zinc-500">
                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-secondary/70" />
                                        {post.date}
                                    </p>
                                    <h3 className="mb-4 text-xl font-bold text-zinc-900">
                                        {post.title}
                                    </h3>
                                    <p className="mb-6 text-base leading-relaxed text-zinc-700">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={post.href}
                                        className="font-semibold text-primary underline decoration-secondary/45 decoration-2 underline-offset-4 hover:text-primary/80 hover:decoration-secondary/65"
                                    >
                                        Read post
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </FadeIn>
                    <FadeIn delay="delay-700">
                        <div className="flex mt-6">
                            <div className="text-primary h-min my-auto">
                                <Minus />
                            </div>
                            <div>
                                <h2 className="font-bold mb-6 text-2xl md:text-4xl">
                                    <span className="text-primary">S</span>kills
                                </h2>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main >
    );
};
