import Image from 'next/image';

// Team member data
const teamMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Team Captain & Lead Pilot', image: '/images/team/member-1.jpg' },
  { id: 2, name: 'Sarah Chen', role: 'Technical Director', image: '/images/team/member-2.jpg' },
  { id: 3, name: 'Marcus Rodriguez', role: 'Head Coach', image: '/images/team/member-3.jpg' },
  { id: 4, name: 'Emma Williams', role: 'Lead Pilot - Class 40', image: '/images/team/member-4.jpg' },
  { id: 5, name: 'David Kim', role: 'Lead Pilot - Class 20', image: '/images/team/member-5.jpg' },
  { id: 6, name: 'Sofia Martinez', role: 'Racing Specialist', image: '/images/team/member-6.jpg' },
  { id: 7, name: 'James Anderson', role: 'Strategy Analyst', image: '/images/team/member-7.jpg' },
  { id: 8, name: 'Lisa Thompson', role: 'Junior Pilot', image: '/images/team/member-8.jpg' },
];

export default function AboutTeam() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-primary-blue to-primary-red flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-200">
            Passionate pilots and experts dedicated to excellence in drone soccer
          </p>
        </div>
      </section>

      {/* Section 1: Team Photo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Team</h2>
            <p className="section-subheading">
              United by passion, driven by excellence
            </p>
          </div>

          {/* Group Photo Placeholder */}
          <div className="relative aspect-[21/9] bg-gradient-to-br from-blue-900 via-purple-700 to-red-700 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p className="font-orbitron text-2xl font-bold">Team Photo</p>
                <p className="text-sm mt-2 opacity-80">Professional team photograph coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Individual Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Team Members</h2>
            <p className="section-subheading">
              Get to know the pilots and experts behind our success
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Member Photo Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary-blue to-primary-red flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <svg className="w-24 h-24 text-white/80 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {/* Decorative Circle */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                </div>

                {/* Member Info */}
                <div className="p-6 text-center">
                  <h3 className="font-orbitron text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-blue font-semibold text-sm">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Team Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-blue to-primary-red p-12 rounded-3xl shadow-2xl text-white text-center">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-8">
              Our Team Mission
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              To compete at the highest level of drone soccer while fostering a culture of innovation,
              teamwork, and sportsmanship that inspires the next generation of pilots.
            </p>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              We believe in pushing the boundaries of what's possible in drone sports, constantly improving
              our skills, and sharing our knowledge with aspiring pilots around the world. Together, we're
              not just a team - we're a family united by our passion for drone soccer.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Team Achievements</h2>
            <p className="section-subheading">
              Our journey to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Achievement 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-gray-800">National Champions</h3>
              <p className="text-gray-600">2024 Class 40 Championship Winners</p>
            </div>

            {/* Achievement 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-gray-800">Top Rankings</h3>
              <p className="text-gray-600">Top 5 Global Team Rankings 2024</p>
            </div>

            {/* Achievement 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-3 text-gray-800">500+ Pilots Trained</h3>
              <p className="text-gray-600">Successfully trained and certified</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Ready to be part of something extraordinary? Apply now and start your journey with us.
          </p>
          <a
            href="/apply"
            className="px-8 py-4 bg-white text-primary-blue font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block transform hover:scale-105"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
