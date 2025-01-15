import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import PlayerWrapper from '@/components/PlayerWrapper';
import { initialTracks, initialPlaylists } from '@/lib/data';
import localFont from "next/font/local";


export const viewport: Viewport = {
  themeColor: '#1356e9',
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

export const metadata: Metadata = {
  title: 'Mingle',
  description: 'Ваш музыкальный плеер',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PlayerProvider initialTracks={initialTracks} initialPlaylists={initialPlaylists}>
          <PlayerWrapper>{children}</PlayerWrapper>
        </PlayerProvider>
      </body>
    </html>
  );
}