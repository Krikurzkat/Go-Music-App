import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentCard from '../components/cards/ContentCard';
import TrackRow from '../components/cards/TrackRow';
import { tracks } from '../data/tracks';
import { albums } from '../data/albums';
import { artists } from '../data/artists';
import { playlists } from '../data/playlists';
import { podcasts } from '../data/podcasts';
import { categories } from '../data/categories';
import { useUIStore } from '../stores/uiStore';
import { RiSearchLine } from 'react-icons/ri';

type SearchTab = 'all' | 'songs' | 'artists' | 'albums' | 'playlists' | 'podcasts';

export default function SearchPage() {
  const { searchQuery } = useUIStore();
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  const q = searchQuery.toLowerCase();
  const hasQuery = q.length > 0;

  const results = useMemo(() => {
    if (!hasQuery) return null;
    return {
      tracks: tracks.filter(t => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)),
      artists: artists.filter(a => a.name.toLowerCase().includes(q) || a.genres.some(g => g.toLowerCase().includes(q))),
      albums: albums.filter(a => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q)),
      playlists: playlists.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
      podcasts: podcasts.filter(p => p.title.toLowerCase().includes(q) || p.publisher.toLowerCase().includes(q)),
    };
  }, [q, hasQuery]);

  const tabs: { key: SearchTab; label: string; count: number }[] = results ? [
    { key: 'all', label: 'All', count: 0 },
    { key: 'songs', label: 'Songs', count: results.tracks.length },
    { key: 'artists', label: 'Artists', count: results.artists.length },
    { key: 'albums', label: 'Albums', count: results.albums.length },
    { key: 'playlists', label: 'Playlists', count: results.playlists.length },
    { key: 'podcasts', label: 'Podcasts', count: results.podcasts.length },
  ] : [];

  const trending = ['Daily Mix', 'Lo-fi beats', 'Workout', 'Indie rock', 'Chill vibes', 'Focus', 'Ambient', 'New releases'];

  return (
    <div className="page-enter space-y-6">
      {/* Category selected */}
      {categoryId && !hasQuery && (
        <div>
          {(() => {
            const cat = categories.find(c => c.id === categoryId);
            if (!cat) return null;
            return (
              <div className="mb-6">
                <div className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})` }}>
                  <h1 className="text-3xl font-bold md:text-4xl">{cat.name}</h1>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* No search yet — show browse */}
      {!hasQuery && (
        <>
          {/* Trending searches */}
          <section>
            <h2 className="mb-3 text-xl font-bold">Trending searches</h2>
            <div className="flex flex-wrap gap-2">
              {trending.map(t => (
                <button key={t} className="rounded-full border border-white/10 bg-card px-4 py-2 text-sm text-softText transition hover:border-white/20 hover:text-white">
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Browse all */}
          <section>
            <h2 className="mb-3 text-xl font-bold">Browse all</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className="flex aspect-[1.6] items-end rounded-2xl p-4 text-left transition hover:-translate-y-1 hover:shadow-card-hover"
                  style={{ background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})` }}
                >
                  <span className="text-lg font-bold">{cat.name}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Search results */}
      {hasQuery && results && (
        <>
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hidden">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? 'bg-white text-surface'
                    : 'bg-card text-softText hover:bg-card-hover hover:text-white'
                }`}
              >
                {tab.label}
                {tab.count > 0 && <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>}
              </button>
            ))}
          </div>

          {/* Top result + songs */}
          {(activeTab === 'all' || activeTab === 'songs') && results.tracks.length > 0 && (
            <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
              {/* Top result */}
              {activeTab === 'all' && results.artists.length > 0 && (
                <div className="rounded-2xl bg-card p-5 transition hover:bg-card-hover">
                  <div className="text-xs font-semibold uppercase tracking-wider text-dimText">Top result</div>
                  <div
                    className="mt-4 h-24 w-24 rounded-full shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${results.artists[0].avatarGradient[0]}, ${results.artists[0].avatarGradient[1]})` }}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full text-3xl font-bold text-white/30">
                      {results.artists[0].name[0]}
                    </div>
                  </div>
                  <div className="mt-4 text-2xl font-bold">{results.artists[0].name}</div>
                  <div className="mt-1 text-sm text-softText">
                    Artist · {(results.artists[0].monthlyListeners / 1_000_000).toFixed(1)}M monthly listeners
                  </div>
                </div>
              )}

              {/* Songs list */}
              <div>
                <h3 className="mb-2 text-lg font-bold">Songs</h3>
                <div className="space-y-0.5">
                  {results.tracks.slice(0, activeTab === 'songs' ? 50 : 5).map((track, i) => (
                    <TrackRow key={track.id} track={track} index={i} context={results.tracks} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Artists */}
          {(activeTab === 'all' || activeTab === 'artists') && results.artists.length > 0 && (
            <section>
              <h3 className="mb-3 text-lg font-bold">Artists</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {results.artists.slice(0, activeTab === 'artists' ? 20 : 5).map(a => (
                  <ContentCard key={a.id} id={a.id} title={a.name} subtitle={`${(a.monthlyListeners / 1_000_000).toFixed(1)}M listeners`} gradient={a.avatarGradient} type="artist" round />
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {(activeTab === 'all' || activeTab === 'albums') && results.albums.length > 0 && (
            <section>
              <h3 className="mb-3 text-lg font-bold">Albums</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {results.albums.slice(0, activeTab === 'albums' ? 20 : 5).map(a => (
                  <ContentCard key={a.id} id={a.id} title={a.title} subtitle={`${a.artist} · ${a.year}`} gradient={a.coverGradient} type="album" />
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {(activeTab === 'all' || activeTab === 'playlists') && results.playlists.length > 0 && (
            <section>
              <h3 className="mb-3 text-lg font-bold">Playlists</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {results.playlists.slice(0, activeTab === 'playlists' ? 20 : 5).map(p => (
                  <ContentCard key={p.id} id={p.id} title={p.title} subtitle={`by ${p.owner}`} gradient={p.coverGradient} type="playlist" />
                ))}
              </div>
            </section>
          )}

          {/* No results */}
          {results.tracks.length === 0 && results.artists.length === 0 && results.albums.length === 0 && results.playlists.length === 0 && (
            <div className="py-16 text-center">
              <RiSearchLine size={48} className="mx-auto mb-4 text-dimText" />
              <h3 className="text-xl font-bold">No results found for "{searchQuery}"</h3>
              <p className="mt-2 text-softText">Try different keywords or check your spelling</p>
            </div>
          )}
        </>
      )}

      <div className="h-8" />
    </div>
  );
}
