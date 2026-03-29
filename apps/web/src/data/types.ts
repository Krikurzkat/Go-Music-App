export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number; // seconds
  coverGradient: [string, string];
  liked: boolean;
  plays: number;
  explicit: boolean;
  dateAdded: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  year: number;
  genre: string;
  coverGradient: [string, string];
  trackIds: string[];
  totalDuration: number;
  label: string;
  type: 'album' | 'single' | 'ep' | 'compilation';
}

export interface Artist {
  id: string;
  name: string;
  avatarGradient: [string, string];
  monthlyListeners: number;
  followers: number;
  bio: string;
  genres: string[];
  verified: boolean;
  topTrackIds: string[];
  albumIds: string[];
  relatedArtistIds: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  owner: string;
  coverGradient: [string, string];
  trackIds: string[];
  followers: number;
  isPublic: boolean;
  isCollaborative: boolean;
  type: 'user' | 'editorial' | 'generated' | 'mix';
  createdAt: string;
}

export interface PodcastShow {
  id: string;
  title: string;
  publisher: string;
  description: string;
  coverGradient: [string, string];
  episodes: PodcastEpisode[];
  category: string;
  subscribed: boolean;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  duration: number;
  date: string;
  played: boolean;
  progress: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  gradient: [string, string];
}

export interface LyricLine {
  time: number;
  text: string;
}

export interface User {
  id: string;
  displayName: string;
  avatarGradient: [string, string];
  followers: number;
  following: number;
  playlistIds: string[];
  topArtistIds: string[];
  topTrackIds: string[];
}
