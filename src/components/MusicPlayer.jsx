import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiddenHeart } from './MemoryHunt';
import useStore from '../store/useStore';

const TRACKS = [
  {
    title: 'No More Dream',
    year: '2013',
    duration: '3:52',
    emoji: '🎓',
    file: '/audio/no-more-dream.mp3'
  },
  {
    title: 'Boy In Luv',
    year: '2014',
    duration: '3:50',
    emoji: '🏫',
    file: '/audio/boy-in-luv.mp3'
  },
  {
    title: 'I Need U',
    year: '2015',
    duration: '3:37',
    emoji: '🌸',
    file: '/audio/i-need-u.mp3'
  },
  {
    title: 'Blood Sweat & Tears',
    year: '2016',
    duration: '3:37',
    emoji: '🦋',
    file: '/audio/blood-sweat-tears.mp3'
  },
  {
    title: 'DNA',
    year: '2017',
    duration: '3:43',
    emoji: '🧬',
    file: '/audio/dna.mp3'
  },
  {
    title: 'Fake Love',
    year: '2018',
    duration: '3:58',
    emoji: '💔',
    file: '/audio/fake-love.mp3'
  },
  {
    title: 'ON',
    year: '2020',
    duration: '4:06',
    emoji: '⚔️',
    file: '/audio/on.mp3'
  },
  {
    title: 'Dynamite',
    year: '2020',
    duration: '3:19',
    emoji: '✨',
    file: '/audio/dynamite.mp3'
  },
  {
    title: 'Butter',
    year: '2021',
    duration: '2:44',
    emoji: '🧈',
    file: '/audio/butter.mp3'
  },
  {
    title: 'Yet To Come',
    year: '2022',
    duration: '3:07',
    emoji: '🌅',
    file: '/audio/yet-to-come.mp3'
  },
  {
    title: 'Seven',
    year: '2024',
    duration: '3:14',
    emoji: '⭐',
    file: '/audio/seven.mp3'
  },
  {
    title: 'Spring Day',
    year: '2025',
    duration: '4:41',
    emoji: '💜',
    file: '/audio/spring-day.mp3'
  },
  {
    title: 'Like Animals',
    year: '2026',
    duration: '3:15',
    emoji: '🎉',
    file: '/audio/like-animals.mp3'
  },
  {
  title: 'Body To Body',
  year: '2026',
  duration: '3:12',
  emoji: '🕺',
  file: '/audio/body-to-body.mp3'
},
{
  title: 'Hooligan',
  year: '2026',
  duration: '2:58',
  emoji: '😈',
  file: '/audio/hooligan.mp3'
},
{
  title: 'FYA',
  year: '2026',
  duration: '3:08',
  emoji: '🔥',
  file: '/audio/fya.mp3'
},
{
  title: 'SWIM',
  year: '2026',
  duration: '3:25',
  emoji: '🌊',
  file: '/audio/swim.mp3'
},
{
  title: 'They Dont Know bout Us',
  year: '2026',
  duration: '3:40',
  emoji: '💫',
  file: '/audio/they-dont-know-bout-us.mp3'
},
{
  title: 'Normal',
  year: '2026',
  duration: '3:18',
  emoji: '🌙',
  file: '/audio/normal.mp3'
},
{
  title: 'Please',
  year: '2026',
  duration: '3:30',
  emoji: '🥀',
  file: '/audio/please.mp3'
},
{
  title: 'Into The Sun',
  year: '2026',
  duration: '3:45',
  emoji: '☀️',
  file: '/audio/into-the-sun.mp3'
}
];

function EqualizerBars({ isPlaying }) {
  const BAR_COUNT = 5;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: isPlaying ? undefined : 4,
            background: 'linear-gradient(to top, #BF5AF2, #E8B4FF)',
            borderRadius: 2,
            '--min-h': '3px',
            '--max-h': `${8 + Math.random() * 12}px`,
            animation: isPlaying ? `eq-bar ${0.4 + i * 0.07}s ease-in-out ${i * 0.05}s infinite alternate` : 'none',
            transform: isPlaying ? undefined : 'none',
          }}
        />
      ))}
    </div>
  );
}

