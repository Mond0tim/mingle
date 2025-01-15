'use client';
import React, { useState, useEffect, useRef } from 'react';
import ReactHowler from 'react-howler';
//import { Track, Playlist } from '@/types';
import styles from './Player.module.css';
import { useMediaQuery } from 'react-responsive';
import PlayerControls from './PlayerControls';
import MobilePlayer from './MobilePlayer';
import PlayerLoader from './PlayerLoader';
import ColorThief from 'colorthief';
import { usePlayer } from '@/context/PlayerContext';


 interface PlayerProps {
  color?: string;
 }

const Player: React.FC<PlayerProps> = () => {
  const {
    currentTrack,
    nextTrack,
    playing,
    duration,
    seek,
    isQueueDrawerOpen,
    howlerRef,
    nextHowlerRef,
    tracks,
    playTrack,
    togglePlay,
    handleSeek,
    handleNextTrack,
    handlePrevTrack,
    handleOnEnd,
    setIsQueueDrawerOpen,
    setCurrentTrack,
    setPlaying,
    setDuration,
    setSeek,
    setTracks,
    playlistIsPlaying
  } = usePlayer();

  const [dominantColor, setDominantColor] = useState<string>('#f5f5f5');
  const [rgb, setRgb] = useState<[number, number, number]>([245, 245, 245]);

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 640px)' });
  const [isClient, setIsClient] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
        setTracks(tracks);
        if (tracks.length > 0) {
            setCurrentTrack(tracks[0]);
            setPlaying(false);
        }
  }, [tracks]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
  
    if (playing && howlerRef.current) {
      intervalId = setInterval(() => {
        if (howlerRef.current) { // Добавляем проверку
          const currentSeek = howlerRef.current.seek() as number;
          if (!isNaN(currentSeek)) {
            setSeek(currentSeek);
          }
        }
      }, 1000);
    }
  
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, howlerRef]);


  

  useEffect(() => {
    const getDominantColor = () => {
      if (currentTrack && currentTrack.cover && imgRef.current) {
        const colorThief = new ColorThief();
        const img = imgRef.current;

        const handleImageLoad = () => {
          try {
            const color = colorThief.getColor(img);
            const hexColor = `#${color.map((x: number) => x.toString(16).padStart(2, '0')).join('')}`;
            const [r, g, b] = color;
            setDominantColor(hexColor);
            setRgb([r, g, b]);
          } catch (error) {
            console.error('Failed to extract color:', error);
            setDominantColor('#f5f5f5');
            setRgb([245, 245, 245]);
          }
        };

        if (img.complete) {
          handleImageLoad();
        } else {
          img.onload = handleImageLoad;
        }
      } else {
        setDominantColor('#f5f5f5');
        setRgb([245, 245, 245]);
      }
    };

    getDominantColor();
  }, [currentTrack]);

  useEffect(() => {
    if (!currentTrack && tracks.length > 0) {
        setCurrentTrack(tracks[0]);
        setPlaying(false);
    }
}, [tracks, currentTrack]);

  return (
    <>
    <style>
    {`
        :root {
          --dominant-color: ${currentTrack?.color || dominantColor};
          --dominant-color-r: ${rgb[0]};
          --dominant-color-g: ${rgb[1]};
          --dominant-color-b: ${rgb[2]};
        }
      `}
    </style>
    <div
      className={styles.player}
      style={
        {
          '--dominant-color': currentTrack?.color || dominantColor,
          '--dominant-color-r': `${rgb[0]}`,
          '--dominant-color-g': `${rgb[1]}`,
          '--dominant-color-b': `${rgb[2]}`,
        } as React.CSSProperties & {
            "--dominant-color"?: string,
            "--dominant-color-r"?: string,
            "--dominant-color-g"?: string,
            "--dominant-color-b"?: string,
        }
    }
    >
      <div className={styles.player_background}></div>
      {// eslint-disable-next-line @next/next/no-img-element
      <img
        crossOrigin="anonymous"
        ref={imgRef}
        src={currentTrack?.cover}
        alt=""
        style={{ display: 'none' }}
      />}
      {currentTrack && (
        <>
          <ReactHowler
            src={currentTrack.src}
            playing={playing}
            onEnd={handleOnEnd}
            ref={howlerRef}
            preload={true}
            onLoad={() => {
              if (howlerRef.current) {
                setDuration(howlerRef.current.duration());
              }
            }}
          />
          {nextTrack && (
            <ReactHowler
              src={nextTrack.src}
              playing={false}
              preload={true}
              ref={nextHowlerRef}
              html5={true}
            />
          )}
        </>
      )}
      {!isClient && <PlayerLoader />}

      {isClient && isDesktopOrLaptop && (
        <>
          <PlayerControls
            currentTrack={currentTrack}
            nextTrack={nextTrack}
            playing={playing}
            duration={duration}
            seek={seek}
            onPlayPause={togglePlay}
            onPrevTrack={handlePrevTrack}
            onNextTrack={handleNextTrack}
            onSeek={handleSeek}
            isDragging={false}
            isDrawerOpen={isQueueDrawerOpen}
            setIsDrawerOpen={setIsQueueDrawerOpen}
            tracks={tracks}
            onTrackSelect={playTrack}
            playlistIsPlaying={playlistIsPlaying}
          />
        </>
      )}

      {isClient && !isDesktopOrLaptop && (
        <MobilePlayer
          currentTrack={currentTrack}
          nextTrack={nextTrack}
          playing={playing}
          duration={duration}
          seek={seek}
          onPlayPause={togglePlay}
          onSeek={handleSeek}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          tracks={tracks}
          onTrackSelect={playTrack}
          howlerRef={howlerRef}
          playlistIsPlaying={playlistIsPlaying}
        />
      )}
    </div>
    </>
  );
};

export default Player;

