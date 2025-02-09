// app/playlists/[id]/PlaylistPageClient.tsx
'use client';
import { usePlayer } from '@/context/PlayerContext';
import { initialPlaylists } from '@/data/data';
import PlayPlaylistIcon from '@/public/icons/PlayPlaylistIcon.svg';
import PausePlaylistIcon from '@/public/icons/PausePlaylistIcon.svg';
import styles from './Page.module.css';
import TrackList from '@/components/TrackList/TrackList';
import Image from 'next/image';
import { Button } from '@/components/Button/Button';
import { useEffect, useState, useRef } from 'react';
import ColorThief from 'colorthief';


type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


const PlaylistPageClient = ({ params }: Props) => {
    const { playTrack, playPlaylist, playlistIsPlaying, togglePlay, currentTrack, playing } = usePlayer();
    const playlistId = parseInt(params.id, 10);
    const playlist = initialPlaylists.find((p) => p.id === playlistId);
    const [dominantColor, setDominantColor] = useState<string>('#000000');
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
            extractDominantColor();
        }
    }, [playlistId]);

    const extractDominantColor = () => {
        if (imageRef.current) {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(imageRef.current);
            setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        }
    };

    if (!playlist) {
        return <div>Playlist not found</div>;
    }

    return (
        <div className='p-5 md:ps-52 pr-4'>
            <div
                className={styles.playlist_gradient}
                style={{ '--playlist-dominant-color': dominantColor } as React.CSSProperties}
            ></div>
            <div className={styles.playlist}>
                <div className={styles.title}>
                    <h1>{playlist.title}</h1>
                    {playlistIsPlaying?.id === playlist.id && (
                        <span className={styles.playing}><b>Now Playing:</b>  {currentTrack?.title}</span>
                    )}
                </div>
                <Image
                    ref={imageRef}
                    src={playlist.cover}
                    alt={playlist.title}
                    width={200}
                    height={200}
                    className={styles.cover}
                    onLoad={extractDominantColor}
                />

                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (playlistIsPlaying?.id === playlist.id) {
                            togglePlay();
                        } else {
                            playPlaylist(playlist);
                        }
                    }}
                    className={styles.playButton}
                >
                    <span className="material-symbols-outlined">
                        {playlistIsPlaying?.id === playlist.id && playing ? <PlayPlaylistIcon /> : <PausePlaylistIcon />}
                    </span>
                </Button>
            </div>
            <TrackList tracks={playlist.tracks} onTrackSelect={(track) => playTrack(track, playlist)} currentTrack={currentTrack} trackItemMaxWidth='55vw' />
        </div>
    );
};

export default PlaylistPageClient;