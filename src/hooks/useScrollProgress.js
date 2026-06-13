import { useState, useEffect, useRef, useCallback } from 'react';
import { getLenis } from './useLenis';

/**
 * Returns scroll progress (0–1) between two ref elements,
 * or raw scroll position if no refs provided.
 */
export function useScrollProgress(startRef, endRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (startRef?.current && endRef?.current) {
          const start = startRef.current.offsetTop;
          const end = endRef.current.offsetTop + endRef.current.offsetHeight;
          const p = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
          setProgress(p);
        } else {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);
        }
        ticking = false;
      });
    }

    // Support both native and Lenis scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    const lenis = getLenis();
    if (lenis) lenis.on('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      const l = getLenis();
      if (l) l.off('scroll', onScroll);
    };
  }, [startRef, endRef]);

  return progress;
}

/**
 * Returns current scroll Y position.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY || document.documentElement.scrollTop);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    const lenis = getLenis();
    if (lenis) lenis.on('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      const l = getLenis();
      if (l) l.off('scroll', handler);
    };
  }, []);

  return scrollY;
}

/**
 * Returns true when element is in viewport.
 */
export function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return inView;
}
