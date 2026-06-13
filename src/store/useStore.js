import { create } from 'zustand';

const useStore = create((set, get) => ({
  // ── Candles ──
  litCandles: new Set(),
  allLit: false,
  lightCandle: (id) => {
    const current = new Set(get().litCandles);
    current.add(id);
    const allLit = current.size === 13;
    set({ litCandles: current, allLit });
  },
  resetCandles: () => set({ litCandles: new Set(), allLit: false }),

  // ── Era / Scene ──
  currentEra: 0,
  setEra: (index) => set({ currentEra: index }),

  // ── Music Player ──
  isPlaying: false,
  currentTrack: 0,
  playerMinimized: false,
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setTrack: (i) => set({ currentTrack: i }),
  toggleMinimized: () => set((s) => ({ playerMinimized: !s.playerMinimized })),

  // ── Lightbox ──
  lightboxImage: null,
  openLightbox: (img) => set({ lightboxImage: img }),
  closeLightbox: () => set({ lightboxImage: null }),

  // ── Cursor ──
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (x, y) => set({ cursorPos: { x, y } }),

  // ── Memory Hunt ──
  foundHearts: [],
  activeMemoryId: null,
  discoverHeart: (id) => {
    const current = get().foundHearts;
    if (!current.includes(id)) {
      set({ foundHearts: [...current, id], activeMemoryId: id });
    } else {
      set({ activeMemoryId: id });
    }
  },
  setActiveMemoryId: (id) => set({ activeMemoryId: id }),

  // ── Special Wish ──
  specialWishActive: false,
  setSpecialWishActive: (active) => set({ specialWishActive: active }),

  // ── Phase 2 States ──
  volume: 1.0,
  setVolume: (vol) => set({ volume: vol }),
  purpleOceanActive: false,
  togglePurpleOcean: () => set((s) => ({ purpleOceanActive: !s.purpleOceanActive })),
  particlesVisible: true,
  setParticlesVisible: (visible) => set({ particlesVisible: visible }),
}));

export default useStore;
