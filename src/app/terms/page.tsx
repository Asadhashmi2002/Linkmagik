export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="space-y-6 text-gray-200">
            <p className="text-sm text-gray-400">
              <strong>Last Updated:</strong> December 2024
            </p>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing and using LinkMagik ("the Service"), you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Description of Service</h2>
              <p>
                LinkMagik is a URL shortening service that allows users to create shorter versions of 
                long URLs. The service may include advertisements and tracking functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Share malicious, illegal, or harmful content</li>
                <li>Distribute spam, malware, or viruses</li>
                <li>Violate intellectual property rights</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Share adult content or content harmful to minors</li>
                <li>Circumvent or interfere with security features</li>
                <li>Use the service for commercial purposes without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Privacy and Data</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand 
                how we collect, use, and protect your information. By using our service, you 
                consent to the collection and use of information as outlined in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Advertising</h2>
              <p>
                Our service may display advertisements provided by third-party advertising partners, 
                including Ad-Maven. These advertisements help support the free operation of our service. 
                You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Advertisements may be displayed before accessing shortened URLs</li>
                <li>We do not control the content of third-party advertisements</li>
                <li>Clicking on advertisements may redirect you to external websites</li>
                <li>We are not responsible for the content or practices of advertised websites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain 
                the exclusive property of LinkMagik and its licensors. The service is protected by 
                copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Disclaimers</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>The service is provided "as is" without warranties of any kind</li>
                <li>We do not guarantee uninterrupted or error-free operation</li>
                <li>We are not responsible for the content of external websites</li>
                <li>Links may become inactive or unavailable at any time</li>
                <li>We do not warrant the accuracy or completeness of information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Limitation of Liability</h2>
              <p>
                In no event shall LinkMagik, its officers, directors, employees, or agents be liable 
                for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">9. Termination</h2>
              <p>
                We may terminate or suspend your access immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">10. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any 
                time. If a revision is material, we will try to provide at least 30 days notice prior 
                to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">11. Governing Law</h2>
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                our company is established, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">12. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-2 p-4 bg-white/5 rounded-lg">
                <p><strong>Email:</strong> legal@linkmagik.com</p>
                <p><strong>Website:</strong> LinkMagik URL Shortener</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-center text-gray-400">
              By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
