import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4">
              This Privacy Policy explains how Daydreamers NYC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and protects your personal information when you use our training portal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Training progress and performance data</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and maintain our training services</li>
              <li>Track and assess training progress</li>
              <li>Communicate important updates and information</li>
              <li>Improve our services and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our platform, conducting our business, or serving our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of certain data collection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at [contact information].
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Updates to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          </section>
        </div>
      </div>
    </div>
  );
} 