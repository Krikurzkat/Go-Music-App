import { Playlist } from './types';

export const playlists: Playlist[] = [
  {
    id: 'pl1', title: 'Daily Mix 1', description: 'Nova Pulse, Scarlet Avenue, Circuit Dawn and more',
    owner: 'Go-Music', coverGradient: ['#FF3B30', '#FF8C00'],
    trackIds: ['t1', 't2', 't6', 't11', 't18', 't24'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'mix', createdAt: '2026-03-28',
  },
  {
    id: 'pl2', title: 'Daily Mix 2', description: 'Atlas Echo, Amber Sky, Velvet Haze and more',
    owner: 'Go-Music', coverGradient: ['#F59E0B', '#EF4444'],
    trackIds: ['t3', 't7', 't9', 't14', 't19', 't20'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'mix', createdAt: '2026-03-28',
  },
  {
    id: 'pl3', title: 'Daily Mix 3', description: 'Mira Lane, Echo Valley, and more',
    owner: 'Go-Music', coverGradient: ['#10B981', '#3B82F6'],
    trackIds: ['t4', 't10', 't16', 't21', 't23', 't26'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'mix', createdAt: '2026-03-28',
  },
  {
    id: 'pl4', title: 'Daily Mix 4', description: 'Circuit Dawn, Echo Valley, Nova Pulse and more',
    owner: 'Go-Music', coverGradient: ['#06B6D4', '#8B5CF6'],
    trackIds: ['t12', 't17', 't24', 't27', 't28'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'mix', createdAt: '2026-03-28',
  },
  {
    id: 'pl5', title: 'Daily Mix 5', description: 'Scarlet Avenue, Velvet Haze and more',
    owner: 'Go-Music', coverGradient: ['#8B5CF6', '#EC4899'],
    trackIds: ['t8', 't13', 't19', 't25', 't29'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'mix', createdAt: '2026-03-28',
  },
  {
    id: 'pl6', title: 'Daily Mix 6', description: 'Amber Sky, Atlas Echo and more',
    owner: 'Go-Music', coverGradient: ['#F97316', '#EAB308'],
    trackIds: ['t7', 't14', 't15', 't22', 't30'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'mix', createdAt: '2026-03-28',
  },
  {
    id: 'pl7', title: 'Discover Weekly', description: 'Your weekly mixtape of fresh music. Enjoy new discoveries tailored to your taste.',
    owner: 'Go-Music', coverGradient: ['#22C55E', '#15803D'],
    trackIds: ['t5', 't9', 't15', 't20', 't23', 't28', 't30'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'generated', createdAt: '2026-03-25',
  },
  {
    id: 'pl8', title: 'Release Radar', description: 'Catch all the latest music from artists you follow, plus new releases.',
    owner: 'Go-Music', coverGradient: ['#3B82F6', '#1D4ED8'],
    trackIds: ['t1', 't3', 't10', 't22', 't26'], followers: 0,
    isPublic: false, isCollaborative: false, type: 'generated', createdAt: '2026-03-22',
  },
  {
    id: 'pl9', title: 'Chill Vibes', description: 'Kick back and relax with these mellow tracks.',
    owner: 'Go-Music Editors', coverGradient: ['#0EA5E9', '#67E8F9'],
    trackIds: ['t4', 't16', 't17', 't18', 't26', 't27', 't29'], followers: 2918347,
    isPublic: true, isCollaborative: false, type: 'editorial', createdAt: '2026-01-15',
  },
  {
    id: 'pl10', title: 'Workout Energy', description: 'High-energy tracks to power your workout.',
    owner: 'Go-Music Editors', coverGradient: ['#EF4444', '#F97316'],
    trackIds: ['t1', 't5', 't11', 't13', 't22', 't25'], followers: 5182934,
    isPublic: true, isCollaborative: false, type: 'editorial', createdAt: '2026-02-01',
  },
  {
    id: 'pl11', title: 'Late Night Coding', description: 'Deep focus beats for late-night programming sessions.',
    owner: 'Go-Music Editors', coverGradient: ['#4338CA', '#7C3AED'],
    trackIds: ['t6', 't12', 't17', 't18', 't24', 't27', 't28'], followers: 1829374,
    isPublic: true, isCollaborative: false, type: 'editorial', createdAt: '2026-02-15',
  },
  {
    id: 'pl12', title: 'Morning Commute', description: 'Start your day with these uplifting tunes.',
    owner: 'Go-Music Editors', coverGradient: ['#F59E0B', '#FCD34D'],
    trackIds: ['t7', 't10', 't14', 't16', 't22', 't30'], followers: 3291847,
    isPublic: true, isCollaborative: false, type: 'editorial', createdAt: '2026-03-01',
  },
  {
    id: 'pl13', title: 'My Playlist #1', description: 'A collection of my favorite tracks.',
    owner: 'You', coverGradient: ['#FF3B30', '#8B5CF6'],
    trackIds: ['t1', 't3', 't7', 't10', 't20'], followers: 0,
    isPublic: true, isCollaborative: false, type: 'user', createdAt: '2026-03-10',
  },
  {
    id: 'pl14', title: 'Road Trip Mix', description: 'Perfect songs for the open road.',
    owner: 'You', coverGradient: ['#10B981', '#F97316'],
    trackIds: ['t5', 't7', 't13', 't14', 't22', 't25'], followers: 12,
    isPublic: true, isCollaborative: false, type: 'user', createdAt: '2026-02-20',
  },
  {
    id: 'pl15', title: 'Collab Vibes', description: 'A collaborative playlist with friends.',
    owner: 'You', coverGradient: ['#EC4899', '#F59E0B'],
    trackIds: ['t2', 't8', 't15', 't19', 't29'], followers: 5,
    isPublic: true, isCollaborative: true, type: 'user', createdAt: '2026-03-05',
  },
];

export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find(p => p.id === id);
}
