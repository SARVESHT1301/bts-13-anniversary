import { useRef, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import useStore from '../store/useStore';
import { HiddenHeart } from './MemoryHunt';

function Flame() {
  return (
    <div style={{ position: 'relative', height: 30, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      {/* Outer flame */}
      <div className="candle-flame">
        <div className="candle-flame-inner" />
      </div>
    </div>
  );
}

// Pre-computed stable heart positions — avoids Math.random() on every re-render
const CELEBRATION_HEARTS = Array.from({ length: 20 }, (_, i) => ({
  left:     `${(i * 4.7 + 3) % 90}%`,
  fontSize: `${16 + (i % 5) * 5}px`,
  duration: `${3 + (i % 4)}s`,
  delay:    `${((i * 11) % 200) / 100}s`,
  tx:       `${((i % 7) - 3) * 26}px`,
}));

// memo: re-renders only when isLit changes
const Candle = memo(function Candle({ id, isLit, onLight }) {
  const height = 60 + (id % 4) * 8; // vary heights

  return (
    <motion.div
      className="candle-wrapper"
      onClick={() => !isLit && onLight(id)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{ position: 'relative', willChange: 'transform' }}
    >
      {/* Number */}
      <div style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 700,
        fontSize: '0.7rem', color: isLit ? 'rgba(191,90,242,0.8)' : 'rgba(191,90,242,0.3)',
        marginBottom: 4, transition: 'color 0.4s',
        letterSpacing: '0.05em',
      }}>
        {id}
      </div>

      {/* Flame (only if lit) */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Flame />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wick */}
      <div className="candle-wick" />

      {/* Candle body */}
      <div
        className={`candle-body${isLit ? ' lit' : ''}`}
        style={{ height }}
      >
        {/* Wax drips */}
        {isLit && (
          <>
            <div className="candle-drip" style={{ left: 4, height: 8, top: 0 }} />
            <div className="candle-drip" style={{ right: 5, height: 5, top: 0 }} />
          </>
        )}
      </div>

      {/* Base */}
      <div style={{
        width: 28, height: 6, borderRadius: '0 0 4px 4px',
        background: 'linear-gradient(to bottom, #B8934A, #8A6A30)',
      }} />

      {/* Click hint */}
      {!isLit && (
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: -20,
            fontFamily: 'Inter', fontSize: '0.6rem',
            color: 'rgba(191,90,242,0.5)', whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}
        >
          tap
        </motion.div>
      )}
    </motion.div>
  );
}); // end memo(Candle)

function CelebrationOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        background: 'rgba(4,1,13,0.75)',
        backdropFilter: 'blur(8px)',
        borderRadius: 32,
      }}
    >
      {/* Floating hearts */}
      {CELEBRATION_HEARTS.map((h, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: h.left,
          bottom: '-5%',
          fontSize: h.fontSize,
          animation: `float-up ${h.duration} ease-in ${h.delay} infinite`,
          '--tx': h.tx,
          pointerEvents: 'none',
          zIndex: 11,
          filter: 'drop-shadow(0 0 6px rgba(191,90,242,0.7))',
        }}>
          💜
        </div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ textAlign: 'center', padding: '40px 60px', position: 'relative', zIndex: 12 }}
      >
        <div style={{ fontSize: 64, marginBottom: 20, filter: 'drop-shadow(0 0 20px rgba(191,90,242,0.8))' }}>💜</div>
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem',
          letterSpacing: '0.3em', color: 'rgba(191,90,242,0.6)',
          textTransform: 'uppercase', marginBottom: 16,
        }}>
          From
        </div>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#F0E6FF',
          lineHeight: 1.3, marginBottom: 8,
        }}>
          13 June 2013
        </div>
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '0.8rem',
          letterSpacing: '0.3em', color: 'rgba(191,90,242,0.6)',
          textTransform: 'uppercase', margin: '16px 0',
        }}>
          To
        </div>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#F0E6FF',
          lineHeight: 1.3, marginBottom: 32,
        }}>
          13 June 2026
        </div>
        <div style={{
          width: '60%', height: 1, margin: '0 auto 32px',
          background: 'linear-gradient(90deg, transparent, rgba(191,90,242,0.5), transparent)',
        }} />
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700,
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          background: 'linear-gradient(135deg, #BF5AF2, #E8B4FF, #FFD700)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: 'none',
          letterSpacing: '0.05em',
        }}>
          Thank You BTS
        </div>
        <div style={{ fontSize: 32, marginTop: 16, animation: 'pulse-glow 2s ease-in-out infinite' }}>✨</div>
      </motion.div>
    </motion.div>
  );
}

