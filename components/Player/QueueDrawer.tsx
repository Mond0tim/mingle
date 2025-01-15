import TrackList from '../TrackList/TrackList';
import React from 'react';
import { Playlist, Track } from '@/types';
import styles from './Player.module.css';
import { Drawer } from 'vaul';
import { useMediaQuery } from 'react-responsive';
import QueueIcon from '../../public/icons/QueueMusic.svg'
import { Button } from '../Button/Button';

interface QueueDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  playlist: Playlist | null;
}

const QueueDrawer: React.FC<QueueDrawerProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  tracks,
  currentTrack,
  onTrackSelect,
  playlist
}) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 640px)' });
  return (
    <Drawer.Root
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
      shouldScaleBackground={false}
      modal={!isDesktopOrLaptop}
      direction={isDesktopOrLaptop ? 'right' : 'bottom'}
    >
		
	{isDesktopOrLaptop && (
		<Drawer.Trigger className={styles.QueueDrawerButton} >
       <Button view='ghost'>
        <QueueIcon/>
        </Button>
      </Drawer.Trigger>
	  )}
		

      <Drawer.Portal>
        {!isDesktopOrLaptop && (
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        )}
        <Drawer.Content
          className={`${styles.drawerContent} ${styles.queueDrawer} ${isDrawerOpen ? styles.open : styles.closed} ${
            !isDesktopOrLaptop ? styles.mobileDrawer  : ''
          }`}
        >
          {
           !isDesktopOrLaptop && (
            <div className={styles.mobileHandleContainer}>
              <div className={styles.mobileHandle} />
            </div>
           )
          }
          <div className={styles.drawerTrackList}>
            <div className="max-w-md mx-auto">
              <Drawer.Title className={styles.drawerTitle}>{playlist ? playlist.title : "очередь"}
              </Drawer.Title>
            </div>
            <div className={styles.tracklistDrawer}>
              <TrackList tracks={tracks} onTrackSelect={onTrackSelect} currentTrack={currentTrack} />
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default QueueDrawer;