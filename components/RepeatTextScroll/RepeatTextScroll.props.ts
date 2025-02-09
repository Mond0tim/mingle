import { ReactNode } from 'react';

export type RepeatTextScrollProps = {
  children: ReactNode;
  size?: 's' | 'm' | 'l' | 'xl';
  position?: 'left' | 'right' | 'auto';
};
