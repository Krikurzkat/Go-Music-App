import { Artist } from './types';

export const artists: Artist[] = [
  {
    id: 'ar1', name: 'Nova Pulse', avatarGradient: ['#FF3B30', '#FF8C00'], monthlyListeners: 18423891, followers: 4829174,
    bio: 'Nova Pulse blends electronic textures with cinematic soundscapes, creating immersive audio experiences that blur the line between ambient and dance music. Based in Berlin, they have been pushing boundaries since 2019.',
    genres: ['Electronic', 'Synthwave', 'Lo-fi'], verified: true,
    topTrackIds: ['t1', 't5', 't11', 't18', 't27'], albumIds: ['al1', 'al10'], relatedArtistIds: ['ar2', 'ar5', 'ar8'],
  },
  {
    id: 'ar2', name: 'Scarlet Avenue', avatarGradient: ['#8B5CF6', '#EC4899'], monthlyListeners: 12918374, followers: 3291847,
    bio: 'Scarlet Avenue is the brainchild of producer Maya Chen, delivering pulsating synthwave anthems that soundtrack midnight drives and neon-lit cityscapes.',
    genres: ['Synthwave', 'Electropop', 'Retro'], verified: true,
    topTrackIds: ['t2', 't8', 't13', 't25'], albumIds: ['al2', 'al7'], relatedArtistIds: ['ar1', 'ar7', 'ar6'],
  },
  {
    id: 'ar3', name: 'Atlas Echo', avatarGradient: ['#F59E0B', '#EF4444'], monthlyListeners: 9182734, followers: 2918374,
    bio: 'Atlas Echo creates expansive alternative rock with electronic flourishes. Their sound is characterized by layered guitars, atmospheric synths, and introspective lyrics.',
    genres: ['Alternative', 'Indie Rock', 'Electronic'], verified: true,
    topTrackIds: ['t3', 't9', 't15', 't30'], albumIds: ['al3', 'al8'], relatedArtistIds: ['ar4', 'ar8', 'ar7'],
  },
  {
    id: 'ar4', name: 'Mira Lane', avatarGradient: ['#10B981', '#3B82F6'], monthlyListeners: 15293817, followers: 5182934,
    bio: 'Mira Lane is a Norwegian electropop artist known for her ethereal vocals and shimmering production. Her music ranges from upbeat dance tracks to intimate ballads.',
    genres: ['Electropop', 'Chillwave', 'Dance'], verified: true,
    topTrackIds: ['t4', 't10', 't16', 't26'], albumIds: ['al4', 'al14'], relatedArtistIds: ['ar6', 'ar2', 'ar7'],
  },
  {
    id: 'ar5', name: 'Circuit Dawn', avatarGradient: ['#06B6D4', '#8B5CF6'], monthlyListeners: 7829174, followers: 1829374,
    bio: 'Circuit Dawn crafts intricate IDM and ambient electronic compositions designed for deep focus and creative flow. Each track is a carefully constructed sonic environment.',
    genres: ['IDM', 'Ambient', 'Electronic'], verified: true,
    topTrackIds: ['t6', 't12', 't17', 't24'], albumIds: ['al5', 'al9'], relatedArtistIds: ['ar1', 'ar8', 'ar3'],
  },
  {
    id: 'ar6', name: 'Amber Sky', avatarGradient: ['#F97316', '#EAB308'], monthlyListeners: 22918347, followers: 7293817,
    bio: 'Amber Sky brings warm, sun-soaked indie pop with infectious melodies and heartfelt lyrics. Her golden-hour aesthetic has defined a generation of feel-good music.',
    genres: ['Indie Pop', 'Folk Pop', 'Acoustic'], verified: true,
    topTrackIds: ['t7', 't14', 't22'], albumIds: ['al6', 'al13'], relatedArtistIds: ['ar4', 'ar7', 'ar3'],
  },
  {
    id: 'ar7', name: 'Velvet Haze', avatarGradient: ['#BE185D', '#7C3AED'], monthlyListeners: 6293817, followers: 1293847,
    bio: 'Velvet Haze wraps listeners in dreamy soundscapes of reverb-drenched guitars and whispered vocals. Their dream pop sound invites you to lose yourself completely.',
    genres: ['Dream Pop', 'Shoegaze', 'Indie'], verified: false,
    topTrackIds: ['t19', 't20', 't29'], albumIds: ['al11'], relatedArtistIds: ['ar3', 'ar8', 'ar4'],
  },
  {
    id: 'ar8', name: 'Echo Valley', avatarGradient: ['#1F2937', '#6B7280'], monthlyListeners: 4182937, followers: 892374,
    bio: 'Echo Valley creates sprawling post-rock epics and atmospheric ambient works. Their compositions build slowly, rewarding patient listeners with cathartic crescendos.',
    genres: ['Post-rock', 'Ambient', 'Experimental'], verified: false,
    topTrackIds: ['t21', 't23', 't28'], albumIds: ['al12', 'al15'], relatedArtistIds: ['ar5', 'ar1', 'ar7'],
  },
];

export function getArtistById(id: string): Artist | undefined {
  return artists.find(a => a.id === id);
}

export function formatListeners(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}
