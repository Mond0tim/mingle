'use client';
import { usePlayer } from '@/context/PlayerContext';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Playlist } from '@/types/index';
import styles from './PlaylistsCarousel.module.css';
import cn from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { ColorThiefOutput, getColorFromURL, getContrastingColor } from '@/lib/colorHelper';
import PlayPlaylistIcon from '@/public/icons/PlayPlaylistIcon.svg';
import PausePlaylistIcon from '@/public/icons/PausePlaylistIcon.svg';
import Image from 'next/image';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {

  

  const { playPlaylist, togglePlay, playing, playlistIsPlaying, playTrack } =
    usePlayer();
  const [colors, setColors] = useState<ColorThiefOutput | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // Проверяем, была ли уже пауза
    const hasPaused = localStorage.getItem('hasPausedOnInitialLoad');

    if (!hasPaused) { // Если паузы еще не было
      const timeoutId = setTimeout(() => {
        if (playing) {
          togglePlay();
        }
        // Устанавливаем флаг, что пауза была применена
        localStorage.setItem('hasPausedOnInitialLoad', 'true');
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [playing, togglePlay]);

  
  useEffect(() => {
    const fetchColors = async () => {
      // Если есть кастомные цвета в плейлисте - используем их
      if (playlist.colors) {
        const buttonColor = playlist.colors.button || '#C7D3FF';
        const contrastingColor = getContrastingColor(buttonColor);
        
        setColors({
          background: buttonColor,
          title: playlist.colors.text || '#C7D3FF',
          button: buttonColor,
          buttonColor: playlist.colors.icon || contrastingColor,
        });
      } 
      // Если цветов нет - генерируем из обложки
      else if (playlist.cover) {
        const colorThiefResult = await getColorFromURL(playlist.cover);
        if (colorThiefResult) {
          const contrastingColor = getContrastingColor(
            colorThiefResult.background
          );
          colorThiefResult.buttonColor = contrastingColor;
          setColors(colorThiefResult);
        }
      }
    };
    fetchColors();
  }, [playlist.cover, playlist.colors]); // Добавляем цвета плейлиста в зависимости

  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (playlistIsPlaying?.id === playlist.id) {
      togglePlay();
    } else {
      playPlaylist(playlist);
      if (playlist.tracks.length > 0) {
        playTrack(playlist.tracks[0], playlist);
      }
    }
  };

  return (
    <Link href={`/playlists/${playlist.id}`}>
      <div
        className={styles.card_blur}
        style={{
          '--card-blur-background': `url(${playlist.cover})`,
          '--card-button-background': playlist.colors?.button || colors?.button || '#C7D3FF',
          '--card-button-background-hover': `${playlist.colors?.button || colors?.button || '#DED6FF'}AA`,
          '--card-title-color': playlist.colors?.text || colors?.title || '#C7D3FF',
          '--card-button-color': playlist.colors?.icon || colors?.buttonColor || '#000',
        } as React.CSSProperties}
      >
        <Image
          ref={imageRef}
          src={playlist.cover}
          alt={playlist.title}
          width={300}
          height={300}
          style={{ display: 'none' }}
        />
        <div className={styles.card_text}>
          <h3 className={styles.blur_card_title}>
            <span>{playlist.title}</span>
            <div className={styles.marquee} aria-hidden='true'>
              <div className={styles.marquee__inner}>
                <span>{playlist.title}</span>
                <span>{playlist.title}</span>
                <span>{playlist.title}</span>
                <span>{playlist.title}</span>
              </div>
            </div>
          </h3>

          <button
            className={cn(styles.button, styles.card_button)}
            onClick={handlePlayClick}
          >
            {playlistIsPlaying?.id === playlist.id && playing ? (
              <PlayPlaylistIcon width={30} height={30} fill='currentColor' />
            ) : (
              <PausePlaylistIcon width={30} height={30} fill='currentColor' />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

interface PlaylistsCarouselProps {
  playlists: Playlist[];
}

export const PlaylistsCarousel: React.FC<PlaylistsCarouselProps> = ({
  playlists,
}) => {
  return (
	<div className='w-full relative px-[3.5rem]'>
    <Carousel className='w-full'>
      <CarouselContent>
        {playlists.map((playlist) => (
          <CarouselItem key={playlist.id} className='md:basis-1/2 lg:basis-1/4'>
            <div className='p-1'>
              <PlaylistCard playlist={playlist} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
	
	</div>
  );
};