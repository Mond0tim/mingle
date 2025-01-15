'use client';
import { Playlist } from '@/types';
import { usePlayer } from '@/context/PlayerContext';
import { initialPlaylists } from '@/lib/data';

import styles from './Page.module.css'
import TrackList from '@/components/TrackList/TrackList';

const PlaylistPage = ({ params }: { params: { id: string } }) => {
  const { playTrack, playPlaylist, playlistIsPlaying, togglePlay, currentTrack, playing } = usePlayer(); // Добавили playing
  const playlistId = parseInt(params.id, 10);

  // Ищем плейлист по ID
  const playlist = initialPlaylists.find((p) => p.id === playlistId);

  if (!playlist) {
    return <div>Playlist not found</div>;
  }

  return (
    <div>
      <h1>{playlist.title}</h1>
      <img src={playlist.cover} alt={playlist.title} width={200} height={200} />

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (playlistIsPlaying?.id === playlist.id) {
            togglePlay();
          } else {
            playPlaylist(playlist, false);
          }
        }}
      >
        <span className="material-symbols-outlined">
          {playlistIsPlaying?.id === playlist.id && playing ? 'pause_circle' : 'play_circle'}
        </span>
      </button>

      {playlistIsPlaying?.id === playlist.id && (
        <span className={styles.playing}>Now Playing: {currentTrack?.title}</span>
      )}

      <TrackList tracks={playlist.tracks} onTrackSelect={(track) => playTrack(track, playlist)} currentTrack={currentTrack} />
    </div>
  );
};

export default PlaylistPage;