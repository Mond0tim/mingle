'use client'
import React, { useState } from 'react';
import { Playlist, Track } from '@/types';
import styles from './Player.module.css';
import { Drawer } from 'vaul';
import QueueDrawer from './QueueDrawer';
import Image from 'next/image';
import { Button } from '../Button/Button';
import NextIcon from '../../public/icons/next.svg'
import PrevIcon from '../../public/icons/previous.svg'
import QueueIcon from '../../public/icons/QueueMusic.svg'
import MoreIcon from '../../public/icons/more.svg'
import cn from 'classnames'
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

interface ExpandedControlsDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  currentTrack: Track ;
  playing: boolean;
  duration: number;
  seek: number;
  onPlayPause: () => void;
  onSeek: (seek: number) => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  playlistIsPlaying: Playlist | null;
}

const ExpandedControlsDrawer: React.FC<ExpandedControlsDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
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
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const progressRect = target.getBoundingClientRect();
    const clickX = e.clientX - progressRect.left;
    const newSeek = (clickX / progressRect.width) * duration;

    onSeek(newSeek);
  };

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

  const toggleQueueDrawer = () => {
    setIsQueueDrawerOpen(!isQueueDrawerOpen);
  };

  return (
    <>
        <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} shouldScaleBackground={false} modal={true}>
        <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content
            className={`${styles.drawerContent} ${isDrawerOpen ? styles.open : styles.closed} ${
                styles.mobileDrawer
            }`}
            >
              {
            // <div className={styles.mobileHandleContainer}>
            //     <div className={styles.mobileHandle} />
            // </div>
            }
            <div className={styles.dialogHeader}>
                <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              width={200}
              height={200}
              className={styles.dialogCover}
            />
                <div className={styles.mobilePlayerInfo}>
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
                <Button className={styles.otherBtn} view='ghost'><MoreIcon/></Button>
            </div>
            <div className={styles.mobileProgressBlock}>

            <div className={styles.playerProgress} onClick={handleSeek}>
                
                <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{
                    width: `${duration > 0 ? (seek / duration) * 100 : 0}%`,
                    }}
                />
                </div>
                
            </div>
            <span className={styles.driverCurrentTime}>{formatTime(seek)}</span>
              <span className={styles.driverDuration}>{formatTime(duration)}</span>
              </div>
            <div className={styles.mobilePlayerControls}>
                <button onClick={onPrevTrack} className={styles.prev_button}>
                <span className="material-symbols-outlined"><PrevIcon/></span>
                </button>
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
                <button onClick={onNextTrack} className={styles.next_button}>
                <span className="material-symbols-outlined"><NextIcon/></span>
                </button>
                <Button view='ghost' onClick={toggleQueueDrawer} className={styles.queue_button}>
                <QueueIcon/>
                </Button>
            </div>
            </Drawer.Content>
        </Drawer.Portal>
        </Drawer.Root>
        <QueueDrawer
        isDrawerOpen={isQueueDrawerOpen}
        setIsDrawerOpen={setIsQueueDrawerOpen}
        tracks={tracks}
        currentTrack={currentTrack}
        onTrackSelect={onTrackSelect} 
        playlist={playlistIsPlaying}        
        />
    </>
  );
};

export default ExpandedControlsDrawer;