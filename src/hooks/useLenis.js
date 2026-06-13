import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export function getLenis() { return lenisInstance; }

export default function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let raf;
    function raf_loop(time) {
      lenisInstance.raf(time);
      raf = requestAnimationFrame(raf_loop);
    }
    raf = requestAnimationFrame(raf_loop);

    return () => {
      cancelAnimationFrame(raf);
      lenisInstance.destroy();
      lenisInstance = null;
    };
  }, []);
}
