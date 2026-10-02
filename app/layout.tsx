import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import SmoothScroll from '@/components/chrome/SmoothScroll';
import Loader from '@/components/chrome/Loader';
import Cursor from '@/components/chrome/Cursor';
import Nav from '@/components/chrome/Nav';
import StatusBar from '@/components/chrome/StatusBar';
import Ask from '@/components/chrome/Ask';
import './globals.css';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', axes: ['opsz', 'wdth'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Bubalan S — Full Stack Developer',
  description: 'Bubalan S — full stack developer at Predigle. I build products end to end: the data model, the API, the interface and the release.',
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090B0F' },
    { media: '(prefers-color-scheme: light)', color: '#EEF1F5' },
  ],
};

// Runs before paint: saved theme, reduced-motion flag, and scroll lock while the loader plays.
const BOOT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('rm');else d.classList.add('loading');})();`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SmoothScroll />
        <Loader />
        <div className="progress" aria-hidden="true"><i id="progress" /></div>
        <div className="grain" aria-hidden="true" />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <StatusBar />
        <Ask />
      </body>
    </html>
  );
}
