import { Track, Playlist } from '@/types';

export const initialTracks: Track[] = [
  {
    id: 1,
    title: 'Track 1',
    artist: 'Artist 1',
    src: '/audio/track1.mp3',
    cover: '/cover1.jpg',
  },
  {
    id: 2,
    title: 'Track 2',
    artist: 'Artist 2',
    src: '/audio/track2.mp3',
    cover: '/cover2.jpg',
  },
  {
    id: 3,
    title: 'Track 3',
    artist: 'Artist 3',
    src: '/audio/track3.mp3',
    cover: '/cover3.jpg',
  },
  {
    id: 4,
    title: 'Track 4',
    artist: 'Artist 4',
    src: '/audio/track4.mp3',
    cover: '/cover4.jpg',
  },
  {
    id: 5,
    title: 'Track 5',
    artist: 'Artist 5',
    src: '/audio/track5.mp3',
    cover: '/cover5.jpg',
  },
];

export const initialPlaylists: Playlist[] = [
  {
    id: 1,
    title: 'Волна',
    cover: '/wave-playlist-cover.jpg', // Обложка для плейлиста "Волна"
    tracks: initialTracks, // Сначала пусть там будут все треки,
    isPlaying: false,
  },
  {
    id: 2,
    title: 'Playlist 2',
    cover: '/cover2.jpg',
    tracks: [initialTracks[1], initialTracks[3]],
    isPlaying: true,
  },
];