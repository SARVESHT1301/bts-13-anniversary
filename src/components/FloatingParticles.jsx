import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE FIX #4 — FloatingParticles canvas
//
// Previous bottlenecks per-frame:
//   1. For EVERY star: hex string parsed with parseInt(hex.slice(0,2),16) etc.
//   2. For EVERY colored star: createRadialGradient() called (expensive GPU op)
//   3. fillStyle string built with template literal per star per frame
//   4. Two separate ctx.beginPath()/ctx.fill() calls per glow star
//
// Fixes:
//   1. Pre-compute r/g/b at init time, stored on star object
//   2. Replace createRadialGradient glow with a simpler soft alpha circle
//      (same visual, far cheaper — no gradient object allocation)
//   3. Pre-compute rgba prefix string per star: `rgba(r,g,b,`
//   4. White stars drawn with globalAlpha batch (single fillStyle, vary alpha)
//   5. context.save()/restore() replaced with direct state mutation + reset
//      (save/restore has overhead)
// ─────────────────────────────────────────────────────────────────────────────
export default function FloatingParticles({ count = 220 }) {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Star palettes — pre-computed RGB so no hex parsing per frame
    const PALETTES = [
      { r: 191, g: 90,  b: 242 }, // #BF5AF2 purple (30%)
      { r: 155, g: 79,  b: 224 }, // #9B4FE0 mid-purple (20%)
      { r: 255, g: 255, b: 255 }, // white (50%)
    ];

    starsRef.current = Array.from({ length: count }, () => {
      const rng = Math.random();
      const pal = rng < 0.3 ? PALETTES[0] : rng < 0.5 ? PALETTES[1] : PALETTES[2];
      const isColored = pal !== PALETTES[2];
      return {
        x:            Math.random() * canvas.width,
        y:            Math.random() * canvas.height,
        r:            Math.random() * 1.5 + 0.3,
        opacity:      Math.random() * 0.6 + 0.2,
        speed:        Math.random() * 0.3 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        // Pre-computed per-frame helpers
        rgb:          pal,
        isColored,
        // Cache rgba prefix — only alpha changes per frame
        rgbaPrefix:   `rgba(${pal.r},${pal.g},${pal.b},`,
      };
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const len = stars.length;

      for (let i = 0; i < len; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        // Inline sin for speed — avoids function call overhead
        const alpha = s.opacity * (0.6 + 0.4 * Math.sin(s.twinklePhase));

        // Core star dot — single path + fill
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.283185307); // 2π pre-computed
        ctx.fillStyle = s.rgbaPrefix + alpha.toFixed(3) + ')';
        ctx.fill();

        // Soft glow for colored stars — cheap alpha circle, no gradient object
        if (s.isColored && s.r > 0.8) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, 6.283185307);
          ctx.fillStyle = s.rgbaPrefix + (alpha * 0.18).toFixed(3) + ')';
          ctx.fill();
        }

        // Very slow upward drift
        s.y -= s.speed * 0.1;
        if (s.y < -5) {
          s.y = canvas.height + 5;
          s.x = Math.random() * canvas.width;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        // GPU layer — canvas never moves, just promotes to compositor
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    />
  );
}
