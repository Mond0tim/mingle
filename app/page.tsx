'use client';
import React, { useState, useEffect } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import Link from 'next/link';
import { Button } from '@/components/Button/Button';
import styles from "./page.module.css"
import LogoIcon from '@/public/icons/LogoIcon.svg'
import LogoText from '@/public/icons/LogoText.svg'


// ЕСТЬ ВОЗМОЖНОСТЬ СЛОМАТЬ ДАННЫЙ КОД, ПРОСЬБА НЕ ТРОГАТЬ ЕГО!!!!!!!!!!!!!

import AudioMotionVisualizer from '@/components/AudioMotionVisualizer/AudioMotionVisualizer';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import BackgroundCanvas from '@/components/BackgroundCanvas/BackgroundCanvas';

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

  const wavePlaylist = initialPlaylists.find((p) => p.title === "Волна");

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (wavePlaylist && playlistIsPlaying?.id === wavePlaylist.id && !playing) {
      timeoutId = setTimeout(() => {
        setShowBackground(true);
      }, 500);
    } else {
      setShowBackground(false);
    }

    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    if (wavePlaylist && playlistIsPlaying?.id === wavePlaylist.id && !playing) {
      timeoutId = setTimeout(() => {
        setShowVisualizer(false);
      }, 500); // Задержка 500 миллисекунд
    } else {
      setShowVisualizer(true);
    }

    return () => clearTimeout(timeoutId);
  }, [playing, playlistIsPlaying, wavePlaylist]);

  return (
    <>
      <div className={styles.page}>
        <div className={styles.preview}>
          <div className={styles.controls}>
            <div className={styles.logo}>
              <div className={styles.icon}>
                <LogoIcon/>
              </div>
            <div className={styles.text}>
              <LogoText/>
            </div>
          </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/playlists">playlists</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <p>список плейлистов</p>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
</div>
<div className={styles.vibe}>
        {wavePlaylist && (
          <Button
            ButtonRadius="lg"
            view="primary"
            fontFamily="PixelSans"
            fontWeight='bold'
            onClick={(e) => {
              e.stopPropagation();
              if (playlistIsPlaying?.id === wavePlaylist.id) {
                togglePlay();
              } else {
                playPlaylist(wavePlaylist, true);
              }
            }}
          >
            <span className="material-symbols-outlined">
              {playlistIsPlaying?.id === wavePlaylist.id && playing
                ? ""
                : "play_circle"}
                вайб
            </span>
          </Button>
        )}
        </div>
      </div>
      </div>
      {wavePlaylist && playlistIsPlaying?.id === wavePlaylist.id && showVisualizer ? (
       <div className={styles.canvas_container} >
       <AudioMotionVisualizer
          audioContext={audioContext}
          currentTrack={currentTrack}
          howlerRef={howlerRef}
        />
        </div>
      ) : (
        showBackground && <BackgroundCanvas />
      )}
    </>
  );
};

export default Home;