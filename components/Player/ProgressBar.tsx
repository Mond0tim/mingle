import React, { useRef } from 'react';
import styles from './Player.module.css';

interface ProgressBarProps {
  duration: number;
  seek: number;
  isDragging: boolean;
  onSeek: (seek: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  duration,
  seek,
  isDragging,
  onSeek,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const progressRect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - progressRect.left;
      const newSeek = (clickX / progressRect.width) * duration;
      onSeek(newSeek);
    }
  };

  return (
    <div
      className={styles.playerProgress}
      onClick={handleSeek}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      ref={progressRef}
    >
      <span className={styles.currentTime}>{formatTime(seek)}</span>
      <div className={styles.progressBarContainer}>
        <div
          className={`${styles.progressBar} ${isDragging ? styles.dragging : ''}`}
          style={{ width: `${duration > 0 ? (seek / duration) * 100 : 0}%` }}
        />
      </div>
      <span className={styles.duration}>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;