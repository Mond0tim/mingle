 /* eslint-disable */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ColorThief from "colorthief";
import { usePlayer } from "@/context/PlayerContext";
import styles from "./WaveformControls.module.css";
import BackgroundCanvas from '../BackgroundCanvas/BackgroundCanvas';

// Функция для линейной интерполяции между двумя цветами в формате RGB
function lerpColor(color1: [number, number, number], color2: [number, number, number], factor: number): [number, number, number] {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * factor),
    Math.round(color1[1] + (color2[1] - color1[1]) * factor),
    Math.round(color1[2] + (color2[2] - color1[2]) * factor),
  ];
}

const WaveformControls: React.FC = () => {
  const {
    currentTrack,
    playing,
    playPlaylist,
    initialPlaylists,
    togglePlay,
    playlistIsPlaying,
    howlerRef,
  } = usePlayer();

  // Исходные цвета в RGB:
  const initialPalette: [number, number, number][] = [
    [3, 57, 225],   // DodgerBlue
    [28, 14, 145],  // SteelBlue
    [19, 86, 233],  // SkyBlue
    [0, 0, 255],    // Blue
    [65, 105, 225], // RoyalBlue
  ];

  const [palette, setPalette] = useState<[number, number, number][]>(initialPalette);
  const [audioData, setAudioData] = useState<Float32Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [dominantColor, setDominantColor] = useState<[number, number, number]>([3, 57, 225]); // DodgerBlue для мышки
  const [targetPalette, setTargetPalette] = useState<[number, number, number][]> (initialPalette);
  const [targetDominantColor, setTargetDominantColor] = useState<[number, number, number]>([3, 57, 225]);

  const getColorsFromImage = useCallback((imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const result = colorThief.getColor(img);
      const paletteResult = colorThief.getPalette(img, 5); // Извлекаем 5 цветов (как в исходном массиве)

      setTargetPalette(paletteResult);
      setTargetDominantColor(result);
    };

    img.onerror = (error) => {
      console.error("Error loading image:", error, imageUrl);
    };
  }, []);

  useEffect(() => {
    if (currentTrack && currentTrack.cover) {
      getColorsFromImage(currentTrack.cover);
    }
  }, [currentTrack, getColorsFromImage]);

  useEffect(() => {
        let animationId: number | null = null;
        let startTime: number | null = null;
        const duration = 500;

        const animateColorChange = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;

            const newPalette = targetPalette.map((targetColor, index) => {
                const startColor = index < palette.length ? palette[index] : targetColor;
                return lerpColor(startColor, targetColor, Math.min(1, elapsedTime / duration));
            });

            setPalette(newPalette);
            setDominantColor(lerpColor(dominantColor, targetDominantColor, Math.min(1, elapsedTime / duration)));

            if (elapsedTime < duration) {
                animationId = requestAnimationFrame(animateColorChange);
            }
        };

        if (targetPalette && (targetPalette !== palette || targetDominantColor !== dominantColor)) {
            animationId = requestAnimationFrame(animateColorChange);
        }

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [targetPalette, targetDominantColor]);

  useEffect(() => {
    // Создаем AudioContext только один раз
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    // Создаем AnalyserNode только один раз
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }

    const handlePlay = () => {
      if (
        howlerRef.current &&
        audioContextRef.current &&
        analyserRef.current &&
        !sourceRef.current // Проверяем, что source еще не создан
      ) {
        // Создаем source из Howler
        sourceRef.current = audioContextRef.current.createMediaElementSource(
          howlerRef.current._sounds[0]._node
        );

        // Подключаем source к AnalyserNode
        sourceRef.current.connect(analyserRef.current);

        // Подключаем AnalyserNode к выходу (чтобы звук шел дальше)
        analyserRef.current.connect(audioContextRef.current.destination);

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        const updateAudioData = () => {
          if (analyserRef.current) {
            analyserRef.current.getFloatFrequencyData(dataArray);

            setAudioData(dataArray);
            requestAnimationFrame(updateAudioData);
          }
        };

        updateAudioData();
      }
    };

    const handleStop = () => {
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
        setAudioData(null);
      }
    };

    // Подписываемся на событие play Howler-а
    if (howlerRef.current) {
      howlerRef.current.on("play", handlePlay);
      howlerRef.current.on("stop", handleStop);
    }

    return () => {
      if (howlerRef.current) {
        howlerRef.current.off("play", handlePlay);
        howlerRef.current.off("stop", handleStop);
      }
      handleStop(); // Остановка при размонтировании
    };
  }, [howlerRef]);

  const wavePlaylist = initialPlaylists.find((p) => p.title === "Волна");

  return (
    <div className={styles.container}>
      {/* Запуск плейлиста "Волна" */}
      {wavePlaylist && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (playlistIsPlaying?.id === wavePlaylist.id) {
              togglePlay();
            } else {
              playPlaylist(wavePlaylist, true);
            }
          }}
          className={styles.playerButton}
        >
          <span className="material-symbols-outlined">
            {playlistIsPlaying?.id === wavePlaylist.id && playing
              ? "pause_circle"
              : "play_circle"}
          </span>
        </button>
      )}
      {/* Рендерим BackgroundCanvas */}
      <BackgroundCanvas
        colorPalette={palette}
        audioData={audioData}
        dominantColor={dominantColor}
      />
    </div>
  );
};

export default WaveformControls;