"use client";

import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import React from 'react';
import Ripple from "material-web-components-react/ripple";
import FocusRing from "material-web-components-react/focus-ring";
import { Geist, Geist_Mono, Jost, Pixelify_Sans,  } from 'next/font/google';

const pixelifySans = Pixelify_Sans({ subsets: ['latin', 'cyrillic' ]})
const jost = Jost({ subsets: ['latin', 'cyrillic' ]})


export const Button = ({ view = 'primary', fontFamily = 'Jost', ButtonRadius='lg', fontWeight='regular',  children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.btn, className, {
				[styles.primary]: view == 'primary',
				[styles.outline]: view == 'outline',
				[styles.ghost]: view == 'ghost',
				[styles.geistSans]: fontFamily == 'Geist',
				[styles.geistMono]: fontFamily == 'GeistMono',
				[jost.className]: fontFamily == 'Jost',
				[pixelifySans.className]: fontFamily == 'PixelSans',
				[styles.bold]: fontWeight == 'bold',
				[styles.regular]: fontWeight == 'regular',
				[styles.light]: fontWeight == 'light',
				[styles.r_none]: ButtonRadius == 'none',
				[styles.r_sm]: ButtonRadius == 'sm',
				[styles.r_md]: ButtonRadius == 'md',
				[styles.r_lg]: ButtonRadius == 'lg',
			})}
			{...props}
		>
			{children}
			<Ripple />
			<FocusRing></FocusRing>
		</button>
	);
};