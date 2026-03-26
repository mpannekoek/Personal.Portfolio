"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const contactEmail = "mpannekoek.development@gmail.com";

export default function ContactShortcut() {
    const t = useTranslations("contact");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const mailtoHref = useMemo(() => {
        const sender = name.trim().length > 0 ? name.trim() : t("mailto.defaultSender");
        const senderEmail = email.trim().length > 0 ? ` (${email.trim()})` : "";
        const introLine = t("mailto.intro", { sender, senderEmail });
        const body = `${introLine}\n\n${message.trim() || t("mailto.fallbackBody")}`;
        const subject = t("mailto.subject");

        return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, [email, message, name, t]);

    return (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 shadow-sm ring-1 ring-[var(--ring)] md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
                <div>
                    <p className="inline-flex rounded-full border border-highlight/35 bg-highlight/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-highlight">
                        {t("badge")}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-[var(--text)] md:text-3xl">
                        {t("title")}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[var(--text-muted)]">
                        {t("description")}
                    </p>
                    <p className="mt-4 text-sm text-[var(--text-soft)]">
                        {t("directEmail")}{" "}
                        <a
                            href={`mailto:${contactEmail}`}
                            className="font-semibold text-primary underline decoration-accent/45 decoration-2 underline-offset-4 hover:text-primary/80"
                        >
                            {contactEmail}
                        </a>
                    </p>
                </div>
                <form className="grid gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-[var(--text-muted)]">{t("fields.name")}</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder={t("placeholders.name")}
                            className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-primary/70"
                        />
                    </label>
                    <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-[var(--text-muted)]">{t("fields.email")}</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={t("placeholders.email")}
                            className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-primary/70"
                        />
                    </label>
                    <label className="grid gap-1.5">
                        <span className="text-sm font-medium text-[var(--text-muted)]">{t("fields.message")}</span>
                        <textarea
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            rows={4}
                            placeholder={t("placeholders.message")}
                            className="w-full resize-y rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-2 text-[var(--text)] outline-none transition-colors focus:border-primary/70"
                        />
                    </label>
                    <a
                        href={mailtoHref}
                        className="inline-flex w-fit items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--primary-contrast)] transition-colors hover:bg-primary/85"
                    >
                        {t("cta")}
                    </a>
                </form>
            </div>
        </section>
    );
}
