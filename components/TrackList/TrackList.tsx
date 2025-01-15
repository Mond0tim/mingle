import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import { Track } from '@/types';
import styles from './TrackList.module.css'; // Импортируем стили

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  currentTrack: Track | null;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onTrackSelect,
  currentTrack,
}) => {
  return (
    <div className={styles.trackList}>
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          onTrackSelect={onTrackSelect}
          isPlaying={currentTrack?.id === track.id}
        />
      ))}
    </div>
  );
};

export default TrackList;