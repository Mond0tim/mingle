import React from 'react';
import { Track } from '@/types';
import styles from './TrackItem.module.css'; // Импортируем стили
import Image from 'next/image';
import DownloadIcon from '../../public/icons/download.svg'
import { Button } from '../Button/Button';

interface TrackItemProps {
  track: Track;
  onTrackSelect: (track: Track) => void;
  isPlaying: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  onTrackSelect,
  isPlaying,
}) => {
  return (
    <Button view='ghost' ButtonRadius='sm'
      className={`${styles.trackItem} ${isPlaying ? styles.playing : ''}`}
      onClick={() => onTrackSelect(track)}
    >
      <Image
        src={track.cover}
        alt={track.title}
        width={50}
        height={50}
        className='rounded-[9px]'
      />
      <div className={styles.trackInfoWrapper}>
        <div className={styles.trackTitle}>{track.title}</div>
        <div className={styles.trackArtist}>{track.artist}</div>
      </div>
      <a
        href={track.src}
        download={track.title + '.mp3'}
        onClick={(e) => e.stopPropagation()}
        className={styles.trackItem}
      >
        <span className="material-symbols-outlined"><DownloadIcon/></span>
      </a>
    </Button>
  );
};

export default TrackItem;