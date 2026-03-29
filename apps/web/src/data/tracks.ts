import { Track } from './types';

// Free CC audio samples for demo playback
const AUDIO_SAMPLES = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
];

export const tracks: Track[] = [
  { id: 't1', title: 'Orbit Run', artist: 'Nova Pulse', artistId: 'ar1', album: 'Signal Lost', albumId: 'al1', duration: 211, coverGradient: ['#FF3B30', '#FF8C00'], liked: true, plays: 2847293, explicit: false, dateAdded: '2026-03-15', audioUrl: AUDIO_SAMPLES[0] },
  { id: 't2', title: 'Night Engine', artist: 'Scarlet Avenue', artistId: 'ar2', album: 'Midnight Chrome', albumId: 'al2', duration: 188, coverGradient: ['#8B5CF6', '#EC4899'], liked: false, plays: 1923847, explicit: false, dateAdded: '2026-03-14', audioUrl: AUDIO_SAMPLES[1] },
  { id: 't3', title: 'Cinder Bloom', artist: 'Atlas Echo', artistId: 'ar3', album: 'After Hours', albumId: 'al3', duration: 242, coverGradient: ['#F59E0B', '#EF4444'], liked: true, plays: 3182946, explicit: true, dateAdded: '2026-03-12', audioUrl: AUDIO_SAMPLES[2] },
  { id: 't4', title: 'Golden Static', artist: 'Mira Lane', artistId: 'ar4', album: 'Voltage', albumId: 'al4', duration: 219, coverGradient: ['#10B981', '#3B82F6'], liked: false, plays: 982374, explicit: false, dateAdded: '2026-03-10', audioUrl: AUDIO_SAMPLES[3] },
  { id: 't5', title: 'Skyline Echo', artist: 'Nova Pulse', artistId: 'ar1', album: 'Signal Lost', albumId: 'al1', duration: 195, coverGradient: ['#FF3B30', '#FF8C00'], liked: true, plays: 4291837, explicit: false, dateAdded: '2026-03-09', audioUrl: AUDIO_SAMPLES[4] },
  { id: 't6', title: 'Zero Delay', artist: 'Circuit Dawn', artistId: 'ar5', album: 'Bandwidth', albumId: 'al5', duration: 234, coverGradient: ['#06B6D4', '#8B5CF6'], liked: false, plays: 1573928, explicit: false, dateAdded: '2026-03-08', audioUrl: AUDIO_SAMPLES[5] },
  { id: 't7', title: 'Sunset Replay', artist: 'Amber Sky', artistId: 'ar6', album: 'Golden Hour', albumId: 'al6', duration: 267, coverGradient: ['#F97316', '#EAB308'], liked: true, plays: 5829174, explicit: false, dateAdded: '2026-03-07', audioUrl: AUDIO_SAMPLES[6] },
  { id: 't8', title: 'Static Motion', artist: 'Scarlet Avenue', artistId: 'ar2', album: 'Midnight Chrome', albumId: 'al2', duration: 203, coverGradient: ['#8B5CF6', '#EC4899'], liked: false, plays: 2194837, explicit: true, dateAdded: '2026-03-06', audioUrl: AUDIO_SAMPLES[7] },
  { id: 't9', title: 'Moonline', artist: 'Atlas Echo', artistId: 'ar3', album: 'After Hours', albumId: 'al3', duration: 178, coverGradient: ['#F59E0B', '#EF4444'], liked: false, plays: 1847293, explicit: false, dateAdded: '2026-03-05', audioUrl: AUDIO_SAMPLES[0] },
  { id: 't10', title: 'Neon Nights', artist: 'Mira Lane', artistId: 'ar4', album: 'Voltage', albumId: 'al4', duration: 225, coverGradient: ['#10B981', '#3B82F6'], liked: true, plays: 7293184, explicit: false, dateAdded: '2026-03-04', audioUrl: AUDIO_SAMPLES[1] },
  { id: 't11', title: 'Pulse Theory', artist: 'Nova Pulse', artistId: 'ar1', album: 'Signal Lost', albumId: 'al1', duration: 198, coverGradient: ['#FF3B30', '#FF8C00'], liked: false, plays: 3928471, explicit: false, dateAdded: '2026-03-03', audioUrl: AUDIO_SAMPLES[2] },
  { id: 't12', title: 'Code & Coffee', artist: 'Circuit Dawn', artistId: 'ar5', album: 'Bandwidth', albumId: 'al5', duration: 256, coverGradient: ['#06B6D4', '#8B5CF6'], liked: true, plays: 2184937, explicit: false, dateAdded: '2026-03-02', audioUrl: AUDIO_SAMPLES[3] },
  { id: 't13', title: 'Crimson Drive', artist: 'Scarlet Avenue', artistId: 'ar2', album: 'Redline', albumId: 'al7', duration: 213, coverGradient: ['#DC2626', '#9333EA'], liked: false, plays: 4837291, explicit: true, dateAdded: '2026-03-01', audioUrl: AUDIO_SAMPLES[4] },
  { id: 't14', title: 'Afterglow FM', artist: 'Amber Sky', artistId: 'ar6', album: 'Golden Hour', albumId: 'al6', duration: 241, coverGradient: ['#F97316', '#EAB308'], liked: true, plays: 3291847, explicit: false, dateAdded: '2026-02-28', audioUrl: AUDIO_SAMPLES[5] },
  { id: 't15', title: 'Waveform', artist: 'Atlas Echo', artistId: 'ar3', album: 'Frequencies', albumId: 'al8', duration: 189, coverGradient: ['#14B8A6', '#6366F1'], liked: false, plays: 1928374, explicit: false, dateAdded: '2026-02-27', audioUrl: AUDIO_SAMPLES[6] },
  { id: 't16', title: 'Morning Boost', artist: 'Mira Lane', artistId: 'ar4', album: 'Voltage', albumId: 'al4', duration: 174, coverGradient: ['#10B981', '#3B82F6'], liked: true, plays: 6182934, explicit: false, dateAdded: '2026-02-26', audioUrl: AUDIO_SAMPLES[7] },
  { id: 't17', title: 'Focus Flow', artist: 'Circuit Dawn', artistId: 'ar5', album: 'Deep Work', albumId: 'al9', duration: 302, coverGradient: ['#1E40AF', '#7C3AED'], liked: true, plays: 8293174, explicit: false, dateAdded: '2026-02-25', audioUrl: AUDIO_SAMPLES[0] },
  { id: 't18', title: 'Lo-fi Voltage', artist: 'Nova Pulse', artistId: 'ar1', album: 'Late Night Sessions', albumId: 'al10', duration: 285, coverGradient: ['#4338CA', '#DB2777'], liked: false, plays: 5192834, explicit: false, dateAdded: '2026-02-24', audioUrl: AUDIO_SAMPLES[1] },
  { id: 't19', title: 'Drift Apart', artist: 'Velvet Haze', artistId: 'ar7', album: 'Dissolve', albumId: 'al11', duration: 231, coverGradient: ['#BE185D', '#7C3AED'], liked: false, plays: 2918374, explicit: false, dateAdded: '2026-02-23', audioUrl: AUDIO_SAMPLES[2] },
  { id: 't20', title: 'Crystal Rain', artist: 'Velvet Haze', artistId: 'ar7', album: 'Dissolve', albumId: 'al11', duration: 199, coverGradient: ['#BE185D', '#7C3AED'], liked: true, plays: 4182937, explicit: false, dateAdded: '2026-02-22', audioUrl: AUDIO_SAMPLES[3] },
  { id: 't21', title: 'Phantom Streets', artist: 'Echo Valley', artistId: 'ar8', album: 'Nightwalk', albumId: 'al12', duration: 248, coverGradient: ['#1F2937', '#6B7280'], liked: false, plays: 1829374, explicit: true, dateAdded: '2026-02-21', audioUrl: AUDIO_SAMPLES[4] },
  { id: 't22', title: 'Solar Flare', artist: 'Amber Sky', artistId: 'ar6', album: 'Supernova', albumId: 'al13', duration: 216, coverGradient: ['#DC2626', '#F59E0B'], liked: true, plays: 6293817, explicit: false, dateAdded: '2026-02-20', audioUrl: AUDIO_SAMPLES[5] },
  { id: 't23', title: 'Deep Blue', artist: 'Echo Valley', artistId: 'ar8', album: 'Nightwalk', albumId: 'al12', duration: 273, coverGradient: ['#1F2937', '#6B7280'], liked: false, plays: 2918347, explicit: false, dateAdded: '2026-02-19', audioUrl: AUDIO_SAMPLES[6] },
  { id: 't24', title: 'Firewall', artist: 'Circuit Dawn', artistId: 'ar5', album: 'Bandwidth', albumId: 'al5', duration: 191, coverGradient: ['#06B6D4', '#8B5CF6'], liked: true, plays: 3829174, explicit: false, dateAdded: '2026-02-18', audioUrl: AUDIO_SAMPLES[7] },
  { id: 't25', title: 'Velvet Thunder', artist: 'Scarlet Avenue', artistId: 'ar2', album: 'Redline', albumId: 'al7', duration: 208, coverGradient: ['#DC2626', '#9333EA'], liked: false, plays: 5182934, explicit: true, dateAdded: '2026-02-17', audioUrl: AUDIO_SAMPLES[0] },
  { id: 't26', title: 'Cloud Nine', artist: 'Mira Lane', artistId: 'ar4', album: 'Floating', albumId: 'al14', duration: 237, coverGradient: ['#38BDF8', '#818CF8'], liked: true, plays: 4293817, explicit: false, dateAdded: '2026-02-16', audioUrl: AUDIO_SAMPLES[1] },
  { id: 't27', title: 'Retrowave', artist: 'Nova Pulse', artistId: 'ar1', album: 'Late Night Sessions', albumId: 'al10', duration: 264, coverGradient: ['#4338CA', '#DB2777'], liked: false, plays: 3192834, explicit: false, dateAdded: '2026-02-15', audioUrl: AUDIO_SAMPLES[2] },
  { id: 't28', title: 'Ghost Signal', artist: 'Echo Valley', artistId: 'ar8', album: 'Static Dreams', albumId: 'al15', duration: 222, coverGradient: ['#374151', '#9CA3AF'], liked: true, plays: 2829174, explicit: false, dateAdded: '2026-02-14', audioUrl: AUDIO_SAMPLES[3] },
  { id: 't29', title: 'Ember Glow', artist: 'Velvet Haze', artistId: 'ar7', album: 'Dissolve', albumId: 'al11', duration: 196, coverGradient: ['#BE185D', '#7C3AED'], liked: false, plays: 1928347, explicit: false, dateAdded: '2026-02-13', audioUrl: AUDIO_SAMPLES[4] },
  { id: 't30', title: 'Digital Garden', artist: 'Atlas Echo', artistId: 'ar3', album: 'Frequencies', albumId: 'al8', duration: 251, coverGradient: ['#14B8A6', '#6366F1'], liked: true, plays: 4829173, explicit: false, dateAdded: '2026-02-12', audioUrl: AUDIO_SAMPLES[5] },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find(t => t.id === id);
}

export function getTracksByArtist(artistId: string): Track[] {
  return tracks.filter(t => t.artistId === artistId);
}

export function getTracksByAlbum(albumId: string): Track[] {
  return tracks.filter(t => t.albumId === albumId);
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatPlays(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}
