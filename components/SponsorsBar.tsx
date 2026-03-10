'use client';

import Image from 'next/image';

const sponsors = [
    { id: 1, name: 'Sponsor 1', logo: '/sponsors/sponsor1.png' },
    { id: 2, name: 'Sponsor 2', logo: '/sponsors/sponsor2.png' },
    { id: 3, name: 'Sponsor 3', logo: '/sponsors/sponsor3.png' },
    { id: 4, name: 'Sponsor 4', logo: '/sponsors/sponsor4.png' },
    { id: 5, name: 'Sponsor 5', logo: '/sponsors/sponsor5.png' },
];

export default function SponsorsBar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                {/* Увеличили высоту с h-[52px] до h-28 (112px) */}
                <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 h-28">
                    {sponsors.map((sponsor) => (
                        <div
                            key={sponsor.id}
                            // Увеличили размеры контейнера логотипа:
                            // Было: h-8 w-16 (32px высота)
                            // Стало: h-20 w-32 sm:w-40 md:w-48 (80px высота)
                            className="relative h-28 w-40 sm:w-40 md:w-48 flex-shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
                            title={sponsor.name}
                        >
                            <Image
                                src={sponsor.logo}
                                alt={sponsor.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                                priority // Добавлено, чтобы логотипы грузились мгновенно
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}