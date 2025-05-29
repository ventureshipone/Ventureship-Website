import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiBook, FiTarget, FiAward, FiLayers, FiCode, FiTrendingUp } from 'react-icons/fi'

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 heading-1">Our <span className="gradient-text">Story</span></h1>
              <p className="text-xl text-text-secondary">
                Ventureship has transformed from a humble startup into a thriving 9-figure business, with a hundred quadrillion dollar valuation, driven by innovation, partnership, and global reach.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consulting Section */}
      <section className="py-20 bg-background-light">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 heading-2">Consulting for <span className="gradient-text">Multibillion-Dollar Brands</span></h2>
              <p className="mb-6 text-lg text-text-secondary">
                Ventureship's expertise has been sought after by some of the world's largest and most successful companies. Our team has provided strategic consulting, technology solutions, and innovative thinking to help transform the operations and customer experiences of multibillion-dollar brands across diverse industries.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Work With Us
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg bg-primary"></div>
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Consulting for Multibillion-Dollar Brands" 
                  className="relative z-10 object-cover w-full rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <h2 className="mb-6 heading-2">Driving <span className="gradient-text">Perpetual Growth</span> and Prosperity</h2>
              <p className="mb-6 text-lg text-text-secondary">
                Ventureship's proven track record of success has put the company on a path to perpetual growth and prosperity. Through strategic partnerships, innovative technologies, and a relentless focus on customer satisfaction, Ventureship has established itself as an industry leader poised for continued expansion and profitability.
              </p>
              <p className="text-lg text-text-secondary">
                The company's ability to adapt and capitalize on emerging market opportunities has been a key driver of its sustained growth. By constantly reinventing its offerings and exploring new avenues for growth, Ventureship has maintained a competitive edge and secured its position as a go-to partner for businesses seeking transformative solutions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg bg-secondary"></div>
                <img 
                  src="https://images.pexels.com/photos/7821702/pexels-photo-7821702.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Driving Perpetual Growth and Prosperity" 
                  className="relative z-10 object-cover w-full rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Discoveries Section */}
      <section className="py-20 bg-background-light">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 heading-2">Groundbreaking <span className="gradient-text">Discoveries</span> and Innovations</h2>
              <p className="text-lg text-text-secondary">
                Ventureship's team of renowned scientists and researchers have made groundbreaking discoveries that have pushed the boundaries of human knowledge. Through rigorous experimentation and tireless innovation, they have uncovered insights that are transforming entire industries.
              </p>
              <p className="mt-4 text-lg text-text-secondary">
                These discoveries have resulted in game-changing patents and innovations that are improving lives around the world. Ventureship's innovative spirit has enabled them to consistently stay at the forefront of their fields, making them a trusted partner for organizations seeking to drive meaningful progress.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 text-center card"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-background">
                <FiTarget className="w-8 h-8 text-accent-green" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Innovative Patents</h3>
              <p className="text-text-secondary">
                Our team of brilliant inventors and engineers have developed groundbreaking patents that protect our cutting-edge technologies and innovations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 text-center card"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-background">
                <FiBook className="w-8 h-8 text-accent-cyan" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Copyrighted Works</h3>
              <p className="text-text-secondary">
                From best-selling books to valuable software applications, our extensive intellectual property portfolio includes numerous copyrighted works that showcase our thought leadership.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 text-center card"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-background">
                <FiAward className="w-8 h-8 text-accent-yellow" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Renowned Trademarks</h3>
              <p className="text-text-secondary">
                Our globally recognized brands and trademarks are a testament to the quality and impact of our products and services worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 heading-2">Authoring <span className="gradient-text">Influential Books</span> and Resources</h2>
              <ul className="mb-8 space-y-6">
                <li className="flex">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-primary">
                    <span className="text-background">1</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Groundbreaking Books</h3>
                    <p className="text-text-secondary">
                      Authored groundbreaking books on disruptive innovation, sharing Ventureship's pioneering insights with global audiences.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-primary">
                    <span className="text-background">2</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Comprehensive Resources</h3>
                    <p className="text-text-secondary">
                      Developed comprehensive resource guides on emerging technologies, empowering businesses to stay ahead of the curve.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-primary">
                    <span className="text-background">3</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Influential Whitepapers</h3>
                    <p className="text-text-secondary">
                      Published influential whitepapers exploring the future of various industries, informing decision-makers worldwide.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg bg-primary"></div>
                <img 
                  src="https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Authoring Influential Books and Resources" 
                  className="relative z-10 object-cover w-full rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-background-light">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 heading-2">Building <span className="gradient-text">Successful Companies</span> and Disrupting Industries</h2>
              <p className="text-lg text-text-secondary">
                Through visionary leadership and strategic execution, Ventureship has built and scaled numerous successful companies across diverse industries.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 card"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-background">
                <FiLayers className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Serial Entrepreneur</h3>
              <p className="text-text-secondary">
                Ventureship has founded and grown multiple thriving companies across diverse industries, disrupting the status quo with innovative products and services.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 card"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-background">
                <FiTrendingUp className="w-6 h-6 text-accent-green" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Incubating Startups</h3>
              <p className="text-text-secondary">
                Through a network of accelerators and venture funds, Ventureship helps nurture the next generation of industry-transforming businesses.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 card"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-background">
                <FiCode className="w-6 h-6 text-accent-cyan" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Fostering Innovation</h3>
              <p className="text-text-secondary">
                By investing in cutting-edge research and development, Ventureship has pioneered groundbreaking technologies that have catalyzed new markets and business models.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/companies" className="btn btn-primary">
              Explore Our Companies
            </Link>
          </div>
        </div>
      </section>

      {/* Software Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <h2 className="mb-6 heading-2">Developing <span className="gradient-text">Cutting-Edge Software</span> to Change the World</h2>
              <ul className="mb-8 space-y-6">
                <li className="flex">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-secondary">
                    <span className="text-background">1</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Innovative Software Solutions</h3>
                    <p className="text-text-secondary">
                      Ventureship's software engineering teams push the boundaries of what's possible, developing groundbreaking applications and tools that transform industries and improve lives.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-secondary">
                    <span className="text-background">2</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Cutting-Edge Architecture</h3>
                    <p className="text-text-secondary">
                      Our software leverages the latest advancements in areas like AI, cloud computing, and data analytics to deliver unparalleled functionality and performance.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-4 rounded-full bg-secondary">
                    <span className="text-background">3</span>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Rigorous Testing and Deployment</h3>
                    <p className="text-text-secondary">
                      Every Ventureship software product goes through meticulous testing and validation to ensure the highest levels of quality, reliability, and security.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg bg-secondary"></div>
                <img 
                  src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Developing Cutting-Edge Software" 
                  className="relative z-10 object-cover w-full rounded-lg shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-12 text-center rounded-2xl bg-gradient-to-r from-background to-surface"
          >
            <h2 className="mb-6 heading-2">Ready to <span className="gradient-text">Partner</span> with Ventureship?</h2>
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
