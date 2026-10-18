import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'StackPath — Full-Stack Web Engineering Learning Studio',
  description:
    'An end-to-end course that takes beginners from zero programming knowledge to designing, building, testing, deploying, and interviewing for modern full-stack web applications.',
  keywords: [
    'full-stack',
    'web development',
    'next.js',
    'react',
    'typescript',
    'postgresql',
    'drizzle orm',
    'software engineering course',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <Suspense fallback={<div className="h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80" />}>
          <Navbar />
        </Suspense>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center text-xs text-slate-500 bg-white/50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300">StackPath Academy</span> • Zero-knowledge full-stack engineering studio.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Web Crypto AES-GCM Encrypted</span>
              <span>•</span>
              <span>WCAG 2.2 AA Accessible</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
