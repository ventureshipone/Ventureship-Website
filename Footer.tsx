import { Link } from 'react-router-dom'
import { FiLinkedin, FiTwitter, FiInstagram, FiGithub } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 mt-20 bg-background-dark">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 overflow-hidden rounded-lg bg-primary">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L20 5L30 10V30L20 35L10 30V10Z" stroke="#282A36" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M20 5V35" stroke="#282A36" strokeWidth="2"/>
                  <path d="M10 10L30 10" stroke="#282A36" strokeWidth="2"/>
                  <path d="M10 30L30 30" stroke="#282A36" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-2xl font-bold font-display">Ventureship</span>
            </Link>
            <p className="mb-4 text-text-secondary">
              Ventureship is a global innovation and investment company with a $1.8 Trillion verified valuation, specializing in Digital Transformation, Digital Marketing, E-Commerce, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-primary" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary" aria-label="Twitter">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary hover:text-primary">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-text-secondary hover:text-primary">About</Link>
              </li>
              <li>
                <Link to="/companies" className="text-text-secondary hover:text-primary">Companies</Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-primary">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-text-secondary">
                <a href="mailto:zentaraxyz@gmail.com" className="hover:text-primary">
                  zentaraxyz@gmail.com
                </a>
              </li>
              <li className="text-text-secondary">
                Global Headquarters
              </li>
              <li className="text-text-secondary">
                United States
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-surface">
          <p className="text-text-secondary">
            &copy; {currentYear} Ventureship. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
