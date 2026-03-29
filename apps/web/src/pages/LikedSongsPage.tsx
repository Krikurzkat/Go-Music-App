import { useMemo } from 'react';
import { tracks } from '../data/tracks';
import TrackRow from '../components/cards/TrackRow';
import { usePlayerStore } from '../stores/playerStore';
import { useLibraryStore } from '../stores/libraryStore';
import { RiPlayFill, RiPauseFill, RiShuffleLine, RiHeartFill, RiTimeLine, RiDownloadLine } from 'react-icons/ri';

export default function LikedSongsPage() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { likedTrackIds } = useLibraryStore();

  const likedTracks = useMemo(() =>
    tracks.filter(t => likedTrackIds.has(t.id)),
    [likedTrackIds]
  );

  const totalDuration = likedTracks.reduce((acc, t) => acc + t.duration, 0);
  const isCurrentLiked = likedTracks.some(t => currentTrack?.id === t.id);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-[28px] bg-go-gradient p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end">
          <div className="flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 shadow-glow-lg">
            <RiHeartFill size={64} className="text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Playlist</div>
            <h1 className="mt-1 text-3xl font-bold md:text-5xl">Liked Songs</h1>
            <div className="mt-3 text-sm text-white/60">
              {likedTracks.length} songs · {Math.floor(totalDuration / 60)} min
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => {
            if (isCurrentLiked && isPlaying) togglePlay();
            else if (likedTracks.length > 0) playTrack(likedTracks[0], likedTracks);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm transition hover:scale-105"
        >
          {isCurrentLiked && isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} className="ml-0.5" />}
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiShuffleLine size={20} />
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiDownloadLine size={20} />
        </button>
      </div>

      {/* Track list header */}
      <div className="mb-2 flex items-center gap-3 border-b border-white/5 px-3 py-2 text-xs font-medium uppercase tracking-wider text-dimText">
        <div className="w-8 text-center">#</div>
        <div className="min-w-0 flex-1">Title</div>
        <div className="hidden min-w-[140px] md:block">Album</div>
        <div className="hidden min-w-[100px] lg:block">Date added</div>
        <div className="w-8" />
        <div className="w-12 text-right"><RiTimeLine size={14} className="inline" /></div>
        <div className="w-6" />
      </div>

      <div className="space-y-0.5">
        {likedTracks.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i} showAlbum showDateAdded context={likedTracks} />
        ))}
      </div>

      {likedTracks.length === 0 && (
        <div className="py-16 text-center">
          <RiHeartFill size={48} className="mx-auto mb-4 text-dimText" />
          <h3 className="text-xl font-bold">Songs you like will appear here</h3>
          <p className="mt-2 text-softText">Save songs by tapping the heart icon</p>
        </div>
      )}

      <div className="h-8" />
    </div>
  );
}
