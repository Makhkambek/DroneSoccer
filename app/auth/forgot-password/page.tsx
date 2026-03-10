'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-primary-blue flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-blue font-orbitron font-bold text-3xl">DS</span>
          </div>
          <h1 className="font-orbitron text-4xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-white/70">We'll send you a reset link</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h2 className="font-orbitron text-xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 text-sm mb-6">
                If an account exists for <strong>{email}</strong>, we sent a reset link. It expires in 1 hour.
              </p>
              <Link href="/auth/login" className="text-primary-blue font-semibold hover:underline text-sm">
                ← Back to login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-orbitron text-2xl font-bold text-gray-900 mb-6">Forgot Password</h2>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-blue to-blue-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link href="/auth/login" className="text-primary-blue font-semibold hover:underline">
                  ← Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
