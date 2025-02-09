 /* eslint-disable */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import AudioMotionAnalyzer, { Options } from 'audiomotion-analyzer';
import { Track } from '@/types';
import ReactHowler from 'react-howler';

interface AudioMotionVisualizerProps {
  audioContext: AudioContext | any;
currentTrack: Track | null; // Замените any на более конкретный тип, если это возможно
  howlerRef: React.RefObject<ReactHowler>; // Замените any на более конкретный тип, если это возможно
}

interface ExtendedOptions extends Options {
  audioCtx?: AudioContext;
  source?: MediaElementAudioSourceNode;
}


const AudioMotionVisualizer: React.FC<AudioMotionVisualizerProps> = ({
  audioContext,
  currentTrack,
  howlerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [audioMotion, setAudioMotion] = useState<AudioMotionAnalyzer | null>(
    null
  );

  useEffect(() => {
    if (!audioContext || !currentTrack || !howlerRef.current) return;
    const options: ExtendedOptions = {
      alphaBars: false,
      ansiBands: false,
      barSpace: 0.1,
      bgAlpha: 0,
      channelLayout: 'dual-combined',
      colorMode: 'gradient',
      fadePeaks: false,
      fftSize: 8192,
      fillAlpha: 1,
      frequencyScale: 'mel',
      gradient: 'orangered',
      gravity: 20,
      ledBars: false,
      linearAmplitude: false,
      linearBoost: 1,
      lineWidth: 4,
      loRes: false,
      lumiBars: false,
      maxDecibels: -25,
      maxFPS: 0,
      maxFreq: 8000,
      minDecibels: -85,
      minFreq: 10,
      mirror: 0,
      mode: 10,
      noteLabels: false,
      outlineBars: false,
      overlay: true,
      peakFadeTime: 750,
      peakHoldTime: 100,
      peakLine: true,
      radial: true,
      radialInvert: false,
      radius: 0.02,
      reflexAlpha: 0.3,
      reflexBright: 1.3,
      reflexFit: true,
      reflexRatio: 0,
      roundBars: false,
      showBgColor: true,
      showFPS: false,
      showPeaks: true,
      showScaleX: false,
      showScaleY: false,
      smoothing: 0.7,
      spinSpeed: 2,
      splitGradient: false,
      trueLeds: false,
      weightingFilter: '',
      audioCtx: audioContext,
      source: howlerRef.current?.howler._sounds[0]._node,
      volume: 0,
      height: 400,
    };

    if (containerRef.current) {
      const analyzer = new AudioMotionAnalyzer(containerRef.current, options);
      setAudioMotion(analyzer);

      return () => {
        analyzer.disconnectInput();
        analyzer.disconnectOutput();
        analyzer.destroy();
      };
    }
  }, [audioContext, currentTrack, howlerRef]);

  useEffect(() => {
    if (!audioMotion || !currentTrack) return;

    const sound = howlerRef.current?.howler._sounds[0];

    if (sound && sound._node) {
      audioMotion.connectInput(sound._node);
    }

    return () => {
      audioMotion.disconnectInput();
    };
  }, [audioMotion, howlerRef, currentTrack]);

  return <div className="pointer-events-none w-full pt-5 md:scale-150 blur-xl" id="container" ref={containerRef} style={{filter: 'hue-rotate(241deg) blur(24px) brightness(130%)'}}></div>;
};

export default AudioMotionVisualizer;