import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Journey',      href: '#timeline' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'Legacy',       href: '#achievements' },
  { label: '13 Candles',   href: '#candles' },
  { label: 'Celebration',  href: '#celebration' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Logo */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 800,
          fontSize: '1.2rem', letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #E8B4FF, #BF5AF2)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 10px rgba(191,90,242,0.4))',
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        <span>💜</span>
        <span>BTS</span>
        <span style={{ fontWeight: 300, fontSize: '0.9rem', color: 'rgba(191,90,242,0.5)', WebkitTextFillColor: 'rgba(191,90,242,0.5)' }}>
          13
        </span>
      </div>

      {/* Mobile menu toggle and overlay */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Desktop Links */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none',
                fontFamily: 'Outfit, sans-serif', fontWeight: 400, fontSize: '0.8rem',
                color: 'rgba(240,230,255,0.5)', letterSpacing: '0.05em',
                padding: '6px 12px', borderRadius: 20,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#BF5AF2';
                e.currentTarget.style.background = 'rgba(191,90,242,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(240,230,255,0.5)';
                e.currentTarget.style.background = 'none';
              }}
            >
              {link.label}
            </button>
          ))}

          {/* FESTA badge */}
          <div style={{
            marginLeft: 8, padding: '5px 14px', borderRadius: 20,
            background: 'rgba(191,90,242,0.12)',
            border: '1px solid rgba(191,90,242,0.25)',
            fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.7rem',
            color: 'rgba(191,90,242,0.8)', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            FESTA 2026
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-toggle-mobile"
          style={{
            background: 'none', border: 'none',
            color: '#F0E6FF', fontSize: '1.6rem',
            display: 'none', alignItems: 'center', justifyContent: 'center',
            cursor: 'none', zIndex: 1001,
            padding: 8,
          }}
        >
          {isOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(4, 1, 13, 0.5)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '80%', maxWidth: 280,
              background: 'rgba(7, 3, 22, 0.95)',
              borderLeft: '1px solid var(--glass-border)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              padding: '100px 24px 40px',
              display: 'flex', flexDirection: 'column', gap: 16,
              zIndex: 1000,
              boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  scrollTo(link.href);
                  setIsOpen(false);
                }}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 500, fontSize: '1.05rem',
                  color: 'rgba(240,230,255,0.7)', letterSpacing: '0.05em',
                  textAlign: 'left', padding: '12px 16px', borderRadius: 12,
                  transition: 'all 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#BF5AF2';
                  e.currentTarget.style.background = 'rgba(191,90,242,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(240,230,255,0.7)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                {link.label}
              </button>
            ))}

            <div style={{
              marginTop: 'auto', padding: '12px 16px', borderRadius: 20,
              background: 'rgba(191,90,242,0.12)',
              border: '1px solid rgba(191,90,242,0.25)',
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.75rem',
              color: 'rgba(191,90,242,0.8)', letterSpacing: '0.1em',
              textTransform: 'uppercase', textAlign: 'center',
            }}>
              FESTA 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
