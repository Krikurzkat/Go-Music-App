import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getPodcastById, podcasts } from '../data/podcasts';
import { formatDuration } from '../data/tracks';
import { useLibraryStore } from '../stores/libraryStore';
import ContentCard from '../components/cards/ContentCard';
import { RiPlayFill, RiCheckLine, RiAddLine, RiDownloadLine, RiShareLine, RiTimeLine } from 'react-icons/ri';

export default function PodcastPage() {
  const { id } = useParams<{ id: string }>();
  const { subscribedPodcastIds, toggleSubscribePodcast } = useLibraryStore();

  const show = useMemo(() => id ? getPodcastById(id) : undefined, [id]);

  if (!show) {
    return <div className="flex h-64 items-center justify-center text-softText">Podcast not found</div>;
  }

  const isSubscribed = subscribedPodcastIds.has(show.id);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="relative mb-6 overflow-hidden rounded-[28px] p-6 md:p-8"
        style={{ background: `linear-gradient(180deg, ${show.coverGradient[0]}70, ${show.coverGradient[1]}30, #0D0D0D)` }}
      >
        <div className="absolute inset-0 backdrop-blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end">
          <div className="h-48 w-48 flex-shrink-0 rounded-2xl shadow-glow-lg"
            style={{ background: `linear-gradient(135deg, ${show.coverGradient[0]}, ${show.coverGradient[1]})` }}
          >
            <div className="flex h-full w-full items-center justify-center text-5xl font-bold text-white/20">🎙</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Podcast</div>
            <h1 className="mt-1 text-3xl font-bold md:text-5xl">{show.title}</h1>
            <p className="mt-2 text-sm text-white/70">{show.publisher}</p>
            <p className="mt-2 text-sm text-white/50 line-clamp-2">{show.description}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => toggleSubscribePodcast(show.id)}
          className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
            isSubscribed ? 'border-accent bg-accent/10 text-accent' : 'border-white/20 text-white hover:border-white/40'
          }`}
        >
          {isSubscribed ? <RiCheckLine size={16} /> : <RiAddLine size={16} />}
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
        <button className="rounded-full bg-card p-3 text-softText transition hover:bg-card-hover hover:text-white">
          <RiShareLine size={20} />
        </button>
      </div>

      {/* Episodes */}
      <section>
        <h2 className="mb-4 text-lg font-bold">All Episodes</h2>
        <div className="space-y-3">
          {show.episodes.map(ep => (
            <div key={ep.id} className="group rounded-2xl border border-white/5 bg-card p-4 transition hover:border-white/10 hover:bg-card-hover">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-dimText">{ep.date}</div>
                  <h3 className="mt-1 text-base font-semibold">{ep.title}</h3>
                  <p className="mt-1 text-sm text-softText line-clamp-2">{ep.description}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-surface transition hover:scale-[1.02]">
                      <RiPlayFill size={14} />
                      {ep.progress > 0 && ep.progress < 100 ? 'Resume' : 'Play'}
                    </button>
                    <span className="flex items-center gap-1 text-xs text-dimText">
                      <RiTimeLine size={12} />
                      {formatDuration(ep.duration)}
                    </span>
                    {ep.played && <span className="text-xs text-accent">Played</span>}
                    {ep.progress > 0 && ep.progress < 100 && (
                      <div className="h-1 w-16 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${ep.progress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
                <button className="hidden rounded-full bg-card p-2 text-softText transition hover:text-white group-hover:block">
                  <RiDownloadLine size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More podcasts */}
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">You might also like</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {podcasts.filter(p => p.id !== show.id).slice(0, 5).map(p => (
            <ContentCard key={p.id} id={p.id} title={p.title} subtitle={p.publisher} gradient={p.coverGradient} type="podcast" />
          ))}
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
