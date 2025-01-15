'use client';
import { usePlayer } from '@/context/PlayerContext';
import Link from 'next/link';
const HomePage = () => {
  const { playPlaylist, initialPlaylists, togglePlay, playing, playlistIsPlaying } = usePlayer();

  return (
    <div>
      <h1>Welcome to the Music Player!</h1>
      
      <h2>Playlists:</h2>
      <ul>
        {initialPlaylists.map((playlist) => (
          <li key={playlist.id}>
            <Link href={`/playlists/${playlist.id}`}>
              <img src={playlist.cover} alt={playlist.title} width={100} height={100} />
              <h3>{playlist.title}</h3>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (playlistIsPlaying?.id === playlist.id) {
                  togglePlay();
                } else {
                  playPlaylist(playlist, true);
                }
              }}
            >
              <span className="material-symbols-outlined">
                {playlistIsPlaying?.id === playlist.id && playing
                  ? 'pause_circle'
                  : 'play_circle'}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;