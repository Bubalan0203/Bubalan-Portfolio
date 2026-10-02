'use client';
import { useEffect, useRef, useState } from 'react';
import { ABOUT_FACTS, ABOUT_TEXT, CERTS } from '@/lib/content';
import { gsap, useGSAP, MOTION_OK, finePointer, reducedMotion, revealBatch } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';

const KEY = /^(full-stack|predigle|data|api|screen|shipping|dashboards|services|access|deployments|feature)/i;

function Photo() {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [has, setHas] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // the image may finish loading before hydration, so check once on mount too
    const i = img.current;
    if (i?.complete && i.naturalWidth > 0) setHas(true);
    if (reducedMotion() || !finePointer()) return;
    const ph = wrap.current!, fr = frame.current!;
    const move = (e: PointerEvent) => {
      const r = ph.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      fr.style.transition = 'transform .15s ease-out';
      fr.style.transform = `rotateX(${(.5 - y) * 16}deg) rotateY(${(x - .5) * 18}deg) scale(1.02)`;
      fr.style.setProperty('--gx', x * 100 + '%'); fr.style.setProperty('--gy', y * 100 + '%');
    };
    const leave = () => { fr.style.transition = ''; fr.style.transform = ''; };
    ph.addEventListener('pointermove', move); ph.addEventListener('pointerleave', leave);
    return () => { ph.removeEventListener('pointermove', move); ph.removeEventListener('pointerleave', leave); };
  }, []);

  return (
    <div className={`photo${has ? ' has-photo' : ''}`} ref={wrap} id="photo">
      <div className="photo-frame" ref={frame}>
        <div className="photo-inner">
          <div className="mono-gram" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <circle className="mg-o" cx="100" cy="100" r="92" />
              <circle className="mg-o" cx="100" cy="100" r="70" strokeDasharray="2 6" />
              <path className="mg-l" pathLength={1} d="M52 58v84M52 58h26a18 18 0 0 1 0 36H52M52 94h30a24 24 0 0 1 0 48H52" />
              <path className="mg-l b2" pathLength={1} d="M150 70c-4-8-12-12-22-12-12 0-20 7-20 17 0 22 44 12 44 40 0 12-10 21-24 21-11 0-20-5-24-13" />
              <circle className="mg-sat" r="4"><animateMotion dur="7s" repeatCount="indefinite" path="M100 8a92 92 0 1 1 0 184a92 92 0 1 1 0-184" /></circle>
            </svg>
          </div>
          {!failed && (
            // eslint-disable-next-line @next/next/no-img-element -- optional file the owner drops in; the monogram shows until it loads
            <img ref={img} src="/photo.jpg" alt="Portrait of Bubalan S" width={800} height={1000} decoding="async"
              onLoad={() => setHas(true)} onError={() => setFailed(true)} />
          )}
        </div>
        <div className="photo-tag"><span>bubalan_s.jpg</span><span>4:5 · cover</span></div>
        <div className="photo-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const words = ABOUT_TEXT.split(/\s+/);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      revealBatch(el);
      const lit = el.querySelector('.lit')!;
      gsap.to(lit.querySelectorAll('.w'), { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: lit, start: 'top 82%', end: 'bottom 50%', scrub: .6 } });
      gsap.from('#photo', { rotateY: -28, rotateX: 8, opacity: 0, scale: .92, duration: 1.6, ease: 'expo.out', transformPerspective: 900, scrollTrigger: { trigger: '#photo', start: 'top 85%' } });
    });
  }, { scope: ref });

  return (
    <section className="sec" id="about" data-path="~/about.md" aria-labelledby="about-t" ref={ref}>
      <div className="wrap">
        <SectionHead num="01" path="~/about.md" titleId="about-t"
          lines={['From first', <em key="e">requirement</em>, <>to last <span className="hl">deploy.</span></>]} />
        <div className="about-grid">
          <div className="photo-col"><Photo /></div>
          <div>
            <p className="lit">
              {words.map((w, i) => <span key={i}><span className={`w${KEY.test(w) ? ' k' : ''}`}>{w}</span>{i < words.length - 1 ? ' ' : ''}</span>)}
            </p>
            <div className="pkg brk rv">
              <div className="pkg-bar"><span>~/package.json</span><span>read-only</span></div>
              <pre><code>{'{\n'}
                {'  '}<span className="k">&quot;name&quot;</span>: <span className="s">&quot;bubalan-s&quot;</span>,{'\n'}
                {'  '}<span className="k">&quot;role&quot;</span>: <span className="s">&quot;Full Stack Developer&quot;</span>,{'\n'}
                {'  '}<span className="k">&quot;at&quot;</span>: <span className="s">&quot;Predigle&quot;</span>,{'\n'}
                {'  '}<span className="k">&quot;studying&quot;</span>: <span className="s">&quot;M.Sc. Software Systems (Integrated), 2021 – present&quot;</span>,{'\n'}
                {'  '}<span className="k">&quot;school&quot;</span>: <span className="s">&quot;Coimbatore Institute of Technology&quot;</span>,{'\n'}
                {'  '}<span className="k">&quot;cgpa&quot;</span>: <span className="n">8.22</span>,{'\n'}
                {'  '}<span className="k">&quot;interests&quot;</span>: [{['full-stack', 'DSA', 'OOP', 'AI', 'DBMS', 'prompt engineering'].map((s, i, a) => <span key={s}><span className="s">&quot;{s}&quot;</span>{i < a.length - 1 ? ', ' : ''}</span>)}],{'\n'}
                {'  '}<span className="k">&quot;certifications&quot;</span>: [{'\n'}
                {CERTS.map((c, i) => <span key={c}>{'    '}<span className="s">&quot;{c}&quot;</span>{i < CERTS.length - 1 ? ',' : ''}{'\n'}</span>)}
                {'  ]\n}'}</code></pre>
            </div>
            <div className="about-facts rv">
              {ABOUT_FACTS.map(f => <div key={f.big}><b>{f.big}</b><span>{f.small}</span></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
