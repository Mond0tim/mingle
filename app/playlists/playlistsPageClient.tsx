 'use client';

import { usePlayer } from '@/context/PlayerContext';
import { PlaylistsCarousel } from '@/components/PlaylistsCarousel/PlaylistsCarousel';
import { useEffect } from 'react';



// Добавляем объект с отображаемыми названиями категорий
const CATEGORY_NAMES: Record<string, string> = {
  playlist: 'Плейлисты',
  album: 'Альбомы',
  single: 'Синглы',
  vibe: 'По настроению',
  other: 'Другое'
};

const PlaylistsPageClient = () => {
  const { initialPlaylists, togglePlay, playing } = usePlayer(); 
  

  useEffect(() => {
    // Если document.referrer пустой, значит страница загружена напрямую, а не через клиентскую навигацию
    if (typeof document !== 'undefined' && !document.referrer) {
      const timeoutId = setTimeout(() => {
        if (playing) {
          togglePlay();
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [playing, togglePlay]);

  
  const categoryOrder: (string | 'other' | 'single' | 'album' | 'vibe' | 'playlist')[] = [
    'playlist',
    'album',
    'single',
    'vibe',
    'other'
  ];

  const playlistsByCategory = initialPlaylists.reduce((acc, playlist) => {
    const category = categoryOrder.includes(playlist.category) 
      ? playlist.category 
      : 'other';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(playlist);
    return acc;
  }, {} as Record<string, typeof initialPlaylists>);

  // Модифицируем функцию для использования кастомных названий
  const getCategoryTitle = (category: string) => {
    return CATEGORY_NAMES[category] || 
           category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className='p-2 md:p-5 md:ps-52'>
      <h1 className='text-2xl font-bold mb-4 font-oddval'>
        Что послушаем сегодня?
      </h1>
      
      {categoryOrder.map((category) => {
        const playlists = playlistsByCategory[category];
        
        if (!playlists || playlists.length === 0) return null;

        return (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 font-geist">
              {getCategoryTitle(category)}
            </h2>
            <PlaylistsCarousel playlists={playlists} />
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistsPageClient;