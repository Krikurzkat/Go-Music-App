import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../components/cards/ContentCard';
import { tracks, getTrackById } from '../data/tracks';
import { albums } from '../data/albums';
import { artists } from '../data/artists';
import { playlists } from '../data/playlists';
import { categories } from '../data/categories';
import { usePlayerStore } from '../stores/playerStore';
import { useLibraryStore } from '../stores/libraryStore';
import { RiPlayFill, RiTimeLine, RiFireLine, RiMusic2Line, RiAlbumLine } from 'react-icons/ri';

export default function HomePage() {
  const navigate = useNavigate();
  const { playTrack } = usePlayerStore();
  const { recentlyPlayed } = useLibraryStore();

  const recentTracks = useMemo(() =>
    recentlyPlayed.map(id => getTrackById(id)).filter(Boolean).slice(0, 8),
    [recentlyPlayed]
  );

  const dailyMixes = playlists.filter(p => p.type === 'mix').slice(0, 6);
  const editorialPlaylists = playlists.filter(p => p.type === 'editorial');
  const generatedPlaylists = playlists.filter(p => p.type === 'generated');
  const newReleaseAlbums = albums.filter(a => a.year === 2026).slice(0, 5);
  const topArtists = artists.slice(0, 5);
  const moodCategories = categories.slice(12, 20);

  const heroStats = [
    { label: 'Monthly listeners', value: '18.4M', icon: RiMusic2Line },
    { label: 'Tracks available', value: '82M+', icon: RiAlbumLine },
    { label: 'Active users', value: '551M', icon: RiFireLine },
  ];

  return (
    <div className="page-enter space-y-8">
      {/* Hero Banner */}
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-go-gradient p-6 shadow-glow md:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />
          <div className="relative max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <RiFireLine size={12} />
              Go-Music Premium
            </div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Your music, everywhere.
            </h1>
            <p className="mt-3 max-w-md text-sm text-white/80 md:text-base">
              Stream millions of songs, discover new artists, and create the perfect playlist for every moment.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => { if (tracks[0]) playTrack(tracks[0], tracks); }}
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-surface transition hover:scale-[1.02] hover:shadow-lg"
              >
                <RiPlayFill size={18} /> Start listening
              </button>
              <button
                onClick={() => navigate('/library')}
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10"
              >
                Open library
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {heroStats.map(s => (
              <div key={s.label} className="rounded-2xl bg-black/15 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <s.icon size={16} className="text-white/60" />
                  <span className="text-xl font-bold">{s.value}</span>
                </div>
                <div className="text-xs text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Side banners */}
        <div className="space-y-4">
          {generatedPlaylists.map(pl => (
            <button
              key={pl.id}
              onClick={() => navigate(`/playlist/${pl.id}`)}
              className="w-full rounded-[24px] border border-white/5 bg-card p-5 text-left transition hover:border-white/10 hover:bg-card-hover"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accentAlt">
                {pl.type === 'generated' ? 'Made for you' : 'Featured'}
              </div>
              <div className="mt-1.5 text-xl font-bold">{pl.title}</div>
              <div className="mt-1 text-sm text-softText line-clamp-2">{pl.description}</div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-surface">
                <RiPlayFill size={12} /> Play
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Jump back in — compact grid */}
      {recentTracks.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <RiTimeLine size={18} className="text-accentAlt" />
            <h2 className="text-xl font-bold">Jump back in</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {recentTracks.slice(0, 8).map(track => track && (
              <button
                key={track.id}
                onClick={() => playTrack(track, tracks)}
                className="group flex items-center gap-3 rounded-xl bg-white/5 pr-4 text-left transition hover:bg-white/10"
              >
                <div
                  className="h-12 w-12 flex-shrink-0 rounded-l-xl"
                  style={{ background: `linear-gradient(135deg, ${track.coverGradient[0]}, ${track.coverGradient[1]})` }}
                />
                <span className="truncate text-sm font-medium">{track.title}</span>
                <div className="ml-auto hidden h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm group-hover:flex">
                  <RiPlayFill size={14} />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Daily Mixes */}
      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Daily Mixes</h2>
          <button className="text-sm text-softText transition hover:text-white">Show all</button>
        </div>
        <p className="mb-3 text-sm text-softText">Personalized mixes based on your listening habits</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {dailyMixes.map(pl => (
            <ContentCard
              key={pl.id}
              id={pl.id}
              title={pl.title}
              subtitle={pl.description}
              gradient={pl.coverGradient}
              type="playlist"
            />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recently Played</h2>
          <button className="text-sm text-softText transition hover:text-white">Show all</button>
        </div>
        <p className="mb-3 text-sm text-softText">Pick up where you left off</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {recentTracks.slice(0, 5).map(track => track && (
            <ContentCard
              key={track.id}
              id={track.albumId}
              title={track.title}
              subtitle={track.artist}
              gradient={track.coverGradient}
              type="album"
            />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">New Releases</h2>
          <button className="text-sm text-softText transition hover:text-white">Show all</button>
        </div>
        <p className="mb-3 text-sm text-softText">Fresh music from artists you might enjoy</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {newReleaseAlbums.map(album => (
            <ContentCard
              key={album.id}
              id={album.id}
              title={album.title}
              subtitle={`${album.artist} · ${album.year}`}
              gradient={album.coverGradient}
              type="album"
            />
          ))}
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">Featured Playlists</h2>
          <button className="text-sm text-softText transition hover:text-white">Show all</button>
        </div>
        <p className="mb-3 text-sm text-softText">Hand-picked playlists from our editors</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {editorialPlaylists.slice(0, 5).map(pl => (
            <ContentCard
              key={pl.id}
              id={pl.id}
              title={pl.title}
              subtitle={pl.description}
              gradient={pl.coverGradient}
              type="playlist"
            />
          ))}
        </div>
      </section>

      {/* Top Artists */}
      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">Popular Artists</h2>
          <button className="text-sm text-softText transition hover:text-white">Show all</button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {topArtists.map(artist => (
            <ContentCard
              key={artist.id}
              id={artist.id}
              title={artist.name}
              subtitle={`${(artist.monthlyListeners / 1_000_000).toFixed(1)}M monthly listeners`}
              gradient={artist.avatarGradient}
              type="artist"
              round
            />
          ))}
        </div>
      </section>

      {/* Browse Categories */}
      <section>
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-xl font-bold">Browse by Mood</h2>
          <button onClick={() => navigate('/search')} className="text-sm text-softText transition hover:text-white">Show all</button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {moodCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(`/search?category=${cat.id}`)}
              className="flex aspect-[1.3] items-end rounded-2xl p-3 text-left text-sm font-bold shadow-lg transition hover:-translate-y-1 hover:shadow-card-hover"
              style={{ background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})` }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Bottom spacer for player */}
      <div className="h-8" />
    </div>
  );
}
