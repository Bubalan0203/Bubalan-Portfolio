'use client';
import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, MOTION_OK } from '@/lib/motion';

type Props = { num: string; path: string; titleId: string; lines: ReactNode[]; lede?: ReactNode };

/** "01 ~/about.md ────" meta row + a title whose lines rise in while the font stretches from narrow to wide. */
export default function SectionHead({ num, path, titleId, lines, lede }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const el = ref.current!;
      const title = el.querySelector('.sec-title')!;
      const tl = gsap.timeline({ scrollTrigger: { trigger: title, start: 'top 86%' } });
      tl.from(el.querySelectorAll('.ln > span'), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .09 })
        .fromTo(title, { fontVariationSettings: '"wdth" 75, "opsz" 96' }, { fontVariationSettings: '"wdth" 100, "opsz" 96', duration: 1.6, ease: 'expo.out' }, 0);
      const hl = el.querySelector('.hl');
      if (hl) tl.fromTo(hl, { '--hl': 0 }, { '--hl': 1, duration: .9, ease: 'expo.inOut' }, .5);
      const meta = el.querySelector('.sec-meta')!;
      gsap.from(meta.querySelectorAll('span:not(.sec-rule)'), { opacity: 0, x: -12, duration: .7, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: meta, start: 'top 90%' } });
      gsap.from(meta.querySelector('.sec-rule'), { scaleX: 0, transformOrigin: '0 50%', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: meta, start: 'top 90%' } });
      const ld = el.querySelector('.sec-lede');
      if (ld) gsap.from(ld, { opacity: 0, y: 20, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: ld, start: 'top 90%' } });
    });
  }, { scope: ref });

  return (
    <header className="sec-head" ref={ref}>
      <div className="sec-meta"><span className="sec-num">{num}</span><span className="sec-path">{path}</span><span className="sec-rule" /></div>
      <h2 className="sec-title" id={titleId}>
        {lines.map((l, i) => <span className="ln" key={i}><span>{l}</span></span>)}
      </h2>
      {lede && <p className="sec-lede">{lede}</p>}
    </header>
  );
}
