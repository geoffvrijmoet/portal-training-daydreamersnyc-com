import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using the Daydreamers NYC Training Portal, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="mb-4">
              We grant you a limited, non-exclusive, non-transferable license to access and use the Training Portal for your personal training and development purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="mb-4">You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us of any unauthorized use</li>
              <li>Ensuring your account information is accurate</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality of the Training Portal are owned by Daydreamers NYC and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the portal for any unlawful purpose</li>
              <li>Share your account credentials</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Interfere with the proper functioning of the portal</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Termination</h2>
            <p className="mb-4">
              We reserve the right to terminate or suspend your account and access to the Training Portal at our sole discretion, without notice, for conduct that we believe violates these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer</h2>
            <p className="mb-4">
              The Training Portal is provided &quot;as is&quot; and &quot;as available&quot; without any warranties, either express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              Daydreamers NYC shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Training Portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the Training Portal.
            </p>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
} 