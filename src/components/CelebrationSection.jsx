import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HiddenHeart } from './MemoryHunt';

const MEMBERS = [
  { name: 'RM',      color: '#7B2FBE', emoji: '🦁', role: 'Leader, Rapper' },
  { name: 'Jin',     color: '#FF6B9D', emoji: '🌸', role: 'Vocalist, Visual' },
  { name: 'Suga',    color: '#BF5AF2', emoji: '🐱', role: 'Rapper, Producer' },
  { name: 'J-Hope',  color: '#FFD700', emoji: '🌟', role: 'Rapper, Dancer' },
  { name: 'Jimin',   color: '#FF9B9B', emoji: '✨', role: 'Vocalist, Dancer' },
  { name: 'V',       color: '#00E5FF', emoji: '🎨', role: 'Vocalist, Actor' },
  { name: 'Jungkook',color: '#E8B4FF', emoji: '🐰', role: 'Main Vocalist' },
];

export default function CelebrationSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  const FINAL_WORDS = "Forever, We Purple You 💜".split('');

  return (
    <section
      ref={sectionRef}
      id="celebration"
      style={{ position: 'relative', zIndex: 2, minHeight: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 40px', overflow: 'hidden' }}
    >
      {/* Background aurora */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(100,20,200,0.2) 0%, transparent 70%)',
        animation: 'aurora-shift 15s ease-in-out infinite',
      }} />

      {/* Member Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 80, textAlign: 'center', width: '100%' }}
      >
        <div style={{ position: 'relative', display: 'inline-block', fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(191,90,242,0.5)', textTransform: 'uppercase', marginBottom: 32 }}>
          The 7
          <HiddenHeart id={7} style={{ position: 'absolute', top: -3, right: -20, fontSize: '0.75rem' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', maxWidth: 900, margin: '0 auto' }}>
          {MEMBERS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.05 }}
              style={{
                padding: '20px 20px', borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${m.color}33`,
                backdropFilter: 'blur(8px)',
                textAlign: 'center', minWidth: 90,
                transition: 'border-color 0.3s',
                willChange: 'transform',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${m.color}88`}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${m.color}33`}
            >
              <div style={{ fontSize: 36, marginBottom: 8, filter: `drop-shadow(0 0 8px ${m.color}66)` }}>{m.emoji}</div>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                color: m.color, marginBottom: 4, textShadow: `0 0 10px ${m.color}44`,
              }}>{m.name}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: 'rgba(196,168,232,0.4)', lineHeight: 1.4 }}>{m.role}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glowing BTS Logo */}
      <motion.div
        style={{ y, opacity }}
        initial={false}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 48, position: 'relative' }}
        >
          {/* Outer glow rings */}
          {[300, 220, 160].map((size, i) => (
            <div key={i} style={{
              position: 'absolute', top: '50%', left: '50%',
              width: size, height: size,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: `1px solid rgba(191,90,242,${0.05 + i * 0.03})`,
              animation: `pulse-glow ${4 + i * 1.5}s ease-in-out ${i * 0.5}s infinite`,
            }} />
          ))}

          <div style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800,
            fontSize: 'clamp(60px, 12vw, 120px)',
            letterSpacing: '-0.02em', lineHeight: 1,
            background: 'linear-gradient(135deg, #E8B4FF 0%, #BF5AF2 40%, #7B2FBE 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(191,90,242,0.6))',
          }}>
            BTS
          </div>
          <div style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem',
            letterSpacing: '0.4em', color: 'rgba(191,90,242,0.5)',
            textTransform: 'uppercase', marginTop: 8,
          }}>
            Bang Tan Sonyeondan
          </div>
        </motion.div>
      </motion.div>

      {/* Main Quote */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        style={{ textAlign: 'center', maxWidth: 700, marginBottom: 64 }}
      >
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontWeight: 400,
          color: '#F0E6FF', lineHeight: 1.5,
          textShadow: '0 0 30px rgba(191,90,242,0.3)',
        }}>
          "We are not seven with you,<br />we are one."
        </div>
      </motion.div>

      {/* Final Ending Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 0,
        }}>
          {FINAL_WORDS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                background: 'linear-gradient(135deg, #BF5AF2 0%, #E8B4FF 50%, #FFD700 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 8px rgba(191,90,242,0.4))',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* 13 June 2026 Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ marginTop: 60, textAlign: 'center' }}
      >
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem',
          letterSpacing: '0.3em', color: 'rgba(191,90,242,0.4)',
          textTransform: 'uppercase',
        }}>
          13 June 2013 — 13 June 2026
        </div>
        <div style={{
          width: 60, height: 1, margin: '16px auto',
          background: 'linear-gradient(90deg, transparent, rgba(191,90,242,0.4), transparent)',
        }} />
        <div style={{ fontSize: 24, filter: 'drop-shadow(0 0 10px rgba(191,90,242,0.6))', animation: 'pulse-glow 3s ease-in-out infinite' }}>
          💜
        </div>
      </motion.div>
    </section>
  );
}
