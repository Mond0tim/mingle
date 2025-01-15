"use client";

import styles from './FocusRing.module.css';
import { FocusRingProps } from './FocusRing.props';
import React from 'react';
import FocusRing from "material-web-components-react/focus-ring";
import cn from 'classnames'

export const Focus = ({ theme = 'light',  children, className, ...props }: FocusRingProps): JSX.Element => {
	return (
		<>
		
		<span
			className={cn(className, {
				[styles.light]: theme == 'light',
				[styles.dark]: theme == 'dark',
			})}
			{...props}
		>
			{children}
			
			<FocusRing></FocusRing>
		</span>
		</>
	);
};