import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cute, friendly, wholesome BTS-inspired character
function AnimatedCharacter({ isWaving, isPointing }) {
  return (
    <div className="intro-character">
      <svg
        viewBox="0 0 300 400"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <radialGradient id="army-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8B4FF" stopOpacity="1" />
            <stop offset="50%" stopColor="#BF5AF2" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7B2FBE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Left Arm holding ARMY bomb */}
        <g id="left-arm">
          {/* Sleeve */}
          <path
            d="M100,220 Q80,245 75,265"
            stroke="#F5F0E8"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="75" cy="265" r="11" fill="#FFE5D9" />
          {/* ARMY Bomb */}
          {/* Handle */}
          <rect x="71" y="270" width="8" height="24" rx="2" fill="#1C1A27" />
          {/* Globe */}
          <circle
            cx="75"
            cy="255"
            r="14"
            fill="rgba(255, 255, 255, 0.85)"
            stroke="#1C1A27"
            strokeWidth="1.5"
          />
          {/* Red Fuse */}
          <circle cx="75" cy="240" r="2.5" fill="#FF3B30" />
          {/* Glow inside */}
          <circle
            cx="75"
            cy="255"
            r="8"
            fill="url(#army-glow)"
            style={{ animation: 'pulse-glow 1.5s infinite ease-in-out' }}
          />
        </g>

        {/* Body / Sweater */}
        <g id="body">
          {/* Neck */}
          <path d="M142,185 L142,205 L158,205 L158,185 Z" fill="#FFE5D9" />
          {/* Sweater body */}
          <path
            d="M100,220 C100,220 90,320 90,400 L210,400 C210,320 200,220 200,220 Z"
            fill="#F5F0E8"
          />
          {/* Collar */}
          <path
            d="M130,205 Q150,220 170,205"
            stroke="#BF5AF2"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Small Purple Heart on Sweater */}
          <path
            d="M150,245 C150,245 145,238 140,240 C135,242 138,250 150,258 C162,250 165,242 160,240 C155,238 150,245 150,245 Z"
            fill="#BF5AF2"
          />
        </g>

        {/* Head & Hair */}
        <g id="head-group">
          {/* Back Hair */}
          <path
            d="M90,140 Q150,80 210,140 Q215,200 210,210 Q150,225 90,210 Q85,200 90,140 Z"
            fill="#4C2B68"
          />
          {/* Space Buns */}
          {/* Left Bun */}
          <circle cx="95" cy="90" r="24" fill="#4C2B68" />
          <circle cx="95" cy="90" r="18" fill="#3D2154" />
          {/* Right Bun */}
          <circle cx="205" cy="90" r="24" fill="#4C2B68" />
          <circle cx="205" cy="90" r="18" fill="#3D2154" />
          {/* Face */}
          <circle cx="150" cy="145" r="50" fill="#FFE5D9" />
          {/* Cheeks Blush */}
          <ellipse
            cx="115"
            cy="158"
            rx="9"
            ry="4.5"
            fill="#FFB7B2"
            opacity="0.65"
          />
          <ellipse
            cx="185"
            cy="158"
            rx="9"
            ry="4.5"
            fill="#FFB7B2"
            opacity="0.65"
          />
          {/* Closed Smiling Eyes */}
          <path
            d="M115,145 Q125,137 132,146"
            stroke="#3D2154"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M168,146 Q175,137 185,145"
            stroke="#3D2154"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cute Mouth */}
          <path
            d="M146,164 Q150,170 154,164"
            stroke="#3D2154"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          {/* Front Hair / Bangs */}
          <path
            d="M96,130 Q150,105 204,130 Q200,110 150,105 Q100,110 96,130 Z"
            fill="#4C2B68"
          />
          {/* Bangs side strands */}
          <path
            d="M96,130 Q90,160 92,180"
            stroke="#4C2B68"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M204,130 Q210,160 208,180"
            stroke="#4C2B68"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Waving Right Arm (active in waving state) */}
        <AnimatePresence>
          {isWaving && (
            <motion.g
              id="waving-arm"
              key="waving-arm"
              style={{ originX: '200px', originY: '220px' }}
              initial={{ rotate: -20, opacity: 0 }}
              animate={{ rotate: [-6, 16, -6], opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                rotate: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                opacity: { duration: 0.3 },
              }}
            >
              {/* Sleeve */}
              <path
                d="M200,220 Q225,185 238,155"
                stroke="#F5F0E8"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand */}
              <circle cx="238" cy="155" r="11" fill="#FFE5D9" />
              {/* Wave lines micro-animation */}
              <motion.path
                d="M250,140 Q255,146 251,152"
                stroke="#BF5AF2"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: [0, 1, 0], x: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Pointing Right Arm (active in pointing state) */}
        <AnimatePresence>
          {isPointing && (
            <motion.g
              id="pointing-arm"
              key="pointing-arm"
              style={{ originX: '200px', originY: '220px' }}
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Sleeve */}
              <path
                d="M200,220 Q160,210 125,210"
                stroke="#F5F0E8"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand */}
              <circle cx="125" cy="210" r="11" fill="#FFE5D9" />
              {/* Pointing Finger */}
              <path
                d="M125,210 H105"
                stroke="#FFE5D9"
                strokeWidth="5.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sparkle tip */}
              <motion.circle
                cx="100"
                cy="210"
                r="5"
                fill="#E8B4FF"
                animate={{ scale: [0.8, 1.8, 0.8], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

// Simple robust typewriter text component
function Typewriter({ text, onComplete, delay = 0, speed = 60 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          if (onComplete) {
            timeoutId = setTimeout(onComplete, 1200); // pause briefly before completing
          }
        }
      }, speed);
      return () => clearInterval(interval);
    };

    const delayId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayId);
      clearTimeout(timeoutId);
    };
  }, [text, delay, speed]);

  return (
    <span className="typewriter-container">
      {displayedText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

// BTS Logo component
function BtsLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        width: 80,
        height: 80,
        filter: 'drop-shadow(0 0 20px rgba(191,90,242,0.85))',
        marginBottom: 32,
      }}
    >
      {/* Left door */}
      <path
        d="M 38 22 L 48 26 L 48 74 L 38 78 Z"
        fill="url(#logo-grad)"
      />
      {/* Right door */}
      <path
        d="M 62 22 L 52 26 L 52 74 L 62 78 Z"
        fill="url(#logo-grad)"
      />
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B4FF" />
          <stop offset="50%" stopColor="#BF5AF2" />
          <stop offset="100%" stopColor="#7B2FBE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function IntroLoader({ onComplete }) {
  // Steps:
  // 1: Dark Screen (1.2s)
  // 2: "Hey Bangtan Girl..." Typewriter
  // 3: Character slides in + Waves (waving waves for 1.8s)
  // 4a: "I have something special for you..." Typewriter
  // 4b: "Let's travel through 13 years of memories." Typewriter
  // 5: Character points, countdown 3 -> 2 -> 1
  // 6: Purple spread + Loading screen text reveals
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(3);
  const [loadingLinesReveal, setLoadingLinesReveal] = useState(0);

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Handle countdown step
  useEffect(() => {
    if (step === 5) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setStep(6);
            return 1;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Stagger loading screen text in step 6
  useEffect(() => {
    if (step === 6) {
      const interval = setInterval(() => {
        setLoadingLinesReveal((prev) => {
          if (prev < 5) {
            return prev + 1;
          } else {
            clearInterval(interval);
            // After all lines are revealed, hold for 2.5s then finish
            setTimeout(() => {
              onComplete();
            }, 2500);
            return 5;
          }
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [step, onComplete]);

  return (
    <div className="intro-overlay">
      <style>{`
        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #04010D;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          user-select: none;
        }
        .intro-text-wrapper {
          text-align: center;
          padding: 0 24px;
          max-width: 650px;
          z-index: 5;
          position: relative;
        }
        .intro-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 4.5vw, 38px);
          font-weight: 300;
          font-style: italic;
          color: #F0E6FF;
          line-height: 1.4;
          text-shadow: 0 0 15px rgba(191,90,242,0.4);
        }
        .typewriter-cursor {
          color: #BF5AF2;
          font-weight: 300;
          animation: blink-cursor 0.8s infinite;
          margin-left: 2px;
        }
        .intro-character {
          position: absolute;
          bottom: -20px;
          right: 10%;
          width: 280px;
          height: 380px;
          z-index: 10;
          pointer-events: none;
        }
        .purple-spread-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(191,90,242,0.85) 0%, rgba(123,47,190,0.5) 40%, rgba(4,1,13,0) 80%);
          filter: blur(15px);
          z-index: 2;
          pointer-events: none;
        }
        .loading-screen-line {
          margin: 12px 0;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .loading-screen-line.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .loading-line-date {
          font-family: 'Outfit', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.25em;
          color: rgba(191,90,242,0.85);
          text-transform: uppercase;
        }
        .loading-line-dream {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-style: italic;
          color: #F0E6FF;
        }
        .loading-line-boys {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-style: italic;
          color: #F0E6FF;
        }
        .loading-line-memories {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-style: italic;
          color: #F0E6FF;
        }
        .loading-line-welcome {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          color: #F0E6FF;
          text-shadow: 0 0 15px rgba(191,90,242,0.8);
          margin-top: 24px;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @media (max-width: 768px) {
          .intro-character {
            right: 50%;
            transform: translateX(50%);
            width: 210px;
            height: 280px;
            bottom: -10px;
          }
          .intro-text-wrapper {
            margin-bottom: 220px;
          }
        }
      `}</style>

      {/* Nebula ambient background (step 6) */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 40%, rgba(123,47,190,0.18) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(191,90,242,0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(191,90,242,0.08) 0%, transparent 40%), #04010D',
              zIndex: 1,
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="intro-text-wrapper">
        <AnimatePresence mode="wait">
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="intro-text"
            >
              <Typewriter text="💜 Hey Bangtan Girl..." onComplete={() => setStep(3)} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="intro-text"
              style={{ minHeight: '60px' }}
            >
              {/* Character slides in automatically. Pause briefly then start Step 4a */}
              <span />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4a"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="intro-text"
            >
              <Typewriter
                text="I have something special for you..."
                onComplete={() => setStep(4.5)}
              />
            </motion.div>
          )}

          {step === 4.5 && (
            <motion.div
              key="step4b"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="intro-text"
            >
              <Typewriter
                text="Let's travel through 13 years of memories."
                onComplete={() => setStep(5)}
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1.4, opacity: 1, rotate: 0 }}
                  exit={{ scale: 2.2, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(110px, 18vw, 220px)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #E8B4FF 0%, #BF5AF2 50%, #7B2FBE 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 25px rgba(191,90,242,0.85))',
                    position: 'absolute',
                  }}
                >
                  {countdown}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
              }}
            >
              <BtsLogo />

              <div className={`loading-screen-line loading-line-date ${loadingLinesReveal >= 1 ? 'visible' : ''}`}>
                June 13, 2013
              </div>

              <div className={`loading-screen-line loading-line-dream ${loadingLinesReveal >= 2 ? 'visible' : ''}`}>
                One dream.
              </div>

              <div className={`loading-screen-line loading-line-boys ${loadingLinesReveal >= 3 ? 'visible' : ''}`}>
                Seven boys.
              </div>

              <div className={`loading-screen-line loading-line-memories ${loadingLinesReveal >= 4 ? 'visible' : ''}`}>
                Millions of memories.
              </div>

              <div className={`loading-screen-line loading-line-welcome ${loadingLinesReveal >= 5 ? 'visible' : ''}`}>
                Welcome to 13 Years of BTS 💜
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating stars or background particles during initial steps */}
      {step < 6 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          <div className="purple-spread-glow" style={{ opacity: step >= 5 ? 0.3 : 0 }} />
        </div>
      )}

      {/* Character element (Steps 3, 4, 5) */}
      <AnimatePresence>
        {step >= 3 && step < 6 && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              if (step === 3) {
                // Wait 1.8 seconds of waving before showing the next message
                setTimeout(() => setStep(4), 1800);
              }
            }}
            style={{ position: 'absolute', zIndex: 10 }}
            className="intro-character"
          >
            <AnimatedCharacter
              isWaving={step >= 3 && step < 5}
              isPointing={step === 5}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial Purple Spread Light Transition */}
      <AnimatePresence>
        {step === 6 && (
          <motion.div
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 120, opacity: [0.9, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.1, 0.8, 0.2, 1] }}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #E8B4FF 0%, #BF5AF2 50%, transparent 90%)',
              zIndex: 99,
              pointerEvents: 'none',
              // Coordinates correspond to pointing finger tip relative to screen
              left: window.innerWidth <= 768 ? '50%' : '80%',
              top: window.innerWidth <= 768 ? '80%' : '75%',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
