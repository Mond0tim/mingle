

export interface Track {
	id: number;
	title: string;
	artist: string;
	src: string;
	cover: string;
	color?: string; // не обязательный
	fullSrc: string | 'none';
	type: 'track';
  }
  
  export interface Playlist {
	id: number;
	title: string;
	cover: string;
	tracks: Track[];
	isPlaying: boolean;
	category: string | 'other' | 'single' | 'album' | 'vibe' | 'playlist';
	type: 'playlist';
	colors?: {
		button?: string; // Добавляем опциональные поля для цветов
		text?: string;
		icon?: string;
	  };
  }