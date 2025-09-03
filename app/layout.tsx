'use client';

import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';
import MetadataComponent from '@/components/MetadataComponent';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Remove metadata export from client component; move to server-side pages or layouts
// export const metadata: Metadata = { ... };

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const showPublicLayout = !pathname.startsWith('/admin-dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <MetadataComponent/>
        </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {showPublicLayout ? (
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: 'bg-background text-foreground border-primary',
                  style: {
                    borderWidth: '1px',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  },
                }}
              />
              <Footer />
            </div>
          ) : (
            <>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: 'bg-background text-foreground border-primary',
                  style: {
                    borderWidth: '1px',
                    borderRadius: 'var(--radius)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  },
                }}
              />
              {children}
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}