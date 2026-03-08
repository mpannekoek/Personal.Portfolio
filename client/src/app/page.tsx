import FadeIn from './components/providers/fade-in-provider';
import ContactShortcut from "./components/contact-shortcut";
import SectionHeading from "./components/section-heading";
import Image from "next/image";
import Link from "next/link";
import martijnImage from "../../public/images/about/martijn.jpg";
import {
    BotMessageSquare,
    Brain,
    BrainCircuit,
    Database,
    HandMetal,
    Puzzle,
    type LucideIcon,
} from "lucide-react";
import { FaMicrosoft } from "react-icons/fa";
import {
    SiDocker,
    SiDotnet,
    SiGit,
    SiNodedotjs,
    SiOpenai,
    SiPodman,
    SiPostgresql,
    SiPython,
    SiYaml,
} from "react-icons/si";
import type { IconType } from "react-icons";

type LatestPostPreview = {
    title: string;
    excerpt: string;
    date: string;
    href: string;
};

type SkillItem = {
    label: string;
    icon: LucideIcon | IconType;
};

type SkillGroup = {
    title: string;
    skills: SkillItem[];
};

type CurrentProject = {
    title: string;
    summary: string;
    status: string;
    timeline: string;
    progress: number;
    stack: string[];
    href: string;
    linkLabel: string;
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

const skillGroups: SkillGroup[] = [
    {
        title: "Backend & Full Stack",
        skills: [
            { label: "Full stack .NET", icon: SiDotnet },
            { label: "Node.js", icon: SiNodedotjs },
            { label: "Python", icon: SiPython },
            { label: "SQL", icon: Database },
            { label: "PostgreSQL", icon: SiPostgresql },
            { label: "YAML", icon: SiYaml },
        ],
    },
    {
        title: "Cloud & DevOps",
        skills: [
            { label: "Azure", icon: FaMicrosoft },
            { label: "Docker", icon: SiDocker },
            { label: "Podman", icon: SiPodman },
            { label: "Git", icon: SiGit },
        ],
    },
    {
        title: "AI & Agentic",
        skills: [
            { label: "AI", icon: BrainCircuit },
            { label: "OpenAI Codex", icon: SiOpenai },
            { label: "Agentic Development", icon: BotMessageSquare },
        ],
    },
    {
        title: "Professional Strengths",
        skills: [
            { label: "Critical thinking", icon: Brain },
            { label: "Problem solving", icon: Puzzle },
        ],
    },
];

const currentProject: CurrentProject = {
    title: "AI-Assisted Portfolio Evolution",
    summary: "Improving this portfolio with practical UX upgrades, stronger project storytelling, and better conversion paths from visitor to contact.",
    status: "Actively building",
    timeline: "March 2026",
    progress: 68,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide", "Vercel"],
    href: "/blog",
    linkLabel: "Follow progress",
};

export default function Page() {
    return (
        <main>
            <div className="container mx-auto px-6">
                <div className="lg:max-w-3xl">
                    <FadeIn delay="delay-100">
                        <h1 className="font-bold mb-6 text-3xl md:text-5xl">
                            Hi and welcome. Let&apos;s build something amazing together!
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="#current-project"
                                className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/85 dark:bg-secondary dark:text-black dark:hover:bg-secondary/85"
                            >
                                View current project
                            </Link>
                            <Link
                                href="#contact-shortcut"
                                className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-primary/40 hover:text-primary dark:border-white/20 dark:bg-transparent dark:text-white/85 dark:hover:border-secondary/40 dark:hover:text-secondary"
                            >
                                Contact me
                            </Link>
                        </div>
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
                        <SectionHeading
                            title="Insights"
                            eyebrow="Recent Writing"
                            variant="reactive"
                        />
                        <div className="flex flex-col md:flex-row">
                            {latestPosts.map((post, index) => (
                                <article
                                    key={post.title}
                                    className={`basis-1/3 min-h-80 rounded-xl border border-zinc-200 bg-white/80 p-6 shadow-sm ring-1 ring-white/70 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-white/12 dark:bg-zinc-950/75 dark:ring-white/8 ${index < latestPosts.length - 1 ? "mb-6 md:mb-0 md:mr-6" : "md:ml-0"}`}
                                >
                                    <p className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-white/60">
                                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-secondary/70" />
                                        {post.date}
                                    </p>
                                    <h3 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
                                        {post.title}
                                    </h3>
                                    <p className="mb-6 text-base leading-relaxed text-zinc-700 dark:text-white/75">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={post.href}
                                        className="font-semibold text-primary underline decoration-secondary/45 decoration-2 underline-offset-4 hover:text-primary/80 hover:decoration-secondary/65 dark:text-secondary dark:hover:text-secondary/80"
                                    >
                                        Read post
                                    </Link>
                                </article>
                            ))}
                        </div>
                        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent dark:via-secondary/45" />
                    </FadeIn>
                    <FadeIn delay="delay-700">
                        <article
                            id="current-project"
                            className="mt-6 rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm ring-1 ring-white/70 transition-all hover:border-zinc-300 dark:border-white/12 dark:bg-zinc-950/75 dark:ring-white/8 md:p-8 scroll-mt-24"
                        >
                            <div>
                                <div className="mb-4 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-700 dark:border-white/20 dark:text-white/80">
                                        {currentProject.status}
                                    </span>
                                    <span className="text-sm font-medium text-zinc-600 dark:text-white/65">
                                        {currentProject.timeline}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
                                    {currentProject.title}
                                </h3>
                                <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-700 dark:text-white/75">
                                    {currentProject.summary}
                                </p>
                                <div className="mt-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-700 dark:text-white/70">
                                            Progress
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center text-xs font-medium text-zinc-600 dark:text-white/65">
                                                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-zinc-500 dark:bg-white/70" />
                                                In progress
                                            </span>
                                            <p className="text-sm font-bold text-zinc-800 dark:text-white">
                                                {currentProject.progress}%
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        role="progressbar"
                                        aria-label="Current project progress"
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        aria-valuenow={currentProject.progress}
                                        className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/12"
                                    >
                                        <div
                                            className="h-full rounded-full bg-zinc-900 transition-all dark:bg-white"
                                            style={{ width: `${currentProject.progress}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {currentProject.stack.map((item) => (
                                        <span
                                            key={item}
                                            className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-white/14 dark:bg-white/5 dark:text-white/80"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={currentProject.href}
                                    className="mt-6 inline-flex items-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-white/20 dark:text-white dark:hover:bg-white/8"
                                >
                                    {currentProject.linkLabel}
                                </Link>
                            </div>
                        </article>
                    </FadeIn>
                    <FadeIn delay="delay-700">
                        <div className="mt-6">
                            <SectionHeading
                                title="Toolkit"
                                eyebrow="15 years building"
                                variant="reactive"
                            />
                        </div>
                        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <p className="text-lg leading-relaxed text-700 lg:col-span-2">
                                I have 15 years of programming experience across backend, cloud, and product development.
                                Lately, I have been focusing more on AI-driven product development and agentic workflows.
                                I enjoy solving complex problems, and I keep learning every day to stay sharp with new tools, patterns, and technologies.
                            </p>
                            <div className="relative min-h-56 overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
                                <Image
                                    src="/images/about/skills-visual.svg"
                                    alt="Abstract development skills visual"
                                    fill
                                    sizes="(min-width: 1024px) 30vw, 100vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/25" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {skillGroups.map((group) => (
                                <article
                                    key={group.title}
                                    className="rounded-xl border border-zinc-200 bg-white/80 p-6 shadow-sm ring-1 ring-white/70 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-white/12 dark:bg-zinc-950/75 dark:ring-white/8"
                                >
                                    <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
                                        {group.title}
                                    </h3>
                                    <ul className="flex flex-wrap gap-3">
                                        {group.skills.map((skill) => {
                                            const Icon = skill.icon;

                                            return (
                                                <li
                                                    key={skill.label}
                                                    className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 dark:border-white/14 dark:bg-white/5 dark:text-white/80"
                                                >
                                                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:bg-secondary/15">
                                                        <Icon className="h-3.5 w-3.5" />
                                                    </span>
                                                    {skill.label}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </FadeIn>
                    <FadeIn delay="delay-700">
                        <div id="contact-shortcut" className="mt-6 scroll-mt-24">
                            <SectionHeading
                                title="Let's Connect"
                                eyebrow="Open for collaborations"
                                variant="reactive"
                            />
                        </div>
                        <ContactShortcut />
                    </FadeIn>
                </div>
            </div>
        </main >
    );
};
