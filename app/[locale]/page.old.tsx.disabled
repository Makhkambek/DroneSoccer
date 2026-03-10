'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import HeroModern from '@/components/HeroModern';
import BackgroundVideo from '@/components/BackgroundVideo';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import StatsSection from '@/components/StatsSection';
import { motion } from 'framer-motion';

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <div className="pt-48 relative">
      {/* Background Video */}
      <BackgroundVideo />

      {/* Hero Section */}
      <HeroModern />

      {/* Quick Info Section with Bento Grid */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-primary-red">
              Why Drone Soccer?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of technology, strategy, and teamwork
            </p>
          </motion.div>

          <BentoGrid className="max-w-7xl mx-auto">

            <BentoGridItem
              className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-blue-200/50"
              title={
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-purple-600">
                  {t('learn.title')}
                </span>
              }
              description={t('learn.description')}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
              }
              icon={
                <Link href={`/${locale}/lessons`} className="inline-flex items-center text-primary-blue font-semibold hover:gap-2 transition-all group">
                  {t('learn.cta')}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              }
            />

            {/* Info Card 2 - Compete */}
            <BentoGridItem
              className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-red-200/50"
              title={
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-red to-orange-600">
                  {t('compete.title')}
                </span>
              }
              description={t('compete.description')}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary-red to-red-700 items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              }
              icon={
                <Link href={`/${locale}/competitions`} className="inline-flex items-center text-primary-red font-semibold hover:gap-2 transition-all group">
                  {t('compete.cta')}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              }
            />

            {/* Info Card 3 - Connect */}
            <BentoGridItem
              className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-purple-200/50"
              title={
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {t('connect.title')}
                </span>
              }
              description={t('connect.description')}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              }
              icon={
                <Link href={`/${locale}/about-team`} className="inline-flex items-center text-purple-600 font-semibold hover:gap-2 transition-all group">
                  {t('connect.cta')}
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              }
            />

          </BentoGrid>
        </div>
      </section>

      {/* Stats Section - Optimized with CSS animations */}
      <StatsSection
        title={t('stats.title')}
        subtitle={t('stats.subtitle')}
        stats={[
          { value: '30+', label: t('stats.countries') },
          { value: '500+', label: t('stats.teams') },
          { value: '50+', label: t('stats.competitions') },
          { value: '10K+', label: t('stats.pilots') },
        ]}
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red relative z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-white/90 mb-8"
          >
            {t('cta.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${locale}/apply`} className="btn-secondary inline-block">
              {t('cta.button')}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
