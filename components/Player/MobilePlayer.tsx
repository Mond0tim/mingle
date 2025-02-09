'use client';
import React, { RefObject, useState } from 'react';
import { Playlist, Track } from '@/types';
import styles from './Player.module.css';
import ExpandedControlsDrawer from './ExpandedControlsDrawer';
import ReactHowler from 'react-howler';
import Image from 'next/image';
import cn from 'classnames'

interface MobilePlayerProps {
  currentTrack: Track | null;
  playing: boolean;
  duration: number;
  seek: number;
  onPlayPause: () => void;
  onSeek: (seek: number) => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  tracks: Track[];
  onTrackSelect: (track: Track) => void;

  howlerRef:RefObject<ReactHowler>;
  playlistIsPlaying: Playlist | null;
}

const MobilePlayer: React.FC<MobilePlayerProps> = ({
  currentTrack,
  playing,
  duration,
  seek,
  onPlayPause,
  onSeek,
  onNextTrack,
  onPrevTrack,
  tracks,
  onTrackSelect,
  playlistIsPlaying
}) => {
  const [isExpandedDrawerOpen, setIsExpandedDrawerOpen] = useState(false);

const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const progressRect = target.getBoundingClientRect();
    const clickX = e.clientX - progressRect.left;
    const newSeek = (clickX / progressRect.width) * duration;

    onSeek(newSeek);
  };
  return (
    <div className={styles.mobilePlayer}>
      {currentTrack && (
        <>
          <div className={styles.mobilePlayerMinimized} onClick={() => setIsExpandedDrawerOpen(true)}>
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              width={45}
              height={45}
              className={styles.mobilePlayerCover}
            />
            <div className={styles.mobilePlayerInfoMini}>
              <div className={styles.trackTitle}>{currentTrack.title}</div>
              <div className={styles.trackArtist}>{currentTrack.artist}</div>
            </div>
            <div
              className={styles.mobileProgressBarContainer}
              onClick={(e) => {
                e.stopPropagation();
                handleSeek(e);
              }}
            >
              <div
                className={styles.mobileProgressBar}
                style={{
                  width: `${duration > 0 ? (seek / duration) * 100 : 0}%`,
                }}
              />
            </div>
              <button onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
              }}
               className={cn(styles.play_button, styles.mobilePlayIcon, 
          {
            [styles.pauseIcon]: playing == true,
            [styles.playIcon]: playing == false,

          })} ></button>
          </div>

          <ExpandedControlsDrawer
            isDrawerOpen={isExpandedDrawerOpen}
            setIsDrawerOpen={setIsExpandedDrawerOpen}
            currentTrack={currentTrack}
            playing={playing}
            duration={duration}
            seek={seek}
            onPlayPause={onPlayPause}
            onSeek={onSeek}
            onNextTrack={onNextTrack}
            onPrevTrack={onPrevTrack}
            tracks={tracks}
            onTrackSelect={onTrackSelect}
            playlistIsPlaying={playlistIsPlaying}
          />
        </>
      )}
    </div>
  );
};

export default MobilePlayer;