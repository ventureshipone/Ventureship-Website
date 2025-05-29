import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiMail, FiCalendar } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
            
            <div className="grid gap-6 mb-8 md:grid-cols-3">
              <div className="p-6 card">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-primary/20 text-primary">
                    <FiUser className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Welcome</h3>
                    <p className="text-text-secondary">
                      {user?.user_metadata?.username || 'Admin User'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 card">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-primary/20 text-primary">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-text-secondary">{user?.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 card">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-primary/20 text-primary">
                    <FiCalendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Last Login</h3>
                    <p className="text-text-secondary">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 card">
              <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 transition-all border rounded-lg border-surface hover:border-primary hover:shadow-md">
                  <h3 className="mb-2 text-lg font-medium">Manage Companies</h3>
                  <p className="mb-4 text-text-secondary">
                    Add, edit, or remove companies from your portfolio.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/admin/companies')}
                  >
                    Manage Companies
                  </button>
                </div>
                
                <div className="p-6 transition-all border rounded-lg border-surface hover:border-primary hover:shadow-md">
                  <h3 className="mb-2 text-lg font-medium">Update Profile</h3>
                  <p className="mb-4 text-text-secondary">
                    Change your profile information and preferences.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/profile')}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
