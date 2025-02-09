/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '../Button/Button';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
    console.log('beforeinstallprompt event fired', e); // Логируем
    e.preventDefault();
    setSupportsPWA(true);
    setPromptInstall(e);
    };

    console.log('addEventListener for beforeinstallprompt'); // Логируем
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
    console.log('removeEventListener for beforeinstallprompt'); // Логируем
    window.removeEventListener('beforeinstallprompt', handler);
    };
}, []);

  const onClick = useCallback(() => {
    console.log('Install button clicked', promptInstall);
    if (!promptInstall) {
      console.log('PWA is not supported or already installed.');
      return;
    }
    promptInstall.prompt();
    promptInstall.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setPromptInstall(null);
    });
  }, [promptInstall]);

  console.log('supportsPWA:', supportsPWA);

  if (!supportsPWA) {
    return (
      <p className='p-3'>
       Уже установлено или не поддерживается Вашим браузером. 
      </p>
    );
  }

  return (
  <div className='flex justify-center'>
    <Button view='outline' fontFamily='Oddval' onClick={onClick}>
      Установить приложение
    </Button>
  </div>
  );
};

export default InstallPWA;