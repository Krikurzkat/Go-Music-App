import { usePlayerStore } from '../../stores/playerStore';
import { useLibraryStore } from '../../stores/libraryStore';
import { formatDuration } from '../../data/tracks';
import { getLyricsForTrack } from '../../data/lyrics';
import { useMemo } from 'react';
import { RiCloseLine, RiShuffleLine, RiSkipBackFill, RiPlayFill, RiPauseFill, RiSkipForwardFill, RiRepeatLine, RiRepeat2Line, RiRepeatOneLine, RiHeartLine, RiHeartFill, RiVolumeUpLine, RiVolumeMuteLine, RiPlayList2Line } from 'react-icons/ri';

export default function FullscreenPlayer() {
  const {
    currentTrack, isPlaying, progress, currentTime, duration, volume, isMuted,
    shuffle, repeat, isFullscreen,
    togglePlay, nextTrack, prevTrack, seekTo, setVolume, toggleMute,
    toggleShuffle, cycleRepeat, toggleFullscreen,
  } = usePlayerStore();
  const { likedTrackIds, toggleLike } = useLibraryStore();

  const lyrics = useMemo(() => {
    return currentTrack ? getLyricsForTrack(currentTrack.id) : [];
  }, [currentTrack]);

  const currentLyricIndex = useMemo(() => {
    if (!lyrics.length) return -1;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) return i;
    }
    return 0;
  }, [lyrics, currentTime]);

  if (!isFullscreen || !currentTrack) return null;

  const isLiked = likedTrackIds.has(currentTrack.id);
  const RepeatIcon = repeat === 'one' ? RiRepeatOneLine : repeat === 'all' ? RiRepeat2Line : RiRepeatLine;

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in" style={{
      background: `linear-gradient(180deg, ${currentTrack.coverGradient[0]}60 0%, #0D0D0D 60%)`,
    }}>
      <div className="absolute inset-0 backdrop-blur-3xl" />

      <div className="relative flex w-full flex-col items-center justify-center p-6 md:p-12">
        {/* Close button */}
        <button onClick={toggleFullscreen} className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white/70 transition hover:bg-white/20 hover:text-white">
          <RiCloseLine size={24} />
        </button>

        <div className="flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* Album art */}
          <div
            className={`h-[280px] w-[280px] rounded-[28px] shadow-glow-lg md:h-[360px] md:w-[360px] ${isPlaying ? 'animate-pulse-glow' : ''}`}
            style={{ background: `linear-gradient(135deg, ${currentTrack.coverGradient[0]}, ${currentTrack.coverGradient[1]})` }}
          >
            <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white/30 md:text-8xl">
              ♪
            </div>
          </div>

          {/* Right side: info + lyrics */}
          <div className="flex max-w-lg flex-1 flex-col items-center lg:items-start">
            {/* Track info */}
            <div className="mb-6 text-center lg:text-left">
              <h1 className="text-3xl font-bold md:text-4xl">{currentTrack.title}</h1>
              <p className="mt-1 text-lg text-white/70">{currentTrack.artist}</p>
            </div>

            {/* Lyrics preview */}
            <div className="mb-8 max-h-[200px] overflow-hidden">
              <div className="space-y-2">
                {lyrics.slice(Math.max(0, currentLyricIndex - 1), currentLyricIndex + 4).map((line, i) => {
                  const actualIndex = Math.max(0, currentLyricIndex - 1) + i;
                  return (
                    <div key={actualIndex} className={`text-lg font-medium transition-all duration-500 ${
                      actualIndex === currentLyricIndex ? 'text-white text-xl' : 'text-white/40'
                    }`}>
                      {line.text || '♪'}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4 w-full max-w-md">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={e => seekTo(Number(e.target.value))}
                className="accent-track h-1.5 w-full"
                style={{ '--progress': `${progress}%` } as React.CSSProperties}
              />
              <div className="mt-1 flex justify-between text-xs text-white/50">
                <span>{formatDuration(Math.floor(currentTime))}</span>
                <span>{formatDuration(Math.floor(duration))}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-5">
              <button onClick={toggleShuffle} className={`p-2 transition ${shuffle ? 'text-accent' : 'text-white/50 hover:text-white'}`}>
                <RiShuffleLine size={22} />
              </button>
              <button onClick={prevTrack} className="p-2 text-white/70 transition hover:text-white">
                <RiSkipBackFill size={28} />
              </button>
              <button onClick={togglePlay} className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-surface transition hover:scale-105">
                {isPlaying ? <RiPauseFill size={28} /> : <RiPlayFill size={28} className="ml-1" />}
              </button>
              <button onClick={nextTrack} className="p-2 text-white/70 transition hover:text-white">
                <RiSkipForwardFill size={28} />
              </button>
              <button onClick={cycleRepeat} className={`p-2 transition ${repeat !== 'off' ? 'text-accent' : 'text-white/50 hover:text-white'}`}>
                <RepeatIcon size={22} />
              </button>
            </div>

            {/* Extra controls */}
            <div className="mt-4 flex items-center gap-4">
              <button onClick={() => toggleLike(currentTrack.id)} className="transition hover:scale-110">
                {isLiked ? <RiHeartFill size={22} className="text-accent" /> : <RiHeartLine size={22} className="text-white/50" />}
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white/50 hover:text-white">
                  {isMuted ? <RiVolumeMuteLine size={20} /> : <RiVolumeUpLine size={20} />}
                </button>
                <input
                  type="range" min={0} max={100}
                  value={isMuted ? 0 : volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="accent-alt-track h-1 w-24"
                  style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
