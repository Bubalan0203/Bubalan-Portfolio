'use client';
import { useRef, useState } from 'react';
import { STORIES, TIMELINE } from '@/lib/content';
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_OFF, revealBatch } from '@/lib/motion';
import SectionHead from '@/components/ui/SectionHead';
import StoryScene from './StoryScene';

/** Current company: one-line description, role timeline that fills on scroll, then problem stories with a sticky minimap. */
export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [lit, setLit] = useState(1);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      revealBatch(el);
      const n = TIMELINE.length;
      gsap.to(el.querySelector('.tl-fill'), {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: el.querySelector('.tl-box'), start: 'top 75%', end: 'bottom 55%', scrub: .5,
          onUpdate: s => setLit(TIMELINE.filter((_, i) => s.progress >= (i / (n - 1)) * .97 - .001).length) },
      });
      const links = el.querySelectorAll<HTMLElement>('.s-index a');
      el.querySelectorAll('.story').forEach((s, i) => {
        ScrollTrigger.create({ trigger: s, start: 'top 55%', end: 'bottom 55%',
          onToggle: st => { if (st.isActive) setActive(i); },
          onUpdate: st => links[i]?.style.setProperty('--p', st.progress.toFixed(3)) });
        gsap.from(s, { opacity: 0, y: 60, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 88%' } });
      });
    });
    mm.add(MOTION_OFF, () => setLit(TIMELINE.length));
  }, { scope: ref });

  return (
    <section className="sec bp" id="work" data-path="~/work/predigle.md" aria-labelledby="work-t" ref={ref}>
      <span className="reg r-tl" aria-hidden="true" /><span className="reg r-tr" aria-hidden="true" />
      <div className="wrap">
        <SectionHead num="02" path="~/work/predigle.md" titleId="work-t" lines={['Predigle,', <em className="am" key="e">right now.</em>]} />
        <div className="co-hero">
          <div>
            <p className="co-desc rv"><strong>Predigle builds software for enterprise teams.</strong> I work across the stack there — the dashboards people use every day, the services behind them, and the access and release layer that keeps it all safe and online.</p>
          </div>
          <div className="rv">
            <h3 className="sub-h">~/work/predigle/timeline</h3>
            <div className="tl-box">
              <span className="tl-track" aria-hidden="true"><span className="tl-fill" /></span>
              <ol className="tl">
                {TIMELINE.map((t, i) => (
                  <li key={t.date} className={i < lit ? 'on' : undefined}>
                    <span className="tl-node" aria-hidden="true" />
                    <span className="tl-date">{t.date}</span>
                    {t.placeholder
                      ? <p className="tl-role"><span className="ph">{t.placeholder}</span></p>
                      : <><p className="tl-role">{t.role} {t.sub && <span className="text-ink-3 font-normal">{t.sub}</span>}</p><p className="tl-note">{t.note}</p></>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="stories-wrap">
          <aside className="s-index" aria-label="Stories index">
            <div className="s-mini">
              <div className="s-mini-h"><span>~/problems</span><span>0{active + 1}/0{STORIES.length}</span></div>
              <ol>
                {STORIES.map((s, i) => (
                  <li key={s.id}><a href={`#${s.id}`} className={i === active ? 'on' : undefined}><small>0{i + 1} · {s.tag}</small>{s.short}</a></li>
                ))}
              </ol>
            </div>
          </aside>
          <div className="stories">
            <h3 className="sub-h">Problems I&apos;ve worked on</h3>
            {STORIES.map((s, i) => (
              <article className="story brk" id={s.id} key={s.id}>
                <div>
                  <span className="story-num">0{i + 1} / {s.tag}</span>
                  <h4>{s.title}</h4>
                  <dl>
                    <div><dt>The problem</dt><dd>{s.problem}</dd></div>
                    <div><dt>What I did</dt><dd>{s.did}</dd></div>
                    <div><dt>My role</dt><dd><span className="role-chip">{s.role}</span></dd></div>
                  </dl>
                </div>
                <StoryScene scene={s.scene} label={s.sceneLabel} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
