'use client';

import { use, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [course, setCourse] = useState<{ title: string; price: number; currency: string } | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push(`/auth/login?callbackUrl=/checkout/${courseId}`);
  }, [status, router, courseId]);

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then((courses: any[]) => {
        const found = courses.find(c => c.id === courseId);
        if (found) setCourse(found);
        else router.push('/lessons');
      });
  }, [courseId, router]);

  // Format card number with spaces: 4242 4242 4242 4242
  const handleCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, '$1 ').trim());
  };

  // Format expiry: MM/YY
  const handleExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) setExpiry(digits.slice(0, 2) + '/' + digits.slice(2));
    else setExpiry(digits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    const rawCard = cardNumber.replace(/\s/g, '');
    if (rawCard.length < 16) { setError('Please enter a valid 16-digit card number.'); return; }
    if (expiry.length < 5) { setError('Please enter a valid expiry date (MM/YY).'); return; }
    if (cvc.length < 3) { setError('Please enter a valid CVC.'); return; }
    if (!name.trim()) { setError('Please enter the cardholder name.'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/purchases/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Payment failed. Please try again.'); setLoading(false); return; }
      router.push(`/lessons/${courseId}?success=true`);
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  if (status === 'loading' || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const priceFormatted = `$${(course.price / 100).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-36 pb-16">
      <div className="max-w-md mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-orbitron font-bold text-sm">DS</span>
          </div>
          <h1 className="font-orbitron text-xl font-bold text-gray-900">DroneSoccer</h1>
          <p className="text-gray-500 text-sm mt-1">Secure Checkout</p>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">You're purchasing</p>
              <p className="font-semibold text-gray-900">{course.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">Lifetime access · All lessons</p>
            </div>
            <p className="font-orbitron text-2xl font-bold text-gray-900">{priceFormatted}</p>
          </div>
        </div>

        {/* Demo notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-amber-700 text-xs">
            <strong>Demo mode</strong> — no real payment is processed. Enter any card details to get access.
          </p>
        </div>

        {/* Card form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
            Card details
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Card number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={e => handleCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all font-mono text-lg tracking-widest"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry date</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={e => handleExpiry(e.target.value)}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={e => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  inputMode="numeric"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary-blue to-blue-700 text-white font-bold rounded-xl hover:opacity-90 transition-all text-lg disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Pay {priceFormatted}
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            By paying you agree to our{' '}
            <Link href="/terms" target="_blank" className="underline hover:text-gray-600">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" target="_blank" className="underline hover:text-gray-600">Privacy Policy</Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href={`/lessons/${courseId}`} className="text-sm text-gray-400 hover:text-gray-600">
            ← Cancel and go back
          </Link>
        </div>

      </div>
    </div>
  );
}
