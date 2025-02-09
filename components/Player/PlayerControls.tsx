'use client';
import React, { useRef } from 'react';
import { Playlist, Track } from '@/types';
import styles from './Player.module.css';
import Image from 'next/image';
// import PlayIcon from '../../public/icons/play.svg'
// import PauseIcon from '../../public/icons/pause.svg'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DownloadIcon from '../../public/icons/download.svg'
import NextIcon from '../../public/icons/next.svg'
import PrevIcon from '../../public/icons/previous.svg'
import QueueDrawer from './QueueDrawer';
import cn from 'classnames'
import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../Button/Button';
import MoreIcon from '../../public/icons/more.svg'

interface PlayerControlsProps {
  currentTrack: Track | null;
  playing: boolean;
  duration: number;
  seek: number;
  onPlayPause: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  onSeek: (seek: number) => void;
  isDragging: boolean; // Добавлено для стилизации
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  playlistIsPlaying: Playlist | null;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  currentTrack,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  playing,
  duration,
  seek,
  onPlayPause,
  onPrevTrack,
  onNextTrack,
  onSeek,
  isDragging,
  isDrawerOpen,
  setIsDrawerOpen,
  tracks,
  onTrackSelect,
  playlistIsPlaying
}) => {

    const formatTime = (seconds: number) => (
      <NumberFlowGroup>
        <div
          style={{ fontVariantNumeric: 'tabular-nums', '--number-flow-char-height': '0.85em'} as React.CSSProperties}
          className={cn("~text-xs/2xl flex items-baseline", styles.numberFlow)}
        >
          <NumberFlow trend={1} value={Math.floor(seconds / 60)} format={{ minimumIntegerDigits: 1 }} />
          <NumberFlow
            prefix=":"
            trend={1}
            value={Math.floor(seconds % 60)}
            digits={{ 1: { max: 5 } }}
            format={{ minimumIntegerDigits: 2 }}
            transformTiming={{ duration: 370}}
          />
        </div>
      </NumberFlowGroup>
    );

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current) {
          const progressRect = progressRef.current.getBoundingClientRect();
          const clickX = e.clientX - progressRect.left;
          const newSeek = (clickX / progressRect.width) * duration;
          onSeek(newSeek);
        }
    };

    const progressRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.playerControls}>
      {currentTrack && (
        <>
          <button onClick={onPlayPause} className={cn(styles.play_button, 
          {
            [styles.pauseIcon]: playing == true,
            [styles.playIcon]: playing == false,

          })} >
           
            <span className="material-symbols-outlined">
              {//playing ? <PauseIcon/> : <PlayIcon/>
               }
            </span>
          </button>
 
          <button onClick={onPrevTrack} className={styles.prev_button}>
            <span className="material-symbols-outlined"><PrevIcon/></span>

          </button>

          <button onClick={onNextTrack} className={styles.next_button}>
            <span className="material-symbols-outlined"><NextIcon/></span>
          </button>

          <div className={styles.playerInfo}>
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              width={40}
              height={40}
              className="rounded-[8px]"
            />
            <div className={styles.trackInfo}>
              <div className={cn(styles.trackTitle, styles.trackText)}>
              <span>{currentTrack.title}</span>
                <div className={styles.marquee} aria-hidden="true">
                    <div className={styles.marquee__inner}>
                        <span>{currentTrack.title}</span>
                        <span>{currentTrack.title}</span>
                        <span>{currentTrack.title}</span>
                        <span>{currentTrack.title}</span>
                    </div>
                </div>
                </div>
              <div className={cn(styles.trackArtist, styles.trackText)}>
              <span>{currentTrack.artist}</span>
              <div className={styles.marquee} aria-hidden="true">
              <div className={styles.marquee__inner}>
                        <span>{currentTrack.artist}</span>
                        <span>{currentTrack.artist}</span>
                        <span>{currentTrack.artist}</span>
                        <span>{currentTrack.artist}</span>
                    </div>
                </div>
                </div>
            </div>
         
          </div>
          <div className={styles.other_controls}>
          <DropdownMenu>
      <DropdownMenuTrigger>
        <Button view='ghost'><MoreIcon/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-[25px] p-2 gap-2">
      <DropdownMenuItem>
      <a
              href={currentTrack.fullSrc}
              download={currentTrack.title + '.mp3'}
              className={styles.downloadButton}
              onClick={(e) => e.stopPropagation()}
            >

              <span className="material-symbols-outlined"><DownloadIcon/></span> скачать трек

            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

          <QueueDrawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            tracks={tracks}
            currentTrack={currentTrack}
            onTrackSelect={onTrackSelect}
            playlist={playlistIsPlaying}
          />
          </div>




          <div className={styles.progressBlock}>
<span className={styles.currentTime}>{formatTime(seek)}</span>
          <div
            className={styles.playerProgress}
            onClick={handleSeek}
            ref={progressRef}
          >
            
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${isDragging ? styles.dragging : ''}`}
                style={{ width: `${duration > 0 ? (seek / duration) * 100 : 0}%` }}
              />
            </div>
            
          </div>
          
          <span className={styles.duration}>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerControls;