"use server only"
import { Track, Playlist } from '@/types';


export const initialTracks: Track[] = [
  {
    id: 1,
    title: 'The Line (from the series Arcane League of Legends)',
    artist: 'Twenty One Pilots, Arcane, Legue of Legends',
    src: '/audio/track1.mp3',
    cover: '/covers/cover1.jpg',
    fullSrc: '/audio/track1.mp3',
    type: 'track',
  },
  {
    id: 2,
    title: 'Imagine Dragons',
    artist: 'Ragged Insomnia',
    src: '/audio/track2.mp3',
    cover: '/covers/cover2.jpg',
    fullSrc: '/audio/track2.mp3', 
    type: 'track', },
  {
    id: 3,
    title: 'Тантум Верде Форте',
    artist: 'Тимати',
    src: '/audio/track3.mp3',
    cover: '/covers/cover3.jpg',
    fullSrc: '/audio/track3.mp3',
    type: 'track',
  },
  {
    id: 4,
    title: 'Sunflower - Spider-Man: Into the Spider-Verce',
    artist: 'Post Malone, Swae Lee',
    src: '/audio/track4.mp3',
    cover: '/covers/cover4.jpg',
    fullSrc: '/audio/track4.mp3',
    color: '#000000',
    type: 'track',
  },
  {
    id: 5,
    title: 'Faint',
    artist: 'Linkin Park',
    src: '/audio/track5.mp3',
    cover: '/covers/cover5.jpg',
    fullSrc: '/audio/track5.mp3',
    type: 'track',
  },
  {
    id: 6,
    title: 'Sound 07380',
    artist: 'unkown',
    src: '/audio/7380 (1).mp3',
    fullSrc: '/audio/7380 (1).mp3',
    cover: '/covers/sound-icon.png',
    type: 'track',
  },
  {
    id: 7,
    title: 'Astronaut In The Ocean',
    artist: 'Masked Wolf',
    src: '/audio/Astronaut In The Ocean.mp3',
    fullSrc: '/audio/Astronaut In The Ocean.mp3',
    cover: '/covers/Astronaut In The Ocean.jpg',
    type: 'track',
  },
  {
    id: 8,
    title: 'Come Play (from the series Arcane League of Legends)',
    artist: 'Stray Kids, Arcane, Legaue of Legends',
    src: '/audio/Come_play.mp3',
    fullSrc: '/audio/Come_play.mp3',
    cover: '/covers/cover1.jpg',
    type: 'track',
  },
  {
    id: 9,
    title: 'Bang Bang - New Version',
    artist: "K'naan",
    src: '/audio/bang bang.mp3',
    fullSrc: '/audio/bang bang.mp3',
    cover: '/covers/bang bang.jpg',
    type: 'track',
  },
  {
    id: 10,
    title: 'bad guy',
    artist: 'Billie Eilish',
    src: '/audio/bad guy.mp3',
    fullSrc: '/audio/bad guy.mp3',
    cover: '/covers/bad guy.jpg',
    type: 'track',
  },
  {
    id: 11,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    src: '/audio/Blinding Lights.mp3',
    fullSrc: '/audio/Blinding Lights.mp3',
    cover: '/covers/Blinding Lights.png',
    type: 'track',
  },
  {
    id: 12,
    title: 'Broken Neon Love',
    artist: 'unkown',
    src: '/audio/Broken Neon Love.mp3',
    fullSrc: '/audio/Broken Neon Love.mp3',
    cover: '/covers/Broken Neon Love.jpg',
    type: 'track',
  },
  {
    id: 13,
    title: 'Eyes Closed',
    artist: 'Imagine Dragons',
    src: '/audio/Eyes Closed - Imagine Dragons.m4a',
    fullSrc: '/audio/Eyes Closed - Imagine Dragons.m4a',
    cover: '/covers/Eyes Closed - Imagine Dragons.jpg',
    type: 'track',
  },
  {
    id: 14,
    title: 'Heavydirtysoul',
    artist: 'Twenty One Pilots',
    src: '/audio/Heavydirtysoul.mp3',
    fullSrc: '/audio/Heavydirtysoul.mp3',
    cover: '/covers/Heavydirtysoul.jpg',
    type: 'track',},
  {
    id: 15,
    title: "What's Up Danger",
    artist: 'Blackway, Black Caviar',
    src: "/audio/Blackway, Black Caviar - What's Up Danger.mp3",
    fullSrc: "/audio/Blackway, Black Caviar - What's Up Danger.mp3",
    cover: '/covers/cover4.jpg',
    color: '#000000',
    type: 'track',},
  {
    id: 16,
    title: 'LALALALA (Rock Ver.)',
    artist: 'Stray Kids',
    src: '/audio/LALALALA (Rock Ver.).mp3',
    fullSrc: '/audio/LALALALA (Rock Ver.).mp3',
    cover: '/covers/LALALALA (Rock Ver.).jpg',
    type: 'track',},
  {
    id: 17,
    title: 'Nice to Meet You',
    artist: 'Imagine Dragons',
    src: '/audio/Nice to Meet You.mp3',
    fullSrc: '/audio/Nice to Meet You.mp3',
    cover: '/covers/Nice to Meet You.jpg',
    type: 'track',},
  {
    id: 19,
    title: 'Overcompensate',
    artist: 'Twenty One Pilots',
    src: '/audio/Overcompensate.mp3',
    fullSrc: '/audio/Overcompensate.mp3',
    cover: '/covers/Overcompensate.jpg',
    type: 'track',},
  {
    id: 20,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    src: '/audio/Smells Like Teen Spirit.mp3',
    fullSrc: '/audio/Smells Like Teen Spirit.mp3',
    cover: '/covers/Smells Like Teen Spirit.jpg',
    type: 'track',},
  {
    id: 21,
    title: 'Way Up',
    artist: 'Jaden Smith',
    src: '/audio/Way_Up.m4a',
    fullSrc: '/audio/Way_Up.m4a',
    cover: '/covers/cover4.jpg',
     color: '#000000',
     type: 'track',
     },
  {
    id: 22,
    title: 'Sugar',
    artist: 'Maroon 5',
    src: '/audio/Sugar.mp3',
    fullSrc: '/audio/Sugar.mp3',
    cover: '/covers/Sugar.jpg',
    type: 'track',},
  {
    id: 23,
    title: 'Navigating',
    artist: 'Twenty One Pilots',
    src: '/audio/Twenty One Pilots - Navigating.mp3',
    fullSrc: '/audio/Twenty One Pilots - Navigating.mp3',
    cover: '/covers/Twenty One Pilots - Navigating.jpg',
    type: 'track',},
  {
    id: 24,
    title: 'Голуби счастья',
    artist: 'общество',
    src: '/audio/Голуби счастья (1).mp3',
    fullSrc: '/audio/Голуби счастья (1).mp3',
    cover: '/covers/Голуби счастья (1).jpg',
    type: 'track',},
  {
    id: 25,
    title: 'Горы Казахстана',
    artist: 'анонимное горное сообщество',
    src: '/audio/Горы Казахстана.mp3',
    fullSrc: '/audio/Горы Казахстана.mp3',
    cover: '/covers/Горы Казахстана.jpg',
    type: 'track',},
  {
    id: 27,
    title: 'Сладкая жизнь Маша и Медведь',
    artist: 'СВУДИ',
    src: '/audio/Сладкая_жизнь_СВУДИ Маша_и_Медведь.mp3',
    fullSrc: '/audio/Сладкая_жизнь_СВУДИ Маша_и_Медведь.mp3',
    cover: '/covers/Сладкая_жизнь_СВУДИ Маша_и_Медведь.jpg',
    type: 'track', },
  {
    id: 28,
    title: 'Big Dawgs',
    artist: 'Hanumankind, Kalmi',
    src: '/audio/Big Dawgs - Hanumankind   Kalmi.m4a',
    fullSrc: '/audio/Big Dawgs - Hanumankind   Kalmi.m4a',
    cover: '/covers/Big Dawgs - Hanumankind   Kalmi.jpg',
    type: 'track', },
  {
    id: 29,
    title: 'Lane Boy',
    artist: 'Twenty One Pilots',
    src: '/audio/Lane_Boy.mp3',
    fullSrc: '/audio/Lane_Boy.mp3',
    cover: '/covers/Heavydirtysoul.jpg',
    type: 'track',},
  {
    id: 30,
    title: 'Jerk it out',
    artist: 'Caesars Palace',
    src: '/audio/caesars_palace_-_jerk_it_out.mp3',
    fullSrc: '/audio/caesars_palace_-_jerk_it_out.mp3',
    cover: '/covers/caesars_palace_-_jerk_it_out.jpg',
    type: 'track', },
  {
    id: 31,
    title: 'Heat Waves',
    artist: 'Glass Animals',
    src: '/audio/Glass_Animals_-_Heat_Waves.mp3',
    fullSrc: '/audio/Glass_Animals_-_Heat_Waves.mp3',
    cover: '/covers/Glass_Animals_-_Heat_Waves.jpg',
    type: 'track', },
];




// Функция для генерации случайного целого числа от min до max включительно
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray<T>(array: T[]): T[] {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Функция для генерации уникального случайного набора треков
function generateUniqueRandomPlaylist(tracks: Track[]): Track[] {
  // Генерируем случайное количество треков от 10 до 15
  const trackCount = getRandomInt(10, 15);
  // Перемешиваем копию исходного массива
  const shuffledTracks = shuffleArray(tracks);
  // Выбираем первые trackCount элементов, чтобы гарантировать, что треки не повторяются
  return shuffledTracks.slice(0, trackCount);
}



export const initialPlaylists: Playlist[] = [
  {
    id: 1,
    title: 'вайб',
    cover: '/covers/playlists/vibe.png', // Обложка для плейлиста "Волна"
    tracks: generateUniqueRandomPlaylist(initialTracks), // Сначала пусть там будут все треки,
    isPlaying: false,
    category: 'vibe',
    type: 'playlist',
  },
  {
    id: 2,
    title: 'Playlist 2',
    cover: '/covers/playlists/playlist.png',
    tracks: [initialTracks[1], initialTracks[27]],
    isPlaying: false,
    category: 'playlist',
    type: 'playlist',
  },
  {
    id: 3,
    title: 'Playlist 3',
    cover: '/covers/playlists/playlist.png',
    tracks: [initialTracks[1], initialTracks[27]],
    isPlaying: false,
    category: 'playlist',
    type: 'playlist',
  },
  {
    id: 4,
    title: 'вайб дня',
    cover: '/covers/playlists/vibeDay.jpg', // Обложка для плейлиста "Волна"
    tracks: generateUniqueRandomPlaylist(initialTracks), // Сначала пусть там будут все треки,
    isPlaying: false,
    category: 'vibe',
    type: 'playlist',
  },
];