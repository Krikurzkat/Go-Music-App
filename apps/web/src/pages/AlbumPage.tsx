import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { getAlbumById } from '../data/albums';
import { getTracksByAlbum, formatDuration, tracks } from '../data/tracks';
import { getArtistById } from '../data/artists';
import TrackRow from '../components/cards/TrackRow';
import ContentCard from '../components/cards/ContentCard';
import { usePlayerStore } from '../stores/playerStore';
import { useLibraryStore } from '../stores/libraryStore';
import { albums } from '../data/albums';
import { RiPlayFill, RiPauseFill, RiHeartLine, RiHeartFill, RiShareLine, RiMoreLine, RiTimeLine } from 'react-icons/ri';

export default function AlbumPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { savedAlbumIds, toggleSaveAlbum } = useLibraryStore();

  const album = useMemo(() => id ? getAlbumById(id) : undefined, [id]);
  const albumTracks = useMemo(() => album ? getTracksByAlbum(album.id) : [], [album]);
  const artist = useMemo(() => album ? getArtistById(album.artistId) : undefined, [album]);

  if (!album) {
    return <div className="flex h-64 items-center justify-center text-softText">Album not found</div>;
  }

  const totalDuration = albumTracks.reduce((acc, t) => acc + t.duration, 0);
  const isCurrentAlbum = albumTracks.some(t => currentTrack?.id === t.id);
  const isSaved = savedAlbumIds.has(album.id);

  const moreByArtist = albums.filter(a => a.artistId === album.artistId && a.id !== album.id);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
        style={{ background: `linear-gradient(180deg, ${album.coverGradient[0]}70, ${album.coverGradient[1]}30, #0D0D0D)` }}
      >
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end">
          <div
            className="h-48 w-48 flex-shrink-0 rounded-2xl shadow-glow-lg md:h-56 md:w-56"
            style={{ background: `linear-gradient(135deg, ${album.coverGradient[0]}, ${album.coverGradient[1]})` }}
          >
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-white/20">♪</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">{album.type}</div>
            <h1 className="mt-1 text-3xl font-bold md:text-5xl">{album.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/60">
              {artist && (
                <button onClick={() => navigate(`/artist/${artist.id}`)} className="flex items-center gap-2 font-medium text-white hover:underline">
                  <div className="h-6 w-6 rounded-full" style={{ background: `linear-gradient(135deg, ${artist.avatarGradient[0]}, ${artist.avatarGradient[1]})` }} />
                  {artist.name}
                </button>
              )}
              <span>·</span>
              <span>{album.year}</span>
              <span>·</span>
              <span>{albumTracks.length} songs, {Math.floor(totalDuration / 60)} min</span>
            </div>
            <div className="mt-2 text-xs text-white/40">{album.genre} · {album.label}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => {
            if (isCurrentAlbum && isPlaying) togglePlay();
            else if (albumTracks.length > 0) playTrack(albumTracks[0], albumTracks);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm transition hover:scale-105"
        >
          {isCurrentAlbum && isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} className="ml-0.5" />}
        </button>
        <button onClick={() => toggleSaveAlbum(album.id)} className={`rounded-full p-3 transition hover:scale-110 ${isSaved ? 'text-accent' : 'text-softText'}`}>
          {isSaved ? <RiHeartFill size={22} /> : <RiHeartLine size={22} />}
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
        <div className="w-8" />
        <div className="w-12 text-right"><RiTimeLine size={14} className="inline" /></div>
        <div className="w-6" />
      </div>

      <div className="space-y-0.5">
        {albumTracks.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i} showAlbum={false} context={albumTracks} compact />
        ))}
      </div>

      {/* Credits */}
      <div className="mt-8 rounded-2xl bg-card p-5">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-dimText">Credits</h3>
        <div className="grid gap-3 text-sm text-softText md:grid-cols-2">
          <div><span className="text-white">Label:</span> {album.label}</div>
          <div><span className="text-white">Genre:</span> {album.genre}</div>
          <div><span className="text-white">Year:</span> {album.year}</div>
          <div><span className="text-white">Type:</span> {album.type.charAt(0).toUpperCase() + album.type.slice(1)}</div>
        </div>
      </div>

      {/* More by artist */}
      {moreByArtist.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-lg font-bold">More by {album.artist}</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {moreByArtist.map(a => (
              <ContentCard key={a.id} id={a.id} title={a.title} subtitle={`${a.year} · ${a.type}`} gradient={a.coverGradient} type="album" />
            ))}
          </div>
        </div>
      )}

      <div className="h-8" />
    </div>
  );
}
