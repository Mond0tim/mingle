'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { usePlayer } from '@/context/PlayerContext';
import { initialTracks, initialPlaylists } from '@/lib/data';
import Player from './Player/Player';

interface PlayerWrapperProps {
  children: React.ReactNode;
}

const PlayerWrapper: React.FC<PlayerWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(false);
  const { setTracks, playPlaylist } = usePlayer();

  useEffect(() => {
    setTracks(initialTracks);
    if (initialPlaylists.length > 0) {
      playPlaylist(initialPlaylists[0]);
    }
  }, [setTracks, playPlaylist]);

  useEffect(() => {
    // Показываем плеер только на страницах, где он нужен
    setShowPlayer(pathname !== '/probe');
  }, [pathname]);

  return (
    <>
      {children}
      {showPlayer && <Player />}
    </>
  );
};

export default PlayerWrapper;