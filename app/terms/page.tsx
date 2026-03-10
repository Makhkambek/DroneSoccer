import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Drone Soccer',
  description: 'Terms and conditions for using the Drone Soccer platform and courses.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-48 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="font-orbitron text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-400 text-sm mb-8">Last updated: March 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the Drone Soccer platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Accounts</h2>
              <p>Student accounts are created upon application approval. You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account at <a href="mailto:info@dronesoccer.com" className="text-primary-blue hover:underline">info@dronesoccer.com</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Course Access & Payments</h2>
              <p>Course access is granted either manually by an administrator or upon successful payment via Stripe. All payments are final. Refunds may be considered on a case-by-case basis within 7 days of purchase — contact us to request one.</p>
              <p className="mt-2">Course content is for personal, non-commercial use only. You may not share, redistribute, or resell course materials.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Share your account credentials with others</li>
                <li>Attempt to access courses you have not purchased</li>
                <li>Reproduce, distribute, or publicly display course content</li>
                <li>Use the platform for any unlawful purpose</li>
                <li>Interfere with or disrupt the platform's infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Intellectual Property</h2>
              <p>All course content, videos, materials, and platform code are the property of Drone Soccer. You are granted a limited, non-exclusive, non-transferable license to access and view course content for personal educational purposes only.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">6. Shop & Products</h2>
              <p>Products listed in the Shop are processed via Telegram order requests. Pricing, availability, and delivery terms are subject to change. Contact us for shipping information and order status.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">7. Disclaimers</h2>
              <p>Drone Soccer activities involve physical risk. By enrolling in any program, you acknowledge and accept responsibility for any risks associated with drone sports activities. The platform is provided "as is" without warranties of any kind.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">8. Termination</h2>
              <p>We reserve the right to suspend or terminate accounts that violate these Terms. Upon termination, your access to course content will be revoked.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">9. Changes to Terms</h2>
              <p>We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">10. Contact</h2>
              <p>Questions about these Terms? Contact us at <a href="mailto:info@dronesoccer.com" className="text-primary-blue hover:underline">info@dronesoccer.com</a>.</p>
            </section>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4 text-sm">
            <Link href="/privacy" className="text-primary-blue hover:underline">Privacy Policy</Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
