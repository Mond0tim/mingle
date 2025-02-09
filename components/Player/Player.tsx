 /* eslint-disable */
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

    playing,
    duration,
    seek,
    isQueueDrawerOpen,
    howlerRef,
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
    playlistIsPlaying,
    sendNotification,
  } = usePlayer();

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    }
}, []);

  const [dominantColor, setDominantColor] = useState<string>('#0c0312');
  const [rgb, setRgb] = useState<[number, number, number]>([245, 245, 245]);
  const [accentColor, setAccentColor] = useState<string>('#f5f5f5');

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
        if (howlerRef.current) {
          // Добавляем проверку
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
            
            // Учитываем переданный цвет, если он есть
            const finalColor = currentTrack.color ? hexToRgb(currentTrack.color) : color;

            const hexColor = `#${finalColor
              .map((x: number) => x.toString(16).padStart(2, '0'))
              .join('')}`;
            const [r, g, b] = finalColor;

            // Анализ доминантного цвета и определение accentColor
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            const isLight = luminance > 128; // Порог для определения светлого/темного цвета

            setAccentColor(isLight ? darkenColor(finalColor, 0.5) : lightenColor(finalColor, 0.7));
            setDominantColor(hexColor);
            setRgb([r, g, b]);
          } catch (error) {
            console.error('Failed to extract color:', error);
            setDominantColor('#0c0312');
            setRgb([245, 245, 245]);
            setAccentColor('#f5f5f5');
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
        setAccentColor('#0c0312');
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

  // Вспомогательные функции для работы с цветом
  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0];
  };

  const darkenColor = (color: [number, number, number], amount: number): string => {
    const [r, g, b] = color;
    return `#${[r, g, b]
      .map((c) => Math.max(0, Math.round(c - c * amount)).toString(16).padStart(2, '0'))
      .join('')}`;
  };

  const lightenColor = (color: [number, number, number], amount: number): string => {
    const [r, g, b] = color;
    return `#${[r, g, b]
      .map((c) => Math.min(255, Math.round(c + (255 - c) * amount)).toString(16).padStart(2, '0'))
      .join('')}`;
  };

  return (
    <>
      <style>
        {`
        :root {
          --dominant-color: ${currentTrack?.color || dominantColor};
          --dominant-color-r: ${rgb[0]};
          --dominant-color-g: ${rgb[1]};
          --dominant-color-b: ${rgb[2]};
          --mg-accent-color: ${accentColor};
        }
      `}
      </style>
      <div
        className={styles.player}
        style={{
          '--dominant-color': currentTrack?.color || dominantColor,
          '--dominant-color-r': `${rgb[0]}`,
          '--dominant-color-g': `${rgb[1]}`,
          '--dominant-color-b': `${rgb[2]}`,
          '--mg-accent-color': accentColor,
        } as React.CSSProperties & {
          '--dominant-color'?: string;
          '--dominant-color-r'?: string;
          '--dominant-color-g'?: string;
          '--dominant-color-b'?: string;
          '--mg-accent-color'?: string;
        }}
      >
        <div className={styles.player_background}></div>
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img
            crossOrigin="anonymous"
            ref={imgRef}
            src={currentTrack?.cover}
            alt=""
            style={{ display: 'none' }}
          />
        }
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
           
          </>
        )}
        {!isClient && <PlayerLoader />}

        {isClient && isDesktopOrLaptop && (
          <>
            <PlayerControls
              currentTrack={currentTrack}
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