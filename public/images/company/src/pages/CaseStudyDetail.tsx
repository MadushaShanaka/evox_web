import { useParams, Link } from 'react-router-dom';

export default function CaseStudyDetail() {
  const { slug } = useParams();

  const caseStudies: Record<string, any> = {
    'manufacturing-erp': {
      title: 'Manufacturing ERP Modernization',
      industry: 'Manufacturing',
      client: 'Mid-size manufacturing company with 500+ employees',
      duration: '6 months',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200',
      challenge: {
        title: 'The Challenge',
        description: 'A growing manufacturing company was struggling with a 20-year-old ERP system that created operational bottlenecks, data silos, and limited visibility into production processes. Manual data entry led to frequent errors, and the lack of real-time information prevented informed decision-making.',
        points: [
          'Legacy system unable to scale with business growth',
          'Data silos preventing cross-departmental collaboration',
          'Manual processes causing delays and errors',
          'No real-time visibility into inventory or production',
          'High maintenance costs for outdated infrastructure',
        ],
      },
      solution: {
        title: 'The Solution',
        description: 'We designed and implemented a cloud-native ERP system with microservices architecture, providing real-time data synchronization, automated workflows, and intuitive dashboards. The solution integrated with existing manufacturing equipment through IoT sensors.',
        points: [
          'Cloud-native architecture on Azure for scalability',
          'Microservices design for flexibility and maintainability',
          'Real-time inventory tracking with IoT integration',
          'Automated workflow engine for common processes',
          'Mobile-responsive dashboards for on-floor access',
          'Integration with existing equipment and sensors',
        ],
      },
      results: [
        { metric: '38%', label: 'Reduction in operational costs', description: 'Automated workflows and reduced manual data entry' },
        { metric: '6 months', label: 'Total implementation time', description: 'From discovery to production launch' },
        { metric: '99.95%', label: 'System uptime', description: 'Reliable, always-available access to critical data' },
        { metric: '4×', label: 'Faster reporting', description: 'Real-time dashboards vs. end-of-day reports' },
        { metric: '85%', label: 'Reduction in data errors', description: 'Automated data validation and integration' },
        { metric: '100%', label: 'User adoption', description: 'Intuitive interface and comprehensive training' },
      ],
      testimonial: {
        quote: 'Evox Technologies transformed how we operate. The new system not only solved our immediate problems but positioned us for future growth. Their team understood our business and delivered exactly what we needed.',
        author: 'James Miller',
        role: 'COO, Manufacturing Client',
      },
      technologies: ['.NET Core', 'React', 'Azure', 'PostgreSQL', 'Docker', 'Kubernetes', 'IoT Hub', 'SignalR'],
    },
  };

  const study = caseStudies[slug || ''] || caseStudies['manufacturing-erp'];

  return (
    <div className="bg-white">
      <section className="container-padding max-w-7xl mx-auto pt-32">
        <Link
          to="/case-studies"
          className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Case Studies
        </Link>
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
          {study.industry}
        </div>
        <h1 className="text-navy mb-6">{study.title}</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div>
            <div className="text-sm text-gray-500 mb-1">Client</div>
            <div className="text-gray-900 font-medium">{study.client}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Duration</div>
            <div className="text-gray-900 font-medium">{study.duration}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Industry</div>
            <div className="text-gray-900 font-medium">{study.industry}</div>
          </div>
        </div>
      </section>

      <section className="container-padding max-w-7xl mx-auto mb-16">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-navy mb-4">{study.challenge.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{study.challenge.description}</p>
          <ul className="space-y-2">
            {study.challenge.points.map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-navy mb-4">{study.solution.title}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{study.solution.description}</p>
          <ul className="space-y-2">
            {study.solution.points.map((point: string, index: number) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-6xl mx-auto">
          <h2 className="text-navy mb-12 text-center">The Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {study.results.map((result: any, index: number) => (
              <div key={index} className="bg-white border border-gray-200 rounded-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="text-lg font-semibold text-navy mb-2">{result.label}</div>
                <div className="text-sm text-gray-600">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="bg-navy rounded-lg p-12 text-white text-center">
          <svg className="w-12 h-12 text-sky mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-xl italic mb-6">{study.testimonial.quote}</p>
          <div className="font-semibold">{study.testimonial.author}</div>
          <div className="text-white/70">{study.testimonial.role}</div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-navy mb-6 text-center">Technologies Used</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {study.technologies.map((tech: string, index: number) => (
            <div
              key={index}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-center text-white">
          <h2 className="mb-4">Start your transformation</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results.
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
