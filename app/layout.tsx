import type { Metadata, Viewport } from 'next';
import { Sora, Manrope, JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '@/components/chrome/SmoothScroll';
import Intro from '@/components/chrome/Intro';
import Header from '@/components/chrome/Header';
import Ask from '@/components/chrome/Ask';
import Background from '@/components/fx/Background';
import Interactions from '@/components/fx/Interactions';
import TypedHeadings from '@/components/fx/TypedHeadings';
import './globals.css';
import { SITE } from './site';

const display = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'Bubalan S — Associate Product Engineer',
  description: 'Bubalan S, Associate Product Engineer at Predigle. Healthcare products built end to end: role-based clinic flows, document extraction and HIPAA-compliant features.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', title: 'Bubalan S — Associate Product Engineer', description: 'Healthcare products built end to end: role-based clinic flows, document extraction and HIPAA-compliant features.', siteName: 'Bubalan S' },
  twitter: { card: 'summary_large_image', title: 'Bubalan S — Associate Product Engineer', description: 'Healthcare products built end to end at Predigle.' },
};

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#02060B' };

// Runs before paint: dark is the default; only a saved "light" choice overrides it.
const BOOT = `(function(){var d=document.documentElement;try{if(localStorage.getItem('theme')==='light')d.setAttribute('data-theme','light');}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('rm');else d.classList.add('loading');})();`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SmoothScroll />
        <Background />
        <Intro />
        <Header />
        <main id="main">{children}</main>
        <Ask />
        <Interactions />
        <TypedHeadings />
      </body>
    </html>
  );
}
