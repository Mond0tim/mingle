'use client';
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import ReactHowler from 'react-howler';
import { Track, Playlist } from '@/types';
import { initialTracks, initialPlaylists } from '@/data/data';

interface PlayerContextProps {
  currentTrack: Track | null;
  playing: boolean;
  duration: number;
  seek: number;
  howlerState: string; // Добавлено
  isQueueDrawerOpen: boolean;
  playlistIsPlaying: Playlist | null;
  howlerRef: React.RefObject<ReactHowler>;
  audioContext: React.RefObject<AudioContext | null>;
  audioNode: React.RefObject<MediaElementAudioSourceNode | null>;
  tracks: Track[];
  initialPlaylists: Playlist[];
  playTrack: (track: Track, playlist?: Playlist) => void;
  playPlaylist: (playlist: Playlist) => void;
  togglePlay: () => void;
  handleSeek: (seek: number) => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
  handleOnEnd: () => void;
  setIsQueueDrawerOpen: (isOpen: boolean) => void;
  setCurrentTrack: (track: Track | null) => void;
  setPlaying: (playing: boolean) => void;
  setDuration: (duration: number) => void;
  setSeek: (seek: number) => void;
  setTracks: (tracks: Track[]) => void;
  setHowlerState: (state: string) => void; // Добавлено
  isMuted: boolean;
  toggleMute: () => void;
  sendNotification: (track: Track) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: React.ReactNode;
  initialTracks: Track[];
  initialPlaylists: Playlist[];
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const howlerRef = useRef<ReactHowler>(null);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [howlerState, setHowlerState] = useState<string>("unloaded"); // Добавлено
  const [isQueueDrawerOpen, setIsQueueDrawerOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted((prevIsMuted) => !prevIsMuted);
  }, []);
  const audioContext = useRef<AudioContext | null>(null);
  const audioNode = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }
  }, []);

  useEffect(() => {
    if (howlerRef.current && howlerRef.current.howler && audioContext.current) {
      const sound = howlerRef.current.howler;
      
      if (!audioNode.current) {
        audioNode.current = audioContext.current.createMediaElementSource(sound._sounds[0]?._node);
        audioNode.current.connect(audioContext.current.destination);
      }
    }

    // Очистка audioNode при размонтировании или смене трека
    return () => {
      if (audioNode.current) {
        audioNode.current.disconnect();
        audioNode.current = null;
      }
    };
}, [howlerRef, audioContext]);
  // Обновляем useEffect, чтобы использовать isMuted
  useEffect(() => {
    if (howlerRef.current && howlerRef.current.howler) {
      howlerRef.current.howler.mute(isMuted); // Используем .mute() вместо .volume()
    }
  }, [isMuted, howlerRef]);

  useEffect(() => {
    if (initialPlaylists.length > 0) {
      playPlaylist(initialPlaylists[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioContext.current) return;
    audioContext.current = new AudioContext();
  }, [])
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (playing && howlerRef.current) {
      intervalId = setInterval(() => {
        if (howlerRef.current) {
          const currentSeek = howlerRef.current.seek() as number;
          if (!isNaN(currentSeek)) {
            setSeek(currentSeek);
          }
        }
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [playing, howlerRef]);

  // Добавляем useEffect для отслеживания состояния howler
  useEffect(() => {
    const handleHowlerStateChange = () => {
      if (howlerRef.current && howlerRef.current.howler) {
        setHowlerState(howlerRef.current.howler.state());
      }
    };

    const currentHowlerRef = howlerRef.current;

    if (currentHowlerRef && currentHowlerRef.howler) {
      // Подписываемся на события изменения состояния
      currentHowlerRef.howler.on('load', handleHowlerStateChange);
      currentHowlerRef.howler.on('play', handleHowlerStateChange);
      currentHowlerRef.howler.on('pause', handleHowlerStateChange);
      currentHowlerRef.howler.on('stop', handleHowlerStateChange);
      currentHowlerRef.howler.on('end', handleHowlerStateChange);

      // Вызываем обработчик для установки начального состояния
      handleHowlerStateChange();
    }

    // Очистка при размонтировании или смене трека
    return () => {
      if (currentHowlerRef && currentHowlerRef.howler) {
        currentHowlerRef.howler.off('load', handleHowlerStateChange);
        currentHowlerRef.howler.off('play', handleHowlerStateChange);
        currentHowlerRef.howler.off('pause', handleHowlerStateChange);
        currentHowlerRef.howler.off('stop', handleHowlerStateChange);
        currentHowlerRef.howler.off('end', handleHowlerStateChange);
      }
    };
  }, [howlerRef, currentTrack]);

  const sendNotification = useCallback((track: Track) => {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({
            type: 'TRACK_CHANGE',
            track: {
              title: track.title,
              artist: track.artist,
              cover: track.cover,
            },
            actions: [ // Добавляем actions
              // Иконки для кнопок
              { action: 'pause', title: '', icon: '/icons/PlayPlaylistIcon.svg' },
              { action: 'next', title: '', icon: '/icons/next.svg' },
              { action: 'prev', title: '', icon: '/icons/previous.svg' }, 
            ],
            tag: 'music-player-notification', // Add a tag
          });
        }
      });
    }
  }, []);

  const playTrack = useCallback(
    async (track: Track, playlist?: Playlist) => {
      if (howlerRef.current) {
        howlerRef.current.stop();
      }

      await setCurrentTrack(track);
      if (playlist) {
        await setCurrentPlaylist(playlist);
        await setTracks(playlist.tracks);
      }
      setPlaying(true);

      // Отправляем уведомление
      sendNotification(track);
    },
    [
      setCurrentTrack,
      setPlaying,
      setCurrentPlaylist,
      setTracks,
      sendNotification
    ],
  );

    const handleOnEnd = useCallback(() => {
    if (currentTrack && tracks) {
      const currentTrackIndex = tracks.findIndex(
        (track) => track.id === currentTrack.id
      );
      if (currentTrackIndex < tracks.length - 1) {
        // Если есть следующий трек, воспроизводим его
        playTrack(tracks[currentTrackIndex + 1], currentPlaylist ?? undefined);
      } else {
        // Если это последний трек в плейлисте, переходим к первому треку
        if (currentPlaylist) {
            const firstTrack = currentPlaylist.tracks[0];
            playTrack(firstTrack, currentPlaylist);
        } else {
          setPlaying(false);
        }
      }
    } else {
      // Если нет текущего плейлиста, просто останавливаем воспроизведение
      setPlaying(false);
    }
    }, [currentTrack, tracks, playTrack, currentPlaylist, setPlaying]);

