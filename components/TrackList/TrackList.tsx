import React from 'react';
import TrackItem from '../TrackItem/TrackItem';
import { Track } from '@/types';
import styles from './TrackList.module.css'; // Импортируем стили

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  currentTrack: Track | null;
  trackItemMaxWidth?: string;
  trackItemSpanWidth?: string;
}

const TrackList: React.FC<TrackListProps> = ({
  tracks,
  onTrackSelect,
  currentTrack,
  trackItemMaxWidth,
  trackItemSpanWidth,
}) => {
  return (
    <div className={styles.trackList}>
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          onTrackSelect={onTrackSelect}
          isPlaying={currentTrack?.id === track.id}
          maxWidth={trackItemMaxWidth || '8rem'}
          spanWidth={trackItemSpanWidth || 'var(--trackItemMaxWidth)'}
        />
      ))}
    </div>
  );
};

export default TrackList;