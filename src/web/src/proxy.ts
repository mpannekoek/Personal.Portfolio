import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const RETRY_AFTER_SECONDS = "3600";
const MAINTENANCE_ALLOWED_PATHS = new Set(["/me.jpg"]);

function isMaintenanceModeEnabled() {
    const value = process.env.MAINTENANCE_MODE;

    if (!value) {
        return false;
    }

    return ["true", "1", "yes", "on"].includes(value.trim().toLowerCase());
}

function isExcludedFromLocaleMiddleware(pathname: string) {
    return (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/_vercel") ||
        pathname.includes(".")
    );
}

function maintenanceHtml() {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Under Construction</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0b0d10;
        --surface: #12161b;
        --text: #f3f5f7;
        --text-soft: #9ca6b3;
        --border: #252c35;
        --button-bg: #171c23;
        --button-hover: #212934;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
        background: var(--bg);
        color: var(--text);
        padding: 24px;
        text-align: center;
      }

      main {
        width: min(520px, 100%);
        border: 1px solid var(--border);
        border-radius: 18px;
        background: var(--surface);
        padding: 32px 22px;
      }

      .avatar-wrap {
        margin: 0 auto 20px;
        width: 124px;
        height: 124px;
        border-radius: 999px;
        overflow: hidden;
        border: 1px solid var(--border);
      }

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 999px;
        object-fit: cover;
        display: block;
      }

      h1 {
        margin: 0;
        font-size: clamp(1.55rem, 4vw, 1.95rem);
        line-height: 1.2;
        letter-spacing: -0.01em;
      }

      p {
        margin: 12px auto 0;
        color: var(--text-soft);
        font-size: 0.98rem;
        line-height: 1.55;
        max-width: 40ch;
      }

      .social-links {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .social-link {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--text);
        background: var(--button-bg);
        border: 1px solid var(--border);
        transition: background-color 0.18s ease;
      }

      .social-link:hover,
      .social-link:focus-visible {
        background: var(--button-hover);
      }

      .social-link svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }

      @media (max-width: 420px) {
        main {
          padding: 28px 18px;
        }

        .social-link {
          width: 38px;
          height: 38px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="avatar-wrap">
        <img class="avatar" src="/me.jpg" alt="Martijn Pannekoek" />
      </div>
      <h1>This website is under construction.</h1>
      <p>
        We are currently working on updates. Please check back soon.
      </p>
      <div class="social-links" aria-label="Social links">
        <a class="social-link" href="https://github.com/mpannekoek" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
        <a class="social-link" href="https://linkedin.com/in/martijnpannekoek" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a class="social-link" href="https://www.instagram.com/martijnpannekoek/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>
        </a>
        <a class="social-link" href="https://www.facebook.com/martijn.pannekoek/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>
        </a>
        <a class="social-link" href="mailto:mpannekoek.development@gmail.com" aria-label="Email">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
        </a>
      </div>
    </main>
  </body>
</html>`;
}

export default function proxy(request: NextRequest) {
    if (isMaintenanceModeEnabled()) {
        if (MAINTENANCE_ALLOWED_PATHS.has(request.nextUrl.pathname)) {
            return NextResponse.next();
        }

        return new NextResponse(maintenanceHtml(), {
            status: 503,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "no-store, no-cache, must-revalidate",
                "Retry-After": RETRY_AFTER_SECONDS,
                "X-Robots-Tag": "noindex, nofollow",
            },
        });
    }

    if (isExcludedFromLocaleMiddleware(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ["/:path*"],
};
