"use client";
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ReactHowler from 'react-howler';
import AudioMotionAnalyzer from 'audiomotion-analyzer';

// Динамически импортируем AudioMotionAnalyzer, чтобы избежать проблем с SSR
const AudioMotionAnalyzerDynamic = dynamic(() => import('audiomotion-analyzer'), { ssr: false });

const Home: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const howlerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioMotionRef = useRef<AudioMotionAnalyzer | null>(null);

  const handleLoad = (howler: any) => {
    const audioCtx = howler._ctx; // Используем AudioContext, созданный Howler
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    // Подключаем Howler к AnalyserNode
    const sound = howler._sounds[0];
    if (sound && sound._node) {
      sound._node.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    setAnalyser(analyser);
  };

  useEffect(() => {
    if (canvasRef.current && analyser) {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        analyser.getByteTimeDomainData(dataArray);
        if (audioMotionRef.current) {
          audioMotionRef.current.update(dataArray);
        }
        requestAnimationFrame(draw);
      };

      audioMotionRef.current = new AudioMotionAnalyzerDynamic(canvasRef.current, {
        mode: 0, // Выберите режим визуализации
      });

      draw();
    }

    return () => {
      if (audioMotionRef.current) {
        audioMotionRef.current.destroy();
        audioMotionRef.current = null;
      }
    };
  }, [analyser]);

  return (
    <div>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <ReactHowler
        ref={howlerRef}
        src="/audio/track3.mp3"
        playing={playing}
        onLoad={() => handleLoad(howlerRef.current.howler)}
      />
      <canvas ref={canvasRef} width={800} height={400} />
    </div>
  );
};

export default Home;
