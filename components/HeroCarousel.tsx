'use client';

import Link from 'next/link';
import HeroBackgroundSlider from './HeroBackgroundSlider';

// Массив фоновых изображений из папки /hero
const heroImages = [
  '/hero/hero-1.jpg',
  '/hero/hero-2.jpg',
  '/hero/hero-3.jpg',
  '/hero/hero-4.jpg',
  '/hero/hero-5.jpg',
  '/hero/hero-6.jpg',
];

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden h-screen flex items-center">
      {/* Фоновый слайдер с 6 фотографиями */}
      <HeroBackgroundSlider images={heroImages} interval={10000} />

      {/* Контент поверх фона - выровнен слева */}
      <div className="relative h-full flex items-center z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl text-white">
            <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              DRONE SOCCER
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light leading-relaxed animate-fade-in-up animation-delay-200">
              The Future of Competitive Sports is Here.
              High-Speed Action. Cutting-Edge Technology. Unlimited Possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Link
                href="/apply"
                className="px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-red text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block text-center"
              >
                Join Our Team
              </Link>
              <Link
                href="/lessons"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 inline-block text-center"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
