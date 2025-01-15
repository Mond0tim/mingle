// lib/audioManager.ts
import * as THREE from 'three';

export default class AudioManager {
  audio: THREE.Audio;
  analyser: THREE.AudioAnalyser;
  frequencyArray: Uint8Array;
  lowFrequencyAverage: number = 0;
  midFrequencyAverage: number = 0;
  highFrequencyAverage: number = 0;
  isPlaying: boolean = false;
  audioContext: AudioContext;
  lowRange: [number, number] = [0, 100];
  midRange: [number, number] = [100, 1000];
  highRange: [number, number] = [1000, 20000];

  constructor() {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.frequencyArray = new Uint8Array(0);
      this.audio = new THREE.Audio(new THREE.AudioListener());
      this.analyser = new THREE.AudioAnalyser(this.audio, 2048);
  }

  async loadAudioBuffer(url: string): Promise<void> {
    try {
      const loader = new THREE.AudioLoader();
      const audioBuffer = await loader.loadAsync(url);

      if (audioBuffer) {
          this.audio.setBuffer(audioBuffer);
          this.analyser = new THREE.AudioAnalyser(this.audio, 2048);
           this.frequencyArray = new Uint8Array(this.analyser.frequencyBinCount);
        
      }
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  }

  play(): void {
    if (!this.audio.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  pause(): void {
    if (this.audio.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  collectAudioData(): void {
    this.analyser.getByteFrequencyData(this.frequencyArray);
  }

  analyzeFrequency(): void {
      this.lowFrequencyAverage = this.calculateAverage(
          this.frequencyArray,
          this.lowRange[0],
          this.lowRange[1]
      );
      this.midFrequencyAverage = this.calculateAverage(
          this.frequencyArray,
          this.midRange[0],
          this.midRange[1]
      );
      this.highFrequencyAverage = this.calculateAverage(
          this.frequencyArray,
          this.highRange[0],
          this.highRange[1]
      );
  }

  calculateAverage(array: Uint8Array, start: number, end: number): number {
      let sum = 0;
      let count = 0;
      for (let i = start; i < end; i++) {
          sum += array[i] || 0;
          count++;
      }
      return count > 0 ? sum / count : 0;
  }

   normalizeValue(value: number): number {
    return Math.min(1, Math.max(0, value / 255))
  }

  update(): void {
    if(this.isPlaying) {
      this.collectAudioData();
      this.analyzeFrequency();
    }
  }

   getLowFrequencyAverage(): number {
    return this.normalizeValue(this.lowFrequencyAverage)
  }

  getMidFrequencyAverage(): number {
    return this.normalizeValue(this.midFrequencyAverage)
  }

  getHighFrequencyAverage(): number {
    return this.normalizeValue(this.highFrequencyAverage)
  }

}