export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="space-y-6 text-gray-200">
            <p className="text-sm text-gray-400">
              <strong>Last Updated:</strong> December 2024
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-blue-300">1.1 Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>URLs you submit to our shortening service</li>
                  <li>Any optional account information if you create an account</li>
                </ul>

                <h3 className="text-lg font-medium text-blue-300">1.2 Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and approximate geographic location</li>
                  <li>Browser type, operating system, and device information</li>
                  <li>Click data and usage statistics for shortened URLs</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Referrer information and browsing patterns</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To provide and improve our URL shortening service</li>
                <li>To generate analytics and statistics</li>
                <li>To display relevant advertisements through our advertising partners</li>
                <li>To prevent fraud and abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Advertising and Third-Party Services</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-blue-300">3.1 Ad-Maven</h3>
                <p>
                  We partner with Ad-Maven to display advertisements on our website. Ad-Maven may collect 
                  information about your visits to this and other websites in order to provide advertisements 
                  about goods and services of interest to you.
                </p>
                
                <h3 className="text-lg font-medium text-blue-300">3.2 Data Collection by Ad Partners</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cookies and web beacons for ad targeting</li>
                  <li>Device identifiers and browser information</li>
                  <li>IP address and general location data</li>
                  <li>Pages visited and interaction data</li>
                </ul>

                <h3 className="text-lg font-medium text-blue-300">3.3 Ad-Maven Privacy</h3>
                <p>
                  For questions about Ad-Maven's data practices, contact: 
                  <a href="mailto:privacy@ad-maven.com" className="text-blue-400 hover:underline ml-1">
                    privacy@ad-maven.com
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Cookies and Tracking</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-blue-300">4.1 Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Advertising Cookies:</strong> Used by our advertising partners to show relevant ads</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>

                <h3 className="text-lg font-medium text-blue-300">4.2 Managing Cookies</h3>
                <p>
                  You can control cookies through your browser settings. However, disabling certain cookies 
                  may affect the functionality of our service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Data Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Advertising partners (like Ad-Maven) for ad serving and targeting</li>
                <li>Analytics providers to understand service usage</li>
                <li>Service providers who assist in operating our website</li>
                <li>Law enforcement when required by law</li>
              </ul>
              <p className="mt-3">
                <strong>We do not sell your personal data to third parties.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Your Rights (GDPR/CCPA)</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your data (right to be forgotten)</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Data Retention</h2>
              <p>
                We retain your data only as long as necessary to provide our services and comply with 
                legal obligations. URL data and associated analytics are typically retained for 2 years.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">9. International Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your residence. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">10. Children's Privacy</h2>
              <p>
                Our service is not intended for children under 18. We do not knowingly collect 
                personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">11. Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights, contact us at:
              </p>
              <div className="mt-2 p-4 bg-white/5 rounded-lg">
                <p><strong>Email:</strong> privacy@linkmagik.com</p>
                <p><strong>Website:</strong> LinkMagik URL Shortener</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">12. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                material changes by posting the new policy on this page with an updated date.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-center text-gray-400">
              By using our service, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
