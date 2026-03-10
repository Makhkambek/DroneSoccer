import Link from 'next/link';

export default function DroneRacingPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            FPV Drone Racing
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            High-speed competitive racing combining precision piloting with cutting-edge FPV technology
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
              FPV (First Person View) Drone Racing is an exhilarating motorsport where pilots navigate custom-built racing quadcopters through complex three-dimensional courses at speeds exceeding 100 mph. Pilots wear specialized FPV goggles that provide real-time video feed from cameras mounted on their drones, creating an immersive racing experience that demands split-second decision making and exceptional piloting skills.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Recognized by the Drone Racing League (DRL) and the MultiGP Racing organization, competitive drone racing has emerged as a premier technological sport, combining elements of traditional motorsports, aviation, and esports into a unique competitive format that attracts participants and spectators worldwide.
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Racing Drone Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Frame Size:</span> 5-inch (diagonal motor-to-motor measurement)</li>
                  <li><span className="font-semibold">Weight Limit:</span> 800 grams maximum including battery</li>
                  <li><span className="font-semibold">Motor Configuration:</span> Quadcopter with brushless motors</li>
                  <li><span className="font-semibold">Battery:</span> LiPo 4S-6S (14.8V-22.2V)</li>
                  <li><span className="font-semibold">FPV Camera:</span> High-resolution low-latency camera</li>
                  <li><span className="font-semibold">Video Transmission:</span> 5.8 GHz analog or digital FPV</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Course Specifications</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Track Length:</span> 200-400 meters per lap</li>
                  <li><span className="font-semibold">Gates:</span> 8-15 obstacles per lap (flags, rings, tunnels)</li>
                  <li><span className="font-semibold">Course Types:</span> Indoor arena, outdoor field, hybrid</li>
                  <li><span className="font-semibold">Timing System:</span> Precision lap timing with transponders</li>
                  <li><span className="font-semibold">Safety Barriers:</span> Spectator protection netting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Race Formats */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Race Formats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Time Trial</h3>
                <p className="text-gray-700 mb-3">Individual qualification format</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Solo runs against the clock</li>
                  <li>• 3 attempts per pilot</li>
                  <li>• Best lap time recorded</li>
                  <li>• Determines bracket seeding</li>
                  <li>• No physical contact</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Head-to-Head</h3>
                <p className="text-gray-700 mb-3">Bracket elimination racing</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 2-4 pilots per heat</li>
                  <li>• First past finish wins</li>
                  <li>• 3-5 lap races</li>
                  <li>• Single/double elimination</li>
                  <li>• Intense close-quarter racing</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Endurance</h3>
                <p className="text-gray-700 mb-3">Long-duration team racing</p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 30-60 minute races</li>
                  <li>• Team relay format</li>
                  <li>• Pit stops for battery changes</li>
                  <li>• Strategy and consistency</li>
                  <li>• Most laps completed wins</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Racing Classes */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Racing Classes</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6 py-4">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">Spec Class</h3>
                <p className="text-gray-700 mb-2">All pilots use identical standardized drones provided by the organizer</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Equal equipment for all competitors</li>
                  <li>• Focus on pure piloting skill</li>
                  <li>• Lower barrier to entry</li>
                  <li>• Common in professional leagues (DRL)</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-6 py-4">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">Open Class</h3>
                <p className="text-gray-700 mb-2">Pilots design and build custom drones within weight and size regulations</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Innovation and engineering creativity</li>
                  <li>• Technical advantage through optimization</li>
                  <li>• Weight and size restrictions apply</li>
                  <li>• Popular in grassroots racing (MultiGP)</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-6 py-4">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">Micro Class</h3>
                <p className="text-gray-700 mb-2">Ultra-lightweight drones (under 250g) for indoor and technical courses</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Compact 2-3 inch frame size</li>
                  <li>• Indoor-friendly and safer</li>
                  <li>• Technical precision required</li>
                  <li>• Growing competitive category</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills and Training */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Essential Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">FPV Mastery</h3>
                <p className="text-sm text-gray-600">
                  Flying confidently through FPV goggles with precise throttle and stick control
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">Speed Control</h3>
                <p className="text-sm text-gray-600">
                  Managing high-speed flight while maintaining accuracy through gates and turns
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">Line Optimization</h3>
                <p className="text-sm text-gray-600">
                  Finding the fastest racing line through complex three-dimensional courses
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">Technical Knowledge</h3>
                <p className="text-sm text-gray-600">
                  Understanding drone building, tuning, and troubleshooting for optimal performance
                </p>
              </div>
            </div>
          </div>

          {/* Championship Circuit */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-100 rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Professional Racing Circuit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-4">Major Racing Leagues</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800 mb-1">Drone Racing League (DRL)</h4>
                    <p className="text-sm text-gray-600">Professional spec-class league with global broadcast coverage and significant prize pools</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800 mb-1">MultiGP</h4>
                    <p className="text-sm text-gray-600">Grassroots open-class racing with local chapters and regional championships worldwide</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold text-gray-800 mb-1">FAI World Cup</h4>
                    <p className="text-sm text-gray-600">International federation sanctioned competitions determining world championship rankings</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-4">Competition Pathway</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Local Practice & Qualifying</h4>
                      <p className="text-sm text-gray-600">Club races and regional qualifiers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Regional Championships</h4>
                      <p className="text-sm text-gray-600">State and national level competitions</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Professional Circuit</h4>
                      <p className="text-sm text-gray-600">International league competition</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">World Championship</h4>
                      <p className="text-sm text-gray-600">Premier global title competition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white">
            <h2 className="font-orbitron text-3xl font-bold mb-4">Enter the Race</h2>
            <p className="text-xl mb-8 text-white/90">
              Experience the thrill of high-speed FPV drone racing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
              >
                Join Racing Team
              </Link>
              <Link
                href="/lessons"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white inline-block"
              >
                Racing Training
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
