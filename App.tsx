import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import LoadingScreen from './components/LoadingScreen'
import { useAuth } from './contexts/AuthContext'

// Public Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CompaniesPage from './pages/CompaniesPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminCompaniesPage from './pages/AdminCompaniesPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="companies" element={<AdminCompaniesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Redirects */}
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="colored" />
      <LoadingScreen />
    </ThemeProvider>
  )
}

export default App
