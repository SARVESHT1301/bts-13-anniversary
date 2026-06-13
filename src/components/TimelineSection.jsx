import { useRef, useMemo, useState, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { HiddenHeart } from './MemoryHunt';

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE FIX #3 (Critical — TimelineSection)
//
// Previous bottleneck:
//   vinylRotation.on('change', v => setRotDeg(v))  → React re-render every frame
//   scrollYProgress.on('change', v => setProgress(v)) → React re-render every frame
//   Result: All 14 TimelineCard + OrbitalYears re-rendered at 60 FPS
//
// Fixes applied:
//   1. Vinyl: <motion.div style={{ rotate: vinylRotation }} /> 
//      Framer Motion updates CSS transform directly without React re-rendering
//   2. activeIndex: tracked via ref; React state only updated when index CHANGES
//      (14 discrete steps, not 60 FPS continuous updates)
//   3. TimelineCard: wrapped in React.memo — only re-renders when isActive changes
//   4. OrbitalYears: wrapped in React.memo with stable activeIndex prop
//   5. All transform animations use translate3d for GPU compositor promotion
// ─────────────────────────────────────────────────────────────────────────────

export const ERAS = [
  { year: 2013, title: 'No More Dream',       era: '2013',          badge: '💫 Debut',  highlight: 'Dark Stage Lights' },
  { year: 2014, title: 'Boy In Luv',          era: '2014',          badge: '❤️ Growth',  highlight: 'School Trilogy' },
  { year: 2015, title: 'I Need U',            era: 'HYYH',          badge: '🌸 HYYH',   highlight: 'Cherry Blossom Petals' },
  { year: 2016, title: 'Blood Sweat & Tears', era: 'Wings',         badge: '🪶 Wings',  highlight: 'White Feathers Fall' },
  { year: 2017, title: 'DNA',                 era: 'Love Yourself', badge: '🧬 DNA',    highlight: 'Galaxy Universe' },
  { year: 2018, title: 'Fake Love',           era: 'Love Yourself', badge: '💔 Hurt',   highlight: 'Love Yourself: Tear' },
  { year: 2019, title: 'Boy With Luv',        era: 'Map of Soul',   badge: '💜 ARMY',   highlight: 'Wembley Stadium' },
  { year: 2020, title: 'Dynamite',            era: 'BE',            badge: '🎇 Neon',   highlight: 'Retro Neon Glory' },
  { year: 2021, title: 'Butter',              era: 'Permission',    badge: '🧈 Gold',   highlight: 'Golden Era' },
  { year: 2022, title: 'Yet To Come',         era: 'Proof',         badge: '🏆 Proof',  highlight: 'The Most Beautiful' },
  { year: 2023, title: 'Chapter 2',           era: 'Chapter 2',     badge: '📖 Solo',   highlight: 'Solo Journeys Begin' },
  { year: 2024, title: 'Solo Journey',        era: 'Solo Era',      badge: '⭐ Solos',  highlight: 'Each Member Shines' },
  { year: 2025, title: 'Reunion',             era: 'Return',        badge: '🔄 Return', highlight: 'Coming Home' },
  { year: 2026, title: 'Arirang',             era: 'FESTA 2026',    badge: '💜 13th',   highlight: 'Cosmic Purple Universe' },
];

const ACHIEVEMENTS = {
  2013: ['Debut on Big Hit', 'First Music Show'],
  2014: ['First Win on Music Show'],
  2015: ['HYYH Trilogy Begins', '1st Muster Fan Meeting'],
  2016: ['Wings – Top 26 Billboard 200', '3rd Muster'],
  2017: ['DNA – 1st on Billboard Hot 100 Artist', 'AMAs Appearance'],
  2018: ['Love Yourself Tour', 'UN General Assembly Speech', '1st Grammy Performance'],
  2019: ['Boy With Luv ft. Halsey', 'Wembley Stadium – 120k fans'],
  2020: ['Dynamite – 1st US No.1', 'GRAMMY Nominated', '100M YouTube Views in 24h'],
  2021: ['Butter – 9 Weeks No.1', 'Permission to Dance at the UN'],
  2022: ['Yet To Come – Busan World Expo', 'Proof Anthology'],
  2023: ['J-Hope Lollapalooza', 'Jimin – Set Me Free Pt.2'],
  2024: ['All 7 members with Solo Albums', 'Military Service'],
  2025: ['Jin Returns', 'Group Reunites'],
  2026: ['13th Anniversary FESTA', "Arirang – Nation's Song"],
};

// Static groove data computed once at module level (not in render)
const GROOVES = Array.from({ length: 18 }, (_, i) => ({ r: 40 + i * 12, op: 0.08 + i * 0.01 }));

// Pre-computed orbital positions (never changes)
const ORBITAL_ITEMS = ERAS.map((era, i) => {
  const angle = (i / ERAS.length) * 360 - 90;
  const rad = (angle * Math.PI) / 180;
  const r = 230;
  return { ...era, x: Math.cos(rad) * r, y: Math.sin(rad) * r };
});

// ── VinylDisc: static structure, rotation driven by motion value via CSS ──
// memo: This component's props (vinylRotation MotionValue) don't change →
// re-renders only if parent forces it. The rotate animation is CSS-only.
const VinylDisc = memo(function VinylDisc({ vinylRotation }) {
  return (
    // CRITICAL: style={{ rotate: vinylRotation }} lets Framer Motion update
    // CSS transform directly on the DOM node — zero React re-renders
    <motion.div
      style={{
        rotate: vinylRotation, // MotionValue → direct CSS update
        width: 380, height: 380,
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #0a0a0a 0deg, #1a1a1a 10deg, #0f0f0f 20deg, #151515 30deg, #0a0a0a 360deg)',
        boxShadow: `
          0 0 0 2px rgba(255,255,255,0.05),
          0 0 40px rgba(123,47,190,0.3),
          0 0 80px rgba(123,47,190,0.15),
          inset 0 0 20px rgba(0,0,0,0.8)
        `,
        willChange: 'transform',
        position: 'relative',
        flexShrink: 0,
        // GPU layer promotion
        transform: 'translate3d(0,0,0)',
      }}
    >
      {GROOVES.map((g, i) => (
        <div key={i} className="vinyl-groove" style={{ width: g.r * 2, height: g.r * 2, opacity: g.op }} />
      ))}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'conic-gradient(from 120deg, transparent 0deg, rgba(255,255,255,0.04) 40deg, transparent 80deg)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate3d(-50%,-50%,0)',
        width: 90, height: 90, borderRadius: '50%',
        background: 'radial-gradient(circle, #7B2FBE 0%, #4A1B8A 60%, #2A0D50 100%)',
        boxShadow: '0 0 20px rgba(191,90,242,0.6), 0 0 40px rgba(191,90,242,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2, animation: 'pulse-glow 3s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22,
          color: '#F0E6FF', letterSpacing: '-0.02em',
          textShadow: '0 0 10px rgba(240,230,255,0.6)', userSelect: 'none',
        }}>BTS</span>
      </div>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate3d(-50%,-50%,0)',
        width: 14, height: 14, borderRadius: '50%',
        background: '#0a0a0a', zIndex: 3,
      }} />
    </motion.div>
  );
});

