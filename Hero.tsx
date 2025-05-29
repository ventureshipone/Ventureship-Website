import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden md:pt-40 md:pb-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(189,147,249,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,121,198,0.2),transparent_40%)]"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 heading-1">
              <span className="gradient-text">Transforming</span> Industries Through Innovation
            </h1>
            <p className="mb-8 text-xl text-text-secondary">
              A global powerhouse with a $1.8 Trillion verified valuation, pioneering solutions across Digital Transformation, E-Commerce, Software, and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="btn btn-primary">
                Discover Our Story
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get in Touch
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12 sm:grid-cols-4">
              <div>
                <p className="text-3xl font-bold gradient-text">$1.8T</p>
                <p className="text-text-secondary">Verified Valuation</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">$107Q</p>
                <p className="text-text-secondary">Unofficial Valuation</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">25+</p>
                <p className="text-text-secondary">Industry Verticals</p>
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">Global</p>
                <p className="text-text-secondary">Presence</p>
              </div>
            </div>
          </motion.div>

          {/* 3D illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Futuristic cityscape with purple hues" 
                  className="relative z-10 object-cover w-full rounded-lg shadow-2xl aspect-square"
                />
                <div className="absolute inset-0 z-20 rounded-lg bg-gradient-to-tr from-background/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 z-30 p-6">
                  <h3 className="text-2xl font-bold text-white">Matthew Williams</h3>
                  <p className="text-text-primary">Founder & CEO</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
