export interface Track {
	id: number;
	title: string;
	artist: string;
	src: string;
	cover: string;
	color?: string; // не обязательный
  }
  
  export interface Playlist {
	id: number;
	title: string;
	cover: string;
	tracks: Track[];
	isPlaying: boolean;
  }