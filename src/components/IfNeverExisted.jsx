import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import useStore from '../store/useStore';

export default function IfNeverExisted() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });
  const [subStep, setSubStep] = useState(0); // 0: inactive, 1: imagine, 2: no ocean, 3: no spring day, 4: no memories, 5: thankfully, 6: exist!
  const { setVolume, setParticlesVisible } = useStore();

  useEffect(() => {
    if (!isInView) return;

    // Trigger blackout, volume lower, particles fade out
    setSubStep(1);
    setVolume(0.25);
    setParticlesVisible(false);

    // Sequence timing
    const t1 = setTimeout(() => setSubStep(2), 3500); // No Purple Ocean
    const t2 = setTimeout(() => setSubStep(3), 6500); // No Spring Day
    const t3 = setTimeout(() => setSubStep(4), 9500); // No Memories
    const t4 = setTimeout(() => setSubStep(5), 12500); // Thankfully...
    const t5 = setTimeout(() => {
      setSubStep(6);
      // Logo appears, purple spreads, stars return, volume normal
      setVolume(1.0);
      setParticlesVisible(true);
    }, 15500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [isInView, setVolume, setParticlesVisible]);

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
      {/* Blackout overlay (slow fade in) */}
      <AnimatePresence>
        {subStep >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: subStep < 6 ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000000',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Purple Glow Expansion when "they did exist" is true */}
      <AnimatePresence>
        {subStep === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(123,47,190,0.2) 0%, rgba(8,3,22,0.6) 60%, #04010D 100%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        )}
      </AnimatePresence>

      {/* Cinematic Text Rendering */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}>
        <AnimatePresence mode="wait">
          {subStep === 1 && (
            <motion.h2
              key="imagine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: '#F0E6FF',
                textShadow: '0 0 15px rgba(255,255,255,0.2)',
              }}
            >
              Imagine a world without BTS...
            </motion.h2>
          )}

          {subStep === 2 && (
            <motion.h2
              key="no-ocean"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'rgba(191,90,242,0.8)',
                textShadow: '0 0 15px rgba(191,90,242,0.4)',
              }}
            >
              No Purple Ocean.
            </motion.h2>
          )}

          {subStep === 3 && (
            <motion.h2
              key="no-spring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: '#F0E6FF',
                textShadow: '0 0 15px rgba(255,255,255,0.2)',
              }}
            >
              No Spring Day.
            </motion.h2>
          )}

          {subStep === 4 && (
            <motion.h2
              key="no-memories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'rgba(191,90,242,0.8)',
                textShadow: '0 0 15px rgba(191,90,242,0.4)',
              }}
            >
              No Memories.
            </motion.h2>
          )}

          {subStep === 5 && (
            <motion.h2
              key="thankfully"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                color: '#FFD700',
                textShadow: '0 0 20px rgba(255,215,0,0.4)',
              }}
            >
              Thankfully...
            </motion.h2>
          )}

          {subStep === 6 && (
            <motion.div
              key="exist"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#F0E6FF',
                  textShadow: '0 0 30px rgba(191,90,242,0.5)',
                  letterSpacing: '0.05em',
                  marginBottom: 10,
                }}
              >
                they did exist.
              </h2>

              {/* Glowing BTS Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1.8 }}
                style={{
                  position: 'relative',
                  width: 120,
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Glow Ring */}
                <div style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(191,90,242,0.25) 0%, transparent 70%)',
                  animation: 'pulse-glow 3s infinite alternate',
                }} />
                
                {/* Custom SVG logo representing BTS doors */}
                <svg width="60" height="72" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Door */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    d="M3 5.4L25 10.8V61.2L3 66.6V5.4Z" 
                    fill="rgba(191,90,242,0.2)" 
                    stroke="#BF5AF2" 
                    strokeWidth="2"
                  />
                  {/* Right Door */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    d="M57 5.4L35 10.8V61.2L57 66.6V5.4Z" 
                    fill="rgba(191,90,242,0.2)" 
                    stroke="#BF5AF2" 
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
