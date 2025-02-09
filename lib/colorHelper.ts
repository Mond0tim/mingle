

import ColorThief from 'colorthief';

export interface ColorThiefOutput {
  background: string;
  title: string;
  button: string;
  buttonColor?: string;
}

export const getColorFromURL = async (
  imageUrl: string
): Promise<ColorThiefOutput | null> => {
  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;

  return new Promise((resolve) => {
    img.onload = () => {
      const dominantColor = colorThief.getColor(img);
      const palette = colorThief.getPalette(img, 3); // Получаем 3 цвета

      const background = rgbToHex(dominantColor);
      const title = rgbToHex(palette[1]);
      const button = rgbToHex(palette[2]);

      resolve({ background, title, button });
    };
    img.onerror = () => {
      console.error('Error loading image for color thief:', imageUrl);
      resolve(null);
    };
  });
};

export const getContrastingColor = (hexColor: string, alpha = 1): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate perceived luminance (brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose white or black based on luminance
  return luminance > 0.6
    ? `rgba(0, 0, 0, ${alpha})`
    : `rgba(255, 255, 255, ${alpha})`;
};

const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (rgb: number[]): string => {
  return (
    '#' +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2])
  );
};