import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 mr-2 overflow-hidden rounded-md bg-primary">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L20 5L30 10V30L20 35L10 30V10Z" stroke="#282A36" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M20 5V35" stroke="#282A36" strokeWidth="2"/>
                  <path d="M10 10L30 10" stroke="#282A36" strokeWidth="2"/>
                  <path d="M10 30L30 30" stroke="#282A36" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-lg font-bold font-display">Ventureship</span>
            </Link>
            
            <nav className="hidden md:flex md:items-center md:space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 border-b-2 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent hover:border-primary/50 hover:text-primary/90'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-2 border-b-2 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent hover:border-primary/50 hover:text-primary/90'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/companies"
                className={({ isActive }) =>
                  `py-2 border-b-2 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent hover:border-primary/50 hover:text-primary/90'
                  }`
                }
              >
                Companies
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-2 border-b-2 ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent hover:border-primary/50 hover:text-primary/90'
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>
            
            <div className="hidden md:flex md:items-center md:space-x-4">
              {user ? (
                <Link to="/admin" className="btn btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md md:hidden hover:bg-surface"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-surface border-b border-surface"
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md ${
                      isActive ? 'bg-primary text-background' : 'hover:bg-surface-hover'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md ${
                      isActive ? 'bg-primary text-background' : 'hover:bg-surface-hover'
                    }`
                  }
                >
                  About
                </NavLink>
                <NavLink
                  to="/companies"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md ${
                      isActive ? 'bg-primary text-background' : 'hover:bg-surface-hover'
                    }`
                  }
                >
                  Companies
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md ${
                      isActive ? 'bg-primary text-background' : 'hover:bg-surface-hover'
                    }`
                  }
                >
                  Contact
                </NavLink>
                
                <div className="pt-4 mt-4 border-t border-surface">
                  {user ? (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="block w-full py-2 text-center btn btn-primary"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="block w-full py-2 text-center btn btn-outline"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        onClick={closeMenu}
                        className="block w-full py-2 text-center btn btn-primary"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="py-12 bg-surface">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 mr-2 overflow-hidden rounded-md bg-primary">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10L20 5L30 10V30L20 35L10 30V10Z" stroke="#282A36" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M20 5V35" stroke="#282A36" strokeWidth="2"/>
                    <path d="M10 10L30 10" stroke="#282A36" strokeWidth="2"/>
                    <path d="M10 30L30 30" stroke="#282A36" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="text-lg font-bold font-display">Ventureship</span>
              </div>
              <p className="mb-4 text-text-secondary">
                A world-class holding company with a portfolio of innovative companies across multiple industries.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-text-secondary hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-text-secondary hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/companies" className="text-text-secondary hover:text-primary">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-text-secondary hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-medium">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-primary">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 text-center border-t border-surface-hover">
            <p className="text-text-secondary">
              &copy; {new Date().getFullYear()} Ventureship. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
