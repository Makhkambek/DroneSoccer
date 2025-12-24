"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroBackgroundSliderProps {
  images: string[];      // Массив путей к изображениям
  interval?: number;     // Интервал смены в миллисекундах (по умолчанию 15000ms)
}

export default function HeroBackgroundSlider({
  images,
  interval = 15000
}: HeroBackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматическая смена фотографий
  useEffect(() => {
    // Не запускать, если одна или нет фотографий
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      // Циклически переключаем индекс: 0 → 1 → 2 → 0 → ...
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    // Cleanup при unmount
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          {/* Фоновое изображение */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
            }}
          />

          {/* Темный оверлей (для читаемости текста) */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Градиентный оверлей (плавный переход к контенту) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
