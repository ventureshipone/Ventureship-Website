import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFoundPage() {
  return (
    <section className="flex items-center justify-center min-h-screen py-20">
      <div className="container">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 rounded-full bg-primary/20">
              <span className="text-5xl font-bold text-primary">404</span>
            </div>
            
            <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
            
            <p className="mb-8 text-text-secondary">
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
            
            <Link to="/" className="inline-flex items-center btn btn-primary">
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
