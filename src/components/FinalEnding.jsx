import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';

const ENDING_PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  left:     `${(i * 5.7 + 3) % 94}%`,
  size:     `${8 + (i % 4) * 4}px`,
  duration: `${6 + (i % 3) * 2}s`,
  delay:    `${(i * 0.3) % 4}s`,
  tx:       `${((i % 7) - 3) * 25}px`,
}));

const STARS = Array.from({ length: 40 }, (_, i) => ({
  top:  `${(i * 13 + 7) % 80}%`,
  left: `${(i * 19 + 3) % 90}%`,
  size: `${1 + (i % 3)}px`,
  delay: `${(i * 0.15) % 3}s`,
}));

export default function FinalEnding() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });
  const [step, setStep] = useState(0); // 0: initial, 1: Background shift, 2: Stars, 3: Story Continues, 4: 13 Years, 5: Final Memories
  const [constellationActive, setConstellationActive] = useState(false);

  const handleConstellationClick = () => {
    setConstellationActive(true);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#BF5AF2', '#7B2FBE', '#FFD700', '#FFFFFF'],
    });
    setTimeout(() => {
      setConstellationActive(false);
    }, 4000);
  };

  useEffect(() => {
    if (!isInView) return;

    // Phase 1: Background cosmic shift starts immediately
    setStep(1);

    // Phase 2: Stars fade in after 1.5s
    const t1 = setTimeout(() => {
      setStep(2);
    }, 1500);

    // Phase 3: "Our Story Continues..." appears after 3.2s
    const t2 = setTimeout(() => {
      setStep(3);
    }, 3200);

    // Phase 4: "13 Years With BTS" appears after 5.8s
    const t3 = setTimeout(() => {
      setStep(4);
    }, 5800);

    // Phase 5: "∞ Memories With You" + Confetti burst after 8.4s
    const t4 = setTimeout(() => {
      setStep(5);
      triggerEndingCelebration();
    }, 8400);

    // Phase 6: "Thank you BTS..." appears after 13.4s
    const t5 = setTimeout(() => {
      setStep(6);
    }, 13400);

    // Phase 7: "And thank you..." appears after 18.4s
    const t6 = setTimeout(() => {
      setStep(7);
    }, 18400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isInView]);

  function triggerEndingCelebration() {
    const colors = ['#BF5AF2', '#7B2FBE', '#FFD700', '#E8B4FF', '#E0A3FF'];
    // Cinematic side-sweeping confetti spray
    const end = Date.now() + 2500;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#04010D', // Default dark
        zIndex: 4,
      }}
    >
      {/* Cinematic Cosmic Night Sky Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        transition={{ duration: 3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, #150630 0%, #080314 60%, #040108 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Floating Particle Atmosphere */}
      {step >= 1 && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
          {ENDING_PARTICLES.map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: p.left,
              bottom: '-5%',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(191,90,242,0.3) 0%, transparent 80%)',
              animation: `float-up ${p.duration} ease-in ${p.delay} infinite`,
              '--tx': p.tx,
              opacity: 0.5,
              filter: 'drop-shadow(0 0 5px rgba(191,90,242,0.4))',
            }} />
          ))}
        </div>
      )}

      {/* Stars Overlay */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
        >
          {STARS.map((star, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                borderRadius: '50%',
                background: '#fff',
                opacity: 0.3,
                animation: `star-twinkle 3s infinite alternate ${star.delay}`,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Hidden Constellation (revealed when stars fade in) */}
      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 300,
            zIndex: 15,
            cursor: 'none',
          }}
          onClick={handleConstellationClick}
        >
          {/* Constellation SVG Lines */}
          <svg width="300" height="300" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Left Door */}
            <line 
              x1="90" y1="50" x2="135" y2="70" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
            <line 
              x1="135" y1="70" x2="135" y2="230" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
            <line 
              x1="135" y1="230" x2="90" y2="250" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
            <line 
              x1="90" y1="250" x2="90" y2="50" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />

            {/* Right Door */}
            <line 
              x1="210" y1="50" x2="165" y2="70" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
            <line 
              x1="165" y1="70" x2="165" y2="230" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
            <line 
              x1="165" y1="230" x2="210" y2="250" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
            <line 
              x1="210" y1="250" x2="210" y2="50" 
              stroke={constellationActive ? '#FFD700' : 'rgba(191,90,242,0.25)'} 
              strokeWidth={constellationActive ? 2.5 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
          </svg>

          {/* Star Nodes */}
          {[
            { x: 90, y: 50 }, { x: 135, y: 70 }, { x: 135, y: 230 }, { x: 90, y: 250 },
            { x: 210, y: 50 }, { x: 165, y: 70 }, { x: 165, y: 230 }, { x: 210, y: 250 }
          ].map((node, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: node.x - 4,
                top: node.y - 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: constellationActive ? '#FFD700' : '#fff',
                boxShadow: constellationActive 
                  ? '0 0 15px #FFD700, 0 0 25px rgba(255,215,0,0.8)' 
                  : '0 0 8px rgba(255,255,255,0.7)',
                pointerEvents: 'none',
                transition: 'background 0.4s, box-shadow 0.4s',
              }}
              animate={constellationActive ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 1.5, repeat: constellationActive ? Infinity : 0 }}
            />
          ))}
        </motion.div>
      )}

      {/* Floating Constellation Click Message */}
      <AnimatePresence>
        {constellationActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              background: 'linear-gradient(135deg, #FFD700 0%, #BF5AF2 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 25px rgba(191,90,242,0.6))',
              pointerEvents: 'none',
              textAlign: 'center',
              width: '90vw',
              maxWidth: 500,
            }}
          >
            "The Best Moment Is Yet To Come"
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Sequential Text Reveal */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 20px' }}>
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.h2
              key="text1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F0E6FF',
                textShadow: '0 0 30px rgba(191,90,242,0.4)',
                letterSpacing: '0.04em',
              }}
            >
              Our Story Continues...
            </motion.h2>
          )}

          {step === 4 && (
            <motion.h2
              key="text2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F0E6FF',
                textShadow: '0 0 30px rgba(191,90,242,0.4)',
                letterSpacing: '0.04em',
              }}
            >
              13 Years With BTS
            </motion.h2>
          )}

          {step === 5 && (
            <motion.div
              key="text3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #FFD700 0%, #BF5AF2 50%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(191,90,242,0.5))',
                  letterSpacing: '0.05em',
                  lineHeight: 1.2,
                }}
              >
                ∞ Memories With You
              </h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1, duration: 1 }}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(196,168,232,0.6)',
                  textTransform: 'uppercase',
                  marginTop: 12,
                }}
              >
                Apobangpo . Army Forever
              </motion.div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="text4"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F0E6FF',
                textShadow: '0 0 25px rgba(191,90,242,0.4)',
                letterSpacing: '0.03em',
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
              }}
            >
              Thank you BTS<br />for 13 unforgettable years.
            </motion.div>
          )}

          {step >= 7 && (
            <motion.div
              key="text5"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#F0E6FF',
                  textShadow: '0 0 25px rgba(191,90,242,0.4)',
                  letterSpacing: '0.03em',
                  lineHeight: 1.4,
                  margin: 0,
                }}
              >
                And thank you...<br />for being part of my story. 💜
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
