import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi'

export default function LoginPage() {
  const [email, setEmail] = useState('zentaraxyz@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { signIn, isAuthorizedAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/admin'
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }
    
    // Check if the email is authorized
    if (!isAuthorizedAdmin(email)) {
      setError('Access denied. You are not authorized to access the admin panel.')
      return
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await signIn(email, password)
      
      if (error) throw error
      
      // Redirect to the page they tried to visit or admin dashboard
      navigate(from, { replace: true })
    } catch (error: any) {
      setError(error.message || 'Failed to sign in')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 mx-auto card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto overflow-hidden rounded-md bg-primary">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10L20 5L30 10V30L20 35L10 30V10Z" stroke="#282A36" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M20 5V35" stroke="#282A36" strokeWidth="2"/>
                  <path d="M10 10L30 10" stroke="#282A36" strokeWidth="2"/>
                  <path d="M10 30L30 30" stroke="#282A36" strokeWidth="2"/>
                </svg>
              </div>
            </Link>
            <h1 className="mb-2 text-2xl font-bold">Admin Login</h1>
            <p className="text-text-secondary">Sign in to access the admin panel</p>
          </div>
          
          {error && (
            <div className="flex items-center p-4 mb-6 rounded-md bg-error/20 text-error">
              <FiAlertCircle className="flex-shrink-0 w-5 h-5 mr-3" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="label">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiMail />
                </div>
                <input
                  id="email"
                  type="email"
                  className="input pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled
                />
              </div>
              <p className="mt-1 text-sm text-text-secondary">
                Only authorized admin email can access this panel
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="label">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiLock />
                </div>
                <input
                  id="password"
                  type="password"
                  className="input pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
