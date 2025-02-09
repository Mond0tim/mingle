'use client';
import { useState, useRef, useEffect } from 'react';
import { initialTracks, initialPlaylists } from '@/data/data';
import SearchResults from '@/components/SearchResults/SearchResults';
import { Track, Playlist } from '@/types';
import styles from './SearchPage.module.css';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import SearchForm from '@/components/SearchForm/SearchForm';

interface SearchPageProps {
  searchParams: {
    q: string;
  };
}

const filterTracks = (tracks: Track[], query: string): Track[] => {
  const lowerCaseQuery = query.toLowerCase();
  return tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(lowerCaseQuery) ||
      track.artist.toLowerCase().includes(lowerCaseQuery),
  );
};

const filterPlaylists = (playlists: Playlist[], query: string): Playlist[] => {
  const lowerCaseQuery = query.toLowerCase();
  return playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(lowerCaseQuery),
  );
};

type SortType = 'all' | 'tracks' | 'playlists';

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const query = searchParams.q || '';
  const [sortType, setSortType] = useState<SortType>('all');
  const [filteredResults, setFilteredResults] = useState<(Track | Playlist)[]>(
    [],
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });

  useEffect(() => {
    const container = containerRef.current;

    if (sortType && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          (100 - (clipRight / container.offsetWidth) * 100).toFixed(),
        )}% 0 ${Number(((clipLeft / container.offsetWidth) * 100).toFixed())}% round 17px)`;
      }
    }
  }, [sortType, activeTabElementRef, containerRef]);

  useEffect(() => {
    const tracks = initialTracks;
    const playlists = initialPlaylists;

    const filteredTracks = filterTracks(tracks, query);
    const filteredPlaylists = filterPlaylists(playlists, query);

    let results: (Track | Playlist)[] = [];
    if (sortType === 'all') {
      results = [...filteredTracks, ...filteredPlaylists];
    } else if (sortType === 'tracks') {
      results = filteredTracks;
    } else if (sortType === 'playlists') {
      results = filteredPlaylists;
    }

    setFilteredResults(results);
  }, [query, sortType]);

  const TABS = [
    {
      name: 'all',
      icon: (
        <svg
          aria-hidden='true'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            fill='currentColor'
            d='M3 0h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zm0 6h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm6 0h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm-6 6h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm6 0h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z'
          />
        </svg>
      ),
    },
    {
      name: 'tracks',
      icon: (
        <svg
          aria-hidden='true'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='currentColor'
            d='M1 2a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 1 2Zm0 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 1 10Zm2.25-4.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5ZM2.5 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 2.5 14Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            fill='currentColor'
            d='M16 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
          />
        </svg>
      ),
    },
    {
      name: 'playlists',
      icon: (
        <svg
          aria-hidden='true'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            fill='currentColor'
            d='M2.5 14.4h11a.4.4 0 0 0 .4-.4 3.4 3.4 0 0 0-3.4-3.4h-5A3.4 3.4 0 0 0 2.1 14c0 .22.18.4.4.4Zm0 1.6h11a2 2 0 0 0 2-2 5 5 0 0 0-5-5h-5a5 5 0 0 0-5 5 2 2 0 0 0 2 2ZM8 6.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'
          />
        </svg>
      ),
    },
  ];

  return (
    <div className='md:ps-52 md:pr-4'>
      {isMobile && (
        <div className='mb-6 mx-auto'>
          <SearchForm/>
        </div>
      )}
      {!isMobile && query && (
        <h1 className='text-center p-2 font-bold'>Search Results for: {query}</h1>
      )}
        <div className={styles.wrapper}>
          <ul className={styles.list}>
            {TABS.map((tab) => (
              <li key={tab.name}>
                <button
                  ref={sortType === tab.name ? activeTabElementRef : null}
                  data-tab={tab.name}
                  onClick={() => {
                    setSortType(tab.name as SortType);
                  }}
                  className={styles.button}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>

          <div
            aria-hidden
            className={styles.clip_path_container}
            ref={containerRef}
          >
            <ul className={cn(styles.list, styles.list_overlay)}>
              {TABS.map((tab) => (
                <li key={tab.name}>
                  <button
                    data-tab={tab.name}
                    onClick={() => {
                      setSortType(tab.name as SortType);
                    }}
                    className={cn(styles.button_overlay, styles.button)}
                    tabIndex={-1}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      

      <SearchResults key={`${query}-${sortType}`} results={filteredResults} />
    </div>
  );
};

export default SearchPage;