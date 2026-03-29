import { PodcastShow } from './types';

export const podcasts: PodcastShow[] = [
  {
    id: 'pod1', title: 'The Sound Lab', publisher: 'Audio Network', category: 'Music',
    description: 'Dive deep into the art and science of sound design, music production, and the stories behind your favorite tracks.',
    coverGradient: ['#FF3B30', '#DC2626'], subscribed: true,
    episodes: [
      { id: 'ep1', title: 'The Rise of Lo-fi', description: 'How lo-fi hip-hop became the soundtrack for studying and relaxation.', duration: 2580, date: '2026-03-25', played: true, progress: 100 },
      { id: 'ep2', title: 'Synthesizers: Past & Future', description: 'From Moog to modular — the evolution of synthesizers.', duration: 3240, date: '2026-03-18', played: false, progress: 0 },
      { id: 'ep3', title: 'Mastering for Streaming', description: 'How mastering engineers optimize for Spotify, Apple Music, and more.', duration: 2100, date: '2026-03-11', played: false, progress: 45 },
    ],
  },
  {
    id: 'pod2', title: 'Tech & Tunes', publisher: 'Digital Media Co', category: 'Technology',
    description: 'Where technology meets music. Exploring AI composition, spatial audio, and the future of listening.',
    coverGradient: ['#3B82F6', '#8B5CF6'], subscribed: true,
    episodes: [
      { id: 'ep4', title: 'AI-Generated Music: Friend or Foe?', description: 'The ethical debate around AI creating music and what it means for artists.', duration: 3600, date: '2026-03-26', played: false, progress: 0 },
      { id: 'ep5', title: 'Spatial Audio Explained', description: 'How Dolby Atmos and spatial audio are changing how we experience music.', duration: 2700, date: '2026-03-19', played: true, progress: 100 },
    ],
  },
  {
    id: 'pod3', title: 'Behind the Lyrics', publisher: 'Song Stories Media', category: 'Music',
    description: 'Uncover the hidden meanings and untold stories behind the biggest songs in history.',
    coverGradient: ['#F59E0B', '#EF4444'], subscribed: false,
    episodes: [
      { id: 'ep6', title: 'Bohemian Rhapsody Decoded', description: 'The story of how Queen created one of the most iconic songs ever.', duration: 4200, date: '2026-03-24', played: false, progress: 0 },
      { id: 'ep7', title: 'The Making of "Blinding Lights"', description: 'How The Weeknd crafted a modern classic.', duration: 2400, date: '2026-03-17', played: false, progress: 0 },
      { id: 'ep8', title: 'Hidden Messages in Beatles Songs', description: 'Exploring the secret messages and backwards recordings.', duration: 3000, date: '2026-03-10', played: false, progress: 0 },
    ],
  },
  {
    id: 'pod4', title: 'The Creative Process', publisher: 'ArtistMinds', category: 'Arts',
    description: 'Conversations with musicians, producers, and artists about their creative journeys.',
    coverGradient: ['#10B981', '#06B6D4'], subscribed: false,
    episodes: [
      { id: 'ep9', title: 'Finding Your Sound', description: 'How emerging artists develop their unique musical identity.', duration: 3300, date: '2026-03-23', played: false, progress: 0 },
      { id: 'ep10', title: 'Overcoming Creative Blocks', description: 'Practical strategies from top producers for beating writer\'s block.', duration: 2880, date: '2026-03-16', played: false, progress: 0 },
    ],
  },
  {
    id: 'pod5', title: 'Vinyl & Vibe', publisher: 'Retro Sound Co', category: 'Music History',
    description: 'A nostalgic journey through the golden eras of music, one vinyl record at a time.',
    coverGradient: ['#BE185D', '#7C3AED'], subscribed: true,
    episodes: [
      { id: 'ep11', title: 'The Vinyl Revival', description: 'Why vinyl sales are booming in the digital age.', duration: 2520, date: '2026-03-22', played: true, progress: 100 },
      { id: 'ep12', title: '1970s Rock: A Deep Dive', description: 'Exploring the greatest rock albums of the 1970s.', duration: 3900, date: '2026-03-15', played: false, progress: 20 },
    ],
  },
];

export function getPodcastById(id: string): PodcastShow | undefined {
  return podcasts.find(p => p.id === id);
}
