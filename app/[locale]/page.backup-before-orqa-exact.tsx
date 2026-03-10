'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { HeroORQA, SectionORQA, CardORQA, ButtonORQA } from '@/components/orqa';

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <div className="pt-48">
      {/* Hero Section - ORQA Style */}
      <HeroORQA
        title="DRONE SOCCER"
        subtitle="EVERY MISSION MATTERS"
        primaryCTA={{
          label: 'join team',
          href: `/${locale}/apply`,
        }}
        secondaryCTA={{
          label: 'explore all',
          href: `/${locale}/about-drone-soccer`,
        }}
        heroImage="/hero/hero-1.jpg"
        locale={locale}
      />

      {/* Built to Dominate Section */}
      <SectionORQA
        title="BUILT TO DOMINATE"
        description="High-speed action. Cutting-edge technology. Professional training for competitive drone soccer pilots."
        image={
          <div className="relative w-full h-[500px]">
            <Image
              src="/hero/hero-2.jpg"
              alt="Drone Soccer Training"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        }
        imagePosition="right"
        action={
          <Link href={`/${locale}/lessons`} className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-blue-hover transition-colors">
            learn more
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        }
      />

      {/* Technology Section */}
      <SectionORQA
        title="CUTTING-EDGE TECHNOLOGY"
        description="Experience the future of competitive drone sports with state-of-the-art equipment and professional coaching."
        image={
          <div className="relative w-full h-[500px]">
            <Image
              src="/hero/hero-3.jpg"
              alt="Drone Technology"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        }
        imagePosition="left"
      />

      {/* Competitions Section */}
      <section className="py-24 bg-background-secondary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
              COMPETITIONS
            </h2>
            <p className="text-xl text-text-secondary">
              Multiple categories for all skill levels
            </p>
          </div>

          {/* Competition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardORQA
              image="/hero/hero-4.jpg"
              title="CLASS 40"
              description="Professional category for experienced pilots with high-speed drones and advanced maneuvers."
              link={`/${locale}/competitions/class-40`}
            />
            <CardORQA
              image="/hero/hero-5.jpg"
              title="CLASS 20"
              description="Entry level category perfect for beginners learning the fundamentals of drone soccer."
              link={`/${locale}/competitions/class-20`}
            />
            <CardORQA
              image="/hero/hero-6.jpg"
              title="DRONE RACING"
              description="High-speed racing competitions with obstacle courses and time trials."
              link={`/${locale}/competitions/drone-racing`}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '30+', label: 'Countries' },
              { value: '500+', label: 'Teams' },
              { value: '50+', label: 'Competitions' },
              { value: '10K+', label: 'Pilots' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 border border-border hover:border-accent-blue transition-colors"
              >
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <SectionORQA
        title="JOIN OUR TEAM"
        description="Become part of the future of drone sports. Professional training, competitive opportunities, and a global community of passionate pilots."
        action={
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/apply`}>
              <ButtonORQA variant="primary" size="lg">
                apply now
              </ButtonORQA>
            </Link>
            <Link href={`/${locale}/about-team`}>
              <ButtonORQA variant="secondary" size="lg">
                meet the team
              </ButtonORQA>
            </Link>
          </div>
        }
      />

      {/* CTA Section - Final */}
      <section className="py-32 bg-gradient-to-b from-black to-background-secondary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tight">
            WELCOME TO THE NEW FRONTIER
          </h2>
          <p className="text-2xl text-text-secondary mb-12">
            Start your journey in competitive drone soccer today
          </p>
          <Link href={`/${locale}/apply`}>
            <ButtonORQA variant="primary" size="lg">
              get started
            </ButtonORQA>
          </Link>
        </div>
      </section>
    </div>
  );
}
