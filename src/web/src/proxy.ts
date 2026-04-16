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
        color-scheme: light;
        --bg: #f3f7ff;
        --surface: #ffffff;
        --text: #10213f;
        --text-soft: #5a6f92;
        --primary: #1d4ed8;
        --accent: #06b6d4;
        --border: rgba(29, 78, 216, 0.18);
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
        background:
          radial-gradient(circle at 10% 10%, rgba(6, 182, 212, 0.15) 0, transparent 42%),
          radial-gradient(circle at 90% 90%, rgba(29, 78, 216, 0.13) 0, transparent 45%),
          var(--bg);
        color: var(--text);
        padding: 24px;
        text-align: center;
      }

      main {
        width: min(640px, 100%);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid rgba(6, 182, 212, 0.36);
        background: rgba(6, 182, 212, 0.12);
        color: #0f6d7a;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .avatar-wrap {
        margin: 0 auto 18px;
        width: 168px;
        height: 168px;
        border-radius: 999px;
        padding: 6px;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        box-shadow:
          0 18px 48px rgba(16, 33, 63, 0.2),
          0 0 0 10px rgba(29, 78, 216, 0.08);
      }

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 999px;
        object-fit: cover;
        display: block;
      }

      h1 {
        margin: 16px 0 0;
        font-size: clamp(1.8rem, 4vw, 2.4rem);
        line-height: 1.15;
      }

      p {
        margin: 14px 0 0;
        color: var(--text-soft);
        font-size: 1.02rem;
        line-height: 1.6;
      }

      .progress {
        margin-top: 20px;
        height: 8px;
        border-radius: 999px;
        background: rgba(29, 78, 216, 0.1);
        overflow: hidden;
      }

      .progress > span {
        display: block;
        width: 58%;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--primary), var(--accent));
      }
    </style>
  </head>
  <body>
    <main>
      <div class="avatar-wrap">
        <img class="avatar" src="/me.jpg" alt="Martijn Pannekoek" />
      </div>
      <div class="badge">Work in Progress</div>
      <h1>This website is under construction.</h1>
      <p>
        We are currently working on updates. Please check back soon.
      </p>
      <div class="progress" aria-hidden="true"><span></span></div>
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
