import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiHome, FiUser, FiLogOut, FiMenu, FiX, FiUsers, FiSettings } from 'react-icons/fi'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-surface border-r border-surface lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-surface">
          <div className="flex items-center">
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
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md lg:hidden hover:bg-surface-hover"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="px-2 py-4">
          <div className="mb-6">
            <div className="px-4 mb-2 text-xs font-semibold uppercase text-text-secondary">
              Dashboard
            </div>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'hover:bg-surface-hover'
                }`
              }
            >
              <FiHome className="w-5 h-5 mr-3" />
              <span>Overview</span>
            </NavLink>
            
            <NavLink
              to="/admin/companies"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'hover:bg-surface-hover'
                }`
              }
            >
              <FiUsers className="w-5 h-5 mr-3" />
              <span>Manage Companies</span>
            </NavLink>
          </div>
          
          <div className="mb-6">
            <div className="px-4 mb-2 text-xs font-semibold uppercase text-text-secondary">
              Account
            </div>
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'hover:bg-surface-hover'
                }`
              }
            >
              <FiUser className="w-5 h-5 mr-3" />
              <span>Profile</span>
            </NavLink>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-left rounded-md hover:bg-surface-hover"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </motion.aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="flex items-center justify-between h-16 px-6 border-b border-surface">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md lg:hidden hover:bg-surface-hover"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center ml-auto">
            <div className="relative">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 overflow-hidden rounded-full bg-surface">
                  {user?.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-lg text-text-secondary">
                      <FiUser />
                    </div>
                  )}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {user?.user_metadata?.username || user?.email}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
