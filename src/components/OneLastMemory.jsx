import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTER_TEXT = `Dearest ARMY,

Can you believe it has been 13 beautiful years? 

From the very first day we walked onto the stage, we had no idea where this path would lead. We were just seven boys who wanted to speak for youth, but you took us by the hand and turned our small voices into a galaxy.

Every concert, every smile, every single purple light in the crowd is etched into our hearts forever. Even when the stage goes dark and the music fades, we are never truly apart. Because we are not seven with you; we are one.

Thank you for being our youth, our strength, and our most beautiful moment. 

Until we meet again on the next flower path, keep shining. 

We Purple You. 💜

Yours always,
BTS`;

export default function OneLastMemory() {
  const [isOpen, setIsOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  return (
    <section id="last-memory" style={{ position: 'relative', zIndex: 3, padding: '120px 40px 60px', overflow: 'hidden' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{ fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(191,90,242,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
          One Last Memory
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#F0E6FF' }}>
          A Heartfelt Gift
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '1.02rem', color: 'rgba(196,168,232,0.6)', marginTop: 16, maxWidth: 440, margin: '16px auto 0' }}>
          We left a secret letter and a special gift box for you. Click either to open.
        </p>
      </motion.div>

      {/* Envelope & Letter Container */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400, position: 'relative' }}>
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 40, width: '100%' }}
            >
              {/* Envelope wrapper */}
              <motion.div
                key="closed-envelope"
                onClick={() => setIsOpen(true)}
                style={{
                  width: 320,
                  height: 220,
                  background: 'rgba(25, 12, 54, 0.75)',
                  border: '1px solid rgba(191, 90, 242, 0.25)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(191, 90, 242, 0.1)',
                  borderRadius: 16,
                  position: 'relative',
                  cursor: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(191,90,242,0.25)' }}
              >
                {/* Back Flap Visuals */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 16,
                  background: 'linear-gradient(210deg, transparent 49%, rgba(191,90,242,0.06) 50%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: 16,
                  background: 'linear-gradient(150deg, transparent 49%, rgba(191,90,242,0.06) 50%)',
                  pointerEvents: 'none',
                }} />

                {/* Glowing wax seal */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #7B2FBE, #52158c)',
                    border: '3px solid rgba(191, 90, 242, 0.6)',
                    boxShadow: '0 0 20px rgba(191, 90, 242, 0.8), inset 0 0 10px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    zIndex: 5,
                    userSelect: 'none',
                  }}
                >
                  💜
                </motion.div>

                <div style={{
                  position: 'absolute',
                  bottom: 20,
                  fontFamily: 'Outfit',
                  fontSize: '0.65rem',
                  color: 'rgba(191,90,242,0.5)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>
                  ARMY Letter
                </div>
              </motion.div>

              {/* Gift Box wrapper */}
              <motion.div
                key="closed-gift"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => setGiftOpen(true)}
                style={{
                  width: 320,
                  height: 220,
                  background: 'linear-gradient(135deg, rgba(74, 27, 138, 0.75), rgba(21, 6, 48, 0.85))',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(191, 90, 242, 0.35)',
                  borderRadius: 16,
                  position: 'relative',
                  cursor: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.02, y: -18, boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(191,90,242,0.4)' }}
              >
                {/* Gold Ribbon Visuals */}
                <div style={{
                  position: 'absolute', top: 0, bottom: 0, width: 16,
                  background: 'linear-gradient(to right, #FFD700, #B8934A, #FFD700)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: 16,
                  background: 'linear-gradient(to bottom, #FFD700, #B8934A, #FFD700)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />

                {/* Box Lid Visual */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 35,
                  background: 'rgba(95, 39, 176, 0.95)',
                  borderBottom: '2px solid rgba(255, 215, 0, 0.4)',
                  borderRadius: '16px 16px 0 0',
                  pointerEvents: 'none',
                  zIndex: 2,
                }} />

                {/* Glowing Heart Seal */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #FFD700, #B8934A)',
                    boxShadow: '0 0 15px rgba(255, 215, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    zIndex: 3,
                    userSelect: 'none',
                  }}
                >
                  🎁
                </motion.div>

                <div style={{
                  position: 'absolute',
                  bottom: 20,
                  fontFamily: 'Outfit',
                  fontSize: '0.65rem',
                  color: '#FFD700',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  zIndex: 3,
                }}>
                  Special Gift
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Open Unfolded Letter Display */
            <motion.div
              key="open-letter"
              className="open-letter-container"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              style={{
                width: '100%',
                maxWidth: 600,
                background: '#FAF6F0',
                backgroundImage: 'radial-gradient(#f0e6d2 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                border: '1px solid rgba(123, 47, 190, 0.15)',
                borderRadius: 12,
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(191, 90, 242, 0.1)',
                padding: '40px 32px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Soft purple highlight on letter */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none',
                background: 'radial-gradient(circle at 50% 10%, rgba(191, 90, 242, 0.04) 0%, transparent 60%)',
              }} />

              {/* Close/Fold Letter Button */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'none',
                  border: 'none',
                  color: '#7B6A9B',
                  fontSize: 24,
                  cursor: 'none',
                  transition: 'color 0.2s',
                  zIndex: 6,
                }}
                onMouseEnter={(e) => e.target.style.color = '#7B2FBE'}
                onMouseLeave={(e) => e.target.style.color = '#7B6A9B'}
              >
                ×
              </button>

              {/* Letter Text Content */}
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                lineHeight: 1.7,
                color: '#2E2245',
                whiteSpace: 'pre-line',
                maxHeight: 450,
                overflowY: 'auto',
                paddingRight: 10,
                zIndex: 2,
              }}>
                {LETTER_TEXT}
              </div>

              {/* Soft visual detail at bottom */}
              <div style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: 'rgba(123, 47, 190, 0.4)',
                borderTop: '1px dashed rgba(123, 47, 190, 0.15)',
                paddingTop: 16,
              }}>
                <span>∞</span>
                <span>ARMY Forever</span>
                <span>∞</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gift Card Modal Overlay */}
      <AnimatePresence>
        {giftOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGiftOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2200,
              background: 'rgba(4, 1, 13, 0.94)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            {/* Ambient gold-purple glowing background spot */}
            <div style={{
              position: 'absolute',
              width: 500, height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(123,47,190,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(45px)',
            }} />

            {/* Sparkles / Particles around the card */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 150 }}
                  animate={{ 
                    opacity: [0, 0.85, 0], 
                    y: -250, 
                    x: [0, (i % 2 === 0 ? 40 : -40), 0] 
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 3, 
                    repeat: Infinity,
                    delay: Math.random() * 2.5
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: `${15 + Math.random() * 70}%`,
                    fontSize: 16 + Math.random() * 12,
                    color: i % 2 === 0 ? '#FFD700' : '#BF5AF2',
                    filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.5))',
                  }}
                >
                  {i % 3 === 0 ? '✦' : i % 3 === 1 ? '✨' : '💜'}
                </motion.div>
              ))}
            </div>

            {/* The Gift Card Wrapper */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.6, opacity: 0, y: 60 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                background: 'rgba(13, 5, 33, 0.95)',
                border: '2px solid rgba(255, 215, 0, 0.45)', // glowing gold frame
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 45px rgba(255, 215, 0, 0.35)',
                borderRadius: 24,
                padding: 12,
                maxWidth: '90vw',
                maxHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Card Image */}
              <img
                src="/gift-card/card.webp"
                alt="BTS Special Surpise Card"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: 440,
                  maxHeight: '72vh',
                  borderRadius: 16,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              {/* Close Button */}
              <button
                onClick={() => setGiftOpen(false)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  color: '#fff',
                  width: 32, height: 32, borderRadius: '50%',
                  fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  cursor: 'none',
                }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
