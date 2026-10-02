import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, SlideIn, Stagger, StaggerItem } from '../components/animations/MotionComponents';
import { useIntersectionObserver } from '../hooks/useScroll';
import { useRef } from 'react';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const isHeroVisible = useIntersectionObserver(heroRef);
  const isServicesVisible = useIntersectionObserver(servicesRef);

  return (
    <div className="bg-white dark:bg-gray-900">
      <section ref={heroRef} className="section-padding container-padding max-w-7xl mx-auto pt-32 md:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.2}>
            <div>
              <h1 className="text-navy dark:text-gray-100 mb-6">
                Build. Integrate. Scale.
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Evox Technologies delivers reliable software solutions—faster launches, seamless integrations, measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="#book-demo"
                  className="inline-block text-center px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-250 shadow-card dark:shadow-soft-dark"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a Demo
                </motion.a>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/case-studies"
                    className="inline-block text-center px-8 py-3.5 border-2 border-primary text-primary dark:text-sky font-medium rounded-lg hover:bg-primary hover:text-white dark:hover:bg-sky dark:hover:text-white transition-colors duration-250"
                  >
                    See Case Studies
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeIn>
          
          <SlideIn direction="right" delay={0.4}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-sky/20 rounded-lg blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-white shadow-xl">
                <Stagger staggerDelay={0.1}>
                  <StaggerItem>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">99.95%</div>
                        <div className="text-white/80 text-sm">Uptime Guaranteed</div>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">4×</div>
                        <div className="text-white/80 text-sm">Faster Releases</div>
                      </div>
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">38%</div>
                        <div className="text-white/80 text-sm">Lower Ops Costs</div>
                      </div>
                    </div>
                  </StaggerItem>
                </Stagger>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* <section className="py-12 bg-gray-50 dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
        <div className="container-padding max-w-7xl mx-auto">
          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">TRUSTED BY LEADING ORGANIZATIONS</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i} 
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-32 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <section ref={servicesRef} className="section-padding container-padding max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-navy dark:text-gray-100 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From green-field builds to complex integrations, Evox turns ideas into secure, scalable software.
            </p>
          </div>
        </FadeIn>
        
        <Stagger staggerDelay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                ),
                title: 'Custom Software',
                description: 'Bespoke applications built to your exact requirements, architected for performance and growth.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                ),
                title: 'Web & Mobile',
                description: 'Responsive web apps and native mobile experiences that users love and teams can maintain.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                ),
                title: 'Cloud & DevOps',
                description: 'Modern infrastructure on AWS and Azure with CI/CD pipelines that deploy reliably at scale.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                ),
                title: 'Data & AI',
                description: 'Extract insights from your data with modern analytics, ML models, and intelligent automation.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                ),
                title: 'Systems Integration',
                description: 'Connect legacy and modern systems seamlessly with APIs, data pipelines, and event architectures.',
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                ),
                title: 'UI/UX Design',
                description: 'Intuitive interfaces backed by research, prototyping, and user testing for exceptional experiences.',
              },
            ].map((service, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-card p-8 hover:shadow-card-hover dark:hover:shadow-soft-dark transition-all duration-300 group"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-primary/10 dark:bg-sky/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 dark:group-hover:bg-accent/20 transition-colors duration-250">
                    <svg className="w-6 h-6 text-primary dark:text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-navy dark:text-gray-100 mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-padding max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-navy dark:text-gray-100 mb-4">Why Evox</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We partner long-term—owning outcomes, not just sprints.
              </p>
            </div>
          </FadeIn>
          
          <Stagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Delivery You Can Trust', description: 'Transparent milestones, weekly demos, production-ready increments from week one.' },
                { title: 'Secure by Design', description: 'Encryption at rest and in transit, role-based access, SOC 2 compliant practices.' },
                { title: 'Clear Communication', description: 'No jargon. Direct updates. You always know where things stand.' },
                { title: 'Scales with Your Business', description: 'Built to handle 10× growth without rewrites or technical debt.' },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="text-center"
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-16 h-16 bg-primary dark:bg-sky rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-navy dark:text-gray-100 mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <FadeIn>
          <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  Featured Case Study
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Manufacturing ERP Modernization
                </h3>
                <p className="text-white/90 mb-6">
                  Legacy system migration to cloud-native architecture with real-time inventory tracking and automated workflows.
                </p>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/case-studies/manufacturing-erp"
                    className="inline-flex items-center text-white font-medium hover:underline"
                  >
                    Read case study
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-4xl font-bold mb-1">38%</div>
                  <div className="text-white/80 text-sm">Lower Ops Costs</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-4xl font-bold mb-1">6 mo</div>
                  <div className="text-white/80 text-sm">Launch Time</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-4xl font-bold mb-1">99.95%</div>
                  <div className="text-white/80 text-sm">Uptime</div>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-padding max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-navy dark:text-gray-100 mb-4">Our Process</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                A proven methodology that delivers results
              </p>
            </div>
          </FadeIn>
          
          <Stagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Discover', description: 'Deep-dive workshops to understand your goals, constraints, and success metrics.' },
                { step: '02', title: 'Design', description: 'Architecture blueprints, UX prototypes, and technical specifications.' },
                { step: '03', title: 'Build', description: 'Agile sprints with weekly demos and continuous integration.' },
                { step: '04', title: 'Scale', description: 'Performance optimization, monitoring, and ongoing enhancement.' },
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="relative"
                    whileHover={{ y: -2 }}
                  >
                    <div className="text-6xl font-bold text-primary/10 dark:text-sky/10 mb-4">{item.step}</div>
                    <h4 className="text-xl font-semibold text-navy dark:text-gray-100 mb-2">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-primary/20 dark:bg-sky/20"></div>
                    )}
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      <section className="section-padding container-padding max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-navy dark:text-gray-100 mb-4">Tech Stack</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Modern, proven technologies that scale
            </p>
          </div>
        </FadeIn>
        
        <Stagger staggerDelay={0.05}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {[
              '.NET', 'Node.js', 'Python', 'React', 'Flutter', 'Azure', 'AWS', 'PostgreSQL',
              'MongoDB', 'Kafka', 'Docker', 'Kubernetes', 'TypeScript', 'GraphQL', 'Redis', 'Terraform'
            ].map((tech, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center hover:shadow-card-hover dark:hover:shadow-soft-dark transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </section>

      <section className="section-padding bg-navy dark:bg-gray-900 text-white">
        <div className="container-padding max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="mb-4">What Our Clients Say</h2>
            </div>
          </FadeIn>
          
          <Stagger staggerDelay={0.1}>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: 'Evox delivered our platform 6 weeks ahead of schedule. Their attention to detail and proactive communication made all the difference.',
                  author: 'Sarah Chen',
                  role: 'CTO, LogiTech Solutions',
                },
                {
                  quote: 'The integration project we thought would take a year was completed in 4 months. The system has been rock-solid since launch.',
                  author: 'Michael Torres',
                  role: 'VP Operations, Retail Dynamics',
                },
                {
                  quote: 'Finally, a partner that truly understands both the business and technical sides. Our conversion rate increased 40% after the redesign.',
                  author: 'Jennifer Park',
                  role: 'Head of Digital, ProServices Inc',
                },
              ].map((testimonial, index) => (
                <StaggerItem key={index}>
                  <motion.div 
                    className="bg-white/10 dark:bg-gray-800/20 rounded-lg p-6"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-sky dark:text-sky" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/90 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-white/70 dark:text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <FadeIn>
          <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-center text-white">
            <h2 className="mb-4">Let's build your next release.</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your project and see how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#book-demo"
                className="inline-block px-8 py-3.5 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-250"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Demo
              </motion.a>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3.5 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-primary transition-colors duration-250"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
