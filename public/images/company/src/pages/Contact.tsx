export default function Contact() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-navy dark:text-gray-100 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Ready to discuss your project? We'd love to hear from you. Fill out the form below or reach out directly.
          </p>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-navy dark:text-gray-100 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Budget
                </label>
                <select
                  id="budget"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select a range</option>
                  <option value="50k">$50k - $100k</option>
                  <option value="100k">$100k - $250k</option>
                  <option value="250k">$250k - $500k</option>
                  <option value="500k">$500k+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Brief
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attachment (Optional)
                </label>
                <input
                  type="file"
                  id="attachment"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PDF, DOC, or DOCX up to 10MB</p>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-250"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-navy dark:text-gray-100 mb-6">Other ways to reach us</h2>
            <div className="space-y-6 mb-12">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 dark:bg-sky/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary dark:text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-navy dark:text-gray-100 mb-1">Email</h4>
                  <a href="mailto:info@evoxtechnologies.com" className="text-primary dark:text-sky hover:text-primary-hover dark:hover:text-sky-hover transition-colors">
                    info@evoxtechnologies.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 dark:bg-sky/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary dark:text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-navy dark:text-gray-100 mb-1">Phone</h4>
                  <a href="tel:+94706640664" className="text-primary dark:text-sky hover:text-primary-hover dark:hover:text-sky-hover transition-colors">
                    +94 706640664
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 dark:bg-sky/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary dark:text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-navy dark:text-gray-100 mb-1">Office</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Sri Lanka<br />
                    evoxtechnologies.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy dark:text-gray-100 mb-3">Book a Demo</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Schedule a 30-minute call to discuss your project and see how we can help.
              </p>
              <a
                href="#book-demo"
                className="inline-block w-full text-center px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-250"
              >
                Schedule a Call
              </a>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-navy dark:text-gray-100 mb-4">Office Location</h3>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Office location map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-padding max-w-5xl mx-auto text-center">
          <h2 className="text-navy dark:text-gray-100 mb-4">Response Time</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Initial Response', time: 'Within 24 hours' },
              { title: 'Discovery Call', time: 'Within 2-3 days' },
              { title: 'Proposal', time: 'Within 1 week' },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card p-6">
                <h4 className="font-semibold text-navy dark:text-gray-100 mb-2">{item.title}</h4>
                <p className="text-primary dark:text-sky font-medium">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
