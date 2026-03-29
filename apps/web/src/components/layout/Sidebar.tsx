import { NavLink, useLocation } from 'react-router-dom';
import { RiHome5Fill, RiHome5Line, RiSearchLine, RiSearchFill, RiMusic2Line, RiMusic2Fill, RiHeartLine, RiHeartFill, RiMicLine, RiMicFill, RiUserFollowLine, RiUserFollowFill, RiPlayListFill, RiPlayListLine, RiAddLine, RiPushpinFill } from 'react-icons/ri';
import { playlists } from '../../data/playlists';
import { useLibraryStore } from '../../stores/libraryStore';
import { useUIStore } from '../../stores/uiStore';

const navItems = [
  { path: '/', label: 'Home', icon: RiHome5Line, iconActive: RiHome5Fill },
  { path: '/search', label: 'Search', icon: RiSearchLine, iconActive: RiSearchFill },
  { path: '/library', label: 'Your Library', icon: RiMusic2Line, iconActive: RiMusic2Fill },
];

const libraryItems = [
  { path: '/playlist/pl13', label: 'Liked Songs', icon: RiHeartLine, iconActive: RiHeartFill, badge: null as number | null },
  { path: '/podcasts', label: 'Podcasts', icon: RiMicLine, iconActive: RiMicFill, badge: null },
  { path: '/library?filter=artists', label: 'Artists Followed', icon: RiUserFollowLine, iconActive: RiUserFollowFill, badge: null },
];

export default function Sidebar() {
  const location = useLocation();
  const { savedPlaylistIds, pinnedIds, likedTrackIds } = useLibraryStore();
  const { mobileSidebarOpen, toggleMobileSidebar } = useUIStore();

  const userPlaylists = playlists.filter(p => savedPlaylistIds.has(p.id) || p.owner === 'You');
  const pinnedPlaylists = userPlaylists.filter(p => pinnedIds.has(p.id));
  const unpinnedPlaylists = userPlaylists.filter(p => !pinnedIds.has(p.id));

  // Update liked songs badge
  libraryItems[0].badge = likedTrackIds.size;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-go-gradient text-lg font-bold shadow-glow-sm">
          G
        </div>
        <div>
          <div className="text-base font-bold tracking-tight">Go-Music</div>
          <div className="text-[11px] text-softText">Premium</div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.iconActive : item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => mobileSidebarOpen && toggleMobileSidebar()}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-softText hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-white/5" />

      {/* Library section */}
      <nav className="space-y-1">
        {libraryItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = isActive ? item.iconActive : item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => mobileSidebarOpen && toggleMobileSidebar()}
              className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-softText hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </span>
              {item.badge !== null && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="my-4 h-px bg-white/5" />

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="mb-3 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <RiPlayListFill size={16} className="text-softText" />
            <span className="text-xs font-semibold uppercase tracking-wider text-softText">Playlists</span>
          </div>
          <button className="rounded-lg p-1 text-softText transition hover:bg-white/5 hover:text-white">
            <RiAddLine size={18} />
          </button>
        </div>

        {/* Pinned */}
        {pinnedPlaylists.length > 0 && (
          <div className="mb-2 space-y-0.5">
            {pinnedPlaylists.map(pl => (
              <NavLink
                key={pl.id}
                to={`/playlist/${pl.id}`}
                onClick={() => mobileSidebarOpen && toggleMobileSidebar()}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-white/10 text-white' : 'text-softText hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <RiPushpinFill size={12} className="text-accent" />
                <span className="truncate">{pl.title}</span>
              </NavLink>
            ))}
            <div className="my-1.5 mx-3 h-px bg-white/5" />
          </div>
        )}

        {/* Rest of playlists */}
        <div className="space-y-0.5">
          {unpinnedPlaylists.map(pl => (
            <NavLink
              key={pl.id}
              to={`/playlist/${pl.id}`}
              onClick={() => mobileSidebarOpen && toggleMobileSidebar()}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-white/10 text-white' : 'text-softText hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {pl.type === 'mix' ? <RiPlayListLine size={14} className="text-accentAlt" /> : null}
              <span className="truncate">{pl.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-[260px] flex-shrink-0 border-r border-white/5 bg-panel/80 px-4 py-5 xl:flex xl:flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
            onClick={toggleMobileSidebar}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] animate-slide-in-left bg-panel px-4 py-5 xl:hidden">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}
