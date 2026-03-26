"use client";

import { useEffect, useState, type FocusEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import FadeIn from "../components/providers/fade-in-provider";
import BlogListItem from "../components/blog-list-item";
import ContactShortcut from "../components/contact-shortcut";
import SectionHeading from "../components/section-heading";
import Image from "next/image";
import martijnImage from "../../assets/about/martijn.jpg";
import {
    BotMessageSquare,
    BookOpen,
    Brain,
    BrainCircuit,
    Database,
    FolderKanban,
    HandMetal,
    Puzzle,
    X,
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
import { Link } from "../../i18n/navigation";
import { getLatestBlogPreviews, type BlogPreviewCard } from "../../lib/blog-client";

const INSIGHTS_POST_LIMIT = 3;

type SkillItem = {
    label: string;
    icon: LucideIcon | IconType;
};

type SkillGroup = {
    title: string;
    skills: SkillItem[];
};

type TranslatedSkillGroup = {
    title: string;
    skills: string[];
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
    progressLabel: string;
    inProgress: string;
    progressAria: string;
    widgetLabel: string;
    currentBuild: string;
    openPanel: string;
    closePanel: string;
    closeWidget: string;
};

const skillGroupIcons: Array<Array<LucideIcon | IconType>> = [
    [SiDotnet, SiNodedotjs, SiPython, Database, SiPostgresql, SiYaml],
    [FaMicrosoft, SiDocker, SiPodman, SiGit],
    [BrainCircuit, SiOpenai, BotMessageSquare],
    [Brain, Puzzle, BookOpen],
];

function buildSkillGroups(groups: TranslatedSkillGroup[]): SkillGroup[] {
    return groups.map((group, groupIndex) => ({
        title: group.title,
        skills: group.skills.map((label, skillIndex) => ({
            label,
            icon: skillGroupIcons[groupIndex][skillIndex],
        })),
    }));
}

function ProjectProgressContent({
    compact = false,
    currentProject,
}: {
    compact?: boolean;
    currentProject: CurrentProject;
}) {
    return (
        <>
            <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-highlight/35 bg-highlight/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-highlight">
                    {currentProject.status}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--text-soft)]">
                    {currentProject.timeline}
                </span>
            </div>
            <h3 className={`font-bold text-[var(--text)] ${compact ? "mt-4 text-xl" : "mt-5 text-2xl"}`}>
                {currentProject.title}
            </h3>
            <p className={`text-[var(--text-muted)] ${compact ? "mt-3 text-sm leading-6" : "mt-3 text-base leading-relaxed"}`}>
                {currentProject.summary}
            </p>
            <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        {currentProject.progressLabel}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="inline-flex items-center text-xs font-medium text-[var(--text-soft)]">
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-highlight" />
                            {currentProject.inProgress}
                        </span>
                        <p className="text-sm font-bold text-[var(--text)]">
                            {currentProject.progress}%
                        </p>
                    </div>
                </div>
                <div
                    role="progressbar"
                    aria-label={currentProject.progressAria}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={currentProject.progress}
                    className="h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]"
                >
                    <div
                        className="h-full rounded-full bg-[var(--primary)] transition-all"
                        style={{ width: `${currentProject.progress}%` }}
                    />
                </div>
            </div>
            <div className={`mt-5 flex flex-wrap gap-2 ${compact ? "max-w-xs" : ""}`}>
                {currentProject.stack.map((item) => (
                    <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]"
                    >
                        {item}
                    </span>
                ))}
            </div>
            <Link
                href={currentProject.href}
                className={`inline-flex items-center rounded-full border border-[var(--border-strong)] text-sm font-semibold text-[var(--text)] transition-colors hover:border-primary/40 hover:bg-primary/8 ${compact ? "mt-5 px-4 py-2" : "mt-6 px-5 py-2.5"}`}
            >
                {currentProject.linkLabel}
            </Link>
        </>
    );
}

