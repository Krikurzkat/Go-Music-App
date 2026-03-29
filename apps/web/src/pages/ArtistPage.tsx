import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getArtistById, artists, formatListeners } from '../data/artists';
import { getTracksByArtist, tracks } from '../data/tracks';
import { getAlbumsByArtist, albums } from '../data/albums';
import TrackRow from '../components/cards/TrackRow';
import ContentCard from '../components/cards/ContentCard';
import { usePlayerStore } from '../stores/playerStore';
import { useLibraryStore } from '../stores/libraryStore';
import { RiPlayFill, RiPauseFill, RiShuffleLine, RiUserFollowLine, RiUserFollowFill, RiShareLine, RiMoreLine, RiVerifiedBadgeFill } from 'react-icons/ri';

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAllTracks, setShowAllTracks] = useState(false);
  const [discographyFilter, setDiscographyFilter] = useState<'all' | 'album' | 'single' | 'ep'>('all');
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const { followedArtistIds, toggleFollowArtist } = useLibraryStore();

  const artist = useMemo(() => id ? getArtistById(id) : undefined, [id]);
  const artistTracks = useMemo(() => artist ? getTracksByArtist(artist.id) : [], [artist]);
  const artistAlbums = useMemo(() => artist ? getAlbumsByArtist(artist.id) : [], [artist]);
  const relatedArtists = useMemo(() => artist ? artist.relatedArtistIds.map(rid => artists.find(a => a.id === rid)).filter(Boolean) : [], [artist]);

  if (!artist) {
    return <div className="flex h-64 items-center justify-center text-softText">Artist not found</div>;
  }

  const isFollowing = followedArtistIds.has(artist.id);
  const isCurrentArtist = artistTracks.some(t => currentTrack?.id === t.id);

  const filteredAlbums = discographyFilter === 'all'
    ? artistAlbums
    : artistAlbums.filter(a => a.type === discographyFilter);

  return (
    <div className="page-enter">
      {/* Hero header */}
      <div className="relative mb-6 overflow-hidden rounded-[28px] p-6 md:p-10"
        style={{ background: `linear-gradient(180deg, ${artist.avatarGradient[0]}80, ${artist.avatarGradient[1]}30, #0D0D0D)` }}
      >
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-sm text-white/60">
            {artist.verified && <RiVerifiedBadgeFill size={20} className="text-accent" />}
            {artist.verified && <span>Verified Artist</span>}
          </div>
          <h1 className="mt-2 text-4xl font-bold md:text-6xl lg:text-7xl">{artist.name}</h1>
          <p className="mt-3 text-sm text-white/60">{formatListeners(artist.monthlyListeners)} monthly listeners</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => {
            if (isCurrentArtist && isPlaying) togglePlay();
            else if (artistTracks.length > 0) playTrack(artistTracks[0], artistTracks);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm transition hover:scale-105"
        >
          {isCurrentArtist && isPlaying ? <RiPauseFill size={24} /> : <RiPlayFill size={24} className="ml-0.5" />}
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiShuffleLine size={20} />
        </button>
        <button
          onClick={() => toggleFollowArtist(artist.id)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
            isFollowing ? 'border-accent text-accent hover:bg-accent/10' : 'border-white/20 text-white hover:border-white/40'
          }`}
        >
          {isFollowing ? <RiUserFollowFill size={16} /> : <RiUserFollowLine size={16} />}
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiShareLine size={20} />
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiMoreLine size={20} />
        </button>
      </div>

      {/* Popular tracks */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Popular</h2>
        <div className="space-y-0.5">
          {artistTracks.slice(0, showAllTracks ? 10 : 5).map((track, i) => (
            <TrackRow key={track.id} track={track} index={i} context={artistTracks} />
          ))}
        </div>
        {artistTracks.length > 5 && (
          <button
            onClick={() => setShowAllTracks(!showAllTracks)}
            className="mt-2 px-3 text-sm font-semibold text-softText transition hover:text-white"
          >
            {showAllTracks ? 'Show less' : 'See more'}
          </button>
        )}
      </section>

      {/* Discography */}
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Discography</h2>
          <div className="flex gap-2">
            {(['all', 'album', 'single', 'ep'] as const).map(f => (
              <button
                key={f}
                onClick={() => setDiscographyFilter(f)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition ${
                  discographyFilter === f ? 'bg-white text-surface' : 'bg-card text-softText hover:text-white'
                }`}
              >
                {f === 'ep' ? 'EP' : f === 'all' ? 'All' : f}s
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filteredAlbums.map(album => (
            <ContentCard key={album.id} id={album.id} title={album.title} subtitle={`${album.year} · ${album.type}`} gradient={album.coverGradient} type="album" />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">About</h2>
        <div className="rounded-2xl p-5" style={{ background: `linear-gradient(135deg, ${artist.avatarGradient[0]}20, ${artist.avatarGradient[1]}10)` }}>
          <p className="text-sm leading-relaxed text-softText">{artist.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {artist.genres.map(g => (
              <span key={g} className="rounded-full border border-white/10 px-3 py-1 text-xs text-softText">{g}</span>
            ))}
          </div>
          <div className="mt-3 text-xs text-dimText">{artist.followers.toLocaleString()} followers</div>
        </div>
      </section>

      {/* Related artists */}
      {relatedArtists.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Fans also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {relatedArtists.map(a => a && (
              <ContentCard key={a.id} id={a.id} title={a.name} subtitle={`${formatListeners(a.monthlyListeners)} listeners`} gradient={a.avatarGradient} type="artist" round />
            ))}
          </div>
        </section>
      )}

      <div className="h-8" />
    </div>
  );
}
