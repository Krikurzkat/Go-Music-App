import { usePlayerStore } from '../../stores/playerStore';
import { useLibraryStore } from '../../stores/libraryStore';
import { formatDuration } from '../../data/tracks';
import { RiShuffleLine, RiSkipBackFill, RiPlayFill, RiPauseFill, RiSkipForwardFill, RiRepeatLine, RiRepeat2Line, RiRepeatOneLine, RiVolumeUpLine, RiVolumeMuteLine, RiHeartLine, RiHeartFill, RiPlayList2Line, RiMusic2Line, RiFullscreenLine, RiComputerLine } from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BottomPlayer() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack, isPlaying, progress, currentTime, duration, volume, isMuted,
    shuffle, repeat, showLyrics, showQueue,
    setAudioRef, togglePlay, nextTrack, prevTrack, seekTo, setVolume, toggleMute,
    toggleShuffle, cycleRepeat, toggleLyrics, toggleQueue, toggleFullscreen,
    setProgress, setCurrentTime, setDuration,
  } = usePlayerStore();
  const { likedTrackIds, toggleLike } = useLibraryStore();

  // Set audio ref on mount
  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current);
      audioRef.current.volume = volume / 100;
    }
  }, [setAudioRef, volume]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [nextTrack, setProgress, setCurrentTime, setDuration]);

  const isLiked = currentTrack ? likedTrackIds.has(currentTrack.id) : false;

  const repeatIcon = repeat === 'one' ? RiRepeatOneLine : repeat === 'all' ? RiRepeat2Line : RiRepeatLine;
  const RepeatIcon = repeatIcon;

  return (
    <>
      <audio ref={audioRef} preload="auto" />
      <footer className="glass-heavy fixed bottom-0 left-0 right-0 z-40 border-t border-white/5 px-3 py-2.5 md:px-5">
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Left: Now playing */}
          <div className="flex min-w-0 flex-1 items-center gap-3 lg:max-w-[280px]">
            {currentTrack ? (
              <>
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-xl shadow-lg cursor-pointer transition hover:shadow-glow-sm"
                  style={{ background: `linear-gradient(135deg, ${currentTrack.coverGradient[0]}, ${currentTrack.coverGradient[1]})` }}
                  onClick={toggleFullscreen}
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{currentTrack.title}</div>
                  <button onClick={() => navigate(`/artist/${currentTrack.artistId}`)} className="truncate text-xs text-softText hover:text-white hover:underline">
                    {currentTrack.artist}
                  </button>
                </div>
                <button onClick={() => toggleLike(currentTrack.id)} className="flex-shrink-0 transition hover:scale-110">
                  {isLiked ? <RiHeartFill size={18} className="text-accent" /> : <RiHeartLine size={18} className="text-softText hover:text-white" />}
                </button>
              </>
            ) : (
              <>
                <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-card" />
                <div className="min-w-0">
                  <div className="text-sm text-softText">No track playing</div>
                  <div className="text-xs text-dimText">Select a song to start</div>
                </div>
              </>
            )}
          </div>

          {/* Center: Controls + progress */}
          <div className="hidden flex-1 flex-col items-center md:flex">
            <div className="mb-1.5 flex items-center gap-3">
              <button
                onClick={toggleShuffle}
                className={`rounded-full p-2 transition hover:bg-white/5 ${shuffle ? 'text-accent' : 'text-softText hover:text-white'}`}
              >
                <RiShuffleLine size={18} />
              </button>
              <button onClick={prevTrack} className="rounded-full p-2 text-softText transition hover:bg-white/5 hover:text-white">
                <RiSkipBackFill size={20} />
              </button>
              <button
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-surface transition hover:scale-105 hover:shadow-lg"
              >
                {isPlaying ? <RiPauseFill size={20} /> : <RiPlayFill size={20} className="ml-0.5" />}
              </button>
              <button onClick={nextTrack} className="rounded-full p-2 text-softText transition hover:bg-white/5 hover:text-white">
                <RiSkipForwardFill size={20} />
              </button>
              <button
                onClick={cycleRepeat}
                className={`rounded-full p-2 transition hover:bg-white/5 ${repeat !== 'off' ? 'text-accent' : 'text-softText hover:text-white'}`}
              >
                <RepeatIcon size={18} />
              </button>
            </div>
            <div className="flex w-full max-w-lg items-center gap-2 text-[11px] text-dimText">
              <span className="w-10 text-right">{formatDuration(Math.floor(currentTime))}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={e => seekTo(Number(e.target.value))}
                className="accent-track h-1 flex-1"
                style={{ '--progress': `${progress}%` } as React.CSSProperties}
              />
              <span className="w-10">{formatDuration(Math.floor(duration))}</span>
            </div>
          </div>

          {/* Mobile: simple play/pause */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={prevTrack} className="p-2 text-softText">
              <RiSkipBackFill size={20} />
            </button>
            <button onClick={togglePlay} className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-surface">
              {isPlaying ? <RiPauseFill size={18} /> : <RiPlayFill size={18} className="ml-0.5" />}
            </button>
            <button onClick={nextTrack} className="p-2 text-softText">
              <RiSkipForwardFill size={20} />
            </button>
          </div>

          {/* Right: volume + extras */}
          <div className="hidden flex-1 items-center justify-end gap-2 lg:flex lg:max-w-[280px]">
            <button onClick={toggleQueue} className={`rounded-full p-2 transition hover:bg-white/5 ${showQueue ? 'text-accent' : 'text-softText hover:text-white'}`}>
              <RiPlayList2Line size={18} />
            </button>
            <button onClick={toggleLyrics} className={`rounded-full p-2 transition hover:bg-white/5 ${showLyrics ? 'text-accent' : 'text-softText hover:text-white'}`}>
              <RiMusic2Line size={18} />
            </button>
            <button className="rounded-full p-2 text-softText transition hover:bg-white/5 hover:text-white">
              <RiComputerLine size={18} />
            </button>
            <button onClick={toggleMute} className="rounded-full p-1.5 text-softText transition hover:text-white">
              {isMuted || volume === 0 ? <RiVolumeMuteLine size={18} /> : <RiVolumeUpLine size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="accent-alt-track h-1 w-24"
              style={{ '--progress': `${isMuted ? 0 : volume}%` } as React.CSSProperties}
            />
            <button onClick={toggleFullscreen} className="rounded-full p-2 text-softText transition hover:bg-white/5 hover:text-white">
              <RiFullscreenLine size={18} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
