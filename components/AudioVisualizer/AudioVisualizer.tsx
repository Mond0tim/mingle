import React, { useRef, useEffect, useCallback } from 'react';
import AudioMotionAnalyzer, { Options, CanvasDrawInfo } from 'audiomotion-analyzer';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  analyzerOptions: Options | undefined;
  playing: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  audioRef,
  analyzerOptions,
  playing,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioMotionRef = useRef<AudioMotionAnalyzer | null>(null);

  const onCanvasDraw = useCallback(
    (instance: AudioMotionAnalyzer, info: CanvasDrawInfo) => {
      // Дополнительные действия при отрисовке кадра (опционально)
    },
    [],
  );

  useEffect(() => {
    if (canvasRef.current && audioRef.current) {
      console.log('AudioVisualizer: Создаём экземпляр AudioMotionAnalyzer');
      try {
        // Проверяем, подключен ли уже источник
        if (audioMotionRef.current) {
          console.log('AudioVisualizer: Уже есть экземпляр, отключаем старый источник');
          audioMotionRef.current.disconnectInput();
        }

        audioMotionRef.current = new AudioMotionAnalyzer(canvasRef.current, {
          ...analyzerOptions,
          source: audioRef.current,
          onCanvasDraw: onCanvasDraw,
        });

        if (playing) {
          audioMotionRef.current.start();
          console.log('AudioVisualizer: Запустили визуализацию (playing)');
        }
      } catch (error) {
        console.error(
          'AudioVisualizer: Ошибка при создании AudioMotionAnalyzer:',
          error,
        );
      }
    }

    return () => {
      // Очистка при размонтировании
      if (audioMotionRef.current) {
        console.log('AudioVisualizer: Очистка при размонтировании');
        audioMotionRef.current.disconnectInput();
        audioMotionRef.current.destroy();
        audioMotionRef.current = null;
      }
    };
  }, [audioRef, analyzerOptions, onCanvasDraw]);

  useEffect(() => {
    if (audioMotionRef.current) {
      if (playing) {
        console.log(
          'AudioVisualizer: Запустили визуализацию (useEffect playing)',
        );
        audioMotionRef.current.start();
      } else {
        console.log(
          'AudioVisualizer: Остановили визуализацию (useEffect playing)',
        );
        audioMotionRef.current.stop();
      }
    }
  }, [playing]);

  console.log('AudioVisualizer: Рендеринг');
  return <canvas ref={canvasRef} width={800} height={400} />;
};

export default AudioVisualizer;