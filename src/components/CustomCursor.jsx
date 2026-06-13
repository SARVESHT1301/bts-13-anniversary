import { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';

/* Army Bomb style cursor with purple glow trail and sparkle click burst */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const trailsRef = useRef([]);
  const posRef    = useRef({ x: -100, y: -100 });
  const ringPos   = useRef({ x: -100, y: -100 });
  const rafId     = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Lerp ring position for smooth lag effect
  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const checkTouch = () => {
      const touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsTouch(touch);
      if (touch) {
        document.body.classList.add('touch-device');
      } else {
        document.body.classList.remove('touch-device');
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;


    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Instant cursor
      cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;

      // Spawn trail dot
      spawnTrailDot(e.clientX, e.clientY);
    }

    function animate() {
      // Smooth ring follows cursor
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12);
      ring.style.transform = `translate(${ringPos.current.x - 22}px, ${ringPos.current.y - 22}px)`;
      rafId.current = requestAnimationFrame(animate);
    }
    rafId.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('click', onClickBurst);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClickBurst);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  function spawnTrailDot(x, y) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:6px; height:6px; border-radius:50%;
      background:radial-gradient(circle, #BF5AF2, #7B2FBE);
      box-shadow:0 0 8px rgba(191,90,242,0.8);
      left:${x - 3}px; top:${y - 3}px;
      transform:scale(1); opacity:0.8;
      transition:transform 0.4s ease, opacity 0.4s ease;
      will-change:transform,opacity;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.transform = 'scale(0)';
      dot.style.opacity = '0';
    });
    setTimeout(() => dot.remove(), 400);
  }

  function onClickBurst(e) {
    // 8 heart/sparkle particles burst outward
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const dist  = 40 + Math.random() * 30;
      const dx    = Math.cos(angle) * dist;
      const dy    = Math.sin(angle) * dist;
      const particle = document.createElement('div');
      const symbols  = ['💜', '✦', '★', '♡'];
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.cssText = `
        position:fixed; pointer-events:none; z-index:9999;
        left:${e.clientX}px; top:${e.clientY}px;
        font-size:14px; user-select:none;
        transition:transform 0.5s ease, opacity 0.5s ease;
        will-change:transform,opacity;
      `;
      document.body.appendChild(particle);
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${dx}px, ${dy - 20}px) scale(0.4)`;
        particle.style.opacity = '0';
      });
      setTimeout(() => particle.remove(), 500);
    }

    // Purple ripple
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position:fixed; pointer-events:none; z-index:9998;
      left:${e.clientX - 20}px; top:${e.clientY - 20}px;
      width:40px; height:40px; border-radius:50%;
      border:2px solid rgba(191,90,242,0.7);
      animation:ripple 0.5s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  }

  if (isTouch) return null;

  return (
    <>
      {/* Inner cursor — Army Bomb */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 10000, pointerEvents: 'none',
          width: 16, height: 16, borderRadius: '50%',
          background: 'radial-gradient(circle, #E8B4FF, #BF5AF2)',
          boxShadow: '0 0 12px rgba(191,90,242,0.9), 0 0 24px rgba(191,90,242,0.4)',
          willChange: 'transform',
        }}
      />
      {/* Outer ring — lagged glow */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 9999, pointerEvents: 'none',
          width: 44, height: 44, borderRadius: '50%',
          border: '1.5px solid rgba(191,90,242,0.5)',
          boxShadow: '0 0 10px rgba(191,90,242,0.2)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
