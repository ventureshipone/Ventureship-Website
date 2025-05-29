import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const LoadingScreen = () => {
  const { loading } = useAuth()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Only show loading screen for initial auth check
    if (!loading) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [loading])

  if (!showLoader) return null

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-purple-500 text-lg font-semibold">Loading Ventureship...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
