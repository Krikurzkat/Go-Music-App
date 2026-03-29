import { useNavigate } from 'react-router-dom';
import { tracks } from '../data/tracks';
import { artists } from '../data/artists';
import { playlists } from '../data/playlists';
import { useLibraryStore } from '../stores/libraryStore';
import ContentCard from '../components/cards/ContentCard';
import { RiEditLine, RiShareLine, RiMusic2Line, RiUserLine, RiCalendarLine } from 'react-icons/ri';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { likedTrackIds, followedArtistIds, savedPlaylistIds } = useLibraryStore();

  const topArtists = artists.filter(a => followedArtistIds.has(a.id)).slice(0, 5);
  const publicPlaylists = playlists.filter(p => p.owner === 'You' && p.isPublic);

  const stats = [
    { label: 'Following', value: followedArtistIds.size, icon: RiUserLine },
    { label: 'Liked songs', value: likedTrackIds.size, icon: RiMusic2Line },
    { label: 'Playlists', value: savedPlaylistIds.size, icon: RiCalendarLine },
  ];

  return (
    <div className="page-enter">
      {/* Profile header */}
      <div className="relative mb-6 overflow-hidden rounded-[28px] bg-go-gradient p-6 md:p-10">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
        <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-end">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/20 text-4xl font-bold shadow-glow-lg md:h-40 md:w-40 md:text-5xl">
            U
          </div>
          <div className="text-center md:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Profile</div>
            <h1 className="mt-1 text-3xl font-bold md:text-5xl">Listener</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70 md:justify-start">
              {stats.map(s => (
                <span key={s.label} className="flex items-center gap-1">
                  <s.icon size={14} />
                  <strong className="text-white">{s.value}</strong> {s.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 md:ml-auto">
            <button className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
              <RiEditLine size={16} /> Edit profile
            </button>
            <button className="rounded-full border border-white/20 p-2 transition hover:bg-white/10">
              <RiShareLine size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Top Artists */}
      {topArtists.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Top Artists This Month</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {topArtists.map(a => (
              <ContentCard key={a.id} id={a.id} title={a.name} subtitle={`${(a.monthlyListeners / 1_000_000).toFixed(1)}M listeners`} gradient={a.avatarGradient} type="artist" round />
            ))}
          </div>
        </section>
      )}

      {/* Public playlists */}
      {publicPlaylists.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Public Playlists</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {publicPlaylists.map(p => (
              <ContentCard key={p.id} id={p.id} title={p.title} subtitle={`${p.trackIds.length} songs`} gradient={p.coverGradient} type="playlist" />
            ))}
          </div>
        </section>
      )}

      {/* Wrapped teaser */}
      <section className="mb-8">
        <button className="w-full rounded-2xl bg-go-gradient-subtle p-6 text-left transition hover:bg-go-gradient">
          <div className="text-xs font-semibold uppercase tracking-wider text-accentAlt">Coming Soon</div>
          <h3 className="mt-2 text-2xl font-bold">Go-Music Wrapped 2026</h3>
          <p className="mt-1 text-sm text-white/70">Your year in music — top songs, artists, genres, and total minutes listened.</p>
        </button>
      </section>

      <div className="h-8" />
    </div>
  );
}
