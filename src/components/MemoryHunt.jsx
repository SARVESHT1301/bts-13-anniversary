import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import confetti from 'canvas-confetti';

export const MEMORIES = {
  1: {
    title: "The Debut Stage (2013)",
    text: "On June 13, 2013, seven boys walked onto the stage with 'No More Dream', carrying immense dreams, determination, and fire. They chose to speak for youth, starting a story that would change the music world forever.",
    date: "June 13, 2013",
    emoji: "🎓"
  },
  2: {
    title: "The Most Beautiful Moment in Life (2015)",
    text: "The 'HYYH' era spoke directly to the anxieties, dreams, and burning passions of youth. It taught us that youth is not defined by age, but by the fire in our hearts, reminding us that we never walk alone.",
    date: "April 29, 2015",
    emoji: "🌸"
  },
  3: {
    title: "Young Forever at Wembley (2019)",
    text: "ARMYs filled the historic Wembley Stadium and surprised BTS by singing 'Young Forever' back to them. A sea of purple lights, tears of gratitude, and a promise that we will stand by each other forever.",
    date: "June 2, 2019",
    emoji: "💜"
  },
  4: {
    title: "Dynamite Hot 100 #1 (2020)",
    text: "In a time when the world stood still, 'Dynamite' brought explosive color, hope, and joy. Landing BTS their first Billboard Hot 100 Number 1, it proved that their music transcends borders and brings global healing.",
    date: "August 31, 2020",
    emoji: "✨"
  },
  5: {
    title: "Lighting the Candles (2026)",
    text: "Each lit candle is a symbol of another year shared in this beautiful journey. 13 years of tears, laughter, growth, and the unbreakable bond between BTS and ARMY.",
    date: "June 13, 2026",
    emoji: "🕯️"
  },
  6: {
    title: "The Power of Music & Healing",
    text: "Through lyrics that touch the soul and melodies that heal the broken, their music became our refuge. A gentle reminder that 'Life Goes On' and that we will always find our way back home.",
    date: "Nostalgic Memory",
    emoji: "🎶"
  },
  7: {
    title: "The Eternal Purple Promise",
    text: "FESTA represents a yearly homecoming. A celebration of what we've built, a thank you for the present, and a deep belief that the best moment is indeed yet to come. Apobangpo 💜",
    date: "Anniversary Promise",
    emoji: "🌌"
  }
};

export function HiddenHeart({ id, style }) {
  const { foundHearts, discoverHeart } = useStore();
  const isFound = foundHearts.includes(id);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isFound) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x, y },
        colors: ['#BF5AF2', '#7B2FBE', '#E8B4FF'],
        ticks: 60,
      });
    }
    discoverHeart(id);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.4 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'absolute',
        background: 'none',
        border: 'none',
        padding: 4,
        fontSize: '1rem',
        cursor: 'none',
        opacity: isFound ? 0.95 : 0.2,
        filter: isFound 
          ? 'drop-shadow(0 0 10px rgba(191,90,242,0.9))' 
          : 'drop-shadow(0 0 3px rgba(191,90,242,0.4))',
        animation: isFound ? 'pulse-glow 1.5s ease-in-out infinite' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s, filter 0.3s',
        zIndex: 5,
        ...style,
      }}
    >
      💜
    </motion.button>
  );
}

export default function MemoryHunt() {
  const { foundHearts, activeMemoryId, setActiveMemoryId } = useStore();
  const totalHearts = 7;
  const allFound = foundHearts.length === totalHearts;
  const activeMemory = activeMemoryId ? MEMORIES[activeMemoryId] : null;

  return (
    <>
      {/* Progress HUD at bottom-left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 0.6 }}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 100,
          background: 'rgba(7, 3, 22, 0.85)',
          border: '1px solid rgba(191,90,242,0.2)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.8rem',
          color: '#F0E6FF',
        }}
      >
        <span style={{ fontSize: '1.2rem', animation: 'float-gentle 2.5s ease-in-out infinite' }}>💜</span>
        <div>
          <span style={{ fontWeight: 600, color: allFound ? '#FFD700' : '#BF5AF2' }}>
            {foundHearts.length} / {totalHearts} Memories
          </span>
          <div style={{
            fontSize: '0.65rem',
            color: 'rgba(196,168,232,0.5)',
            marginTop: 2,
          }}>
            {allFound ? 'All Memories Discovered! 🎉' : 'Search for hidden purple hearts'}
          </div>
        </div>
      </motion.div>

      {/* Memory Details Modal Popup */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemoryId(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 2100,
              background: 'rgba(4, 1, 13, 0.88)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(13, 5, 33, 0.92)',
                border: '1px solid rgba(191, 90, 242, 0.35)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 30px rgba(191,90,242,0.15)',
                borderRadius: 24,
                maxWidth: 480,
                width: '100%',
                padding: '36px 30px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveMemoryId(null)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'none',
                  border: 'none',
                  color: 'rgba(240, 230, 255, 0.4)',
                  fontSize: 24,
                  cursor: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(240, 230, 255, 0.4)'}
              >
                ×
              </button>

              <div style={{ fontSize: 52, marginBottom: 16, filter: 'drop-shadow(0 0 10px rgba(191,90,242,0.5))' }}>
                {activeMemory.emoji}
              </div>
              
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#BF5AF2',
                marginBottom: 8,
              }}>
                {activeMemory.date}
              </div>

              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.9rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#F0E6FF',
                marginBottom: 16,
                letterSpacing: '0.02em',
              }}>
                {activeMemory.title}
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.94rem',
                lineHeight: 1.6,
                color: 'rgba(240, 230, 255, 0.8)',
                marginBottom: 28,
              }}>
                {activeMemory.text}
              </p>

              <button
                onClick={() => setActiveMemoryId(null)}
                className="btn-purple"
                style={{ fontSize: '0.8rem', padding: '10px 28px' }}
              >
                Keep Exploring 💜
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
