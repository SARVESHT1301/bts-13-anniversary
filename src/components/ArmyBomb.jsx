import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

// High-performance canvas-based stadium light wave
function PurpleOceanCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 1000 stadium seats/light sticks
    const lightSticks = [];
    const stickCount = 800;

    for (let i = 0; i < stickCount; i++) {
      const x = Math.random() * width;
      // Position them mostly in the lower 70% of the screen like stadium seating
      const baseY = height * 0.35 + Math.random() * (height * 0.65);
      lightSticks.push({
        x,
        y: baseY,
        baseY,
        offset: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 0.6,
        size: 1.5 + Math.random() * 2,
        hue: 275 + Math.random() * 15, // Violet/purple range
        brightness: 0.3 + Math.random() * 0.4,
      });
    }

    let time = 0;
    const render = () => {
      ctx.fillStyle = 'rgba(4, 1, 13, 0.25)'; // slight tail blur
      ctx.fillRect(0, 0, width, height);

      time += 0.02;

      // Waving lightwave speed
      const waveX = (time * 180) % (width + 600) - 300;

      for (let i = 0; i < stickCount; i++) {
        const p = lightSticks[i];

        // Organic crowd sway
        const sway = Math.sin(time * p.speed + p.offset) * 8;
        const currentY = p.baseY + sway;

        // Calculate wave glow
        const dist = Math.abs(p.x - waveX);
        let waveGlow = 0;
        if (dist < 250) {
          waveGlow = (1 - dist / 250) * 0.95;
        }

        const size = p.size * (1 + waveGlow * 1.5);
        const opacity = (p.brightness + waveGlow * 0.6) * 0.85;

        // Draw glowing dot
        ctx.beginPath();
        ctx.arc(p.x, currentY, size, 0, Math.PI * 2);
        
        // Soft violet/neon purple color
        ctx.fillStyle = `hsla(${p.hue}, 95%, 70%, ${opacity})`;
        ctx.fill();

        // Extra glowing core for bright wave particles
        if (waveGlow > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x, currentY, size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${waveGlow * 0.8})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0, // Behind main content
        pointerEvents: 'none',
      }}
    />
  );
}

// Floating ARMY Bomb Widget
export default function ArmyBomb() {
  const { purpleOceanActive, togglePurpleOcean } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    togglePurpleOcean();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2200);
  };

  return (
    <>
      {/* Concert Canvas Overlay */}
      <AnimatePresence>
        {purpleOceanActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
          >
            <PurpleOceanCanvas />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Widget */}
      <div
        style={{
          position: 'fixed',
          bottom: 105,
          left: 24,
          zIndex: 100,
        }}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                left: 64,
                top: 8,
                background: 'rgba(123, 47, 190, 0.9)',
                border: '1px solid rgba(191, 90, 242, 0.4)',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: '0.72rem',
                fontFamily: 'Outfit, sans-serif',
                color: '#fff',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                pointerEvents: 'none',
              }}
            >
              {purpleOceanActive ? "Purple Ocean Light Up! 💜" : "Purple Ocean Dimmed"}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.12, rotate: 12 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 0.2 },
            rotate: { duration: 0.2 }
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: purpleOceanActive 
              ? 'linear-gradient(135deg, #BF5AF2, #7B2FBE)' 
              : 'rgba(7, 3, 22, 0.85)',
            border: `1px solid ${purpleOceanActive ? '#FFD700' : 'rgba(191, 90, 242, 0.3)'}`,
            boxShadow: purpleOceanActive
              ? '0 0 25px rgba(191, 90, 242, 0.8), 0 0 40px rgba(191,90,242,0.4)'
              : '0 8px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            zIndex: 101,
            transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
          }}
        >
          {/* Custom SVG resembling the iconic BTS Army Bomb */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* The spherical bulb */}
            <circle cx="12" cy="9" r="6" stroke={purpleOceanActive ? '#fff' : '#BF5AF2'} strokeWidth="1.8" fill={purpleOceanActive ? 'rgba(255,255,255,0.3)' : 'rgba(191,90,242,0.1)'} />
            {/* Red tip led */}
            <circle cx="12" cy="3" r="1.2" fill="#FF3B30" />
            {/* The handle bar */}
            <rect x="11.1" y="14" width="1.8" height="7" rx="0.5" fill={purpleOceanActive ? '#fff' : '#BF5AF2'} />
            {/* Connection ring */}
            <rect x="10.2" y="14" width="3.6" height="1" rx="0.2" fill={purpleOceanActive ? '#FFD700' : '#7B6A9B'} />
          </svg>
        </motion.button>
      </div>
    </>
  );
}
