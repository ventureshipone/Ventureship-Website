import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Database } from '../types/supabase'
import { getVentureshipHeroDescription, updateCompanyMetaDescription } from '../services/metaService'

type Company = Database['public']['Tables']['companies']['Row']

interface CompanyCardProps {
  company: Company
  index: number
}

export default function CompanyCard({ company, index }: CompanyCardProps) {
  const [description, setDescription] = useState<string | null>(company.meta_description)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // If no meta description exists, fetch the hero description
    if (!company.meta_description) {
      fetchHeroDescription()
    }
  }, [company.id, company.meta_description])

  const fetchHeroDescription = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log(`Fetching hero description for ${company.name}`)
      const heroDesc = await getVentureshipHeroDescription()
      
      if (heroDesc) {
        console.log(`Using hero description for ${company.name}`)
        setDescription(heroDesc)
        // Update in database
        await updateCompanyMetaDescription(company.id, heroDesc)
      } else {
        console.log(`Failed to get hero description for ${company.name}`)
        setError('Could not get description')
      }
    } catch (error) {
      console.error(`Error fetching hero description for ${company.name}:`, error)
      setError('Failed to fetch description')
    } finally {
      setIsLoading(false)
    }
  }

  // Format website URL for display
  const formatUrl = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden transition-all duration-300 p-6 card hover:shadow-lg hover:shadow-primary/20"
    >
      <h3 className="mb-2 text-xl font-bold">{company.name}</h3>
      <a 
        href={company.website_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block mb-4 text-primary hover:text-primary-light"
      >
        {formatUrl(company.website_url)}
      </a>
      
      <div className="min-h-[80px]">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>Fetching description...</span>
          </div>
        ) : error ? (
          <p className="text-text-secondary">
            A Ventureship company transforming its industry through innovation and excellence.
          </p>
        ) : (
          <p className="text-text-secondary">
            {description || "A Ventureship company transforming its industry through innovation and excellence."}
          </p>
        )}
      </div>
    </motion.div>
  )
}
