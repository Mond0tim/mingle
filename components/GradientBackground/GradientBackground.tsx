'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import AudioManager from '@/lib/audioManager';
import BPMManager from '@/lib/bpmManager';
import { usePlayer } from '@/context/PlayerContext';

const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioManager, setAudioManager] = useState<AudioManager | null>(null);
  const [bpmManager, setBPMManager] = useState<BPMManager | null>(null);
  const [time, setTime] = useState(0);
  const [beat, setBeat] = useState(false);
  const { currentTrack, playing, howlerRef } = usePlayer();
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const newAudioManager = new AudioManager();
    setAudioManager(newAudioManager);

    const newBPMManager = new BPMManager();
    setBPMManager(newBPMManager);

    const init = async () => {
      if (newAudioManager && newBPMManager && currentTrack && howlerRef.current) {
        if (currentTrack.src) {
          try {
            await newAudioManager.loadAudioBuffer(currentTrack.src);
            if (newAudioManager.audio.buffer) {
              await newBPMManager.detectBPM(newAudioManager.audio.buffer);
              newBPMManager.addEventListener('beat', onBeat);
              if (playing) {
                newAudioManager.play();
              } else {
                newAudioManager.pause();
              }
            }
          } catch (e) {
            console.error('Error loading audio:', e);
          }
        }
      }

      // Create Three.js Scene
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
      camera.position.z = 1;

      if (canvasRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({
          canvas: canvasRef.current as HTMLCanvasElement,
          alpha: true,
        });
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        rendererRef.current.setClearColor(0x000000, 0);
        rendererRef.current.autoClear = false;

        // Create Gradient Material
        const uniforms = {
          time: { value: 0 },
          lowFrequency: { value: 0 },
          midFrequency: { value: 0 },
          highFrequency: { value: 0 },
        };

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float time;
            uniform float lowFrequency;
            uniform float midFrequency;
            uniform float highFrequency;
            varying vec2 vUv;
        
            void main() {
              vec3 color1 = vec3(1.0, 0.0, 0.0); // Red
              vec3 color2 = vec3(0.0, 0.0, 1.0); // Blue
              vec3 color3 = vec3(1.0, 1.0, 0.0); // Yellow
              float distortion = (lowFrequency * 0.15 + midFrequency * 0.25 + highFrequency * 0.5) * 5.0;
        
              float x = vUv.x + sin(time + vUv.y * 5.0) * distortion * 0.02;
              float y = vUv.y + cos(time + vUv.x * 5.0) * distortion * 0.02;

              vec3 color = mix(color1, color2, abs(sin(x * 5.0 + time * 0.5)));
              color = mix(color, color3, abs(cos(y * 5.0 + time * 0.25)));

              gl_FragColor = vec4(color, 1.0);
            }
          `,
          transparent: true,
        });

        const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(plane);

        const animate = () => {
          requestAnimationFrame(animate);
          if (newAudioManager && playing) {
            newAudioManager.update();
            uniforms.lowFrequency.value = newAudioManager.getLowFrequencyAverage();
            uniforms.midFrequency.value = newAudioManager.getMidFrequencyAverage();
            uniforms.highFrequency.value = newAudioManager.getHighFrequencyAverage();
          }

          uniforms.time.value = time;

          if (rendererRef.current) {
            rendererRef.current.render(scene, camera);
          }

          setTime((prevTime) => prevTime + 0.01);
        };

        animate();
      }
    };

    init();

    function handleResize() {
      if (canvasRef.current && rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (bpmManager) {
        bpmManager.removeEventListener({ type: 'beat' }, onBeat);
      }
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, playing]);

  useEffect(() => {
    if (bpmManager) {
      bpmManager.toggleBeatEvent(!beat);
    }
  }, [beat, bpmManager]);

  useEffect(() => {
    if (audioManager && playing) {
      audioManager.play();
    } else if (audioManager && !playing) {
      audioManager.pause();
    }
  }, [playing, audioManager]);

  const onBeat = () => {
    setBeat(true);
    setTimeout(() => setBeat(false), 100);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default GradientBackground;