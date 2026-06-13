import { useState, useMemo, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { HiddenHeart } from './MemoryHunt';

/* Polaroid-style masonry gallery */
const GALLERY_ITEMS = [
  {
    id: 1,
    label: 'Debut Stage 2013',
    image: '/gallery/memories/debut-stage-2013.webp',
    rotate: -3,
  },
  {
    id: 2,
    label: 'Boy In Luv 2014',
    image: '/gallery/memories/boy-in-luv-2014.webp',
    rotate: 2,
  },
  {
    id: 3,
    label: 'HYYH Era 2015',
    image: '/gallery/memories/hyyh-era-2015.webp',
    rotate: -1.5,
  },
  {
    id: 4,
    label: 'Wings Era 2016',
    image: '/gallery/memories/wings-era-2016.webp',
    rotate: 3,
  },
  {
    id: 5,
    label: 'DNA Era 2017',
    image: '/gallery/memories/dna-era-2017.webp',
    rotate: -2,
  },
  {
    id: 6,
    label: 'UN Speech 2018',
    image: '/gallery/memories/un-speech-2018.webp',
    rotate: 1.5,
  },
  {
    id: 7,
    label: 'Wembley Stadium 2019',
    image: '/gallery/memories/wembley-2019.webp',
    rotate: -2.5,
  },
  {
    id: 8,
    label: 'Dynamite 2020',
    image: '/gallery/memories/dynamite-2020.webp',
    rotate: 2.5,
  },
  {
    id: 9,
    label: 'Butter Summer 2021',
    image: '/gallery/memories/butter-summer-2021.webp',
    rotate: -1,
  },
  {
    id: 10,
    label: 'Yet To Come 2022',
    image: '/gallery/memories/yet-to-come-2022.webp',
    rotate: 1,
  },
  {
    id: 11,
    label: 'Solo Journeys 2023',
    image: '/gallery/memories/solo-journeys-2023.webp',
    rotate: -3,
  },
  {
    id: 12,
    label: 'Army Forever 💜',
    image: '/gallery/memories/army-forever.webp',
    rotate: 2,
  },
];

const GalleryImage = memo(function GalleryImage({ image, label }) {
  return (
    <div
      style={{
        width: '100%',
        height: '320px',
        overflow: 'hidden',
        position: 'relative',
        background: '#111',
      }}
    >
      <img
        src={image}
        alt={label}
        loading="lazy"
        onError={(e) => {
          console.log("Image failed:", image);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '24px 12px 12px',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: '0.8rem',
            textAlign: 'center',
            display: 'block',
            fontWeight: '500',
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
});


function Lightbox({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(4,1,13,0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#F5F0E8', padding: 20, borderRadius: 2, paddingBottom: 60,
          maxWidth: '80vmin', maxHeight: '90vh',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      >
        <GalleryImage image={item.image} label={item.label} />
        <div style={{
          marginTop: 12, fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem',
          color: '#4A3A5A', textAlign: 'center', letterSpacing: '0.05em',
        }}>
          {item.label}
        </div>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)',
          border: 'none', color: '#fff', width: 32, height: 32, borderRadius: '50%',
          fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>×</button>
      </motion.div>
    </motion.div>
  );
}

export default function MemoryGallery() {
  const [activeItem, setActiveItem] = useState(null);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numCols = width <= 576 ? 1 : width <= 992 ? 2 : 3;

  const cols = useMemo(() => {
    const c = Array.from({ length: numCols }, () => []);
    GALLERY_ITEMS.forEach((item, i) => c[i % numCols].push(item));
    return c;
  }, [numCols]);

  return (
    <section id="gallery" style={{ position: 'relative', zIndex: 2, padding: '100px 40px' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <div style={{ position: 'relative', display: 'inline-block', fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'rgba(191,90,242,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
          Memory Wall
          <HiddenHeart id={3} style={{ position: 'absolute', top: -4, right: -25, fontSize: '0.8rem' }} />
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 400, fontStyle: 'italic', color: '#F0E6FF' }}>
          Moments We'll Never Forget
        </h2>
        <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: 'rgba(196,168,232,0.6)', marginTop: 16, maxWidth: 400, margin: '16px auto 0' }}>
          Snapshots from 13 years of memories, laughter, and purple love.
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gap: 20,
        maxWidth: 1000,
        margin: '0 auto',
      }}>
        {cols.map((col, colIdx) => (
          <div
            key={colIdx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginTop: (numCols > 1 && colIdx === 1) ? 32 : 0,
            }}
          >
            {col.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveItem(item)}
                className="polaroid"
                style={{
                  // translate3d forces GPU layer; rotate preserves visual
                  transform: `translate3d(0,0,0) rotate(${item.rotate}deg)`,
                  willChange: 'transform',
                }}
              >
                <GalleryImage image={item.image} label={item.label} />
                <div style={{
                  paddingTop: 8, fontFamily: 'Outfit', fontSize: '0.65rem',
                  color: '#7B6A9B', textAlign: 'center', letterSpacing: '0.05em',
                }}>
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && <Lightbox item={activeItem} onClose={() => setActiveItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
