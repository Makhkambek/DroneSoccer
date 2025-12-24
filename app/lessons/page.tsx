import Link from 'next/link';

const courses = [
  {
    id: 1,
    title: 'General Drone Course',
    subtitle: 'Assembly and Basic Principles',
    description: 'Learn the fundamentals of drone technology, assembly, and basic piloting skills. Perfect for absolute beginners.',
    duration: '4 weeks',
    level: 'Beginner',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    gradient: 'from-blue-500 to-blue-700',
    features: [
      'Drone anatomy and components',
      'Basic electronics and wiring',
      'Assembly and troubleshooting',
      'Flight safety fundamentals',
      'Basic piloting techniques',
      'Maintenance and care',
    ],
  },
  {
    id: 2,
    title: 'Drone Racing',
    subtitle: 'Advanced Piloting for Speed',
    description: 'Master high-speed piloting techniques and racing strategies. Take your flying skills to the next level.',
    duration: '6 weeks',
    level: 'Intermediate',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    ),
    gradient: 'from-purple-500 to-purple-700',
    features: [
      'Advanced flight dynamics',
      'Racing line optimization',
      'High-speed maneuvering',
      'FPV racing techniques',
      'Competition preparation',
      'Track analysis and strategy',
    ],
  },
  {
    id: 3,
    title: 'Drone Soccer - Class 40',
    subtitle: 'Tactics and Piloting (40cm Drones)',
    description: 'Learn competitive drone soccer with larger 40cm drones. Focus on team tactics and strategic play.',
    duration: '8 weeks',
    level: 'Intermediate',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    gradient: 'from-primary-blue to-blue-800',
    features: [
      'Class 40 drone specifications',
      'Team formation and roles',
      'Offensive and defensive tactics',
      'Game strategy development',
      'Match analysis and review',
      'Tournament preparation',
    ],
  },
  {
    id: 4,
    title: 'Drone Soccer - Class 20',
    subtitle: 'Tactics and Piloting (20cm Drones)',
    description: 'Master agile play with compact 20cm drones. Focus on precision, speed, and advanced team coordination.',
    duration: '8 weeks',
    level: 'Advanced',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
      </svg>
    ),
    gradient: 'from-primary-red to-red-800',
    features: [
      'Class 20 drone specifications',
      'Advanced agility techniques',
      'Precision maneuvering',
      'Fast-paced tactical plays',
      'Elite team coordination',
      'Professional competition prep',
    ],
  },
];

export default function Lessons() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-primary-blue to-primary-red flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Training Programs
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-200">
            Professional drone courses for every skill level - from beginner to elite competitor
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Our Courses</h2>
            <p className="section-subheading">
              Choose the perfect course to match your goals and skill level
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border border-gray-100"
              >
                {/* Course Header */}
                <div className={`bg-gradient-to-r ${course.gradient} p-8 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                          {course.level}
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                          {course.duration}
                        </span>
                      </div>
                      <h3 className="font-orbitron text-3xl font-bold mb-2">
                        {course.title}
                      </h3>
                      <p className="text-white/90 text-lg font-semibold">
                        {course.subtitle}
                      </p>
                    </div>
                    <div className="ml-4">
                      {course.icon}
                    </div>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Content */}
                <div className="p-8">
                  <h4 className="font-orbitron font-bold text-xl mb-4 text-gray-800">
                    What You'll Learn
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-6 h-6 text-primary-blue mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/apply"
                    className={`block w-full text-center px-6 py-4 bg-gradient-to-r ${course.gradient} text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading">Why Learn With Us?</h2>
            <p className="section-subheading">
              World-class training facilities and expert instructors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Benefit 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-gray-800">Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from professional pilots with years of competitive experience and teaching expertise.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-gray-800">Modern Facilities</h3>
              <p className="text-gray-600 leading-relaxed">
                Train in professional-grade arenas with the latest equipment and safety features.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 className="font-orbitron text-2xl font-bold mb-4 text-gray-800">Certification</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive official certification upon course completion, recognized internationally.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-blue to-primary-red">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Take the first step towards becoming a professional drone pilot
          </p>
          <Link
            href="/apply"
            className="px-8 py-4 bg-white text-primary-blue font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-block transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}
