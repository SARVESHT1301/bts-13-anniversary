import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const SPARKS = Array.from({ length: 30 }, (_, i) => ({
  left:     `${5 + (i * 7) % 90}%`,
  fontSize: `${14 + (i % 5) * 6}px`,
  duration: `${3 + (i % 3) * 1.5}s`,
  delay:    `${(i * 0.15) % 2.5}s`,
  tx:       `${((i % 5) - 2) * 35}px`,
}));

export default function CelebrationCountdown() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });
  const [countdownStep, setCountdownStep] = useState(0); // 0: inactive, 1: 3, 2: 2, 3: 1, 4: flash, 5: reveal 13 years!

  useEffect(() => {
    if (!isInView) return;

    // Start countdown sequence
    setCountdownStep(1); // Show '3'

    const t1 = setTimeout(() => setCountdownStep(2), 1200); // Show '2'
    const t2 = setTimeout(() => setCountdownStep(3), 2400); // Show '1'
    const t3 = setTimeout(() => {
      setCountdownStep(4); // Flash screen
      setTimeout(() => setCountdownStep(5), 250); // Reveal "13 Years"
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        background: '#04010D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 4,
      }}
    >
      {/* Background glow orb */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(191,90,242,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(50px)',
      }} />

      {/* Screen Flash Overlay */}
      <AnimatePresence>
        {countdownStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#E8B4FF',
              zIndex: 30,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 50px #fff)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Sparks in Reveal Stage */}
      {countdownStep === 5 && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
          {SPARKS.map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: s.left,
              bottom: '-5%',
              fontSize: s.fontSize,
              animation: `float-up ${s.duration} ease-in ${s.delay} infinite`,
              '--tx': s.tx,
              opacity: 0.6,
              filter: 'drop-shadow(0 0 5px rgba(191,90,242,0.5))',
            }}>
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Countdown Digits */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {countdownStep === 1 && (
            <motion.div
              key="3"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(8rem, 20vw, 15rem)',
                fontWeight: 800,
                color: '#F0E6FF',
                textShadow: '0 0 40px rgba(191,90,242,0.5)',
              }}
            >
              3
            </motion.div>
          )}

          {countdownStep === 2 && (
            <motion.div
              key="2"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(8rem, 20vw, 15rem)',
                fontWeight: 800,
                color: '#BF5AF2',
                textShadow: '0 0 40px rgba(191,90,242,0.6)',
              }}
            >
              2
            </motion.div>
          )}

          {countdownStep === 3 && (
            <motion.div
              key="1"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 100 }}
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(8rem, 20vw, 15rem)',
                fontWeight: 800,
                color: '#FFD700',
                textShadow: '0 0 40px rgba(255,215,0,0.6)',
              }}
            >
              1
            </motion.div>
          )}

          {countdownStep === 5 && (
            <motion.div
              key="reveal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #FFD700 0%, #E8B4FF 50%, #BF5AF2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(191,90,242,0.6))',
                  lineHeight: 1,
                  letterSpacing: '0.05em',
                  margin: 0,
                }}
              >
                13 Years With BTS
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                  letterSpacing: '0.4em',
                  color: 'rgba(240,230,255,0.7)',
                  textTransform: 'uppercase',
                  marginTop: 10,
                }}
              >
                Let The Celebration Begin
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
