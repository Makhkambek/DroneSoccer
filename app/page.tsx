import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Quick Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Info Card 1 - Learn */}
            <div className="info-card">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-gray-800">Learn</h3>
              <p className="text-gray-600 leading-relaxed">
                Master drone piloting with our comprehensive training programs for all skill levels, from beginners to professionals.
              </p>
              <Link href="/lessons" className="inline-block mt-4 text-primary-blue font-semibold hover:underline">
                Explore Courses →
              </Link>
            </div>

            {/* Info Card 2 - Compete */}
            <div className="info-card">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-gray-800">Compete</h3>
              <p className="text-gray-600 leading-relaxed">
                Participate in local and international drone soccer competitions and championships across multiple classes.
              </p>
              <Link href="/competitions" className="inline-block mt-4 text-primary-blue font-semibold hover:underline">
                View Competitions →
              </Link>
            </div>

            {/* Info Card 3 - Connect */}
            <div className="info-card">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-gray-800">Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a vibrant community of passionate drone pilots and enthusiasts from around the world.
              </p>
              <Link href="/about-team" className="inline-block mt-4 text-primary-blue font-semibold hover:underline">
                Meet the Team →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Drone Soccer by the Numbers</h2>
            <p className="section-subheading">
              A rapidly growing global sport with exciting opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-orbitron font-bold text-gradient mb-2">30+</div>
              <p className="text-gray-600 font-semibold">Countries</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-orbitron font-bold text-gradient mb-2">500+</div>
              <p className="text-gray-600 font-semibold">Active Teams</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-orbitron font-bold text-gradient mb-2">50+</div>
              <p className="text-gray-600 font-semibold">Competitions/Year</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-5xl font-orbitron font-bold text-gradient mb-2">10K+</div>
              <p className="text-gray-600 font-semibold">Pilots</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Flight?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our team and become part of the drone soccer revolution
          </p>
          <Link href="/apply" className="btn-secondary">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
