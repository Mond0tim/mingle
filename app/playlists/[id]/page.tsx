// app/playlists/[id]/page.tsx

import { initialPlaylists } from '@/data/data';
import PlaylistPageClient from './PlaylistPageClient';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
    const playlistId = parseInt(params.id, 10);
    const playlist = initialPlaylists.find((p) => p.id === playlistId);


    // optionally access and extend (rather than replace) parent metadata


    if (!playlist) {
        return {
            title: `Playlist not found`,
            description: "Explore amazing music playlists.",
        };
    }

    return {
        title: `${playlist.title} `,
        description: "Explore amazing music playlists.",
    };
}


const PlaylistPage = ({ params, searchParams }: Props) => {
  return <PlaylistPageClient params={params} searchParams={searchParams} />;
};

export default PlaylistPage;