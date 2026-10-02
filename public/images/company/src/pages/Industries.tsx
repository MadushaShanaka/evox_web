import { Link } from 'react-router-dom';

export default function Industries() {
  const industries = [
    {
      title: 'Manufacturing',
      description: 'Modernize operations with ERP systems, IoT integration, and real-time production tracking.',
      challenges: [
        'Legacy system constraints',
        'Supply chain visibility',
        'Quality control automation',
        'Inventory optimization',
      ],
      solutions: [
        'Cloud-native ERP migration',
        'IoT sensor integration',
        'Predictive maintenance systems',
        'Real-time analytics dashboards',
      ],
    },
    {
      title: 'Logistics & Supply Chain',
      description: 'Optimize routing, tracking, and warehouse operations with intelligent automation.',
      challenges: [
        'Route optimization',
        'Real-time tracking',
        'Warehouse efficiency',
        'Last-mile delivery',
      ],
      solutions: [
        'Fleet management systems',
        'GPS tracking integration',
        'Automated warehouse systems',
        'Delivery optimization algorithms',
      ],
    },
    {
      title: 'Retail & eCommerce',
      description: 'Create seamless shopping experiences across all channels with unified commerce platforms.',
      challenges: [
        'Omnichannel integration',
        'Inventory synchronization',
        'Customer personalization',
        'Payment processing',
      ],
      solutions: [
        'Unified commerce platforms',
        'Real-time inventory systems',
        'AI-powered recommendations',
        'Secure payment gateways',
      ],
    },
    {
      title: 'Professional Services',
      description: 'Streamline operations with project management, client portals, and billing automation.',
      challenges: [
        'Project tracking',
        'Resource allocation',
        'Client communication',
        'Billing complexity',
      ],
      solutions: [
        'Project management platforms',
        'Client self-service portals',
        'Automated time tracking',
        'Flexible billing systems',
      ],
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl">
          <h1 className="text-navy mb-6">Industries We Serve</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We bring deep expertise across key industries, understanding your unique challenges and delivering solutions that drive measurable results.
          </p>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <div className="space-y-16">
          {industries.map((industry, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="text-navy mb-4">{industry.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {industry.description}
                </p>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
                >
                  View case studies
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="bg-gray-50 border border-gray-200 rounded-card p-8">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-navy mb-3">Common Challenges</h4>
                    <ul className="space-y-2">
                      {industry.challenges.map((challenge, challengeIndex) => (
                        <li key={challengeIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-navy mb-3">Our Solutions</h4>
                    <ul className="space-y-2">
                      {industry.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-5xl mx-auto text-center">
          <h2 className="text-navy mb-4">Industry-Specific Expertise</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our teams understand regulatory requirements, compliance standards, and best practices specific to your industry.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Compliance Ready', description: 'SOC 2, HIPAA, GDPR, and industry-specific regulations.' },
              { title: 'Domain Expertise', description: 'Teams with real-world experience in your sector.' },
              { title: 'Best Practices', description: 'Proven patterns and architectures that work.' },
            ].map((item, index) => (
              <div key={index}>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-navy mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-center text-white">
          <h2 className="mb-4">Let's discuss your industry challenges</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to explore how we can help transform your operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#book-demo"
              className="inline-block px-8 py-3.5 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-250"
            >
              Book a Demo
            </a>
            <Link
              to="/contact"
              className="inline-block px-8 py-3.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary transition-colors duration-250"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
