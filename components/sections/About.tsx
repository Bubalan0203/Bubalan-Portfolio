'use client';
import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, revealBatch } from '@/lib/motion';
import Logo from '@/components/brand/Logo';

export function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return <p className="label rv"><span>{n}</span>{children}<i aria-hidden="true" /></p>;
}

// The process, top of the stack first. A signal runs down through every stage and they fold into one product.
const STAGES = ['Requirements', 'Planning', 'Design', 'Build', 'Test', 'Deploy'];
const N = STAGES.length;

// Words wrapped in *stars* are highlighted.
const STATEMENT =
  "I'm a *product* *engineer* who asks *why* before *how.* I turn messy requirements into clear systems — data models, APIs, interfaces and *AI* *agents* — and carry them all the way to production. Success, for me, is simple: it *works,* it *scales,* and people *enjoy* using it.";
const z = (i: number, gap: number) => (N - 1 - i) * gap;

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      revealBatch(root.current!);
      const plates = gsap.utils.toArray<HTMLElement>('.xv-plate');
      const tags = gsap.utils.toArray<HTMLElement>('.xv-tag');
      const mark = (i: number) => () => {
        plates.forEach((p, j) => p.classList.toggle('on', j === i));
        tags.forEach((t, j) => t.classList.toggle('on', j === i || (i === N && j === N)));
      };

      gsap.set('.xv-stack', { rotateX: 58, rotateZ: -45 });
      gsap.set(plates, { z: 0 });
      gsap.set('.xv-signal', { z: z(0, 50) + 12, opacity: 0 });

      // scroll-driven: open → signal runs through each stage → fold into one product
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: '+=160%', pin: true, scrub: 1,
          onUpdate: self => {
            const p = self.progress;
            const i = p < .2 ? -1 : p < .75 ? Math.min(N - 1, Math.floor((p - .2) / (.55 / N))) : N;
            mark(i)();
            root.current!.classList.toggle('xv-product', p >= .88);
          },
        },
      });
      tl.fromTo('.about-text .w', { opacity: .16 }, { opacity: 1, duration: .02, stagger: .011 }, 0)
        .to(plates, { z: i => z(i, 50), duration: .2, ease: 'power2.out', stagger: .01 }, 0)
        .to('.xv-signal', { opacity: 1, duration: .03 }, .19)
        .to('.xv-signal', { z: z(N - 1, 50) - 6, duration: .55 }, .2)
        .to('.xv-signal', { opacity: 0, duration: .03 }, .75)
        .to(plates, { z: 0, duration: .13, ease: 'power2.in' }, .75)
        .to('.xv-product-face', { opacity: 1, duration: .06 }, .87)
        .to({}, { duration: .07 });

      const float = gsap.to('.xv-float', { y: -12, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      return () => { tl.scrollTrigger?.kill(); tl.kill(); float.kill(); };
    });
  }, { scope: root });

  return (
    <section className="sec about" id="about" ref={root}>
      <Label n="01">About</Label>
      <div className="xv-cols">
        <div className="xv-copy">
          <p className="about-text">
            {STATEMENT.split(' ').map((w, i) => {
              const hl = w.startsWith('*');
              return <span key={i} className={`w${hl ? ' hl' : ''}`}>{hl ? w.replaceAll('*', '') : w} </span>;
            })}
          </p>
          <h2 className="xv-title rv">Curious by nature. <em>Product engineer by choice.</em></h2>
        </div>

        <div className="xv-stage" aria-hidden="true">
          <div className="xv-float">
            <div className="xv-stack">
              {STAGES.map((s, i) => (
                <div key={s} className="xv-plate" style={{ zIndex: N - i, transform: `translateZ(${z(i, 44)}px)` }}>
                  <span className="xv-pk">{String(i + 1).padStart(2, '0')}</span>
                  <span className="xv-pl">{s}</span>
                </div>
              ))}
              <div className="xv-signal" />
              <div className="xv-product-face"><span className="xv-logo"><Logo /></span><span className="xv-pl">Product ✓</span></div>
            </div>
          </div>
          <ol className="xv-tags">
            {STAGES.map((s, i) => <li key={s} className="xv-tag"><b>{String(i + 1).padStart(2, '0')}</b>{s}</li>)}
            <li className="xv-tag xv-tag-product">→ Product</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
