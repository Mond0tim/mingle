'use client';
import React, { useLayoutEffect, useRef } from 'react';
import styles from './RepeatTextScroll.module.css';
import cn from 'classnames';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { RepeatTextScrollProps } from './RepeatTextScroll.props.ts';

gsap.registerPlugin(ScrollTrigger);

const RepeatTextScroll: React.FC<RepeatTextScrollProps> = ({ children, size = 'm', position = 'auto' }) => {
  const totalWords = 9;
  const tyIncrement = 12;
  const delayIncrement = 0.1;
  const halfWordsCount = Math.floor(totalWords / 2);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Создаем массив span-элементов, каждый из которых будет отображать текст
  const spans = [];
  for (let i = 0; i < totalWords; i++) {
    let ty: number;
    let delay: number;
    if (i === totalWords - 1) {
      ty = 0;
      delay = 0;
    } else if (i < halfWordsCount) {
      ty = halfWordsCount * tyIncrement - tyIncrement * i;
      delay = delayIncrement * (halfWordsCount - i) - delayIncrement;
    } else {
      ty = -1 * (halfWordsCount * tyIncrement - (i - halfWordsCount) * tyIncrement);
      delay = delayIncrement * (halfWordsCount - (i - halfWordsCount)) - delayIncrement;
    }
    spans.push(
      <span
        key={i}
        style={{ display: 'block' }}
        data-delay={delay}
        data-ty={ty}
      >
        {children}
      </span>
    );
  }

  useLayoutEffect(() => {
    const h2 = headingRef.current;
    if (!h2) return;

    // Сброс начальных GSAP-трансформаций (если вдруг есть)
    gsap.set(h2.querySelectorAll('span'), { clearProps: 'transform' });

    // Вычисляем высоту элемента и устанавливаем marginTop и paddingBottom,
    // чтобы оставить достаточно пространства для анимации
    const height = h2.getBoundingClientRect().height;
    const paddingMargin = height * Math.floor(totalWords / 2) * tyIncrement / 100;
    h2.style.marginTop = `${paddingMargin}px`;
    h2.style.paddingBottom = `${paddingMargin}px`;

    // Создаем анимацию с привязкой к скроллу.
    // Триггер срабатывает через 220px после появления элемента в зоне видимости.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: h2,
        start: 'top+=220 bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(h2.querySelectorAll('span'), {
      yPercent: (i, target) => Number(target.getAttribute('data-ty')),
      delay: (i, target) => Number(target.getAttribute('data-delay')),
      ease: 'power1.out',
    });

    // Очистка анимаций при размонтировании
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <h2
      ref={headingRef}
      className={cn(styles.text_rep, styles.content__title, styles[`size_${size}`], {
		[styles.left]: position == 'left' ,
		[styles.right]: position == 'right',
		[styles.auto]: position == 'auto'

	  })}
      data-text-rep
      style={{ position: 'relative' }}
    >
      {spans}
    </h2>
  );
};

export default RepeatTextScroll;
