"use client";

import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";
import LogoIcon from "@/public/icons/LogoIcon.svg"
import LogoText from "@/public/icons/LogoText.svg"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    document.documentElement.classList.add("loading");

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const delay = Math.max(0, 400 - elapsedTime); // Дожидаемся минимум 400 мс

      setTimeout(() => {
        document.documentElement.classList.add("loading-out");

        setTimeout(() => {
          setIsLoading(false);
          document.documentElement.classList.remove("loading", "loading-out");
        }, 300); // Время для плавного исчезновения
      }, delay);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, [startTime]);

  if (!isLoading) return null;

  return (
    <div className="preloader">
      <div className={styles.preloader_group}>
		<div className={styles.logo}><LogoIcon/></div>
		<div className={styles.text}><LogoText/></div>
	  </div>
    </div>
  );
}
