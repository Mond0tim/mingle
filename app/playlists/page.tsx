import { Metadata } from 'next';
import PlaylistsPageClient from './playlistsPageClient';

export const metadata: Metadata = {
	title: 'Плейлисты',
	description: 'Персонализированные плейлисты для вашего настроения. Собирайте треки, редактируйте подборки и делитесь музыкой с Mingle.',
  keywords: 'музыкальные плейлисты, создать плейлист, коллекция треков, управление плейлистами',
  }
  


const PlaylistsPage = () => {
 

  return (
   <PlaylistsPageClient />
   
  );
};

export default PlaylistsPage;