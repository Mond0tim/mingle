import React from 'react';
import { Track } from '@/types';
import styles from './Player.module.css';

interface PlayerControlsProps {
  currentTrack: Track | null;
  nextTrack: Track | null;
  playing: boolean;
  duration: number;
  seek: number;
  onPlayPause: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onSeek: (seek: number) => void;
  isDragging: boolean;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentTrack,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nextTrack,
  playing,
  duration,
  seek,
  onPlayPause,
  onPrevTrack,
  onNextTrack,
  onSeek,
  isDragging,
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const progressRect = target.getBoundingClientRect();
    const clickX = e.clientX - progressRect.left;
    const newSeek = (clickX / progressRect.width) * duration;

    onSeek(newSeek);
  };

  return (
    <div className={styles.playerControls}>
      {currentTrack && (
        <>
          <button onClick={onPlayPause} className={styles.playerButton}>
            <span className="material-symbols-outlined">
              {playing ? 'pause_circle' : 'play_circle'}
            </span>
          </button>

          <button onClick={onPrevTrack} className={styles.playerButton}>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>

          <button onClick={onNextTrack} className={styles.playerButton}>
            <span className="material-symbols-outlined">skip_next</span>
          </button>

          <div className={styles.playerInfo}>
            <img src={currentTrack.cover} alt={currentTrack.title} width={40} height={40} />
            <div className={styles.trackInfo}>
              <div className={styles.trackTitle}>{currentTrack.title}</div>
              <div className={styles.trackArtist}>{currentTrack.artist}</div>
            </div>
            <a
              href={currentTrack.src}
              download={currentTrack.title + '.mp3'}
              className={styles.playerButton}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="material-symbols-outlined">download</span>
            </a>
          </div>

          <div className={styles.playerProgress} onClick={handleSeek}>
            <span className={styles.currentTime}>{formatTime(seek)}</span>
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${isDragging ? styles.dragging : ''}`}
                style={{ width: `${duration > 0 ? (seek / duration) * 100 : 0}%` }}
              />
            </div>
            <span className={styles.duration}>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerControls;