import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      title: 'Delivery You Can Trust',
      description: 'We own outcomes, not just tasks. Transparent milestones and production-ready increments from week one.',
    },
    {
      title: 'Technical Excellence',
      description: 'Modern architecture, comprehensive testing, and maintainable code that scales with your business.',
    },
    {
      title: 'Clear Communication',
      description: 'No jargon. Direct updates. You always know where things stand and what comes next.',
    },
  ];

  const leadership = [
    {
      name: 'Michael Chen',
      role: 'CEO & Co-Founder',
      bio: '15+ years in enterprise software. Previously led engineering at two successful SaaS startups.',
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Cloud architecture expert with experience scaling systems to millions of users.',
    },
    {
      name: 'David Park',
      role: 'VP of Engineering',
      bio: 'Former tech lead at Fortune 500 company. Passionate about team growth and code quality.',
    },
  ];

  const timeline = [
    { year: '2018', event: 'Founded with a mission to deliver software that ships on time' },
    { year: '2019', event: 'First major enterprise client, team grows to 15' },
    { year: '2021', event: 'Launched dedicated Data & AI practice' },
    { year: '2023', event: '50+ projects delivered, expanded to cloud-native expertise' },
    { year: '2024', event: 'Opened second office, team reaches 75+ professionals' },
  ];

  return (
    <div className="bg-white">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl">
          <h1 className="text-navy mb-6">About Evox Technologies</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We build software that ships. Results that stick. Since 2018, we've partnered with organizations to deliver reliable, scalable solutions that drive measurable outcomes.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-navy mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To transform how businesses operate through reliable software solutions. We believe technology should accelerate growth, not create obstacles.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From green-field builds to complex integrations, we turn ideas into secure, scalable software. We partner long-term—owning outcomes, not just sprints.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Projects Delivered</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">75+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">99.5%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">6</div>
                <div className="text-gray-600">Years in Business</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-navy mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Principles that guide how we work and build relationships
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Leadership Team</h2>
            <p className="text-xl text-white/90">
              Experienced leaders committed to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white/10 rounded-card p-8 text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                <div className="text-sky mb-4">{leader.role}</div>
                <p className="text-white/80">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-navy mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600">
            Building solutions and partnerships since 2018
          </p>
        </div>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-24">
                <div className="text-2xl font-bold text-primary">{item.year}</div>
              </div>
              <div className="flex-1 pb-8 border-b border-gray-200 last:border-0">
                <p className="text-lg text-gray-700">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-5xl mx-auto text-center">
          <h2 className="text-navy mb-4">Why Choose Evox</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            We combine technical expertise with business acumen to deliver solutions that matter
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Proven Track Record', description: '50+ successful projects across industries' },
              { title: 'Expert Team', description: 'Senior engineers with 10+ years experience' },
              { title: 'Modern Stack', description: 'Latest technologies and best practices' },
              { title: 'Long-term Partnership', description: 'Support beyond initial launch' },
            ].map((item, index) => (
              <div key={index}>
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-navy mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-center text-white">
          <h2 className="mb-4">Join us on this journey</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're looking to build your next product or join our team, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/careers"
              className="inline-block px-8 py-3.5 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-250"
            >
              View Open Roles
            </Link>
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
