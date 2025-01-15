import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: ReactNode;
	view?: 'outline' | 'primary' | 'ghost';
	fontWeight?: 'bold' | 'regular' | 'light';
	fontFamily?: 'Jost' | 'Geist' | 'GeistMono' | 'PixelSans';
	ButtonRadius?: 'none' | 'sm' | 'md'| 'lg';
	// arrow?: 'right' | 'down' | 'none';
}