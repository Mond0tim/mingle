 /* eslint-disable */

'use client';
import React, { useState, useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { Button } from '@/components/Button/Button';
import styles from "./page.module.css"

import OtherPlay from '@/public/icons/playOtherIcon.svg'
import OtherPause from '@/public/icons/pauseOtherIcon.svg'



// ЕСТЬ ВОЗМОЖНОСТЬ СЛОМАТЬ ДАННЫЙ КОД, ПРОСЬБА НЕ ТРОГАТЬ ЕГО!!!!!!!!!!!!!

import AudioMotionVisualizer from '@/components/AudioMotionVisualizer/AudioMotionVisualizer';

import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';





const Home = () => {
  const {
    currentTrack,
    playing,
    howlerRef,
    audioContext,
    playPlaylist,
    initialPlaylists,
    playlistIsPlaying,
    togglePlay,
  } = usePlayer();

  const [showBackground, setShowBackground] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(true);

  const wavePlaylist = initialPlaylists.find((p) => p.category === "vibe");

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
  
    if (wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && playing) {
      setShowBackground(false);
    } else {
      timeoutId = setTimeout(() => {
        setShowBackground(true);
      }, 500);
    }
  
    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && !playing) {
      timeoutId = setTimeout(() => {
        setShowVisualizer(false);
      }, 500); // Задержка 500 миллисекунд
    } else {
      setShowVisualizer(true);
    }

    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  const CATEGORY_NAMES: Record<string, string> = {
    vibe: 'По настроению',
  };
  
  const categoryOrder: string[] = ['vibe'];
  const playlistsByCategory = initialPlaylists.reduce((acc, playlist) => {
    if (playlist.category === 'vibe') {
      if (!acc['vibe']) {
        acc['vibe'] = [];
      }
      acc['vibe'].push(playlist);
    }
    return acc;
  }, {} as Record<string, typeof initialPlaylists>);
    


  return (
    <>
      <div className={styles.page}>
        <div className={styles.preview}>

<div className={styles.vibe}>
  <h1 className={styles.title}>запусти свой вайб</h1>
  <Skeleton/>
        {wavePlaylist && (
          <Button
            ButtonRadius="lg"
            view="outline"
            fontFamily='Oddval'
            fontWeight='bold'
            className={styles.vibe_button}
            onClick={(e) => {
              e.stopPropagation();
              if (playlistIsPlaying?.category === wavePlaylist.category) {
                togglePlay();
              } else {
                playPlaylist(wavePlaylist);
              }
            }}
          >
            <span className="material-symbols-outlined">
              {playlistIsPlaying?.category === wavePlaylist.category && playing
                ? <OtherPause/>
                : <OtherPlay/>
                }
                вайб
            </span>
          </Button>
        )}
        </div>
      </div>
      </div>
      {wavePlaylist && playlistIsPlaying?.category === wavePlaylist.category && showVisualizer ? (
  <div className={styles.canvas_container}>
    <AudioMotionVisualizer
      audioContext={audioContext}
      currentTrack={currentTrack}
      howlerRef={howlerRef}
    />
  </div>
) : null}
{showBackground && <BackgroundCanvas />}


{playlistsByCategory['vibe'] && playlistsByCategory['vibe'].length > 0 && (
      <div className="my-8 p-2">
        <h2 className="text-xl font-oddval mb-4 font-geist">
          {CATEGORY_NAMES['vibe']}
        </h2>
        <PlaylistsCarousel playlists={playlistsByCategory['vibe']} />
      </div>
    )}
    </>
  );
};

export default Home;