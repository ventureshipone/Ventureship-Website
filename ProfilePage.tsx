import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const { user, updateUserProfile, updatePassword } = useAuth()
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Check if we're in the admin section
  const isAdminSection = location.pathname.includes('/admin')
  
  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || '')
      setFullName(user.user_metadata?.full_name || '')
    }
  }, [user])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('You must be logged in to update your profile')
      return
    }
    
    setIsLoading(true)
    
    try {
      await updateUserProfile({
        username,
        full_name: fullName
      })
      
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Error updating profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('You must be logged in to update your password')
      return
    }

    // Validate password inputs
    if (!currentPassword) {
      toast.error('Current password is required')
      return
    }

    if (!newPassword) {
      toast.error('New password is required')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    
    setIsPasswordLoading(true)
    
    try {
      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword
      })

      if (signInError) {
        throw new Error('Current password is incorrect')
      }

      // Then update to the new password
      const { error } = await updatePassword(newPassword)
      
      if (error) throw error
      
      toast.success('Password updated successfully')
      
      // Clear password fields
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error: any) {
      toast.error(error.message || 'Error updating password')
    } finally {
      setIsPasswordLoading(false)
    }
  }
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center mr-4 text-text-primary hover:text-primary transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Overview</span>
              </button>
              <h1 className="text-3xl font-bold">Your Profile</h1>
            </div>
            
            <div className="p-8 mb-8 card">
              <h2 className="mb-6 text-2xl font-bold">Profile Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-2 bg-surface border border-surface rounded-md"
                  />
                  <p className="mt-1 text-sm text-text-secondary">
                    Email cannot be changed
                  </p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="username" className="block mb-2 font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your username"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="fullName" className="block mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </form>
            </div>

            <div className="p-8 card">
              <h2 className="mb-6 text-2xl font-bold">Update Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-6">
                  <label htmlFor="currentPassword" className="block mb-2 font-medium">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="newPassword" className="block mb-2 font-medium">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                  disabled={isPasswordLoading}
                >
                  {isPasswordLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Password...
                    </span>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
