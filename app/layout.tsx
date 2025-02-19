import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import PlayerWrapper from '@/components/PlayerWrapper';
import { initialTracks, initialPlaylists } from '@/data/data';
import localFont from "next/font/local";
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import Preloader from '@/components/Preloader/Preloader';

export const viewport: Viewport = {
  themeColor: '#0c0312',
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const Oddval = localFont({
  src: "./fonts/Oddval-SemiBold.woff",
  variable: "--font-oddval",
});
const OddvalItalic = localFont({
  src: "./fonts/Oddval-SemiBoldItalic.woff",
  variable: "--font-oddval-italic",
});
const Raydis = localFont({
  src: "./fonts/RAYDIS.woff",
  variable: "--font-raydis",
});

export const metadata: Metadata = {
  title: 'Mingle',
  description: 'Ваш музыкальный плеер',
  generator: "Next.js",
  manifest: "/manifest.json",
  openGraph: {
    images: '/preview.png',
    title: 'Mingle',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" >
      <body className={`${geistSans.variable} ${Oddval.variable} ${Raydis.variable} ${OddvalItalic.variable} ${geistMono.variable} antialiased`}>
      <NavigationMenu />
        <Preloader/>
        <PlayerProvider initialTracks={initialTracks} initialPlaylists={initialPlaylists}>
          <PlayerWrapper>{children}</PlayerWrapper>
        </PlayerProvider>
      </body>
    </html>
  );
}