import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: 'Custom Software Development',
      description: 'Bespoke applications tailored to your unique business processes and requirements.',
      features: [
        'Enterprise applications',
        'Business process automation',
        'Legacy system modernization',
        'Microservices architecture',
      ],
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      ),
    },
    {
      title: 'Web & Mobile Applications',
      description: 'Responsive web applications and native mobile experiences that users love.',
      features: [
        'Progressive web apps',
        'iOS & Android native apps',
        'Cross-platform development',
        'Responsive design',
      ],
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      ),
    },
    {
      title: 'Cloud & DevOps',
      description: 'Modern infrastructure and deployment pipelines for reliable, scalable operations.',
      features: [
        'AWS & Azure infrastructure',
        'CI/CD pipeline automation',
        'Container orchestration',
        'Infrastructure as code',
      ],
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      ),
    },
    {
      title: 'Data & AI Solutions',
      description: 'Unlock insights from your data with analytics, machine learning, and automation.',
      features: [
        'Data warehousing & ETL',
        'Business intelligence dashboards',
        'Machine learning models',
        'Predictive analytics',
      ],
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      ),
    },
    {
      title: 'Systems Integration',
      description: 'Seamlessly connect legacy and modern systems with robust integration solutions.',
      features: [
        'API development & integration',
        'Event-driven architectures',
        'Real-time data synchronization',
        'Third-party integrations',
      ],
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      ),
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design that creates intuitive, accessible, and delightful experiences.',
      features: [
        'User research & testing',
        'Interactive prototypes',
        'Design systems',
        'Accessibility compliance',
      ],
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      ),
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl">
          <h1 className="text-navy mb-6">Services</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            From green-field builds to complex integrations, Evox Technologies turns ideas into secure, scalable software. We partner long-term—owning outcomes, not just sprints.
          </p>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-card p-8 hover:shadow-card-hover transition-shadow duration-250"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {service.icon}
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-navy mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-navy mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600">
              Transparent milestones, weekly demos, production-ready increments from week one.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Agile Methodology',
                description: 'Iterative development with continuous feedback and adaptation.',
              },
              {
                title: 'Quality First',
                description: 'Comprehensive testing and code review processes ensure reliability.',
              },
              {
                title: 'Long-term Partnership',
                description: 'We support your software throughout its lifecycle.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
          <h2 className="mb-4">Ready to start your project?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Talk to an expert about your requirements and get a custom proposal.
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
              Get a Proposal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
