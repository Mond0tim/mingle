import { DetailedHTMLProps,HTMLAttributes, ReactNode } from 'react';

export interface FocusRingProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement >, HTMLSpanElement> {
	children: ReactNode;
	theme?: 'light' | 'dark' ;
}