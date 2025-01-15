import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { usePlayer } from '@/context/PlayerContext';
import { Options } from 'audiomotion-analyzer';

interface VisualizerWrapperProps {
  analyzerOptions?: Options;
}

const AudioVisualizer = dynamic(() => import('./AudioVisualizer'), {
  ssr: false,
});

const VisualizerWrapper: React.FC<VisualizerWrapperProps> = ({
  analyzerOptions,
}) => {
  const { currentTrack, playing, seek, howlerRef } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Синхронизируем воспроизведение
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch((e) => console.error("Ошибка воспроизведения:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  // Синхронизируем текущее время
  useEffect(() => {
    if (audioRef.current && howlerRef.current && currentTrack) {
      const soundDuration = howlerRef.current.duration();
      const soundSeek = howlerRef.current.seek();
    
      if (typeof soundSeek === 'number' && !isNaN(soundSeek) && soundSeek !== audioRef.current.currentTime) {
        // Проверяем, что howlerRef.current.seek() возвращает допустимое число
        const newSeek = soundSeek ;
        if (!isNaN(newSeek)) {
          audioRef.current.currentTime = newSeek;
        }
      }
    }
  }, [seek, currentTrack]);

  // Обновляем src
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
    }
  }, [currentTrack]);

  console.log('VisualizerWrapper: Рендеринг');

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <audio ref={audioRef} muted={false} volume={0.1} crossOrigin="anonymous" />
      {/* Устанавливаем громкость на минимум */}
      {currentTrack && (
        <AudioVisualizer
          audioRef={audioRef}
          analyzerOptions={analyzerOptions}
          playing={playing}
        />
      )}
    </div>
  );
};

export default VisualizerWrapper;