// ── OrbitalYears: memo — only re-renders when activeIndex changes (14 steps) ──
const OrbitalYears = memo(function OrbitalYears({ activeIndex }) {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
      {ORBITAL_ITEMS.map((item, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={item.year}
            style={{
              position: 'absolute',
              left: item.x, top: item.y,
              transform: 'translate3d(-50%, -50%, 0)',
              textAlign: 'center',
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          >
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: isActive ? '13px' : '10px',
              fontWeight: isActive ? 700 : 400,
              color: isActive ? '#BF5AF2' : 'rgba(192,168,232,0.4)',
              lineHeight: 1.2,
              textShadow: isActive ? '0 0 10px rgba(191,90,242,0.8)' : 'none',
              transition: 'color 0.4s ease, font-size 0.3s ease, font-weight 0.3s ease',
              whiteSpace: 'nowrap',
            }}>
              <div>{item.year}</div>
              {isActive && (
                <div style={{ fontSize: '9px', color: 'rgba(191,90,242,0.7)', marginTop: 2 }}>
                  {item.title}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

// ── TimelineCard: memo — only re-renders when isActive changes ──
const TimelineCard = memo(function TimelineCard({ era, index, isActive }) {
  const achievements = useMemo(() => ACHIEVEMENTS[era.year] || [], [era.year]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 4 }}
      style={{
        display: 'flex', gap: 16, alignItems: 'flex-start',
        marginBottom: 20,
        willChange: 'transform',
        transform: 'translate3d(0,0,0)',
      }}
    >
      {/* Year Dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: 4 }}>
        <div style={{
          width: 12, height: 12, borderRadius: '50%',
          background: isActive ? '#BF5AF2' : 'rgba(191,90,242,0.3)',
          boxShadow: isActive ? '0 0 12px rgba(191,90,242,0.8), 0 0 24px rgba(191,90,242,0.4)' : 'none',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          flexShrink: 0,
        }} />
        <div style={{ width: 1, flex: 1, minHeight: 40, background: 'rgba(191,90,242,0.15)', margin: '4px 0' }} />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        style={{
          flex: 1, padding: '16px 20px', borderRadius: 16,
          background: isActive ? 'rgba(191,90,242,0.08)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isActive ? 'rgba(191,90,242,0.3)' : 'rgba(191,90,242,0.1)'}`,
          backdropFilter: 'blur(8px)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: isActive ? '#BF5AF2' : '#C4A8E8', display: 'block', lineHeight: 1, transition: 'color 0.3s' }}>
              {era.year}
            </span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.25rem', color: '#F0E6FF', fontWeight: 500, lineHeight: 1.2 }}>
              {era.title}
            </span>
          </div>
          <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(191,90,242,0.1)', border: '1px solid rgba(191,90,242,0.2)', color: 'rgba(191,90,242,0.8)', fontFamily: 'Outfit', fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
            {era.badge}
          </span>
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem', color: 'rgba(191,90,242,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          Era: {era.era}
        </div>
        {achievements.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {achievements.map((ach, j) => (
              <span key={j} style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: 10, background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)', color: 'rgba(255,215,0,0.7)', fontFamily: 'Inter', lineHeight: 1.4 }}>
                {ach}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

// ── Main Section ──
export default function TimelineSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // vinylRotation is a MotionValue — drives CSS transform directly, no state
  const vinylRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);

  // activeIndex: ref prevents every scroll tick updating state
  // State update only fires when the discrete era index actually CHANGES
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', useCallback((v) => {
    const next = Math.min(ERAS.length - 1, Math.round(v * (ERAS.length - 1) * 1.2));
    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next); // Only fires ~14 times total during scroll
    }
  }, []));

  const activeEra = ERAS[Math.min(ERAS.length - 1, activeIndex)];

  return (
    <section
      ref={sectionRef}
      id="timeline"
      style={{ position: 'relative', zIndex: 2, width: '100%', minHeight: '300vh', padding: '80px 0' }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 80, padding: '0 20px' }}
      >
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(191,90,242,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
          The Journey
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 400, fontStyle: 'italic', color: '#F0E6FF', lineHeight: 1.1, textShadow: '0 0 40px rgba(191,90,242,0.3)' }}>
          13 Years of Magic
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: 'rgba(196,168,232,0.6)', maxWidth: 480, margin: '16px auto 0' }}>
          From a small agency's debut to conquering the world — every year told a different story.
        </p>
      </motion.div>

      {/* Sticky Dual-Column Layout */}
      <div className="timeline-grid">
        {/* LEFT: Sticky Vinyl — no re-renders from scroll, rotation is GPU CSS */}
        <div className="timeline-sticky-vinyl">
          <div className="timeline-vinyl-wrapper" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', width: '100%', aspectRatio: '1', maxWidth: 480,
          }}>
            {/* VinylDisc receives MotionValue — rotation is pure CSS, no re-render */}
            <VinylDisc vinylRotation={vinylRotation} />
            {/* OrbitalYears re-renders only when activeIndex changes (~14 times) */}
            <OrbitalYears activeIndex={activeIndex} />
          </div>

          {/* Era display: keyed by activeIndex → animates on change only */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: 'center', marginTop: 24 }}
          >
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#BF5AF2', textShadow: '0 0 20px rgba(191,90,242,0.5)' }}>
              {activeEra?.title}
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', color: 'rgba(191,90,242,0.5)', marginTop: 4, letterSpacing: '0.15em' }}>
              {activeEra?.era} · {activeEra?.highlight}
            </div>
          </motion.div>

          {/* Hidden Heart 2 */}
          <HiddenHeart id={2} style={{ bottom: -20, left: 10 }} />
        </div>

        {/* RIGHT: Timeline Cards — each memo'd, re-renders only on isActive change */}
        <div style={{ paddingTop: 40, paddingBottom: 80 }}>
          {ERAS.map((era, i) => (
            <TimelineCard
              key={era.year}
              era={era}
              index={i}
              isActive={activeIndex === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
