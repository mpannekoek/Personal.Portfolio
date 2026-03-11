import "./globals.css";
import ThemeProvider from "../theme/theme-provider";

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
        <body className="bg-[var(--bg)] text-[var(--text)]">
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
