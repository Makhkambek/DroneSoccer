import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  HeroORQA,
  ContentSectionORQA,
  ProductCardORQA,
} from '@/components/orqa-exact';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="bg-black">
      {/* Hero Section - Exact ORQA Style */}
      <HeroORQA
        title="DRONE SOCCER"
        subtitle="EVERY MISSION MATTERS"
        buttonText="join team"
        buttonHref={`/${locale}/apply`}
        imageUrl="/hero/hero-1.jpg"
      />

      {/* Built to Dominate - 2 Column Section */}
      <ContentSectionORQA
        title="BUILT TO DOMINATE"
        description="We engineer and manufacture professional drone soccer equipment designed for competitive play. High-speed action meets cutting-edge technology to deliver an unparalleled sports experience."
        imageUrl="/hero/hero-2.jpg"
        imagePosition="right"
        linkText="learn more"
        linkHref={`/${locale}/about-drone-soccer`}
      />

      {/* Technology Section - 2 Column Section (Reversed) */}
      <ContentSectionORQA
        title="CUTTING-EDGE TECHNOLOGY"
        description="Experience the future of competitive drone sports with state-of-the-art equipment, professional coaching, and innovative training programs designed to elevate your skills."
        imageUrl="/hero/hero-3.jpg"
        imagePosition="left"
        linkText="explore technology"
        linkHref={`/${locale}/lessons`}
      />

      {/* Competitions Grid - 3 Cards */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <h2 className="text-[40px] md:text-[48px] font-bold leading-[1.2] tracking-[-0.5px] uppercase text-white mb-6">
              COMPETITIONS
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#999999]">
              Multiple categories for all skill levels
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCardORQA
              title="CLASS 40"
              description="Professional category for experienced pilots with high-speed drones and advanced maneuvers."
              imageUrl="/hero/hero-4.jpg"
              href={`/${locale}/competitions/class-40`}
            />
            <ProductCardORQA
              title="CLASS 20"
              description="Entry level category perfect for beginners learning the fundamentals of drone soccer."
              imageUrl="/hero/hero-5.jpg"
              href={`/${locale}/competitions/class-20`}
            />
            <ProductCardORQA
              title="DRONE RACING"
              description="High-speed racing competitions with obstacle courses and time trials."
              imageUrl="/hero/hero-6.jpg"
              href={`/${locale}/competitions/drone-racing`}
            />
          </div>
        </div>
      </section>

      {/* Stats Section - ORQA Style */}
      <section className="py-32 px-6 bg-black border-t border-[#222222]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '30+', label: 'Countries' },
              { value: '500+', label: 'Teams' },
              { value: '50+', label: 'Competitions' },
              { value: '10K+', label: 'Pilots' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 border border-[#222222] hover:border-[#0066ff] transition-[border-color] duration-200"
              >
                <div className="text-[48px] md:text-[56px] font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-[13px] text-[#999999] uppercase tracking-[1px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      <ContentSectionORQA
        title="JOIN OUR TEAM"
        description="Become part of the future of drone sports. Professional training, competitive opportunities, and a global community of passionate pilots waiting for you."
        imageUrl="/hero/hero-4.jpg"
        imagePosition="right"
        linkText="apply now"
        linkHref={`/${locale}/apply`}
      />

      {/* Final CTA - ORQA Style */}
      <section className="py-40 px-6 bg-black border-t border-[#222222]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[48px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-[-1px] uppercase text-white mb-6">
            WELCOME TO THE NEW FRONTIER
          </h2>
          <p className="text-[20px] leading-[1.6] text-[#999999] mb-12">
            Start your journey in competitive drone soccer today
          </p>
          <Link href={`/${locale}/apply`}>
            <button className="bg-white text-black text-[13px] font-semibold lowercase px-10 py-4 hover:bg-[#e6e6e6] transition-colors">
              get started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
