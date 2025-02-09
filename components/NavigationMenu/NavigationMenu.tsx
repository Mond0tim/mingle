"use client";
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './NavigationMenu.module.css';
import LogoIcon from '@/public/icons/LogoIcon.svg';
import LogoText from '@/public/icons/LogoText.svg';
import cn from 'classnames';
import { Button } from '../Button/Button';
import SearchForm from '../SearchForm/SearchForm';
import { useMediaQuery } from 'react-responsive';
import PlaylistIcon from '@/public/icons/PlaylistIcon.svg';
import AboutIcon from '@/public/icons/AboutIcon.svg';
import VibeIcon from '@/public/icons/VibeIcon.svg';
import SearchIcon from '@/public/icons/searchIcon.svg';

const NavigationMenuComponent = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const menuContainerClassName = cn(styles.mingle_controls_container, {
    [styles.homePageMenu]: isHomePage,
  });

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (!hasMounted) {
    return (
      <div className={menuContainerClassName}>
        <div className={styles.mingle_controls}>
          {/* Заглушка, аналогичная десктопной версии */}
          {!isHomePage && (
            <button>
              <div className={styles.icon}>
                <LogoIcon />
              </div>
              <div className={styles.text}>
                <LogoText />
              </div>
            </button>
          )}
          <div className={styles.menu_items}>
            {/* Пустые элементы для совпадения структуры */}
            <Button view="ghost" className={styles.navButton} > </Button>
            <Button view="ghost" className={styles.navButton} > </Button>
            <Button view="ghost" className={styles.navButton} > </Button>
            <SearchForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile && isHomePage && (
        <div className={styles.mobileLogo}>
          <div className={styles.icon}>
            <LogoIcon />
          </div>
          <div className={styles.text}>
            <LogoText />
          </div>
        </div>
      )}

      <div className={menuContainerClassName}>
        {isMobile && <div className={styles.mobileMenuBackground}></div>}
        <div className={styles.mingle_controls}>
          <div className={styles.logo}>
            {isHomePage ? (
              !isMobile && (
                <>
                  <div className={styles.icon}>
                    <LogoIcon />
                  </div>
                  <div className={styles.text}>
                    <LogoText />
                  </div>
                </>
              )
            ) : (
              !isMobile && (
                <button onClick={() => handleNavigation('/')}>
                  <div className={styles.icon}>
                    <LogoIcon />
                  </div>
                  <div className={styles.text}>
                    <LogoText />
                  </div>
                </button>
              )
            )}
          </div>


        {isMobile ? (
          // Мобильная версия меню
          <div className={styles.mobileNavLinks}>
            <Button
              className={cn(styles.iconButton, {
                [styles.activeIconButton]: pathname.startsWith('/playlists'),
              })}
              view={pathname.startsWith('/playlists') ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/playlists')}
            >
              <PlaylistIcon className={styles.svg} />
            </Button>

            <Button
              className={cn(styles.iconButton, {
                [styles.activeIconButton]: pathname === '/about',
              })}
              view={pathname === '/about' ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/about')}
            >
              <AboutIcon className={styles.svg} />
            </Button>

            <Button
              className={cn(styles.iconButton, {
                [styles.activeIconButton]: pathname === '/',
              })}
              view={pathname === '/' ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/')}
            >
              <VibeIcon className={styles.svg} />
            </Button>

            <Button
              className={cn(styles.iconButton, {
                [styles.activeIconButton]: pathname === '/search',
              })}
              view={pathname === '/search' ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/search')}
            >
              <SearchIcon className={styles.svg} />
            </Button>
          </div>
        ) : (
          // Десктопная версия меню
          <div className={styles.menu_items}>
            <Button
              className={styles.navButton}
              view={pathname.startsWith('/playlists') ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/playlists')}
            >
              <PlaylistIcon className={styles.svg} />
              плейлисты
            </Button>
            <Button
              className={styles.navButton}
              view={pathname === '/about' ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/about')}
            >
              <AboutIcon className={styles.svg} />
              о проекте
            </Button>
            <Button
              className={styles.navButton}
              view={pathname === '/' ? 'primary' : 'ghost'}
              onClick={() => handleNavigation('/')}
            >
              <VibeIcon className={styles.svg} />
              вайб
            </Button>
            <SearchForm />
          </div>
        )}
      </div>
    </div>

    </>
  );
};

export default NavigationMenuComponent;