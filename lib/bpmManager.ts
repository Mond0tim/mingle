// lib/bpmManager.ts
import { EventDispatcher, Event } from 'three';
import { guess } from 'web-audio-beat-detector';

// Определяем тип события 'beat'
interface BeatEvent extends Event {
    type: 'beat';
    [key: string]: unknown;
}

export default class BPMManager extends EventDispatcher<BeatEvent> {
  interval: number = 500;
  intervalId: NodeJS.Timeout | null = null;
  bpmValue: number = 0;
  beatEventActive = true;


  setBPM(bpm: number): void {
    this.interval = 60000 / bpm;
    if (this.intervalId) {
        clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(this.updateBPM.bind(this), this.interval);
  }

  updateBPM(): void {
    if (this.beatEventActive) {
        this.dispatchEvent({ type: 'beat' } as BeatEvent);
    }
  }

  async detectBPM(audioBuffer: AudioBuffer): Promise<void> {
      const { bpm } = await guess(audioBuffer);
      this.setBPM(bpm);
      console.log(`BPM detected: ${bpm}`);
  }

  getBPMDuration(): number {
    return this.interval;
  }

  toggleBeatEvent(state:boolean) {
      this.beatEventActive = state
  }
}