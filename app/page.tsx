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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading">What Our Students Say</h2>
            <p className="section-subheading">
              Join over 200 students already mastering drone soccer
            </p>
            {/* Rating bar */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className={`w-6 h-6 ${i <= 4 ? 'text-yellow-400' : 'text-yellow-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="font-orbitron font-bold text-2xl text-gray-900">4.8</span>
              <span className="text-gray-400 text-sm">/ 5 · 200+ reviews</span>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                name: 'Alex M.',
                role: 'Class 40 Student',
                avatar: 'A',
                color: 'from-blue-500 to-blue-700',
                text: 'The structured lessons made learning drone soccer so much easier. Within 3 months I was competing at local tournaments. The video quality and step-by-step approach is outstanding.',
                stars: 5,
              },
              {
                name: 'Sarah K.',
                role: 'Drone Racing Student',
                avatar: 'S',
                color: 'from-purple-500 to-purple-700',
                text: 'I went from zero experience to my first race in just 6 weeks. The instructors really know their stuff. The platform tracks my progress perfectly — I always know where I left off.',
                stars: 5,
              },
              {
                name: 'Daniel T.',
                role: 'General Course Graduate',
                avatar: 'D',
                color: 'from-red-500 to-red-700',
                text: 'Best investment I made this year. The General Drone Course gave me a solid technical foundation. Got my certificate and immediately applied for the Class 20 program.',
                stars: 5,
              },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                {/* Text */}
                <p className="text-gray-600 leading-relaxed flex-1 text-sm italic">"{t.text}"</p>
                {/* Author */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-200">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '200+', label: 'Students trained' },
              { value: '4', label: 'Courses available' },
              { value: '4.8★', label: 'Average rating' },
              { value: '95%', label: 'Completion rate' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5">
                <p className="font-orbitron text-3xl font-bold text-gradient">{s.value}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
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
