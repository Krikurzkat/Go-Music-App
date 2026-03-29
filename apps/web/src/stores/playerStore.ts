import { create } from 'zustand';
import { Track } from '../data/types';
import { tracks } from '../data/tracks';

export type RepeatMode = 'off' | 'all' | 'one';

interface PlayerState {
  // Current playback
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0-100
  currentTime: number; // seconds
  duration: number;
  volume: number; // 0-100
  isMuted: boolean;

  // Queue
  queue: Track[];
  queueIndex: number;
  history: Track[];

  // Modes
  shuffle: boolean;
  repeat: RepeatMode;
  crossfade: number; // seconds

  // UI
  isFullscreen: boolean;
  showLyrics: boolean;
  showQueue: boolean;

  // Audio element ref
  audioRef: HTMLAudioElement | null;

  // Actions
  setAudioRef: (ref: HTMLAudioElement) => void;
  playTrack: (track: Track, context?: Track[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seekTo: (percent: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setCrossfade: (seconds: number) => void;
  toggleFullscreen: () => void;
  toggleLyrics: () => void;
  toggleQueue: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  reorderQueue: (from: number, to: number) => void;
  setProgress: (progress: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
  volume: 78,
  isMuted: false,

  queue: tracks.slice(0, 10),
  queueIndex: -1,
  history: [],

  shuffle: false,
  repeat: 'off',
  crossfade: 0,

  isFullscreen: false,
  showLyrics: false,
  showQueue: true,

  audioRef: null,

  setAudioRef: (ref) => set({ audioRef: ref }),

  playTrack: (track, context) => {
    const state = get();
    const audio = state.audioRef;

    let newQueue = state.queue;
    let newIndex = state.queueIndex;

    if (context && context.length > 0) {
      newQueue = state.shuffle ? shuffleArray(context) : context;
      newIndex = newQueue.findIndex(t => t.id === track.id);
      if (newIndex === -1) newIndex = 0;
    } else {
      const existingIndex = state.queue.findIndex(t => t.id === track.id);
      if (existingIndex !== -1) {
        newIndex = existingIndex;
      } else {
        newQueue = [track, ...state.queue];
        newIndex = 0;
      }
    }

    if (audio && track.audioUrl) {
      audio.src = track.audioUrl;
      audio.play().catch(() => {});
    }

    const history = state.currentTrack
      ? [state.currentTrack, ...state.history.slice(0, 49)]
      : state.history;

    set({
      currentTrack: track,
      isPlaying: true,
      progress: 0,
      currentTime: 0,
      queue: newQueue,
      queueIndex: newIndex,
      history,
    });
  },

  togglePlay: () => {
    const state = get();
    const audio = state.audioRef;
    if (!state.currentTrack) {
      // Play first track in queue
      if (state.queue.length > 0) {
        get().playTrack(state.queue[0], state.queue);
      }
      return;
    }
    if (state.isPlaying) {
      audio?.pause();
    } else {
      audio?.play().catch(() => {});
    }
    set({ isPlaying: !state.isPlaying });
  },

  pause: () => {
    get().audioRef?.pause();
    set({ isPlaying: false });
  },

  resume: () => {
    get().audioRef?.play().catch(() => {});
    set({ isPlaying: true });
  },

  nextTrack: () => {
    const state = get();
    const { queue, queueIndex, repeat } = state;
    if (queue.length === 0) return;

    let nextIndex: number;
    if (repeat === 'one') {
      nextIndex = queueIndex;
    } else if (queueIndex < queue.length - 1) {
      nextIndex = queueIndex + 1;
    } else if (repeat === 'all') {
      nextIndex = 0;
    } else {
      set({ isPlaying: false });
      return;
    }

    get().playTrack(queue[nextIndex], queue);
  },

  prevTrack: () => {
    const state = get();
    const { queue, queueIndex, currentTime } = state;

    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      const audio = state.audioRef;
      if (audio) audio.currentTime = 0;
      set({ progress: 0, currentTime: 0 });
      return;
    }

    if (queueIndex > 0) {
      get().playTrack(queue[queueIndex - 1], queue);
    }
  },

  seekTo: (percent) => {
    const state = get();
    const audio = state.audioRef;
    if (audio && audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration;
    }
    set({ progress: percent });
  },

  setVolume: (vol) => {
    const audio = get().audioRef;
    if (audio) audio.volume = vol / 100;
    set({ volume: vol, isMuted: vol === 0 });
  },

  toggleMute: () => {
    const state = get();
    const audio = state.audioRef;
    if (state.isMuted) {
      if (audio) audio.volume = state.volume / 100;
      set({ isMuted: false });
    } else {
      if (audio) audio.volume = 0;
      set({ isMuted: true });
    }
  },

  toggleShuffle: () => {
    const state = get();
    if (!state.shuffle) {
      const current = state.queue[state.queueIndex];
      const rest = state.queue.filter((_, i) => i !== state.queueIndex);
      const shuffled = [current, ...shuffleArray(rest)];
      set({ shuffle: true, queue: shuffled, queueIndex: 0 });
    } else {
      set({ shuffle: false });
    }
  },

  cycleRepeat: () => {
    const state = get();
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const currentIdx = modes.indexOf(state.repeat);
    set({ repeat: modes[(currentIdx + 1) % 3] });
  },

  setCrossfade: (seconds) => set({ crossfade: seconds }),
  toggleFullscreen: () => set(s => ({ isFullscreen: !s.isFullscreen })),
  toggleLyrics: () => set(s => ({ showLyrics: !s.showLyrics })),
  toggleQueue: () => set(s => ({ showQueue: !s.showQueue })),

  addToQueue: (track) => set(s => ({ queue: [...s.queue, track] })),
  removeFromQueue: (index) => set(s => {
    const newQueue = s.queue.filter((_, i) => i !== index);
    const newIndex = index < s.queueIndex ? s.queueIndex - 1 : s.queueIndex;
    return { queue: newQueue, queueIndex: Math.min(newIndex, newQueue.length - 1) };
  }),
  clearQueue: () => set({ queue: [], queueIndex: -1 }),
  reorderQueue: (from, to) => set(s => {
    const newQueue = [...s.queue];
    const [moved] = newQueue.splice(from, 1);
    newQueue.splice(to, 0, moved);
    let newIndex = s.queueIndex;
    if (from === s.queueIndex) newIndex = to;
    else if (from < s.queueIndex && to >= s.queueIndex) newIndex--;
    else if (from > s.queueIndex && to <= s.queueIndex) newIndex++;
    return { queue: newQueue, queueIndex: newIndex };
  }),

  setProgress: (progress) => set({ progress }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
}));
