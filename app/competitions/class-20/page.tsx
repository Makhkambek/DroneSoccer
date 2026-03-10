import Link from 'next/link';

export default function Class20Page() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-red to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            Dronesoccer 20 Class
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            The developmental category for aspiring drone soccer athletes featuring compact 20cm drones
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Competition Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Dronesoccer 20 Class serves as the entry and development category for competitive drone soccer, featuring smaller spherical protective cages measuring 20 centimeters in diameter. This category is designed for youth participants, beginners, and developing pilots looking to build fundamental skills before advancing to professional-level competition.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sanctioned by the International Drone Soccer Association (IDSA), Class 20 competitions provide an accessible pathway into the sport while maintaining competitive integrity and safety standards appropriate for developing athletes and recreational participants.
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-primary-red pl-6">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Drone Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Cage Diameter:</span> 20 cm (±1 cm tolerance)</li>
                  <li><span className="font-semibold">Maximum Weight:</span> 400 grams including battery</li>
                  <li><span className="font-semibold">Propeller Configuration:</span> Quadcopter (4 motors)</li>
                  <li><span className="font-semibold">Battery:</span> LiPo 2S-3S (7.4V-11.1V) maximum</li>
                  <li><span className="font-semibold">FPV System:</span> 5.8 GHz video transmission</li>
                </ul>
              </div>
              <div className="border-l-4 border-primary-blue pl-6">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Arena Specifications</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Field Dimensions:</span> 10m × 6m × 2.5m (L × W × H)</li>
                  <li><span className="font-semibold">Goal Size:</span> 1m diameter circular goal</li>
                  <li><span className="font-semibold">Net Material:</span> Lightweight polyester mesh</li>
                  <li><span className="font-semibold">Surface:</span> Artificial turf with cushioned padding</li>
                  <li><span className="font-semibold">Safety Zone:</span> 1.5m perimeter around playing field</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Competition Format */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Competition Format</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Match Structure</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Team Composition: 3 players (2 strikers + 1 defender)</li>
                  <li>Match Duration: Two 3-minute periods with 1-minute break</li>
                  <li>Overtime: 1-minute sudden death period if tied</li>
                  <li>Scoring: Goals scored by passing drone through opponent's goal ring</li>
                  <li>Substitutions: One substitution per period</li>
                </ul>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Tournament Structure</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Division Format: Age-based divisions (Youth, Junior, Open)</li>
                  <li>Preliminary Round: Swiss system pairing</li>
                  <li>Playoffs: Single-elimination knockout rounds</li>
                  <li>Finals: Best-of-one championship match</li>
                  <li>Minimum Teams: 6 registered teams required per division</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rules and Regulations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Rules and Regulations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Permitted Actions</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Controlled contact between drones</li>
                  <li>Defensive positioning and interception</li>
                  <li>Team passing and coordination</li>
                  <li>Strategic movement and positioning</li>
                </ul>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Prohibited Actions</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Excessive aggressive contact or ramming</li>
                  <li>Flying outside designated boundaries</li>
                  <li>Dangerous or reckless piloting behavior</li>
                  <li>Tampering with opponent equipment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Age Divisions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Age Divisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">Youth Division</h3>
                <p className="text-gray-700 mb-3">Ages 8-12 years</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Focus on skill development</li>
                  <li>• Emphasis on sportsmanship</li>
                  <li>• Simplified rule set</li>
                  <li>• Parental supervision required</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">Junior Division</h3>
                <p className="text-gray-700 mb-3">Ages 13-17 years</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Competitive tournament play</li>
                  <li>• Advanced tactics training</li>
                  <li>• Standard rule application</li>
                  <li>• Pathway to Class 40</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">Open Division</h3>
                <p className="text-gray-700 mb-3">Ages 18+ years</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Adult recreational league</li>
                  <li>• Corporate team building</li>
                  <li>• Full competitive rules</li>
                  <li>• Professional development track</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Educational Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">STEM Learning</h3>
                <p className="text-sm text-gray-600">Applied physics, electronics, and engineering concepts</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Teamwork</h3>
                <p className="text-sm text-gray-600">Collaboration and communication skills development</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Quick Reflexes</h3>
                <p className="text-sm text-gray-600">Hand-eye coordination and reaction time improvement</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Discipline</h3>
                <p className="text-sm text-gray-600">Focus, practice habits, and competitive ethics</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-red to-red-700 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white">
            <h2 className="font-orbitron text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-xl mb-8 text-white/90">
              Perfect for beginners and youth athletes looking to enter competitive drone soccer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="px-8 py-4 bg-white text-primary-red font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
              >
                Join Class 20
              </Link>
              <Link
                href="/lessons"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white inline-block"
              >
                Beginner Training
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