function MiniVinyl({ isPlaying, trackIndex }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
      background: 'conic-gradient(from 0deg, #0a0a0a 0deg, #1a1a1a 10deg, #0f0f0f 20deg, #0a0a0a 360deg)',
      border: '1px solid rgba(191,90,242,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: isPlaying ? 'vinyl-spin 3s linear infinite' : 'none',
      willChange: 'transform',
      boxShadow: '0 0 10px rgba(191,90,242,0.2)',
      position: 'relative',
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%',
        background: 'radial-gradient(circle, #7B2FBE, #4A1B8A)',
        boxShadow: '0 0 8px rgba(191,90,242,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 8,
      }}>
        {TRACKS[trackIndex]?.emoji}
      </div>
    </div>
  );
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [showList, setShowList] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate progress
  const progressRef = useRef(null);
  const audioRef = useRef(null);
  const volume = useStore(state => state.volume);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      clearInterval(progressRef.current);
      setIsPlaying(false);
    } else {
      audioRef.current.play();

      progressRef.current = setInterval(() => {
        const audio = audioRef.current;

        if (!audio) return;

        const percent =
          (audio.currentTime / audio.duration) * 100;

        setProgress(percent || 0);

        if (audio.ended) {
          nextTrack();
        }
      }, 100);

      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setCurrentTrack(t => (t + 1) % TRACKS.length);
    setProgress(0);
  };
  const prevTrack = () => {
    setCurrentTrack(t => (t - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const track = TRACKS[currentTrack];

  useEffect(() => {
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <>
      <motion.div
        className="music-player"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: minimized ? 0 : 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MiniVinyl isPlaying={isPlaying} trackIndex={currentTrack} />
            {!minimized && (
              <div>
                <div style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem',
                  color: '#F0E6FF', lineHeight: 1.2,
                  maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {track.title}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: 'rgba(191,90,242,0.6)', marginTop: 1, position: 'relative', display: 'inline-block' }}>
                  BTS · {track.year}
                  <HiddenHeart id={6} style={{ position: 'absolute', top: -1, right: -18, fontSize: '0.65rem' }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {!minimized && <EqualizerBars isPlaying={isPlaying} />}
            <button
              onClick={() => setMinimized(m => !m)}
              style={{
                background: 'none', border: 'none', color: 'rgba(191,90,242,0.5)',
                fontSize: 14, padding: 4, lineHeight: 1, borderRadius: 4,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = '#BF5AF2'}
              onMouseLeave={e => e.target.style.color = 'rgba(191,90,242,0.5)'}
            >
              {minimized ? '▲' : '▼'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar */}
              <div style={{
                height: 3, borderRadius: 2, background: 'rgba(191,90,242,0.15)',
                marginBottom: 12, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7B2FBE, #BF5AF2)',
                  borderRadius: 2, transition: 'width 0.1s linear',
                }} />
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <button onClick={prevTrack} style={{ background: 'none', border: 'none', color: 'rgba(191,90,242,0.5)', fontSize: 18, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#BF5AF2'} onMouseLeave={e => e.target.style.color = 'rgba(191,90,242,0.5)'}>
                  ⏮
                </button>
                <button
                  onClick={handlePlay}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7B2FBE, #BF5AF2)',
                    border: 'none', color: '#fff', fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(191,90,242,0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(191,90,242,0.7)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(191,90,242,0.4)'; }}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button onClick={nextTrack} style={{ background: 'none', border: 'none', color: 'rgba(191,90,242,0.5)', fontSize: 18, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#BF5AF2'} onMouseLeave={e => e.target.style.color = 'rgba(191,90,242,0.5)'}>
                  ⏭
                </button>
                <button onClick={() => setShowList(s => !s)}
                  style={{ background: 'none', border: 'none', color: 'rgba(191,90,242,0.5)', fontSize: 14, transition: 'color 0.2s', marginLeft: 4 }}
                  onMouseEnter={e => e.target.style.color = '#BF5AF2'} onMouseLeave={e => e.target.style.color = 'rgba(191,90,242,0.5)'}>
                  ☰
                </button>
              </div>

              {/* Track List */}
              <AnimatePresence>
                {showList && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div 
                      className="playlist-scroll"
                      style={{
                        marginTop: 12,
                        paddingBottom: 20,
                      }}
                    >
                      {TRACKS.map((t, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setCurrentTrack(i);
                            setProgress(0);

                            if (isPlaying) {
                              setTimeout(() => {
                                audioRef.current?.play();
                              }, 100);
                            }
                          }}
                          style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '8px 12px', borderRadius: 8, marginBottom: 2,
                            background: currentTrack === i ? 'linear-gradient(90deg, rgba(191,90,242,0.25), rgba(191,90,242,0.08))' : 'transparent',
                            cursor: 'none', transition: 'background 0.2s',
                            fontFamily: 'Outfit, sans-serif', fontSize: '0.78rem',
                          }}
                          onMouseEnter={e => { if (currentTrack !== i) e.currentTarget.style.background = 'rgba(191,90,242,0.08)'; }}
                          onMouseLeave={e => { if (currentTrack !== i) e.currentTarget.style.background = 'transparent'; }}
                        >
                          <span style={{ color: currentTrack === i ? '#BF5AF2' : 'rgba(240,230,255,0.6)' }}>
                            {t.emoji} {t.title}
                          </span>
                          <span style={{ color: 'rgba(191,90,242,0.4)', fontSize: '0.7rem' }}>{t.duration}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                )}
              </AnimatePresence>
            </motion.div>

          )}
        </AnimatePresence>
      </motion.div>

      <audio
        ref={audioRef}
        src={track.file}
        preload="none"
      />
    </>
  );
}
