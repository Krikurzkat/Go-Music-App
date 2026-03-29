import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { getPlaylistById, playlists } from '../data/playlists';
import { getTrackById, formatDuration, tracks } from '../data/tracks';
import TrackRow from '../components/cards/TrackRow';
import { usePlayerStore } from '../stores/playerStore';
import { useLibraryStore } from '../stores/libraryStore';
import { RiPlayFill, RiPauseFill, RiHeartLine, RiHeartFill, RiShuffleLine, RiMoreLine, RiTimeLine, RiUserLine, RiShareLine, RiDownloadLine, RiEditLine } from 'react-icons/ri';

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { savedPlaylistIds, toggleSavePlaylist } = useLibraryStore();

  const playlist = useMemo(() => id ? getPlaylistById(id) : undefined, [id]);

  if (!playlist) {
    return <div className="flex h-64 items-center justify-center text-softText">Playlist not found</div>;
  }

  const playlistTracks = playlist.trackIds.map(id => getTrackById(id)).filter(Boolean) as typeof tracks;
  const totalDuration = playlistTracks.reduce((acc, t) => acc + t.duration, 0);
  const isCurrentPlaylist = playlistTracks.some(t => currentTrack?.id === t.id);
  const isSaved = savedPlaylistIds.has(playlist.id);

  const handlePlayAll = () => {
    if (isCurrentPlaylist && isPlaying) {
      togglePlay();
    } else if (playlistTracks.length > 0) {
      playTrack(playlistTracks[0], playlistTracks);
    }
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
        style={{ background: `linear-gradient(135deg, ${playlist.coverGradient[0]}90, ${playlist.coverGradient[1]}60, #0D0D0D)` }}
      >
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end">
          {/* Cover */}
          <div
            className="h-48 w-48 flex-shrink-0 rounded-2xl shadow-glow-lg md:h-56 md:w-56"
            style={{ background: `linear-gradient(135deg, ${playlist.coverGradient[0]}, ${playlist.coverGradient[1]})` }}
          >
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-white/20">♪</div>
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
              {playlist.isCollaborative ? 'Collaborative Playlist' : playlist.type === 'mix' ? 'Made For You' : 'Playlist'}
            </div>
            <h1 className="mt-1 text-3xl font-bold md:text-5xl">{playlist.title}</h1>
            <p className="mt-2 text-sm text-white/70">{playlist.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1 text-sm text-white/60">
              <span className="font-medium text-white">{playlist.owner}</span>
              <span>·</span>
              <span>{playlistTracks.length} songs</span>
              <span>·</span>
              <span>{Math.floor(totalDuration / 60)} min</span>
              {playlist.followers > 0 && (
                <>
                  <span>·</span>
                  <span>{playlist.followers.toLocaleString()} followers</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={handlePlayAll}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm transition hover:scale-105 hover:bg-accent-hover"
        >
          {isCurrentPlaylist && isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} className="ml-0.5" />}
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiShuffleLine size={20} />
        </button>
        <button
          onClick={() => toggleSavePlaylist(playlist.id)}
          className={`rounded-full p-3 transition hover:scale-110 ${isSaved ? 'text-accent' : 'text-softText hover:text-white'}`}
        >
          {isSaved ? <RiHeartFill size={22} /> : <RiHeartLine size={22} />}
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiDownloadLine size={20} />
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiShareLine size={20} />
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiMoreLine size={20} />
        </button>
      </div>

      {/* Track list header */}
      <div className="mb-2 flex items-center gap-3 border-b border-white/5 px-3 py-2 text-xs font-medium uppercase tracking-wider text-dimText">
        <div className="w-8 text-center">#</div>
        <div className="min-w-0 flex-1">Title</div>
        <div className="hidden min-w-[140px] md:block">Album</div>
        <div className="hidden min-w-[100px] lg:block">Date added</div>
        <div className="w-8" />
        <div className="w-12 text-right">
          <RiTimeLine size={14} className="inline" />
        </div>
        <div className="w-6" />
      </div>

      {/* Tracks */}
      <div className="space-y-0.5">
        {playlistTracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i}
            showAlbum
            showDateAdded
            context={playlistTracks}
          />
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-8">
        <h3 className="mb-3 text-lg font-bold">Recommended</h3>
        <p className="mb-3 text-sm text-softText">Based on what's in this playlist</p>
        <div className="space-y-0.5">
          {tracks.filter(t => !playlist.trackIds.includes(t.id)).slice(0, 5).map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} context={tracks} />
          ))}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
