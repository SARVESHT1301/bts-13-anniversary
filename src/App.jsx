import { useRef, useCallback, useEffect, useState } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';

import useLenis from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './components/FloatingParticles';
import EraBackground from './components/EraBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import MemoryGallery from './components/MemoryGallery';
import AchievementWall from './components/AchievementWall';
import CandlesSection from './components/CandlesSection';
import CelebrationSection from './components/CelebrationSection';
import MusicPlayer from './components/MusicPlayer';
import MemoryHunt from './components/MemoryHunt';
import FloatingQuotes from './components/FloatingQuotes';
import OneLastMemory from './components/OneLastMemory';
import FinalEnding from './components/FinalEnding';
import IfNeverExisted from './components/IfNeverExisted';
import CelebrationCountdown from './components/CelebrationCountdown';
import ArmyBomb from './components/ArmyBomb';
import useStore from './store/useStore';
import IntroLoader from './components/IntroLoader';

import './index.css';

// ─────────────────────────────────────────────────────────────────────────────
// PERFORMANCE FIX #1 (Critical)
// Previous: scroll listener called setScrollProgress(p) every frame
//   → entire App re-rendered on every scroll frame
// Fix: Use Framer Motion's useScroll() which returns a MotionValue.
//   The MotionValue is passed as a ref — EraBackground reads it imperatively
//   via useMotionValueEvent, updating only the era layer DOM nodes directly.
//   Zero React re-renders during scroll.
// ─────────────────────────────────────────────────────────────────────────────
function AppContent() {
  useLenis();
  const { scrollYProgress } = useScroll();
  const particlesVisible = useStore(state => state.particlesVisible);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Layer 0: Fixed GPU-accelerated backgrounds */}
      {particlesVisible && <FloatingParticles count={220} />}
      {/* Pass MotionValue directly — no prop drilling of changing numbers */}
      <EraBackground scrollProgressValue={scrollYProgress} />

      <div className="noise-overlay" />

      {/* Layer 1: Fixed UI (never re-renders from scroll) */}
      <CustomCursor />
      <Navbar />
      <MusicPlayer />
      <MemoryHunt />
      <FloatingQuotes />
      <ArmyBomb />

      {/* Layer 2: Scrollable Content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection />
        <TimelineSection />
        <MemoryGallery />
        <AchievementWall />
        <CandlesSection />
        <CelebrationSection />
        <OneLastMemory />
        <IfNeverExisted />
        <CelebrationCountdown />
        <FinalEnding />
      </main>

      {/* Bottom fade — static, never re-renders */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 60,
        background: 'linear-gradient(to top, rgba(4,1,13,0.9), transparent)',
        pointerEvents: 'none', zIndex: 1,
        willChange: 'unset', // static element, no will-change needed
      }} />
    </div>
  );
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!introComplete ? (
        <IntroLoader key="loader" onComplete={() => setIntroComplete(true)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <AppContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
