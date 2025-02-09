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
  maxWidth:string;
  spanWidth:string;
}

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  onTrackSelect,
  isPlaying,
  maxWidth,
  spanWidth,
}) => {
  return (
    <Button view='ghost' ButtonRadius='sm'
      className={`${styles.trackItem} ${isPlaying ? styles.playing : ''}`}
      onClick={() => onTrackSelect(track)}
      style={{ '--trackItemMaxWidth': `${maxWidth}`,  '--trackItemSpanWidth': `${spanWidth}` } as React.CSSProperties}
    >
      <Image
        src={track.cover}
        alt={track.title}
        width={50}
        height={50}
        className='rounded-[9px]'
      />
      <div className={styles.trackInfoWrapper}>
        <div className={`${styles.trackTitle} ${isPlaying ? styles.playing : ''}`}>
        
        {isPlaying ? (
          <>
          <span className='opacity-0'>{track.title}</span>
          <div className={styles.marquee} aria-hidden="true">
              <div className={styles.marquee__inner}>
                  <span>{track.title}</span>
                  <span>{track.title}</span>
                  <span>{track.title}</span>
                  <span>{track.title}</span>
              </div>

              </div>
              
          </>
        ) : (<>{track.title}</>)}
        
          
          
          </div>
        <div className={styles.trackArtist}>{track.artist}</div>
      </div>
      <a
        href={track.fullSrc}
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