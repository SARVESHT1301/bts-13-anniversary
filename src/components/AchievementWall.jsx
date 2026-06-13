import { useRef, useCallback, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HiddenHeart } from './MemoryHunt';

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE FIX #5 — AchievementWall
//
// Previous bottleneck:
//   setInterval(fn, 16) — NOT frame-synced with the browser's 60Hz vsync.
//   Fires at ~62.5ms intervals regardless of display refresh rate.
//   Each interval calls setCount() → React re-renders counter every 16ms.
//   With 8 counters animating simultaneously = 8 × 60 = 480 state updates/second.
//
// Fix:
//   - Replace setInterval with requestAnimationFrame + timestamp-based progress
//   - Frame-synced → matches browser's 60Hz/120Hz refresh cycle
//   - Single rAF callback drives animation, auto-cancels on completion
//   - MilestoneCard wrapped in React.memo — static props, never re-renders
//     after mount (only AnimatedCounter updates)
// ─────────────────────────────────────────────────────────────────────────────

const MILESTONES = [
  { number: 30,  suffix: '+',  label: 'Daesang Awards',    icon: '🏆', color: '#FFD700', desc: 'Grand prizes at major music awards ceremonies' },
  { number: 10,  suffix: 'B+', label: 'YouTube Views',     icon: '📺', color: '#FF0000', desc: 'Total YouTube views across all channels' },
  { number: 7,   suffix: '',   label: 'Grammy Nominations', icon: '🎵', color: '#BF5AF2', desc: 'Recording Academy Grammy Award nominations' },
  { number: 120, suffix: 'K', label: 'Wembley Sold Out',   icon: '🏟️', color: '#00E5FF', desc: '120,000 fans over 2 nights at Wembley Stadium' },
  { number: 2,   suffix: '',   label: 'UN Speeches',        icon: '🌍', color: '#4CAF50', desc: 'Addressed the United Nations General Assembly' },
  { number: 100, suffix: 'M+', label: 'YouTube in 24h',    icon: '⚡',  color: '#FF9800', desc: 'Dynamite — fastest video to 100M views' },
  { number: 60,  suffix: '+',  label: 'Countries on Tour', icon: '✈️', color: '#2196F3', desc: 'Countries visited on world tours' },
  { number: 50,  suffix: 'M+', label: 'ARMY Worldwide',    icon: '💜', color: '#BF5AF2', desc: 'Estimated global ARMY fan base size' },
];

function AnimatedCounter({ target, suffix, isInView }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800; // ms
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
}

// memo: milestone data is static — card never re-renders after in-view triggers
const MilestoneCard = memo(function MilestoneCard({ milestone, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{
        padding: '28px 24px', borderRadius: 20,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${milestone.color}22`,
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={useCallback(e => { e.currentTarget.style.borderColor = `${milestone.color}55`; }, [milestone.color])}
      onMouseLeave={useCallback(e => { e.currentTarget.style.borderColor = `${milestone.color}22`; }, [milestone.color])}
    >
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${milestone.color}08 0%, transparent 60%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg, transparent, ${milestone.color}60, transparent)` }} />

      <div style={{ fontSize: 36, marginBottom: 12, filter: `drop-shadow(0 0 8px ${milestone.color}66)` }}>
        {milestone.icon}
      </div>

      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1, color: milestone.color, textShadow: `0 0 20px ${milestone.color}66`, marginBottom: 8 }}>
        <AnimatedCounter target={milestone.number} suffix={milestone.suffix} isInView={isInView} />
      </div>

      <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#F0E6FF', marginBottom: 8, letterSpacing: '0.02em' }}>
        {milestone.label}
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(196,168,232,0.5)', lineHeight: 1.5 }}>
        {milestone.desc}
      </div>
    </motion.div>
  );
});

export default function AchievementWall() {
  return (
    <section id="achievements" style={{ position: 'relative', zIndex: 2, padding: '100px 40px' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{ fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(255,215,0,0.5)', textTransform: 'uppercase', marginBottom: 16 }}>
          The Legacy
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#F0E6FF' }}>
          13 Years of Records
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: 'rgba(196,168,232,0.6)', maxWidth: 480, margin: '16px auto 0' }}>
          From a small Gangnam office to Wembley Stadium — every number tells a story.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
        {MILESTONES.map((m, i) => (
          <MilestoneCard key={m.label} milestone={m} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ maxWidth: 800, margin: '60px auto 0', textAlign: 'center', padding: '32px 40px', borderRadius: 24, background: 'rgba(191,90,242,0.05)', border: '1px solid rgba(191,90,242,0.2)', backdropFilter: 'blur(10px)' }}
      >
        <div style={{ position: 'relative', display: 'inline-block', fontSize: 40, marginBottom: 16 }}>
          🌍
          <HiddenHeart id={4} style={{ position: 'absolute', bottom: -5, right: -25, fontSize: '0.8rem' }} />
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#F0E6FF', marginBottom: 12 }}>
          "Music is something that always accompanies us, regardless of language or age."
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem', color: 'rgba(191,90,242,0.6)', letterSpacing: '0.1em' }}>
          — RM, United Nations General Assembly, 2018
        </div>
      </motion.div>
    </section>
  );
}
