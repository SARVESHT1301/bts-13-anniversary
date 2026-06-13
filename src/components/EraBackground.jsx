import { useEffect, useRef, createRef, useCallback } from 'react';
import { useMotionValueEvent } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE FIX #2 (Critical — EraBackground)
//
// Previous approach:
//   - Received `scrollProgress` as a regular React prop (number)
//   - Every scroll frame → parent setState → this component re-rendered
//   - All 7 era <div> layers re-rendered with new opacity values
//   - CherryBlossom canvas was conditionally mounted (opacity > 0.3)
//     causing canvas teardown/setup during transitions = GPU layer thrash
//
// New approach:
//   - Receives `scrollProgressValue` as a Framer Motion MotionValue (not a number)
//   - useMotionValueEvent reads changes imperatively — NO React re-renders
//   - Layer opacities updated via direct DOM style mutation on refs
//   - Single always-mounted EraParticleCanvas handles all eras via a shared ref
//     — no canvas teardown during era transitions
//   - willChange: 'opacity' on each layer for GPU compositor promotion
// ─────────────────────────────────────────────────────────────────────────────

const ERA_BACKGROUNDS = [
  {
    gradient: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(40,5,80,0.6) 0%, rgba(4,1,13,0.95) 70%)',
    particleColor: null,
    particleRGB: null,
    label: '2013',
  },
  {
    gradient: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(40,20,60,0.5) 0%, rgba(15,5,30,0.95) 70%)',
    overlay: 'linear-gradient(180deg, rgba(255,182,193,0.06) 0%, transparent 60%)',
    particleColor: '#FFB6C1',
    particleRGB: [255, 182, 193],
    label: '2015 HYYH',
  },
  {
    gradient: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(10,15,60,0.7) 0%, rgba(4,1,20,0.98) 70%)',
    overlay: 'linear-gradient(180deg, rgba(100,100,255,0.04) 0%, transparent 50%)',
    particleColor: '#E0E8FF',
    particleRGB: [224, 232, 255],
    label: '2016 Wings',
  },
  {
    gradient: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(80,20,160,0.5) 0%, rgba(20,5,50,0.98) 70%)',
    overlay: 'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(120,40,200,0.15) 0%, transparent 60%)',
    particleColor: '#BF5AF2',
    particleRGB: [191, 90, 242],
    label: '2018 Love Yourself',
  },
  {
    gradient: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,30,60,0.7) 0%, rgba(4,1,13,0.97) 70%)',
    overlay: 'linear-gradient(135deg, rgba(0,229,255,0.03) 0%, rgba(255,100,200,0.03) 100%)',
    particleColor: '#00E5FF',
    particleRGB: [0, 229, 255],
    label: '2020 Dynamite',
  },
  {
    gradient: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(60,40,5,0.5) 0%, rgba(8,5,0,0.97) 70%)',
    overlay: 'radial-gradient(ellipse 50% 30% at 50% 20%, rgba(255,215,0,0.06) 0%, transparent 60%)',
    particleColor: '#FFD700',
    particleRGB: [255, 215, 0],
    label: '2021 Butter',
  },
  {
    gradient: 'radial-gradient(ellipse 100% 80% at 50% 30%, rgba(100,20,200,0.5) 0%, rgba(4,1,13,0.97) 60%)',
    overlay: 'radial-gradient(ellipse 80% 60% at 70% 80%, rgba(60,10,120,0.2) 0%, transparent 60%)',
    particleColor: '#BF5AF2',
    particleRGB: [191, 90, 242],
    label: '2026 Reunion',
  },
];

const ERA_COUNT = ERA_BACKGROUNDS.length;

// Single unified particle canvas — never mounts/unmounts, switches era via ref
function EraParticleCanvas({ activeEraRef }) {
  const canvasRef = useRef(null);
  const petalsRef = useRef([]);
  const currentEraRef = useRef(-1);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function initPetals(rgb) {
      petalsRef.current = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 3 + Math.random() * 5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: 0.5 + Math.random() * 1,
        opacity: 0.3 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        // Pre-compute rgba strings to avoid per-frame string building
        fillStyle: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},`,
      }));
    }

    function draw() {
      const eraIndex = activeEraRef.current;
      const era = ERA_BACKGROUNDS[eraIndex];

      if (!era?.particleRGB) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Re-init petals only when era actually changes — not every frame
      if (currentEraRef.current !== eraIndex) {
        currentEraRef.current = eraIndex;
        initPetals(era.particleRGB);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const petals = petalsRef.current;
      const len = petals.length;
      for (let i = 0; i < len; i++) {
        const p = petals[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        // ellipse: faster than individual save/restore per petal for path
        ctx.ellipse(0, 0, p.size, p.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `${p.fillStyle}${p.opacity})`;
        ctx.fill();
        ctx.restore();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [activeEraRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 0,
        // GPU promote
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
      }}
    />
  );
}

export default function EraBackground({ scrollProgressValue }) {
  // Refs for direct DOM opacity mutation — no React state involved
  const layerRefs = useRef(ERA_BACKGROUNDS.map(() => createRef()));
  const activeEraRef = useRef(0);

  // IMPERATIVE opacity update — fires on every scroll frame but causes
  // zero React re-renders. Only DOM style.opacity is mutated.
  const updateLayers = useCallback((progress) => {
    const rawIndex = progress * (ERA_COUNT - 1);
    const lower = Math.floor(rawIndex);
    const upper = Math.min(ERA_COUNT - 1, lower + 1);
    const t = rawIndex - lower;

    // Update active era index for particle canvas (no re-render)
    activeEraRef.current = lower;

    for (let i = 0; i < ERA_COUNT; i++) {
      const ref = layerRefs.current[i];
      if (!ref?.current) continue;
      let op = 0;
      if (i === lower) op = 1 - t;
      if (i === upper) op = t;
      if (lower === upper && i === lower) op = 1;
      // Direct DOM mutation — bypasses React reconciler entirely
      ref.current.style.opacity = Math.max(0, Math.min(1, op)).toFixed(3);
    }
  }, []);

  useMotionValueEvent(scrollProgressValue, 'change', updateLayers);

  return (
    <>
      {/* Particle canvas — single instance, always mounted */}
      <EraParticleCanvas activeEraRef={activeEraRef} />

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {ERA_BACKGROUNDS.map((era, i) => (
          <div
            key={i}
            ref={layerRefs.current[i]}
            style={{
              position: 'absolute', inset: 0,
              opacity: i === 0 ? 1 : 0, // initial state: first era visible
              // GPU compositor layer — only opacity changes, no layout
              willChange: 'opacity',
              transform: 'translate3d(0,0,0)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: era.gradient }} />
            {era.overlay && (
              <div style={{ position: 'absolute', inset: 0, background: era.overlay }} />
            )}
          </div>
        ))}

        {/* Always-present aurora */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%',
          height: '40vh',
          background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(123,47,190,0.15) 0%, transparent 70%)',
          animation: 'aurora-shift 12s ease-in-out infinite',
          willChange: 'transform',
          pointerEvents: 'none',
          transform: 'translate3d(0,0,0)',
        }} />
      </div>
    </>
  );
}
