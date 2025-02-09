'use client';
import React from 'react';
import { Track, Playlist } from '@/types';
import Link from 'next/link';
import styles from './SearchResults.module.css';
import { usePlayer } from '@/context/PlayerContext';
import Image from 'next/image';
import { Button } from '../Button/Button';
import cn from 'classnames';
import PlayPlaylistIcon from '@/public/icons/PlayPlaylistIcon.svg';
import PausePlaylistIcon from '@/public/icons/PausePlaylistIcon.svg';

interface SearchResultsProps {
  results: (Track | Playlist)[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const {
    playTrack,
    playPlaylist,
    togglePlay,
    playing,
    currentTrack,
    playlistIsPlaying,
  } = usePlayer();

  return (
    <div className={styles.searchResults}>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li
              key={result.id}
              className={`${styles.searchItem} ${
                result.type === 'track' && currentTrack?.id === result.id
                  ? styles.playing
                  : ''
              }`}
            >
              {/* Используем result.type для определения типа */}
              {result.type === 'playlist' ? (
                // Отображаем плейлист
                <Link
                  className={styles.trackItemButton}
                  href={`/playlists/${result.id}`}
                >
                  <Image
                    src={result.cover}
                    alt={result.title}
                    width={50}
                    height={50}
                    className={styles.searchResultCover}
                  />
                  <div className={styles.trackItemPlaylist}>
                    <h3 className={styles.searchItemTitle}>{result.title}</h3>
                    <span className={styles.searchItemType}>Playlist</span>

                    <button
                      className={styles.playButton}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // Предотвращаем переход по ссылке
                        if (playlistIsPlaying?.id === result.id) {
                          togglePlay();
                        } else {
                          playPlaylist(result);
                          if (result.tracks.length > 0) {
                            playTrack(result.tracks[0], result);
                          }
                        }
                      }}
                    >
                      <span className='material-symbols-outlined'>
                        {playlistIsPlaying?.id === result.id && playing ? (
                          <PlayPlaylistIcon />
                        ) : (
                          <PausePlaylistIcon />
                        )}
                      </span>
                    </button>
                  </div>
                </Link>
              ) : (
                // Отображаем трек
                <Button
                  view='outline'
                  ButtonRadius='sm'
                  onClick={() => {
                    if (currentTrack?.id === result.id) {
                      togglePlay();
                    } else {
                      playTrack(result);
                    }
                  }}
                  className={cn(
                    styles.trackItemButton,
                    currentTrack?.id === result.id ? styles.searchItemActive : '',
                  )}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (currentTrack?.id === result.id) {
                        togglePlay();
                      } else {
                        playTrack(result);
                      }
                    }
                  }}
                >
                  <Image
                    src={result.cover}
                    alt={result.title}
                    width={50}
                    height={50}
                    className={styles.searchResultCover}
                  />
                  <div className={styles.searchItemContent}>
                    <h3 className={styles.searchItemTitle}>{result.title}</h3>
                    <p className={styles.searchItemArtist}>{result.artist}</p>
                    <span className={styles.searchItemType}>Track</span>
                  </div>
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center p-2 font-bold'>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;