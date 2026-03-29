import { Album } from './types';

export const albums: Album[] = [
  { id: 'al1', title: 'Signal Lost', artist: 'Nova Pulse', artistId: 'ar1', year: 2026, genre: 'Electronic', coverGradient: ['#FF3B30', '#FF8C00'], trackIds: ['t1', 't5', 't11'], totalDuration: 604, label: 'Pulse Records', type: 'album' },
  { id: 'al2', title: 'Midnight Chrome', artist: 'Scarlet Avenue', artistId: 'ar2', year: 2026, genre: 'Synthwave', coverGradient: ['#8B5CF6', '#EC4899'], trackIds: ['t2', 't8'], totalDuration: 391, label: 'Chrome Label', type: 'album' },
  { id: 'al3', title: 'After Hours', artist: 'Atlas Echo', artistId: 'ar3', year: 2025, genre: 'Alternative', coverGradient: ['#F59E0B', '#EF4444'], trackIds: ['t3', 't9'], totalDuration: 420, label: 'Echo Studios', type: 'album' },
  { id: 'al4', title: 'Voltage', artist: 'Mira Lane', artistId: 'ar4', year: 2026, genre: 'Electropop', coverGradient: ['#10B981', '#3B82F6'], trackIds: ['t4', 't10', 't16'], totalDuration: 618, label: 'Lane Records', type: 'album' },
  { id: 'al5', title: 'Bandwidth', artist: 'Circuit Dawn', artistId: 'ar5', year: 2025, genre: 'IDM', coverGradient: ['#06B6D4', '#8B5CF6'], trackIds: ['t6', 't12', 't24'], totalDuration: 681, label: 'Dawn Audio', type: 'album' },
  { id: 'al6', title: 'Golden Hour', artist: 'Amber Sky', artistId: 'ar6', year: 2026, genre: 'Indie Pop', coverGradient: ['#F97316', '#EAB308'], trackIds: ['t7', 't14'], totalDuration: 508, label: 'Sky Music', type: 'album' },
  { id: 'al7', title: 'Redline', artist: 'Scarlet Avenue', artistId: 'ar2', year: 2025, genre: 'Synthwave', coverGradient: ['#DC2626', '#9333EA'], trackIds: ['t13', 't25'], totalDuration: 421, label: 'Chrome Label', type: 'album' },
  { id: 'al8', title: 'Frequencies', artist: 'Atlas Echo', artistId: 'ar3', year: 2026, genre: 'Electronic', coverGradient: ['#14B8A6', '#6366F1'], trackIds: ['t15', 't30'], totalDuration: 440, label: 'Echo Studios', type: 'album' },
  { id: 'al9', title: 'Deep Work', artist: 'Circuit Dawn', artistId: 'ar5', year: 2026, genre: 'Ambient', coverGradient: ['#1E40AF', '#7C3AED'], trackIds: ['t17'], totalDuration: 302, label: 'Dawn Audio', type: 'single' },
  { id: 'al10', title: 'Late Night Sessions', artist: 'Nova Pulse', artistId: 'ar1', year: 2025, genre: 'Lo-fi', coverGradient: ['#4338CA', '#DB2777'], trackIds: ['t18', 't27'], totalDuration: 549, label: 'Pulse Records', type: 'ep' },
  { id: 'al11', title: 'Dissolve', artist: 'Velvet Haze', artistId: 'ar7', year: 2026, genre: 'Dream Pop', coverGradient: ['#BE185D', '#7C3AED'], trackIds: ['t19', 't20', 't29'], totalDuration: 626, label: 'Haze Records', type: 'album' },
  { id: 'al12', title: 'Nightwalk', artist: 'Echo Valley', artistId: 'ar8', year: 2025, genre: 'Post-rock', coverGradient: ['#1F2937', '#6B7280'], trackIds: ['t21', 't23'], totalDuration: 521, label: 'Valley Sound', type: 'album' },
  { id: 'al13', title: 'Supernova', artist: 'Amber Sky', artistId: 'ar6', year: 2026, genre: 'Indie Pop', coverGradient: ['#DC2626', '#F59E0B'], trackIds: ['t22'], totalDuration: 216, label: 'Sky Music', type: 'single' },
  { id: 'al14', title: 'Floating', artist: 'Mira Lane', artistId: 'ar4', year: 2025, genre: 'Chillwave', coverGradient: ['#38BDF8', '#818CF8'], trackIds: ['t26'], totalDuration: 237, label: 'Lane Records', type: 'single' },
  { id: 'al15', title: 'Static Dreams', artist: 'Echo Valley', artistId: 'ar8', year: 2026, genre: 'Ambient', coverGradient: ['#374151', '#9CA3AF'], trackIds: ['t28'], totalDuration: 222, label: 'Valley Sound', type: 'ep' },
];

export function getAlbumById(id: string): Album | undefined {
  return albums.find(a => a.id === id);
}

export function getAlbumsByArtist(artistId: string): Album[] {
  return albums.filter(a => a.artistId === artistId);
}
