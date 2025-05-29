import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import CompanyCard from '../components/CompanyCard'
import { Database } from '../types/supabase'
import { fetchAndUpdateAllMetaDescriptions } from '../services/metaService'

type Company = Database['public']['Tables']['companies']['Row']

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      
      setCompanies(data || [])
      
      // After fetching companies, update any missing meta descriptions
      fetchAndUpdateAllMetaDescriptions()
    } catch (error: any) {
      console.error('Error fetching companies:', error)
      setError(error.message || 'Failed to fetch companies')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Companies</h1>
          <p className="mb-12 text-xl text-text-secondary">
            Discover the innovative companies in our portfolio that are shaping the future.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="max-w-2xl p-6 mx-auto text-center card bg-error/10">
            <h3 className="mb-2 text-xl font-bold text-error">Error Loading Companies</h3>
            <p>{error}</p>
          </div>
        ) : companies.length === 0 ? (
          <div className="max-w-2xl p-8 mx-auto text-center card">
            <h3 className="mb-4 text-2xl font-bold">No Companies Yet</h3>
            <p className="text-text-secondary">
              Our portfolio is currently being updated. Please check back soon for our latest companies.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company, index) => (
              <CompanyCard key={company.id} company={company} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
