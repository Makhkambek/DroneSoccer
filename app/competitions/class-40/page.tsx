import Link from 'next/link';

export default function Class40Page() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
            Dronesoccer 40 Class
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
            The premier professional category for competitive drone soccer featuring 40cm spherical drones
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
              Dronesoccer 40 Class represents the highest level of competitive drone soccer, featuring spherical protective cages measuring 40 centimeters in diameter. This category emphasizes strategic gameplay, advanced piloting skills, and team coordination in a dynamic aerial sporting environment.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Recognized by the International Drone Soccer Association (IDSA), Class 40 competitions attract elite teams from around the world, showcasing the pinnacle of FPV drone piloting expertise combined with tactical sports strategy.
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-primary-blue pl-6">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Drone Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Cage Diameter:</span> 40 cm (±2 cm tolerance)</li>
                  <li><span className="font-semibold">Maximum Weight:</span> 1,200 grams including battery</li>
                  <li><span className="font-semibold">Propeller Configuration:</span> Quadcopter (4 motors)</li>
                  <li><span className="font-semibold">Battery:</span> LiPo 4S (14.8V) maximum</li>
                  <li><span className="font-semibold">FPV System:</span> 5.8 GHz video transmission</li>
                </ul>
              </div>
              <div className="border-l-4 border-primary-red pl-6">
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Arena Specifications</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><span className="font-semibold">Field Dimensions:</span> 16m × 8m × 3m (L × W × H)</li>
                  <li><span className="font-semibold">Goal Size:</span> 1.5m diameter circular goal</li>
                  <li><span className="font-semibold">Net Material:</span> Reinforced polyester mesh</li>
                  <li><span className="font-semibold">Surface:</span> Artificial turf with safety padding</li>
                  <li><span className="font-semibold">Safety Zone:</span> 2m perimeter around playing field</li>
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
                  <li>Team Composition: 5 players (3 strikers + 2 defenders)</li>
                  <li>Match Duration: Three 3-minute periods with 1-minute breaks</li>
                  <li>Overtime: 2-minute golden goal period if tied</li>
                  <li>Scoring: Goals scored by passing drone through opponent's goal ring</li>
                  <li>Substitutions: Unlimited during break periods</li>
                </ul>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Tournament Structure</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Preliminary Round: Round-robin group stage</li>
                  <li>Knockout Stage: Single-elimination bracket (Quarter-finals onwards)</li>
                  <li>Championship Format: Best-of-three finals series</li>
                  <li>Minimum Teams: 8 registered teams required</li>
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
                  <li>Physical contact between drones (ramming, blocking)</li>
                  <li>Strategic positioning and zone defense</li>
                  <li>Coordinated team offensive strategies</li>
                  <li>Quick directional changes and aerial maneuvers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-3">Prohibited Actions</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Intentional collision with goal structure</li>
                  <li>Flying outside designated play area (out of bounds)</li>
                  <li>Unsportsmanlike conduct or dangerous flying</li>
                  <li>Use of unauthorized equipment or modifications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Championship Information */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-6">Championship Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">Regional Championships</h3>
                <p className="text-gray-600 text-sm">
                  Quarterly competitions held across continental regions with qualification for international events
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">National Championships</h3>
                <p className="text-gray-600 text-sm">
                  Annual national tournaments determining country representatives for world championships
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <h3 className="font-orbitron text-lg font-bold text-gray-800 mb-2">World Championship</h3>
                <p className="text-gray-600 text-sm">
                  Premier global event featuring top 32 teams competing for the international title and prize pool
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-blue to-primary-red rounded-2xl shadow-lg p-8 md:p-12 text-center text-white">
            <h2 className="font-orbitron text-3xl font-bold mb-4">Ready to Compete?</h2>
            <p className="text-xl mb-8 text-white/90">
              Join our elite drone soccer program and compete at the highest level
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="px-8 py-4 bg-white text-primary-blue font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
              >
                Apply to Team
              </Link>
              <Link
                href="/lessons"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white inline-block"
              >
                Training Programs
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
