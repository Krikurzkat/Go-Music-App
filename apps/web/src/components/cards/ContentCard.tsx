import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../stores/playerStore';
import { tracks } from '../../data/tracks';
import { RiPlayFill } from 'react-icons/ri';

interface ContentCardProps {
  id: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
  type: 'album' | 'artist' | 'playlist' | 'podcast' | 'category';
  round?: boolean;
}

export default function ContentCard({ id, title, subtitle, gradient, type, round = false }: ContentCardProps) {
  const navigate = useNavigate();
  const { playTrack } = usePlayerStore();

  const handleClick = () => {
    switch (type) {
      case 'album': navigate(`/album/${id}`); break;
      case 'artist': navigate(`/artist/${id}`); break;
      case 'playlist': navigate(`/playlist/${id}`); break;
      case 'podcast': navigate(`/podcast/${id}`); break;
      case 'category': navigate(`/search?category=${id}`); break;
    }
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Quick play first track
    const firstTrack = tracks[0];
    if (firstTrack) playTrack(firstTrack, tracks.slice(0, 10));
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className="group w-full cursor-pointer rounded-2xl border border-white/5 bg-card/80 p-3.5 text-left transition-all hover:-translate-y-1 hover:border-white/10 hover:bg-card hover:shadow-card-hover"
    >
      <div className="relative mb-3">
        <div
          className={`aspect-square w-full ${round ? 'rounded-full' : 'rounded-xl'} shadow-lg`}
          style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
        >
          <div className={`flex h-full w-full items-center justify-center ${round ? 'rounded-full' : 'rounded-xl'} text-2xl font-bold text-white/20`}>
            {type === 'artist' ? title[0] : '♪'}
          </div>
        </div>
        {/* Play button overlay */}
        <button
          onClick={handlePlay}
          className="play-overlay absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-glow-sm transition hover:scale-105 hover:bg-accent-hover"
        >
          <RiPlayFill size={22} className="ml-0.5" />
        </button>
      </div>
      <h3 className="truncate text-sm font-semibold">{title}</h3>
      <p className="mt-0.5 line-clamp-2 text-xs text-softText">{subtitle}</p>
    </div>
  );
}
