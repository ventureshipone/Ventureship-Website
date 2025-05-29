import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiLock, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidLink, setIsValidLink] = useState(true)
  
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  
  // Check if the URL contains the necessary hash parameters
  useEffect(() => {
    const hash = window.location.hash
    if (!hash || !hash.includes('type=recovery')) {
      setIsValidLink(false)
      setError('Invalid or expired password reset link')
    }
  }, [])
  
  // Password strength validation
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  
  const passwordStrength = [
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length
  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength <= 2) return 'Weak'
    if (passwordStrength <= 4) return 'Medium'
    return 'Strong'
  }
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-error'
    if (passwordStrength <= 4) return 'bg-warning'
    return 'bg-success'
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password) {
      setError('Please enter a new password')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (passwordStrength < 3) {
      setError('Password is too weak. Please choose a stronger password.')
      return
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      const { error } = await updatePassword(password)
      
      if (error) throw error
      
      // Redirect to login page after successful password reset
      navigate('/login', { 
        state: { 
          message: 'Password reset successful! Please sign in with your new password.' 
        } 
      })
    } catch (error: any) {
      setError(error.message || 'Failed to reset password')
    } finally {
      setIsLoading(false)
    }
  }
  
  if (!isValidLink) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 mx-auto card">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-error/20">
              <FiAlertCircle className="w-8 h-8 text-error" />
            </div>
            <h2 className="mb-2 text-xl font-medium">Invalid Reset Link</h2>
            <p className="mb-6 text-text-secondary">
              The password reset link is invalid or has expired. Please request a new password reset link.
            </p>
            <Link to="/forgot-password" className="btn btn-primary">
              Request new link
            </Link>
          </div>
        </div>
      </div>
    )
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
            <h1 className="mb-2 text-2xl font-bold">Set new password</h1>
            <p className="text-text-secondary">
              Create a new password for your account
            </p>
          </div>
          
          {error && (
            <div className="flex items-center p-4 mb-6 rounded-md bg-error/20 text-error">
              <FiAlertCircle className="flex-shrink-0 w-5 h-5 mr-3" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="label">
                New password
              </label>
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
              
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Password strength:</span>
                    <span className="text-xs font-medium">
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                  <div className="w-full h-2 overflow-hidden rounded-full bg-surface">
                    <div
                      className={`h-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  <ul className="grid gap-1 mt-2">
                    <li className="flex items-center text-xs">
                      {hasMinLength ? (
                        <FiCheck className="w-4 h-4 mr-2 text-success" />
                      ) : (
                        <FiX className="w-4 h-4 mr-2 text-error" />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center text-xs">
                      {hasUppercase ? (
                        <FiCheck className="w-4 h-4 mr-2 text-success" />
                      ) : (
                        <FiX className="w-4 h-4 mr-2 text-error" />
                      )}
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center text-xs">
                      {hasLowercase ? (
                        <FiCheck className="w-4 h-4 mr-2 text-success" />
                      ) : (
                        <FiX className="w-4 h-4 mr-2 text-error" />
                      )}
                      At least one lowercase letter
                    </li>
                    <li className="flex items-center text-xs">
                      {hasNumber ? (
                        <FiCheck className="w-4 h-4 mr-2 text-success" />
                      ) : (
                        <FiX className="w-4 h-4 mr-2 text-error" />
                      )}
                      At least one number
                    </li>
                    <li className="flex items-center text-xs">
                      {hasSpecialChar ? (
                        <FiCheck className="w-4 h-4 mr-2 text-success" />
                      ) : (
                        <FiX className="w-4 h-4 mr-2 text-error" />
                      )}
                      At least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="label">
                Confirm new password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-secondary">
                  <FiLock />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className="input pl-10"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-error">Passwords do not match</p>
              )}
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
                  Resetting password...
                </span>
              ) : (
                'Reset password'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
