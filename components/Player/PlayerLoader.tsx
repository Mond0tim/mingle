import React from 'react';
import styles from './Player.module.css';

const PlayerLoader: React.FC = () => {
  return (
    <div className={styles.playerLoader}>
      <div className={styles.loaderSpinner} />
      <p className={styles.loaderText}>Загрузка плеера...</p>
    </div>
  );
};

export default PlayerLoader;