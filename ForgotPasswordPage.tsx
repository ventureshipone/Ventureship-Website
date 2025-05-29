import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { resetPassword } = useAuth()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await resetPassword(email)
      
      if (error) throw error
      
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || 'Failed to send password reset email')
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
            <h1 className="mb-2 text-2xl font-bold">Reset your password</h1>
            <p className="text-text-secondary">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>
          
          {error && (
            <div className="flex items-center p-4 mb-6 rounded-md bg-error/20 text-error">
              <FiAlertCircle className="flex-shrink-0 w-5 h-5 mr-3" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {success ? (
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-success/20">
                <FiCheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="mb-2 text-xl font-medium">Check your email</h2>
              <p className="mb-6 text-text-secondary">
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <Link to="/login" className="btn btn-primary">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
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
                    Sending...
                  </span>
                ) : (
                  'Send reset link'
                )}
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-text-secondary">
                  Remember your password?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
