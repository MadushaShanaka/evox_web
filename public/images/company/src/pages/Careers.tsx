export default function Careers() {
  const benefits = [
    {
      title: 'Competitive Compensation',
      description: 'Top-of-market salaries with equity options and annual performance bonuses.',
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision coverage plus mental health support.',
    },
    {
      title: 'Flexible Work',
      description: 'Hybrid or remote options with flexible hours to support work-life balance.',
    },
    {
      title: 'Learning Budget',
      description: '$2,000 annual learning budget for courses, conferences, and certifications.',
    },
    {
      title: 'Latest Equipment',
      description: 'Choose your setup—MacBook Pro, monitors, ergonomic furniture.',
    },
    {
      title: 'Unlimited PTO',
      description: 'Take the time you need to recharge, with a minimum 3-week encouragement.',
    },
  ];

  const roles = [
    {
      title: 'Senior Software Engineer',
      type: 'Full-time',
      location: 'Remote / Hybrid',
      description: 'Build scalable applications using modern web technologies. Work with React, Node.js, and cloud platforms.',
      requirements: [
        '5+ years of full-stack development experience',
        'Strong proficiency in TypeScript/JavaScript',
        'Experience with cloud platforms (AWS/Azure)',
        'Track record of delivering production applications',
      ],
    },
    {
      title: 'QA Engineer',
      type: 'Full-time',
      location: 'Remote / Hybrid',
      description: 'Ensure quality through automated testing and comprehensive test strategies.',
      requirements: [
        '3+ years of QA/testing experience',
        'Experience with test automation frameworks',
        'Strong understanding of CI/CD pipelines',
        'Excellent attention to detail',
      ],
    },
    {
      title: 'Project Coordinator',
      type: 'Full-time',
      location: 'Hybrid',
      description: 'Keep projects on track by coordinating between teams, clients, and stakeholders.',
      requirements: [
        '2+ years in project coordination or management',
        'Experience with Agile methodologies',
        'Excellent communication and organization skills',
        'Familiarity with project management tools',
      ],
    },
  ];

  return (
    <div className="bg-white">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl">
          <h1 className="text-navy mb-6">Careers at Evox</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Join a team that values technical excellence, clear communication, and delivering results. We're building software that matters and looking for talented people to join us.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-navy mb-4">Why Work at Evox</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We invest in our team's growth and wellbeing
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-card p-6 hover:shadow-card-hover transition-shadow duration-250"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-navy mb-4">Open Positions</h2>
          <p className="text-xl text-gray-600">
            Find your next opportunity
          </p>
        </div>
        <div className="space-y-6 max-w-4xl mx-auto">
          {roles.map((role, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-card p-8 hover:shadow-card-hover transition-shadow duration-250"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-navy mb-2">{role.title}</h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {role.type}
                    </span>
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {role.location}
                    </span>
                  </div>
                </div>
                <a
                  href="#apply"
                  className="mt-4 md:mt-0 inline-block px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-250"
                >
                  Apply Now
                </a>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{role.description}</p>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                <ul className="space-y-2">
                  {role.requirements.map((requirement, reqIndex) => (
                    <li key={reqIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container-padding max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Culture</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We foster a collaborative environment where everyone's voice matters
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Continuous Learning',
                description: 'Regular tech talks, workshops, and learning sessions to grow your skills.',
              },
              {
                title: 'Work-Life Balance',
                description: 'Flexible hours and unlimited PTO to maintain a healthy balance.',
              },
              {
                title: 'Collaborative Teams',
                description: 'Work with experienced engineers in a supportive, inclusive environment.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto" id="apply">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
          <h2 className="text-navy mb-4 text-center">Apply Now</h2>
          <p className="text-center text-gray-600 mb-8">
            Don't see the perfect role? Send us your resume anyway—we're always looking for talented people.
          </p>
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                id="position"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select a position</option>
                {roles.map((role, index) => (
                  <option key={index} value={role.title}>{role.title}</option>
                ))}
                <option value="other">Other / General Application</option>
              </select>
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume / CV
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us why you'd be a great fit..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-250"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
