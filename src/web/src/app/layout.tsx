import "./globals.css";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "../theme/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Martijn Pannekoek",
  description: "Software Architect, Engineer, and Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
      </head>
        <body className={`${plusJakartaSans.variable} ${ibmPlexMono.variable} bg-[var(--bg)] text-[var(--text)] antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
};