const WISH_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left:     `${(i * 7.3 + 5) % 90}%`,
  fontSize: `${12 + (i % 4) * 4}px`,
  duration: `${4 + (i % 3)}s`,
  delay:    `${((i * 13) % 150) / 100}s`,
  tx:       `${((i % 5) - 2) * 20}px`,
}));

function WishOverlay({ step }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      style={{
        position: 'absolute', inset: 0, zIndex: 15,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        background: 'rgba(5, 1, 15, 0.96)',
        backdropFilter: 'blur(16px)',
        borderRadius: 32,
        overflow: 'hidden',
      }}
    >
      {/* Ambient soft glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(191,90,242,0.2) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {WISH_PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.left,
          bottom: '-5%',
          fontSize: p.fontSize,
          animation: `float-up ${p.duration} ease-in ${p.delay} infinite`,
          '--tx': p.tx,
          pointerEvents: 'none',
          opacity: 0.4,
          filter: 'drop-shadow(0 0 4px rgba(191,90,242,0.5))',
        }}>
          💜
        </div>
      ))}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontStyle: 'italic',
              color: '#F0E6FF',
              textAlign: 'center',
              letterSpacing: '0.05em',
              textShadow: '0 0 15px rgba(191,90,242,0.4)',
              zIndex: 2,
            }}
          >
            Make a Wish 💜
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontStyle: 'italic',
              color: '#F0E6FF',
              textAlign: 'center',
              letterSpacing: '0.05em',
              textShadow: '0 0 15px rgba(191,90,242,0.4)',
              zIndex: 2,
            }}
          >
            My wish already came true.
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 2
            }}
          >
            <h3 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontStyle: 'italic',
              color: '#FFD700',
              textAlign: 'center',
              letterSpacing: '0.05em',
              textShadow: '0 0 25px rgba(255,215,0,0.6)',
              fontWeight: 400,
            }}>
              It's you.
            </h3>
            <div style={{ fontSize: 24, animation: 'float-gentle 3s ease-in-out infinite' }}>💜</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CandlesSection() {
  const { litCandles, allLit, lightCandle, resetCandles } = useStore();
  const sectionRef = useRef(null);
  const celebratedRef = useRef(false);
  const [wishStep, setWishStep] = useState(0);

  const wishTimeout1 = useRef(null);
  const wishTimeout2 = useRef(null);
  const wishTimeout3 = useRef(null);

  // useCallback: stable reference prevents Candle.memo from busting
  const handleLight = useCallback((id) => {
    if (id === 13 && !litCandles.has(13)) {
      setWishStep(1);
      wishTimeout1.current = setTimeout(() => {
        setWishStep(2);
        wishTimeout2.current = setTimeout(() => {
          setWishStep(3);
          wishTimeout3.current = setTimeout(() => {
            lightCandle(13);
            const newSize = litCandles.size + 1;
            if (newSize === 13 && !celebratedRef.current) {
              celebratedRef.current = true;
              triggerConfetti();
            }
            setWishStep(0);
          }, 3500);
        }, 3200);
      }, 2800);
      return;
    }

    lightCandle(id);
    const newSize = litCandles.size + 1;
    if (newSize === 13 && !celebratedRef.current) {
      celebratedRef.current = true;
      triggerConfetti();
    }
  }, [litCandles, lightCandle]);

  const handleReset = useCallback(() => {
    if (wishTimeout1.current) clearTimeout(wishTimeout1.current);
    if (wishTimeout2.current) clearTimeout(wishTimeout2.current);
    if (wishTimeout3.current) clearTimeout(wishTimeout3.current);
    resetCandles();
    celebratedRef.current = false;
    setWishStep(0);
    confetti.reset();
  }, [resetCandles]);

  function triggerConfetti() {
    const colors = ['#BF5AF2', '#7B2FBE', '#FFD700', '#E8B4FF', '#9B4FE0', '#FFB6C1'];

    // Multiple bursts
    const burst = (origin, angle) => confetti({
      particleCount: 80,
      angle,
      spread: 70,
      origin,
      colors,
      scalar: 1.2,
      ticks: 200,
    });

    burst({ x: 0.3, y: 0.6 }, 60);
    setTimeout(() => burst({ x: 0.7, y: 0.6 }, 120), 200);
    setTimeout(() => burst({ x: 0.5, y: 0.5 }, 90), 400);
    setTimeout(() => confetti({
      particleCount: 150, spread: 360, origin: { x: 0.5, y: 0.5 },
      colors, scalar: 1.5, ticks: 300, gravity: 0.5,
    }), 700);
  }

  return (
    <section id="candles" style={{ position: 'relative', zIndex: 2, padding: '100px 40px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{ fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(191,90,242,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
          Make a Wish
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#F0E6FF' }}>
          Light 13 Candles
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: 'rgba(196,168,232,0.6)', marginTop: 16, maxWidth: 440, margin: '16px auto 0' }}>
          Each candle represents one year of BTS. Click to light them all and celebrate together.
        </p>
        {!allLit && (
          <div style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: 'rgba(191,90,242,0.5)', marginTop: 16 }}>
            {litCandles.size} / 13 candles lit 💜
          </div>
        )}
      </motion.div>

      {/* Candles Container */}
      <div
        ref={sectionRef}
        className="candles-container"
        style={{
          position: 'relative', maxWidth: 900, margin: '0 auto',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(191,90,242,0.1)',
          backdropFilter: 'blur(10px)',
          padding: '60px 40px', /* fallback default */
          borderRadius: 32, /* fallback default */
        }}
      >
        {/* Ambient glow when candles lit */}
        {litCandles.size > 0 && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 32, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 50% 80%, rgba(255,150,50,${Math.min(0.12, litCandles.size * 0.009)}) 0%, transparent 60%)`,
            transition: 'background 0.5s ease',
          }} />
        )}

        {/* Candles row */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'flex-end', flexWrap: 'wrap',
          gap: '12px var(--candle-gap, 20px)', paddingBottom: 24,
        }}>
          {Array.from({ length: 13 }, (_, i) => i + 1).map(id => (
            <Candle
              key={id}
              id={id}
              isLit={litCandles.has(id)}
              onLight={handleLight}
            />
          ))}
        </div>

        {/* Table surface */}
        <div style={{
          position: 'relative',
          height: 6, borderRadius: '0 0 4px 4px',
          background: 'linear-gradient(to bottom, rgba(191,90,242,0.1), rgba(123,47,190,0.05))',
          border: '1px solid rgba(191,90,242,0.15)',
          borderTop: 'none',
        }}>
          <HiddenHeart id={5} style={{ position: 'absolute', bottom: -12, right: 16, fontSize: '0.8rem' }} />
        </div>

        {/* Celebration overlay */}
        <AnimatePresence>
          {allLit && <CelebrationOverlay />}
        </AnimatePresence>

        {/* Special Wish Overlay */}
        <AnimatePresence>
          {wishStep > 0 && <WishOverlay step={wishStep} />}
        </AnimatePresence>
      </div>

      {/* Reset button */}
      {allLit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', marginTop: 32 }}
        >
          <button
            onClick={handleReset}
            className="btn-purple"
            style={{ fontSize: '0.8rem' }}
          >
            🕯️ Light Again
          </button>
        </motion.div>
      )}
    </section>
  );
}
