import { Link } from 'react-router-dom';

export default function Insights() {
  const posts = [
    {
      slug: 'custom-software-roi',
      title: 'The ROI of Custom Software: When Off-the-Shelf Isn\'t Enough',
      excerpt: 'Discover when it makes sense to invest in custom software development and how to measure the return on your investment.',
      category: 'Business Strategy',
      date: 'Oct 15, 2024',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      slug: 'systems-integration-patterns',
      title: 'Modern Integration Patterns: Connecting Legacy and Cloud Systems',
      excerpt: 'Explore proven patterns for integrating legacy systems with modern cloud architectures without disrupting operations.',
      category: 'Technical',
      date: 'Oct 8, 2024',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      slug: 'ai-enablement-practical',
      title: 'AI Enablement: A Practical Guide for Business Leaders',
      excerpt: 'Cut through the hype and learn how to practically apply AI and machine learning to real business problems.',
      category: 'AI & Data',
      date: 'Sep 29, 2024',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      slug: 'microservices-monolith',
      title: 'Microservices vs Monolith: Choosing the Right Architecture',
      excerpt: 'A balanced look at when microservices make sense and when a well-designed monolith might be the better choice.',
      category: 'Architecture',
      date: 'Sep 22, 2024',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      slug: 'cloud-migration-checklist',
      title: 'Cloud Migration Checklist: Avoiding Common Pitfalls',
      excerpt: 'A comprehensive guide to planning and executing a successful cloud migration without downtime or data loss.',
      category: 'Cloud & DevOps',
      date: 'Sep 15, 2024',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  const categories = [
    'All',
    'Business Strategy',
    'Technical',
    'AI & Data',
    'Architecture',
    'Cloud & DevOps',
  ];

  return (
    <div className="bg-white">
      <section className="section-padding container-padding max-w-7xl mx-auto pt-32">
        <div className="max-w-3xl">
          <h1 className="text-navy mb-6">Insights & Articles</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Practical advice on custom software, integrations, and technology strategy from our team.
          </p>
        </div>
      </section>

      <section className="container-padding max-w-7xl mx-auto pb-16">
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                index === 0
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white border border-gray-200 rounded-card overflow-hidden hover:shadow-card-hover transition-shadow duration-250 group"
            >
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <Link
                    to={`/insights/${post.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:text-primary-hover transition-colors"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h2 className="text-navy mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest insights and articles delivered to your inbox monthly
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-250"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="section-padding container-padding max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-sky rounded-lg p-12 text-center text-white">
          <h2 className="mb-4">Have a question or topic suggestion?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for new topics to explore. Let us know what you'd like to learn about.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3.5 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-250"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
