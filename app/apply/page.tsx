'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Apply() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    telegram: '',
    passportNumber: '',
    age: '',
    experience: '',
    course: '',
    message: '',
  });
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, val]) => body.append(key, val));
      if (passportPhoto) body.append('passportPhoto', passportPhoto);

      const response = await fetch('/api/apply', {
        method: 'POST',
        body,
      });

      const data = await response.json();

      // Handle rate limiting
      if (response.status === 429) {
        const minutes = Math.ceil((data.retryAfter || 300) / 60);
        throw new Error(
          `Too many requests. Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before submitting again.`
        );
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-primary-blue flex items-center justify-center px-4 pt-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <h1 className="font-orbitron text-4xl font-bold text-white mb-4">Application Submitted!</h1>
          <p className="text-white/80 text-lg mb-3">
            Thank you, <span className="text-white font-semibold">{formData.firstName}</span>! Your application has been received.
          </p>
          <p className="text-white/60 text-sm mb-8">
            We&apos;ve sent your login credentials to <span className="text-white font-medium">{formData.email}</span>. Check your inbox (and spam folder) — you can log in as soon as your application is reviewed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/login" className="px-8 py-3 bg-white text-primary-blue font-bold rounded-xl hover:bg-gray-100 transition-all">
              Go to Login
            </Link>
            <Link href="/lessons" className="px-8 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all border border-white/30">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 bg-red-100 border-l-4 border-red-500 rounded-lg animate-fade-in-up">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                </svg>
                <div>
                  <h3 className="font-bold text-red-800">Submission Failed</h3>
                  <p className="text-red-700">{error}</p>
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

              {/* Passport */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="passportNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    Passport Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="passportNumber"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleChange}
                    required
                    pattern="^[A-Z]{2}\d{7}$"
                    maxLength={9}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors uppercase"
                    placeholder="AD1234567"
                  />
                  <p className="text-xs text-gray-400 mt-1">Format: 2 letters + 7 digits (e.g. AD1234567)</p>
                </div>

                <div>
                  <label htmlFor="passportPhoto" className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo with Passport <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="passportPhoto"
                      accept="image/jpeg,image/png,image/webp"
                      required
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setPassportPhoto(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => setPhotoPreview(reader.result as string);
                          reader.readAsDataURL(file);
                        } else {
                          setPhotoPreview(null);
                        }
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-blue focus:outline-none transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary-blue file:text-white file:text-sm file:font-semibold file:cursor-pointer"
                    />
                    {photoPreview && (
                      <img src={photoPreview} alt="Preview" className="mt-2 h-24 rounded-lg object-cover" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Selfie holding your passport. Max 5MB, JPG/PNG</p>
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
                  disabled={isLoading}
                  className={`w-full px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-red text-white font-bold rounded-lg transition-all duration-300 transform ${
                    isLoading
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:shadow-2xl hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
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