function ProjectProgressMobileWidget({
    currentProject,
    isOpen,
    onOpen,
    onClose,
}: {
    currentProject: CurrentProject;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    return (
        <div className="md:hidden">
            <button
                type="button"
                aria-expanded={isOpen}
                aria-controls="mobile-project-drawer"
                aria-label={isOpen ? currentProject.closePanel : currentProject.openPanel}
                onClick={isOpen ? onClose : onOpen}
                className="mobile-project-badge fixed right-4 bottom-4 z-50 cursor-pointer"
            >
                <span className={`flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-3 shadow-2xl shadow-black/15 ring-1 ring-[var(--ring)] backdrop-blur transition-all duration-300 ${isOpen ? "scale-95" : "scale-100"}`}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-contrast)]">
                        {isOpen ? <X size={20} /> : <FolderKanban size={20} />}
                    </span>
                    <span className="pr-1">
                        <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                            {currentProject.widgetLabel}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold leading-none text-[var(--text)]">
                            {isOpen ? currentProject.inProgress : `${currentProject.progress}%`}
                        </span>
                    </span>
                </span>
            </button>
            <button
                type="button"
                aria-hidden={!isOpen}
                tabIndex={isOpen ? 0 : -1}
                onClick={onClose}
                className={`fixed inset-0 z-30 bg-[var(--overlay)] transition-opacity duration-500 ease-out ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            />
            <div
                id="mobile-project-drawer"
                className={`fixed inset-x-3 bottom-3 z-40 overflow-hidden rounded-[1.9rem] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-2xl shadow-black/15 ring-1 ring-[var(--ring)] backdrop-blur transition-transform duration-500 ease-out ${isOpen ? "translate-y-0" : "translate-y-[calc(100%+5rem)]"}`}
            >
                <div className="border-b border-[var(--border)] px-5 pb-4 pt-3">
                    <span className="mx-auto mb-4 block h-1.5 w-14 rounded-full bg-[var(--border-strong)]" />
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-soft)]">
                                {currentProject.currentBuild}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-[var(--text)]">
                                {currentProject.title}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold leading-none text-[var(--text)]">
                                {currentProject.progress}%
                            </p>
                            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-soft)]">
                                {currentProject.inProgress}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="px-5 pb-5 pt-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-highlight/35 bg-highlight/12 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-highlight">
                            {currentProject.status}
                        </span>
                        <span className="text-[0.68rem] font-medium uppercase tracking-[0.1em] text-[var(--text-soft)]">
                            {currentProject.timeline}
                        </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
                        {currentProject.summary}
                    </p>
                    <div className="mt-4">
                        <div
                            role="progressbar"
                            aria-label={currentProject.progressAria}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={currentProject.progress}
                            className="h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]"
                        >
                            <div
                                className="h-full rounded-full bg-[var(--primary)]"
                                style={{ width: `${currentProject.progress}%` }}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {currentProject.stack.slice(0, 3).map((item) => (
                            <span
                                key={item}
                                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-[0.68rem] font-medium text-[var(--text-muted)]"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                    <Link
                        href={currentProject.href}
                        className="mt-4 inline-flex items-center rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition-colors hover:border-primary/40 hover:bg-primary/8"
                    >
                        {currentProject.linkLabel}
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ProjectProgressDesktopWidget({
    currentProject,
    isOpen,
    onClose,
}: {
    currentProject: CurrentProject;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocusWithin, setIsFocusWithin] = useState(false);
    const [isHoverSuppressed, setIsHoverSuppressed] = useState(false);
    const isExpanded = isOpen || isFocusWithin || (isHovered && !isHoverSuppressed);

    return (
        <aside className="pointer-events-none fixed top-1/2 left-0 z-40 hidden -translate-y-1/2 lg:block">
            <div
                className={`pointer-events-auto w-80 transition-transform duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:transition-none ${isExpanded ? "translate-x-0" : "-translate-x-64"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsHoverSuppressed(false);
                }}
                onFocusCapture={() => setIsFocusWithin(true)}
                onBlurCapture={(event: FocusEvent<HTMLDivElement>) => {
                    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        return;
                    }

                    setIsFocusWithin(false);
                }}
            >
                <div className="flex overflow-hidden rounded-r-[2rem] border border-[var(--border)] bg-[var(--surface-elevated)] shadow-2xl shadow-black/10 ring-1 ring-[var(--ring)] backdrop-blur">
                    <div className="flex-1 p-6">
                        <div className="mb-4 flex justify-end">
                            <button
                                type="button"
                                aria-label={currentProject.closeWidget}
                                onClick={() => {
                                    setIsHoverSuppressed(true);
                                    setIsFocusWithin(false);
                                    onClose();
                                }}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-soft)]"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <ProjectProgressContent compact currentProject={currentProject} />
                    </div>
                    <div className="flex w-16 flex-col items-center justify-between border-l border-[var(--border)] bg-[var(--primary)] px-3 py-5 text-[var(--primary-contrast)]">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] [writing-mode:vertical-rl] rotate-180">
                            {currentProject.widgetLabel}
                        </span>
                        <span className="text-xl font-bold">
                            {currentProject.progress}%
                        </span>
                        <span className="h-10 w-px bg-white/35" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default function Page() {
    const t = useTranslations("home");
    const locale = useLocale();
    const translatedSkillGroups = t.raw("toolkit.skillGroups") as TranslatedSkillGroup[];
    const skillGroups = buildSkillGroups(translatedSkillGroups);
    const currentProject = t.raw("project") as CurrentProject;
    const toolkitTags = t.raw("toolkit.tags") as string[];
    const placeholderTitle = t("insights.placeholderTitle");
    const placeholderExcerpt = t("insights.placeholderExcerpt");
    const placeholderCta = t("insights.placeholderCta");
    const [latestPosts, setLatestPosts] = useState<BlogPreviewCard[]>(() =>
        Array.from({ length: INSIGHTS_POST_LIMIT }, (_, index) => ({
            id: `placeholder-${index}`,
            title: placeholderTitle,
            excerpt: placeholderExcerpt,
            date: "",
            href: "",
            isPlaceholder: true,
        }))
    );
    const [isMobileProjectDrawerOpen, setIsMobileProjectDrawerOpen] = useState(false);
    const [isDesktopProjectWidgetOpen, setIsDesktopProjectWidgetOpen] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        async function loadLatestPosts() {
            setLatestPosts(
                Array.from({ length: INSIGHTS_POST_LIMIT }, (_, index) => ({
                    id: `placeholder-${index}`,
                    title: placeholderTitle,
                    excerpt: placeholderExcerpt,
                    date: "",
                    href: "",
                    isPlaceholder: true,
                }))
            );

            const posts = await getLatestBlogPreviews({
                limit: INSIGHTS_POST_LIMIT,
                locale,
                placeholder: {
                    title: placeholderTitle,
                    excerpt: placeholderExcerpt,
                },
            });

            if (!isCancelled) {
                setLatestPosts(posts);
            }
        }

        void loadLatestPosts();

        return () => {
            isCancelled = true;
        };
    }, [locale, placeholderExcerpt, placeholderTitle]);

    return (
        <main className="pb-8 md:pb-0">
            <ProjectProgressDesktopWidget
                currentProject={currentProject}
                isOpen={isDesktopProjectWidgetOpen}
                onClose={() => setIsDesktopProjectWidgetOpen(false)}
            />
            <ProjectProgressMobileWidget
                currentProject={currentProject}
                isOpen={isMobileProjectDrawerOpen}
                onOpen={() => setIsMobileProjectDrawerOpen(true)}
                onClose={() => setIsMobileProjectDrawerOpen(false)}
            />
            <div className="container mx-auto px-6">
                <div className="lg:max-w-3xl">
                    <FadeIn delay="delay-100">
                        <h1 className="font-bold mb-6 text-3xl md:text-5xl">
                            {t("hero.title")}
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="#current-project-anchor"
                                onClick={(event) => {
                                    if (window.innerWidth >= 1024) {
                                        event.preventDefault();
                                        setIsDesktopProjectWidgetOpen(true);
                                        return;
                                    }

                                    if (window.innerWidth >= 768) {
                                        return;
                                    }

                                    event.preventDefault();
                                    setIsMobileProjectDrawerOpen(true);
                                }}
                                className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--primary-contrast)] transition-colors hover:bg-primary/85"
                            >
                                {t("hero.viewProject")}
                            </Link>
                            <Link
                                href="#contact-shortcut"
                                className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--text)] transition-colors hover:border-primary/40 hover:text-primary"
                            >
                                {t("hero.connect")}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
                <div id="current-project-anchor" className="scroll-mt-24" />
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="md:basis-64 mx-6">
                        <FadeIn delay="delay-300">
                            <div className="profile-photo-wrap">
                                <span className="profile-photo-orbit" aria-hidden="true" />
                                <span className="profile-photo-glow" aria-hidden="true" />
                                <Image
                                    src={martijnImage}
                                    alt={t("about.photoAlt")}
                                    className="profile-photo-image rounded-full border-10 border-primary" />
                            </div>
                        </FadeIn>
                    </div>
                    <div className="md:basis-128 mt-6">
                        <FadeIn delay="delay-500">
                            <div className="flex">
                                <span className="font-mono">
                                    {t("about.greeting")}
                                </span>
                                <span className="ml-2 text-highlight">
                                    <HandMetal />
                                </span>
                            </div>
                            <h2 className="font-bold text-primary mb-6 text-2xl md:text-4xl">
                                {t("about.title")}
                            </h2>
                            <p className="text-xl">
                                {t.rich("about.description", {
                                    blog: (chunks) => (
                                        <Link href="/blog"><b>{chunks}</b></Link>
                                    ),
                                })}
                            </p>
                        </FadeIn>
                    </div>
                </div>
                <div className="min-h-160 mt-6">
                    <FadeIn delay="delay-700">
                        <SectionHeading
                            title={t("insights.title")}
                            eyebrow={t("insights.eyebrow")}
                            variant="reactive"
                        />
                        <div className="grid grid-cols-1 gap-x-10 gap-y-3 lg:grid-cols-2">
                            {latestPosts.map((post) => {
                                return (
                                    <BlogListItem
                                        key={post.id}
                                        post={post}
                                        titleTag="h3"
                                        linkLabel={t("insights.readPost")}
                                        placeholderMetaLabel={placeholderCta}
                                    />
                                );
                            })}
                        </div>
                        <div className="mt-5 flex justify-center">
                            <Link
                                href="/blog"
                                className="mp-focus inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:border-primary/35 hover:text-primary"
                            >
                                {t("insights.viewAll")}
                            </Link>
                        </div>
                        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />
                    </FadeIn>
                    <FadeIn delay="delay-200">
                        <div className="mt-6">
                            <SectionHeading
                                title={t("toolkit.title")}
                                eyebrow={t("toolkit.eyebrow")}
                                variant="reactive"
                            />
                        </div>
                        <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] shadow-sm ring-1 ring-[var(--ring)]">
                            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
                                <div className="relative p-6 md:p-8">
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/7 via-transparent to-transparent" />
                                    <div className="relative">
                                        <p className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-soft)]">
                                            {t("toolkit.badge")}
                                        </p>
                                        <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">
                                            {t("toolkit.description")}
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{toolkitTags[0]}</span>
                                            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{toolkitTags[1]}</span>
                                            <span className="inline-flex items-center rounded-full border border-highlight/35 bg-highlight/12 px-3 py-1 text-xs font-medium text-highlight">{toolkitTags[2]}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative min-h-64 border-t border-[var(--border)] lg:border-l lg:border-t-0">
                                    <Image
                                        src="dev-cartoon.svg"
                                        alt={t("toolkit.illustrationAlt")}
                                        fill
                                        sizes="(min-width: 1024px) 35vw, 100vw"
                                        className="toolkit-illustration object-cover"
                                    />
                                    <span className="toolkit-orb pointer-events-none absolute left-5 top-6 h-3 w-3 rounded-full bg-accent/85" />
                                    <span className="toolkit-orb toolkit-orb-delay pointer-events-none absolute right-6 top-10 h-2.5 w-2.5 rounded-full bg-highlight/85" />
                                    <span className="toolkit-orb toolkit-orb-delay-2 pointer-events-none absolute right-10 bottom-8 h-2 w-2 rounded-full bg-primary/85" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/25" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {skillGroups.map((group) => (
                                <article
                                    key={group.title}
                                    className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-sm ring-1 ring-[var(--ring)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                                >
                                    <h3 className="mb-4 text-lg font-bold text-[var(--text)]">
                                        {group.title}
                                    </h3>
                                    <ul className="flex flex-wrap gap-3">
                                        {group.skills.map((skill) => {
                                            const Icon = skill.icon;

                                            return (
                                                <li
                                                    key={skill.label}
                                                    className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--text-muted)]"
                                                >
                                                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/12 text-accent">
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
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-highlight/55 to-transparent" />
                    <FadeIn delay="delay-200">
                        <div id="contact-shortcut" className="mt-6 scroll-mt-24">
                            <SectionHeading
                                title={t("connect.title")}
                                eyebrow={t("connect.eyebrow")}
                                variant="reactive"
                            />
                        </div>
                        <ContactShortcut />
                    </FadeIn>
                </div>
            </div>
        </main >
    );
}
