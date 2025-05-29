import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Companies', path: '/companies' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 mr-3 overflow-hidden rounded-lg bg-primary pulse-glow">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10L20 5L30 10V30L20 35L10 30V10Z" stroke="#282A36" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M20 5V35" stroke="#282A36" strokeWidth="2"/>
                <path d="M10 10L30 10" stroke="#282A36" strokeWidth="2"/>
                <path d="M10 30L30 30" stroke="#282A36" strokeWidth="2"/>
              </svg>
            </div>
            <span className="text-2xl font-bold font-display">Ventureship</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors hover:text-primary ${
                      isActive ? 'text-primary' : 'text-text-primary'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `text-base font-medium transition-colors hover:text-primary ${
                        isActive ? 'text-primary' : 'text-text-primary'
                      }`
                    }
                  >
                    Admin
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="btn btn-outline"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="btn btn-primary"
                >
                  Admin Login
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background"
          >
            <nav className="container py-5">
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block py-2 text-lg font-medium transition-colors hover:text-primary ${
                          isActive ? 'text-primary' : 'text-text-primary'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {user ? (
                  <>
                    <li>
                      <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                          `block py-2 text-lg font-medium transition-colors hover:text-primary ${
                            isActive ? 'text-primary' : 'text-text-primary'
                          }`
                        }
                      >
                        Admin
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut()}
                        className="w-full btn btn-outline"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className="w-full btn btn-primary"
                    >
                      Admin Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
