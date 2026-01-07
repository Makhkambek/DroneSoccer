'use client';

import { useState } from 'react';

export default function Apply() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegram: '', // Добавлено новое поле
    age: '',
    experience: '',
    course: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Пока просто выводим в консоль, чтобы проверить, что данные собираются
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Сброс формы через 3 секунды
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        telegram: '',
        age: '',
        experience: '',
        course: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-primary-blue to-primary-red flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Apply Now
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl animate-fade-in-up animation-delay-200">
            Join our team and start your journey in competitive drone sports
          </p>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Success Message */}
          {submitted && (
            <div className="mb-8 p-6 bg-green-100 border-l-4 border-green-500 rounded-lg animate-fade-in-up">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <div>
                  <h3 className="font-bold text-green-800">Application Submitted Successfully!</h3>
                  <p className="text-green-700">We'll get back to you within 2-3 business days.</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Registration Form
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below to start your application process
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Telegram Field - Added Here */}
              <div>
                <label htmlFor="telegram" className="block text-sm font-semibold text-gray-700 mb-2">
                  Telegram Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">@</span>
                  <input
                    type="text"
                    id="telegram"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    required
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors"
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Age and Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="10"
                    max="100"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors"
                    placeholder="18"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                    Drone Experience <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="none">No Experience</option>
                    <option value="beginner">Beginner (0-6 months)</option>
                    <option value="intermediate">Intermediate (6-24 months)</option>
                    <option value="advanced">Advanced (2+ years)</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Course <span className="text-red-500">*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors bg-white"
                >
                  <option value="">Select a Course</option>
                  <option value="general">General Drone Course</option>
                  <option value="racing">Drone Racing</option>
                  <option value="soccer-40">Drone Soccer - Class 40</option>
                  <option value="soccer-20">Drone Soccer - Class 20</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your goals, previous experience, or any questions you have..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-red text-white font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Submit Application
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
                We'll contact you within 2-3 business days.
              </p>

            </form>
          </div>
        </div>
      </section>

      {/* Info Section - Unchanged */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">What Happens Next?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-orbitron text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-3 text-gray-800">Application Review</h3>
              <p className="text-gray-600">
                Our team reviews your application and matches you with the appropriate course and instructors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-orbitron text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-3 text-gray-800">Initial Contact</h3>
              <p className="text-gray-600">
                We'll reach out via email or phone to discuss your goals and schedule an orientation session.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-orbitron text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-orbitron text-xl font-bold mb-3 text-gray-800">Start Training</h3>
              <p className="text-gray-600">
                Begin your journey with expert instructors and state-of-the-art training facilities.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}