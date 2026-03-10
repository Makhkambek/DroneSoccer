'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function AboutDroneSoccer() {
  const [progressValues, setProgressValues] = useState({
    growth: 0,
    technology: 0,
    community: 0,
  });

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate progress bars
            setTimeout(() => setProgressValues({ growth: 85, technology: 92, community: 78 }), 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-r from-primary-blue to-primary-red flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            About Drone Soccer
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-200">
            The future of competitive sports is here - high-speed, high-tech, and incredibly exciting
          </p>
        </div>
      </section>

      {/* Section 1: What is Drone Soccer? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <div>
              <h2 className="section-heading">What is Drone Soccer?</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Drone Soccer is an innovative team sport that combines the excitement of traditional soccer
                  with cutting-edge drone technology. Two teams of pilots compete to score goals by flying
                  their drones through the opposing team's goal ring.
                </p>
                <p>
                  Each team consists of 5 pilots controlling spherical drones equipped with protective cages.
                  The sport requires exceptional piloting skills, strategic thinking, and seamless teamwork.
                  Matches are played in specially designed arenas with designated goal zones at each end.
                </p>
                <p>
                  With roots in South Korea, Drone Soccer has rapidly expanded globally, becoming one of the
                  fastest-growing aerial sports. It's recognized for its accessibility, safety features, and
                  the perfect blend of physical and technological expertise it demands from participants.
                </p>
              </div>
            </div>

            {/* Video/Image Content */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-900 via-purple-700 to-red-700 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Placeholder for video */}
                <div className="text-center text-white p-8">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="font-orbitron text-xl font-bold">Watch Drone Soccer in Action</p>
                  <p className="text-sm mt-2 opacity-80">Video content coming soon</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-red rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary-blue rounded-full opacity-20 blur-2xl"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Mission & Values</h2>
            <p className="section-subheading">
              Building the future of competitive drone sports through innovation, education, and community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Value 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-center mb-4 text-gray-800">Innovation</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Pushing the boundaries of drone technology and competitive sports to create unprecedented
                experiences for pilots and spectators alike.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-center mb-4 text-gray-800">Education</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Providing comprehensive training programs that make drone soccer accessible to everyone,
                from complete beginners to professional athletes.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-center mb-4 text-gray-800">Community</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Building a global network of passionate pilots, teams, and fans who share a love for
                drone sports and technological advancement.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: Global Impact - Statistics */}
      <section className="py-20 bg-white" ref={progressRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Global Impact</h2>
            <p className="section-subheading">
              Drone Soccer is growing rapidly across the globe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

            {/* Statistics Cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-blue to-blue-700 p-8 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-5xl font-orbitron font-bold">30+</h3>
                  <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <p className="text-xl font-semibold mb-2">Countries Worldwide</p>
                <p className="text-white/80">Active drone soccer programs and competitions</p>
              </div>

              <div className="bg-gradient-to-br from-primary-red to-red-700 p-8 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-5xl font-orbitron font-bold">500+</h3>
                  <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <p className="text-xl font-semibold mb-2">Active Teams</p>
                <p className="text-white/80">Professional and amateur teams competing globally</p>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-5xl font-orbitron font-bold">10K+</h3>
                  <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <p className="text-xl font-semibold mb-2">Trained Pilots</p>
                <p className="text-white/80">Certified drone soccer pilots worldwide</p>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">Sport Growth Rate</span>
                  <span className="font-orbitron font-bold text-primary-blue">{progressValues.growth}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressValues.growth}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Year-over-year increase in participation</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">Technology Advancement</span>
                  <span className="font-orbitron font-bold text-primary-blue">{progressValues.technology}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressValues.technology}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Innovation in drone technology and safety</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-800">Community Engagement</span>
                  <span className="font-orbitron font-bold text-primary-blue">{progressValues.community}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progressValues.community}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Active community participation and events</p>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 p-6 rounded-xl mt-8">
                <h4 className="font-orbitron font-bold text-xl mb-4 text-gray-800">Tournament Results 2024</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-primary-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    50+ International Competitions
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-primary-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Regional Championships across 5 continents
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-primary-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    World Championship Series established
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Our Goal */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-8">Our Goal</h2>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            To establish drone soccer as a premier global sport, recognized for its innovation,
            accessibility, and ability to unite technology enthusiasts and athletes from all backgrounds.
          </p>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            We envision a future where drone soccer is played in schools, universities, and professional
            leagues worldwide - inspiring the next generation of pilots, engineers, and innovators to push
            the boundaries of what's possible in competitive sports.
          </p>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Join the Movement
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Be part of the drone soccer revolution. Whether you're a beginner or an experienced pilot,
            there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-red text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 inline-block transform hover:scale-105"
            >
              Register Now
            </Link>
            <Link
              href="/lessons"
              className="px-8 py-4 bg-white text-primary-blue border-2 border-primary-blue font-bold rounded-lg hover:bg-primary-blue hover:text-white transition-all duration-300 inline-block"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
