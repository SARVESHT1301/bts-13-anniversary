import { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiddenHeart } from './MemoryHunt';

const HEARTS = ['💜', '💜', '✦', '💜', '★', '💜', '✦', '💜', '💜', '★', '💜', '✦', '💜', '💜', '★'];

// Pre-computed at module level — Math.random() runs ONCE, not on every render
const HEART_DATA = HEARTS.map((_, i) => ({
  left:     `${5 + (i * 6.4) % 90}%`,
  size:     `${14 + (i * 3.7 % 12)}px`,
  tx:       `${((i % 11) - 5) * 10}px`,
  duration: `${4 + (i * 0.37 % 4)}s`,
  delay:    `${i * 0.4}s`,
}));

// memo: props are index-based constants — never re-renders after mount
const FloatingHeart = memo(function FloatingHeart({ index }) {
  const h = HEART_DATA[index];
  const style = {
    position: 'absolute',
    left: h.left,
    bottom: '-10%',
    fontSize: h.size,
    opacity: 0,
    '--tx': h.tx,
    animation: `float-up ${h.duration} ease-in ${h.delay} infinite`,
    pointerEvents: 'none',
    zIndex: 3,
    userSelect: 'none',
    filter: 'drop-shadow(0 0 6px rgba(191,90,242,0.7))',
  };
  return <span style={style}>{HEARTS[index % HEARTS.length]}</span>;
});

const BTS_LETTERS = ['B', 'T', 'S'];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0,1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Radial glow behind logo */}
      <motion.div
        style={{ y, opacity }}
        initial={false}
        animate={false}
      >
        {/* Ambient glow orb */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,47,190,0.25) 0%, rgba(123,47,190,0.05) 50%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
          zIndex: 1,
          animation: 'pulse-glow 4s ease-in-out infinite',
        }} />

        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 400, height: 400,
          borderRadius: '50%',
          border: '1px solid rgba(191,90,242,0.15)',
          boxShadow: '0 0 60px rgba(191,90,242,0.1), inset 0 0 60px rgba(191,90,242,0.05)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'pulse-glow 6s ease-in-out infinite 1s',
        }} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 20px' }}
      >
        {/* BTS Logo — Letter Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 24, display: 'flex', justifyContent: 'center', gap: 8 }}
        >
          {BTS_LETTERS.map((letter, i) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(80px, 15vw, 160px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                background: 'linear-gradient(135deg, #E8B4FF 0%, #BF5AF2 40%, #7B2FBE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(191,90,242,0.6))',
                display: 'block',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%', maxWidth: 320, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(191,90,242,0.7), transparent)',
            margin: '0 auto 24px',
          }}
        />

        {/* "13 Years With BTS" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-glow-purple"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(28px, 5vw, 56px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            color: '#F0E6FF',
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          13 Years With BTS
        </motion.h1>

        {/* Year Range */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(14px, 2.5vw, 20px)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            color: 'rgba(191,90,242,0.8)',
            textTransform: 'uppercase',
            marginBottom: 48,
          }}
        >
          2013 — 2026
        </motion.p>

        {/* Anniversary Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 24px',
            background: 'rgba(191,90,242,0.08)',
            border: '1px solid rgba(191,90,242,0.3)',
            borderRadius: 50,
            backdropFilter: 'blur(10px)',
            marginBottom: 64,
          }}
        >
          <span style={{ fontSize: 18 }}>💜</span>
          <span style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            color: 'rgba(240,230,255,0.7)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
            FESTA 2026 · 13th Anniversary
          </span>
          <span style={{ fontSize: 18 }}>💜</span>
        </motion.div>

        {/* Hidden Heart 1 */}
        <HiddenHeart id={1} style={{ position: 'absolute', top: -35, right: '10%' }} />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: 40,
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 5,
        }}
        className="scroll-indicator"
      >
        <span style={{ fontFamily: 'Outfit', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'rgba(191,90,242,0.5)', textTransform: 'uppercase' }}>
          Scroll to journey
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(191,90,242,0.6)', fontSize: 20 }}
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Floating Hearts */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 3 }}>
        {HEARTS.map((_, i) => (
          <FloatingHeart key={i} index={i} />
        ))}
      </div>
    </section>
  );
}
