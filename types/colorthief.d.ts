declare module 'colorthief' {
  export default class ColorThief {
    getColor(sourceImage: HTMLImageElement | HTMLCanvasElement, quality?: number): [number, number, number];
    getPalette(sourceImage: HTMLImageElement | HTMLCanvasElement, colorCount?: number, quality?: number): Array<[number, number, number]>;
  }
}
