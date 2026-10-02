import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const caseStudies = [
    {
      slug: 'manufacturing-erp',
      title: 'Manufacturing ERP Modernization',
      industry: 'Manufacturing',
      challenge: 'Legacy ERP system causing operational bottlenecks and data silos',
      solution: 'Cloud-native ERP with real-time inventory tracking and automated workflows',
      results: [
        { metric: '38%', label: 'Lower Ops Costs' },
        { metric: '6 mo', label: 'Launch Time' },
        { metric: '99.95%', label: 'Uptime' },
      ],
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      slug: 'logistics-platform',
      title: 'Logistics Route Optimization',
      industry: 'Logistics',
      challenge: 'Inefficient routing leading to delays and high fuel costs',
      solution: 'AI-powered route optimization with real-time GPS tracking',
      results: [
        { metric: '32%', label: 'Fuel Savings' },
        { metric: '4×', label: 'Faster Deliveries' },
        { metric: '95%', label: 'On-Time Rate' },
      ],
      image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      slug: 'retail-commerce',
      title: 'Unified Commerce Platform',
      industry: 'Retail & eCommerce',
      challenge: 'Disconnected systems causing inventory discrepancies and poor customer experience',
      solution: 'Omnichannel platform with unified inventory and customer data',
      results: [
        { metric: '40%', label: 'Higher Conversion' },
        { metric: '99.9%', label: 'Inventory Accuracy' },
        { metric: '2.5×', label: 'Revenue Growth' },
      ],
      image: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl">
          <h1 className="text-navy mb-6">Case Studies</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Real results from real projects. See how we've helped organizations transform their operations with custom software solutions.
          </p>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {study.industry}
                </div>
                <h2 className="text-navy mb-4">{study.title}</h2>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Challenge</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Solution</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{result.metric}</div>
                      <div className="text-sm text-gray-600">{result.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
                >
                  Read full case study
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-5xl mx-auto text-center">
          <h2 className="text-navy mb-4">Proven Results Across Industries</h2>
          <p className="text-xl text-gray-600 mb-12">
            Our approach consistently delivers measurable outcomes
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '99.5%', label: 'Client Satisfaction' },
              { number: '38%', label: 'Avg. Cost Savings' },
              { number: '4×', label: 'Faster Time to Market' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-center text-white">
          <h2 className="mb-4">Ready to write your success story?</h2>
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
