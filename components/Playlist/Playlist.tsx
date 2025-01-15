// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext } from 'react';
import { Playlist } from '@/types';
import TrackList from '../TrackList/TrackList';
import Link from 'next/link';
import styles from '../Player/Player.module.css';

interface PlaylistProps {
  playlist: Playlist;
  onTrackSelect: (track: any) => void;
  currentTrack: any
}

const PlaylistComponent: React.FC<PlaylistProps> = ({ playlist, onTrackSelect, currentTrack }) => {
  return (
    <div>
      <Link href={`/playlist/${playlist.id}`}>
        <h2>{playlist.title}</h2>
      </Link>
      <img src={playlist.cover} alt={playlist.title} width={200} height={200} />
      <TrackList tracks={playlist.tracks} onTrackSelect={onTrackSelect} currentTrack={currentTrack}/>
      <button
        className={styles.playerButton}
        onClick={() => onTrackSelect(playlist.tracks[0])}
      >
        <span className="material-symbols-outlined">play_circle</span>
      </button>
    </div>
  );
};

export default PlaylistComponent;