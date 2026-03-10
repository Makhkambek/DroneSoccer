import Link from 'next/link';

export default function Competitions() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-primary-blue to-primary-red flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Competitions
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-200">
            Compete at the highest level in drone soccer and racing events worldwide
          </p>
        </div>
      </section>

      {/* Class 40 Section */}
      <section id="class40" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-blue to-blue-700 text-white rounded-full text-sm font-bold mb-4">
                COMPETITIVE CLASS
              </div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Drone Soccer Class 40
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                The premier competitive class featuring 40cm spherical drones in intense 5v5 team matches.
                Experience the full power and strategic depth of professional drone soccer.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-blue mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Drone Specifications</h4>
                    <p className="text-gray-600">40cm diameter spherical protective cage, max speed 80 km/h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-blue mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Team Format</h4>
                    <p className="text-gray-600">5 pilots per team, 3 periods of 3 minutes each</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-blue mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Competition Level</h4>
                    <p className="text-gray-600">National and International Championships</p>
                  </div>
                </div>
              </div>

              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-blue to-blue-700 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Register for Class 40
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-blue to-blue-900 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center text-white p-8">
                  <div className="w-48 h-48 border-8 border-white/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="font-orbitron text-6xl font-bold">40</span>
                  </div>
                  <p className="font-orbitron text-xl font-bold">CLASS 40</p>
                  <p className="text-sm mt-2 opacity-80">Professional Competition Class</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Class 20 Section */}
      <section id="class20" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square bg-gradient-to-br from-primary-red to-red-900 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center text-white p-8">
                  <div className="w-48 h-48 border-8 border-white/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="font-orbitron text-6xl font-bold">20</span>
                  </div>
                  <p className="font-orbitron text-xl font-bold">CLASS 20</p>
                  <p className="text-sm mt-2 opacity-80">Elite Speed & Agility Class</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary-red to-red-700 text-white rounded-full text-sm font-bold mb-4">
                ELITE CLASS
              </div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Drone Soccer Class 20
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                The elite competitive class with compact 20cm drones designed for lightning-fast gameplay
                and exceptional agility. Perfect for advanced pilots seeking ultimate challenge.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-red mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Drone Specifications</h4>
                    <p className="text-gray-600">20cm diameter, ultra-lightweight, max speed 100+ km/h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-red mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Team Format</h4>
                    <p className="text-gray-600">5 pilots per team, faster-paced shorter rounds</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-red mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Competition Level</h4>
                    <p className="text-gray-600">World Championship Series and Elite Tournaments</p>
                  </div>
                </div>
              </div>

              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-gradient-to-r from-primary-red to-red-700 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Register for Class 20
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Drone Racing Section */}
      <section id="racing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-sm font-bold mb-4">
                SPEED COMPETITION
              </div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Drone Racing
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Pure speed and precision piloting. Navigate complex 3D courses at breakneck speeds in
                first-person view (FPV) competitions that push the limits of both pilot and machine.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Race Format</h4>
                    <p className="text-gray-600">Individual time trials and head-to-head racing</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Track Types</h4>
                    <p className="text-gray-600">Indoor technical courses and outdoor speed circuits</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg className="w-6 h-6 text-purple-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <div>
                    <h4 className="font-bold text-gray-800">Competition Level</h4>
                    <p className="text-gray-600">Local leagues to international racing series</p>
                  </div>
                </div>
              </div>

              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Register for Racing
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center text-white p-8">
                  <svg className="w-32 h-32 mx-auto mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <p className="font-orbitron text-2xl font-bold">DRONE RACING</p>
                  <p className="text-sm mt-2 opacity-80">FPV Speed Competition</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Upcoming Events</h2>
            <p className="section-subheading">
              Mark your calendar for these exciting competitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Event 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-r from-primary-blue to-blue-700 p-6 text-white">
                <div className="text-4xl font-orbitron font-bold mb-2">MAR</div>
                <div className="text-6xl font-orbitron font-bold">15</div>
              </div>
              <div className="p-6">
                <h3 className="font-orbitron text-xl font-bold mb-2 text-gray-800">Spring Championship</h3>
                <p className="text-gray-600 mb-4">Class 40 National Tournament</p>
                <p className="text-sm text-gray-500">Location: New York, USA</p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-r from-primary-red to-red-700 p-6 text-white">
                <div className="text-4xl font-orbitron font-bold mb-2">JUN</div>
                <div className="text-6xl font-orbitron font-bold">22</div>
              </div>
              <div className="p-6">
                <h3 className="font-orbitron text-xl font-bold mb-2 text-gray-800">World Cup Qualifiers</h3>
                <p className="text-gray-600 mb-4">Class 20 & 40 International</p>
                <p className="text-sm text-gray-500">Location: Seoul, South Korea</p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
                <div className="text-4xl font-orbitron font-bold mb-2">SEP</div>
                <div className="text-6xl font-orbitron font-bold">08</div>
              </div>
              <div className="p-6">
                <h3 className="font-orbitron text-xl font-bold mb-2 text-gray-800">Racing Grand Prix</h3>
                <p className="text-gray-600 mb-4">FPV Drone Racing Series</p>
                <p className="text-sm text-gray-500">Location: Dubai, UAE</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Compete?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our training programs and prepare for competitive drone sports
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-primary-blue font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block transform hover:scale-105"
            >
              Apply Now
            </Link>
            <Link
              href="/lessons"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-primary-blue transition-all duration-300 inline-block"
            >
              View Training Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
