import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../components/cards/ContentCard';
import { tracks, getTrackById } from '../data/tracks';
import { albums, getAlbumById } from '../data/albums';
import { artists, getArtistById } from '../data/artists';
import { playlists } from '../data/playlists';
import { podcasts } from '../data/podcasts';
import { useLibraryStore } from '../stores/libraryStore';
import { RiPlayListLine, RiAlbumLine, RiUserLine, RiMicLine, RiGridLine, RiListUnordered, RiHeartFill, RiAddLine } from 'react-icons/ri';

type LibraryTab = 'playlists' | 'albums' | 'artists' | 'podcasts';

export default function LibraryPage() {
  const [tab, setTab] = useState<LibraryTab>('playlists');
  const { savedAlbumIds, followedArtistIds, savedPlaylistIds, subscribedPodcastIds, likedTrackIds, sortBy, viewMode, setSortBy, setViewMode } = useLibraryStore();
  const navigate = useNavigate();

  const libraryPlaylists = useMemo(() => playlists.filter(p => savedPlaylistIds.has(p.id) || p.owner === 'You'), [savedPlaylistIds]);
  const libraryAlbums = useMemo(() => albums.filter(a => savedAlbumIds.has(a.id)), [savedAlbumIds]);
  const libraryArtists = useMemo(() => artists.filter(a => followedArtistIds.has(a.id)), [followedArtistIds]);
  const libraryPodcasts = useMemo(() => podcasts.filter(p => subscribedPodcastIds.has(p.id)), [subscribedPodcastIds]);

  const tabItems = [
    { key: 'playlists' as const, label: 'Playlists', icon: RiPlayListLine, count: libraryPlaylists.length },
    { key: 'albums' as const, label: 'Albums', icon: RiAlbumLine, count: libraryAlbums.length },
    { key: 'artists' as const, label: 'Artists', icon: RiUserLine, count: libraryArtists.length },
    { key: 'podcasts' as const, label: 'Podcasts', icon: RiMicLine, count: libraryPodcasts.length },
  ];

  return (
    <div className="page-enter space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <button className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-sm text-softText transition hover:bg-card-hover hover:text-white">
          <RiAddLine size={16} /> Create playlist
        </button>
      </div>

      {/* Liked songs banner */}
      <button
        onClick={() => navigate('/liked')}
        className="flex w-full items-center gap-4 rounded-2xl bg-go-gradient-subtle p-4 text-left transition hover:bg-go-gradient"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-go-gradient shadow-glow-sm">
          <RiHeartFill size={24} />
        </div>
        <div>
          <div className="text-lg font-bold">Liked Songs</div>
          <div className="text-sm text-white/70">{likedTrackIds.size} songs</div>
        </div>
      </button>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto scrollbar-hidden">
          {tabItems.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t.key ? 'bg-white text-surface' : 'bg-card text-softText hover:bg-card-hover hover:text-white'
              }`}
            >
              <t.icon size={16} />
              {t.label}
              <span className="text-xs opacity-60">{t.count}</span>
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-lg bg-card px-3 py-2 text-xs text-softText"
          >
            <option value="recent">Recently added</option>
            <option value="alpha">Alphabetical</option>
            <option value="creator">Creator</option>
          </select>
          <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="rounded-lg bg-card p-2 text-softText transition hover:text-white">
            {viewMode === 'grid' ? <RiListUnordered size={18} /> : <RiGridLine size={18} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={viewMode === 'grid'
        ? 'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'
        : 'space-y-1'
      }>
        {tab === 'playlists' && libraryPlaylists.map(p => (
          viewMode === 'grid' ? (
            <ContentCard key={p.id} id={p.id} title={p.title} subtitle={`by ${p.owner} · ${p.trackIds.length} songs`} gradient={p.coverGradient} type="playlist" />
          ) : (
            <button key={p.id} onClick={() => navigate(`/playlist/${p.id}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5">
              <div className="h-12 w-12 flex-shrink-0 rounded-lg" style={{ background: `linear-gradient(135deg, ${p.coverGradient[0]}, ${p.coverGradient[1]})` }} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.title}</div>
                <div className="text-xs text-softText">Playlist · {p.owner} · {p.trackIds.length} songs</div>
              </div>
            </button>
          )
        ))}

        {tab === 'albums' && libraryAlbums.map(a => (
          viewMode === 'grid' ? (
            <ContentCard key={a.id} id={a.id} title={a.title} subtitle={`${a.artist} · ${a.year}`} gradient={a.coverGradient} type="album" />
          ) : (
            <button key={a.id} onClick={() => navigate(`/album/${a.id}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5">
              <div className="h-12 w-12 flex-shrink-0 rounded-lg" style={{ background: `linear-gradient(135deg, ${a.coverGradient[0]}, ${a.coverGradient[1]})` }} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{a.title}</div>
                <div className="text-xs text-softText">Album · {a.artist} · {a.year}</div>
              </div>
            </button>
          )
        ))}

        {tab === 'artists' && libraryArtists.map(a => (
          viewMode === 'grid' ? (
            <ContentCard key={a.id} id={a.id} title={a.name} subtitle={`${(a.monthlyListeners / 1_000_000).toFixed(1)}M listeners`} gradient={a.avatarGradient} type="artist" round />
          ) : (
            <button key={a.id} onClick={() => navigate(`/artist/${a.id}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5">
              <div className="h-12 w-12 flex-shrink-0 rounded-full" style={{ background: `linear-gradient(135deg, ${a.avatarGradient[0]}, ${a.avatarGradient[1]})` }} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{a.name}</div>
                <div className="text-xs text-softText">Artist · {(a.monthlyListeners / 1_000_000).toFixed(1)}M monthly listeners</div>
              </div>
            </button>
          )
        ))}

        {tab === 'podcasts' && libraryPodcasts.map(p => (
          viewMode === 'grid' ? (
            <ContentCard key={p.id} id={p.id} title={p.title} subtitle={p.publisher} gradient={p.coverGradient} type="podcast" />
          ) : (
            <button key={p.id} onClick={() => navigate(`/podcast/${p.id}`)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5">
              <div className="h-12 w-12 flex-shrink-0 rounded-lg" style={{ background: `linear-gradient(135deg, ${p.coverGradient[0]}, ${p.coverGradient[1]})` }} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.title}</div>
                <div className="text-xs text-softText">Podcast · {p.publisher}</div>
              </div>
            </button>
          )
        ))}
      </div>

      <div className="h-8" />
    </div>
  );
}
