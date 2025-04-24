import './globals.css';
import NavBar from './components/nav';
import Footer from './components/footer';
import ThemeProvider from '../theme/theme-provider';

export const metadata = {
  title: 'Martijn Pannekoek',
  description: 'Software Architect, Engineer, and Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <div className="pt-6">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </body>
    </html>
  );
};
