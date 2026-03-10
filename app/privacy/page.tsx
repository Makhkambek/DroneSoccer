import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Drone Soccer',
  description: 'How Drone Soccer collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-48 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="font-orbitron text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: March 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
              <p>When you submit an application or create an account on Drone Soccer, we collect the following personal information:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Full name, email address, phone number, Telegram handle</li>
                <li>Age and experience level (for course placement)</li>
                <li>Payment information (processed securely via Stripe — we do not store card details)</li>
                <li>Course progress and video watch history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Create and manage your student account</li>
                <li>Process enrollment applications and course access</li>
                <li>Send transactional emails (account credentials, notifications)</li>
                <li>Track your learning progress within courses</li>
                <li>Improve our platform and services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Storage & Security</h2>
              <p>Your data is stored securely on our servers. Passwords are hashed using bcrypt and are never stored in plain text. Payment processing is handled entirely by Stripe and subject to their security standards (PCI DSS compliant).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Data Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share data with:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Stripe</strong> — for payment processing</li>
                <li><strong>Email providers</strong> — for transactional notifications only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Cookies</h2>
              <p>We use session cookies strictly for authentication purposes (NextAuth.js). We do not use tracking or advertising cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Access and update your personal data via your Profile page</li>
                <li>Request deletion of your account and associated data</li>
                <li>Withdraw consent for communications at any time</li>
              </ul>
              <p className="mt-2">To exercise these rights, contact us at <a href="mailto:info@dronesoccer.com" className="text-primary-blue hover:underline">info@dronesoccer.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact</h2>
              <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:info@dronesoccer.com" className="text-primary-blue hover:underline">info@dronesoccer.com</a>.</p>
            </section>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4 text-sm">
            <Link href="/terms" className="text-primary-blue hover:underline">Terms of Service</Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
