'use client';
import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion';

/** Splits text into per-word, per-letter spans so letters animate but lines only wrap between words. */
const Letters = ({ text }: { text: string }) => (
  <>
    {text.split(' ').map((w, wi, arr) => (
      <span key={wi}>
        <span className="wd">{[...w].map((c, ci) => <span className="ch" key={ci}>{c}</span>)}</span>
        {wi < arr.length - 1 ? ' ' : ''}
      </span>
    ))}
  </>
);
const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;
const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<'' | 'ok' | 'fail'>('');
  const [time, setTime] = useState('--:--');
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => { const d = new Date(); setTime(fmt.format(d)); setYear(d.getFullYear()); };
    const t0 = setTimeout(tick, 0), t = setInterval(tick, 30000);
    return () => { clearTimeout(t0); clearInterval(t); };
  }, []);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const big = el.querySelector('.cta-big')!;
      gsap.fromTo(big.querySelectorAll('.ch'),
        { yPercent: 100, opacity: 0, fontVariationSettings: '"wdth" 75, "opsz" 96' },
        { yPercent: 0, opacity: 1, fontVariationSettings: '"wdth" 100, "opsz" 96', duration: 1.2, stagger: .025, ease: 'expo.out',
          scrollTrigger: { trigger: big, start: 'top 85%' },
          onComplete: () => { gsap.set(big.querySelectorAll('.ch'), { clearProps: 'fontVariationSettings' }); big.classList.add('ready'); } });
      const lines = big.querySelectorAll('.ln');
      gsap.fromTo(lines[0], { x: '4vw' }, { x: '-2vw', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true } });
      gsap.fromTo(lines[1], { x: '-4vw' }, { x: '2vw', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    });
  }, { scope: ref });

  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); setCopied('ok'); } catch { setCopied('fail'); }
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className="contact" id="contact" data-path="~/contact.sh" aria-labelledby="contact-t" ref={ref}>
      <div className="wrap">
        <div className="sec-meta"><span className="sec-num">08</span><span className="sec-path">~/contact.sh</span><span className="sec-rule" /></div>
        <h2 className="cta-big" id="contact-t" aria-label="Got a problem worth shipping?">
          <span className="ln" aria-hidden="true"><Letters text="Got a problem" /></span>
          <span className="ln" aria-hidden="true"><span className="alt"><Letters text="worth" /></span> <Letters text="shipping" /><span className="am"><span className="ch">?</span></span></span>
        </h2>
        <div className="contact-row">
          <div>
            <p className="eyebrow mb-3.5 mt-0">$ echo $EMAIL</p>
            <div className="mail">
              <a href={`mailto:${PROFILE.email}`} data-cursor="mail">{PROFILE.email}</a>
              <button className="copy-btn magnetic" type="button" onClick={copy} aria-live="polite">
                {copied === 'ok' ? 'copied ✓' : copied === 'fail' ? 'select + copy' : 'copy'}
              </button>
            </div>
          </div>
          <ul className="socials">
            {PROFILE.links.map(l => <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer" className="scramble-in">{l.label} <Arrow /></a></li>)}
          </ul>
        </div>
        <footer className="foot">
          <span>© {year ?? ''} Bubalan S — designed &amp; built by hand</span>
          <span>Coimbatore · {time} IST</span>
          <a href="#top" className="scramble-in">back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
