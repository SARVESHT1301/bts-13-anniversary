import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
  "The best moment is yet to come.",
  "You never walk alone.",
  "We are together, forever bulletproof.",
  "No darkness lasts forever, spring will come back.",
  "If we are together, even a desert becomes a sea.",
  "We are not seven with you, we are one."
];

export default function FloatingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [position, setPosition] = useState({ top: '30%', left: '10%' });

  useEffect(() => {
    // Show a quote at random intervals
    const triggerQuote = () => {
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      
      // Select random position (keeping it safe within viewport edges)
      const randomTop = 15 + Math.random() * 65; // 15% - 80%
      const randomLeft = 10 + Math.random() * 60; // 10% - 70%
      
      setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
      setCurrentQuote(randomQuote);

      // Hide after 6 seconds
      setTimeout(() => {
        setCurrentQuote(null);
      }, 6000);
    };

    // Initial delay before first quote
    const initialDelay = setTimeout(() => {
      triggerQuote();
    }, 12000);

    // Loop at random intervals (every 22 to 35 seconds)
    const interval = setInterval(() => {
      triggerQuote();
    }, 28000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {currentQuote && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.35, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            zIndex: 3, // Sit behind major content but in front of particle layers
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#F0E6FF',
            textShadow: '0 0 12px rgba(191, 90, 242, 0.4)',
            maxWidth: 320,
            pointerEvents: 'none', // user can click through it
            userSelect: 'none',
          }}
        >
          "{currentQuote}"
        </motion.div>
      )}
    </AnimatePresence>
  );
}
