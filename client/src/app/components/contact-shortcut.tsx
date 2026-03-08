"use client";

import { useMemo, useState } from "react";

const contactEmail = "martijnpannekoek.development@gmail.com";

export default function ContactShortcut() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const mailtoHref = useMemo(() => {
        const sender = name.trim().length > 0 ? name.trim() : "Portfolio visitor";
        const senderEmail = email.trim().length > 0 ? ` (${email.trim()})` : "";
        const introLine = `Hi Martijn, this is ${sender}${senderEmail}.`;
        const body = `${introLine}\n\n${message.trim() || "I would love to connect with you."}`;
        const subject = "Portfolio contact request";

        return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, [email, message, name]);

    return (
        <section className="rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm ring-1 ring-white/70 dark:border-white/12 dark:bg-zinc-950/75 dark:ring-white/8 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
                <div>
                    <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-black/65 dark:border-white/12 dark:bg-white/5 dark:text-white/70">
                        Quick Contact
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
                        Let&apos;s talk about your next project
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-white/75">
                        Send a short message right from this page. It opens your email app with everything prefilled so you can reach out quickly.
                    </p>
                    <p className="mt-4 text-sm text-zinc-600 dark:text-white/60">
                        Prefer direct email?{" "}
                        <a
                            href={`mailto:${contactEmail}`}
                            className="font-semibold text-primary underline decoration-secondary/45 decoration-2 underline-offset-4 hover:text-primary/80"
                        >
                            {contactEmail}
                        </a>
                    </p>
                </div>
                <form className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/14 dark:bg-white/5">
                    <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-zinc-700 dark:text-white/75">Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Your name"
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none transition-colors focus:border-primary/70 dark:border-white/20 dark:bg-zinc-950 dark:text-white"
                        />
                    </label>
                    <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-zinc-700 dark:text-white/75">Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none transition-colors focus:border-primary/70 dark:border-white/20 dark:bg-zinc-950 dark:text-white"
                        />
                    </label>
                    <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-zinc-700 dark:text-white/75">Message</span>
                        <textarea
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            rows={4}
                            placeholder="Tell me what you want to build."
                            className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none transition-colors focus:border-primary/70 dark:border-white/20 dark:bg-zinc-950 dark:text-white"
                        />
                    </label>
                    <a
                        href={mailtoHref}
                        className="inline-flex w-fit items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/85 dark:bg-secondary dark:text-black dark:hover:bg-secondary/85"
                    >
                        Send via email
                    </a>
                </form>
            </div>
        </section>
    );
}
