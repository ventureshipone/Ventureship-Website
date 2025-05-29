import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { FiArrowRight, FiGlobe, FiCode, FiTrendingUp, FiLayers, FiZap, FiDatabase, 
  FiDollarSign, FiUsers, FiExternalLink, FiHeart, FiBattery, FiShoppingBag, FiAward, 
  FiHome, FiUserPlus, FiTruck, FiCreditCard, FiShoppingCart, FiPenTool, FiStar, 
  FiSun, FiBookOpen, FiBriefcase, FiBarChart2 } from 'react-icons/fi'
import { IoGameController } from 'react-icons/io5'

export default function HomePage() {
  const solutions = [
    {
      icon: <FiGlobe className="w-6 h-6 text-accent-cyan" />,
      title: 'Digital Transformation',
      description: 'Revolutionize your business with cutting-edge digital solutions that drive growth and efficiency.'
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-accent-green" />,
      title: 'Digital Marketing',
      description: 'Reach your target audience with precision and convert prospects into loyal customers.'
    },
    {
      icon: <FiLayers className="w-6 h-6 text-accent-orange" />,
      title: 'E-Commerce',
      description: 'Build and scale your online store with our comprehensive e-commerce solutions.'
    },
    {
      icon: <FiCode className="w-6 h-6 text-accent-purple" />,
      title: 'Software as a Service',
      description: 'Develop and deploy scalable SaaS applications that solve real-world problems.'
    },
    {
      icon: <FiZap className="w-6 h-6 text-accent-yellow" />,
      title: 'Intelligence & Security',
      description: 'Protect your assets and gain valuable insights with our advanced intelligence solutions.'
    },
    {
      icon: <FiDatabase className="w-6 h-6 text-accent-red" />,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights that drive strategic decision-making.'
    },
    {
      icon: <IoGameController className="w-6 h-6 text-accent-purple" />,
      title: 'Games & Entertainment',
      description: 'Create immersive gaming experiences and entertainment solutions that captivate audiences worldwide.'
    },
    {
      icon: <FiDollarSign className="w-6 h-6 text-accent-green" />,
      title: 'Sales',
      description: 'Optimize your sales processes and increase revenue with our innovative sales solutions.'
    },
    {
      icon: <FiUsers className="w-6 h-6 text-accent-cyan" />,
      title: 'Communities & Networks',
      description: 'Build and nurture thriving communities and networks that foster engagement and collaboration.'
    },
    {
      icon: <FiExternalLink className="w-6 h-6 text-accent-orange" />,
      title: 'Outsourcing',
      description: 'Streamline operations and reduce costs with our strategic outsourcing solutions.'
    },
    {
      icon: <FiTrendingUp className="w-6 h-6 text-accent-yellow" />,
      title: 'Wealth',
      description: 'Maximize wealth creation and preservation with our comprehensive financial strategies.'
    },
    {
      icon: <FiHeart className="w-6 h-6 text-accent-red" />,
      title: 'Health',
      description: 'Transform healthcare delivery with innovative solutions that improve patient outcomes.'
    },
    {
      icon: <FiBattery className="w-6 h-6 text-accent-green" />,
      title: 'Energy',
      description: 'Pioneer sustainable energy solutions that power the future while preserving our planet.'
    },
    {
      icon: <FiShoppingBag className="w-6 h-6 text-accent-purple" />,
      title: 'Retail',
      description: 'Revolutionize the retail experience with omnichannel solutions that delight customers.'
    },
    {
      icon: <FiAward className="w-6 h-6 text-accent-cyan" />,
      title: 'Sports & Entertainment',
      description: 'Create unforgettable experiences in sports and entertainment that engage and inspire audiences.'
    },
    {
      icon: <FiHome className="w-6 h-6 text-accent-orange" />,
      title: 'Architecture & Real Estate',
      description: 'Design innovative spaces and develop premium properties that transform skylines and create lasting value through sustainable, cutting-edge developments.'
    },
    {
      icon: <FiUserPlus className="w-6 h-6 text-accent-yellow" />,
      title: 'Recruiting',
      description: 'Attract and retain top talent with our advanced recruiting and talent management solutions.'
    },
    {
      icon: <FiTruck className="w-6 h-6 text-accent-red" />,
      title: 'Transportation',
      description: 'Transform mobility with innovative transportation solutions that enhance efficiency and sustainability.'
    },
    {
      icon: <FiCreditCard className="w-6 h-6 text-accent-green" />,
      title: 'Finance',
      description: 'Optimize financial operations and strategy with our cutting-edge financial solutions.'
    },
    {
      icon: <FiShoppingCart className="w-6 h-6 text-accent-purple" />,
      title: 'Fashion',
      description: 'Revolutionize the fashion industry with innovative solutions that blend style and technology.'
    },
    {
      icon: <FiPenTool className="w-6 h-6 text-accent-cyan" />,
      title: 'Art',
      description: 'Transform artistic expression and experiences with our innovative art solutions and platforms.'
    },
    {
      icon: <FiStar className="w-6 h-6 text-accent-orange" />,
      title: 'Space Colonization',
      description: 'Pioneer the future of humanity with groundbreaking space colonization technologies and solutions.'
    },
    {
      icon: <FiSun className="w-6 h-6 text-accent-yellow" />,
      title: 'Agriculture',
      description: 'Revolutionize farming with sustainable agricultural solutions that increase yield and reduce environmental impact.'
    },
    {
      icon: <FiBookOpen className="w-6 h-6 text-accent-red" />,
      title: 'Coaching',
      description: 'Transform potential into performance with our comprehensive coaching solutions and methodologies.'
    },
    {
      icon: <FiBriefcase className="w-6 h-6 text-accent-green" />,
      title: 'Consulting',
      description: 'Solve complex business challenges with our expert consulting services and strategic insights.'
    },
    {
      icon: <FiBarChart2 className="w-6 h-6 text-accent-purple" />,
      title: 'Venture Capital',
      description: 'Fuel innovation and growth with strategic investments in promising startups and emerging technologies.'
    }
  ]

  return (
    <>
      <Hero />
      
      {/* Solutions Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 heading-2">Our <span className="gradient-text">Solutions</span></h2>
              <p className="text-xl text-text-secondary">
                We specialize in a wide range of verticals, delivering exceptional results through innovation and expertise.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-6 transition-all duration-300 card hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-surface">
                  {solution.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{solution.title}</h3>
                <p className="mb-4 text-text-secondary">{solution.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/about" className="inline-flex items-center text-primary hover:text-primary-light">
              View all our solutions <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Founder Section */}
      <section className="py-20 bg-background-light">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <h2 className="mb-6 heading-2">Meet Our <span className="gradient-text">Founder</span></h2>
              <p className="mb-6 text-xl text-text-secondary">
                Matthew Williams, the visionary behind Ventureship, is a renowned entrepreneur with a track record of success.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 rounded-full bg-primary text-background">✓</span>
                  <span>🚀 9 Figure Entrepreneur</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 rounded-full bg-primary text-background">✓</span>
                  <span>16X Company Founder</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 rounded-full bg-primary text-background">✓</span>
                  <span>Alpha Web Summit Invitee</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 rounded-full bg-primary text-background">✓</span>
                  <span>Collision Invitee</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 rounded-full bg-primary text-background">✓</span>
                  <span>NC Idea Alum</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 rounded-full bg-primary text-background">✓</span>
                  <span>Innovate Carolina</span>
                </li>
              </ul>
              <Link to="/about" className="btn btn-primary">
                Learn More About Our Story
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg bg-primary"></div>
                <img 
                  src="https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Futuristic purple quantum abstract visualization representing advanced technology and innovation" 
                  className="relative z-10 object-cover w-full rounded-lg shadow-xl aspect-square"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-12 text-center rounded-2xl bg-gradient-to-r from-background-light to-surface"
          >
            <h2 className="mb-6 heading-2">Ready to <span className="gradient-text">Transform</span> Your Business?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-text-secondary">
              Join the ranks of industry leaders who have partnered with Ventureship to achieve unprecedented growth and success.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Get in Touch Today
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
