import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth()

  // Show nothing while checking authentication
  if (loading) return null

  // Redirect to login if not authenticated or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />
  }

  // Render children if authenticated and admin
  return <>{children}</>
}

export default ProtectedRoute
