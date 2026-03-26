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
        <section className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
            <div className="max-w-lg">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-highlight">
                        {t("badge")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[var(--text)] md:text-3xl">
                        {t("title")}
                    </h3>
                    <p className="mt-3 text-base leading-[1.75] text-[var(--text-muted)]">
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
            </div>
            <form className="grid max-w-2xl gap-4 border-t border-[var(--border)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <label className="grid gap-1.5">
                    <span className="text-sm font-medium text-[var(--text-muted)]">{t("fields.name")}</span>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={t("placeholders.name")}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[var(--text)] outline-none transition-colors focus:border-primary/60"
                    />
                </label>
                <label className="grid gap-1.5">
                    <span className="text-sm font-medium text-[var(--text-muted)]">{t("fields.email")}</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={t("placeholders.email")}
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[var(--text)] outline-none transition-colors focus:border-primary/60"
                    />
                </label>
                <label className="grid gap-1.5">
                    <span className="text-sm font-medium text-[var(--text-muted)]">{t("fields.message")}</span>
                    <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        rows={4}
                        placeholder={t("placeholders.message")}
                        className="w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[var(--text)] outline-none transition-colors focus:border-primary/60"
                    />
                </label>
                <a
                    href={mailtoHref}
                    className="inline-flex w-fit items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[var(--primary-contrast)] transition-colors hover:bg-primary/85"
                >
                    {t("cta")}
                </a>
            </form>
        </section>
    );
}