const playPlaylist = useCallback(
    async (playlist: Playlist) => {
    await setCurrentPlaylist(playlist);
    await setTracks(playlist.tracks);
    if (playlist.tracks.length > 0) {
        // Запускаем первый трек в плейлисте
        await playTrack(playlist.tracks[0], playlist);
        setPlaying(true); // Добавлено: Убедимся, что состояние playing установлено в true
    }
    },
    [playTrack, setCurrentPlaylist, setTracks],
);

  const togglePlay = useCallback(() => {
    setPlaying(!playing);
  }, [setPlaying, playing]);

  const handleSeek = useCallback(
    (newSeek: number) => {
      if (howlerRef.current) {
        howlerRef.current.seek(newSeek);
        setSeek(newSeek);
      }
    },
    [howlerRef, setSeek],
  );

  const handleNextTrack = useCallback(() => {
    if (currentTrack && tracks) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
      playTrack(tracks[nextTrackIndex], currentPlaylist ?? undefined);
    }
  }, [currentTrack, tracks, playTrack, currentPlaylist]);

  const handlePrevTrack = useCallback(() => {
    if (currentTrack && tracks) {
      const currentTrackIndex = tracks.findIndex((track) => track.id === currentTrack.id);
      const prevTrackIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
      playTrack(tracks[prevTrackIndex], currentPlaylist ?? undefined);
    }
  }, [currentTrack, tracks, playTrack, currentPlaylist]);

  useEffect(() => {
    // Добавляем обработчик сообщений от service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'NOTIFICATION_ACTION') {
                const { action } = event.data;
                switch (action) {
                case 'prev':
                    handlePrevTrack();
                    break;
                case 'pause':
                    togglePlay();
                    break;
                case 'next':
                    handleNextTrack();
                    break;
                }
            }
            });
        }

    return () => {
        // Удаляем обработчик при размонтировании
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.removeEventListener('message', () => {});
        }
        };
    }, [handlePrevTrack, handleNextTrack, togglePlay]);

  // Добавлено: получаем продолжительность трека, когда он загружен
  useEffect(() => {
    const currentHowler = howlerRef.current?.howler;
    if (currentHowler) {
      const handleLoad = () => {
        const newDuration = currentHowler.duration();
        if (newDuration && !isNaN(newDuration)) {
          setDuration(newDuration);
        }
      };

      currentHowler.on("load", handleLoad);

      return () => {
        currentHowler.off("load", handleLoad);
      };
    }
  }, [howlerRef, currentTrack]);
  const value = useMemo(
    () => ({
      currentTrack,
      playing,
      duration,
      seek,
      howlerState, // Добавлено
      isQueueDrawerOpen,
      playlistIsPlaying: currentPlaylist,
      howlerRef,
      audioContext,
      audioNode,
      tracks,
      playTrack,
      playPlaylist,
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
      initialPlaylists,
      setHowlerState, // Добавлено
      isMuted,
      toggleMute,
    }),
    [
      currentTrack,
      playing,
      duration,
      seek,
      howlerState, // Добавлено
      isQueueDrawerOpen,
      currentPlaylist,
      howlerRef,
      audioContext,
      audioNode,
      tracks,
      playTrack,
      playPlaylist,
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
      setHowlerState, // Добавлено
      isMuted,
      toggleMute,
    ],
  );
  

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};