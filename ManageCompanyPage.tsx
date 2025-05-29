import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi'
import { extractMetaDescription } from '../../services/metaService'

export default function ManageCompanyPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isEditing = id !== 'new'
  
  const [name, setName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingMeta, setIsFetchingMeta] = useState(false)
  
  useEffect(() => {
    if (isEditing && id) {
      fetchCompany(id)
    }
  }, [id, isEditing])
  
  const fetchCompany = async (companyId: string) => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single()
      
      if (error) throw error
      
      if (data) {
        setName(data.name)
        setWebsiteUrl(data.website_url)
        setMetaDescription(data.meta_description || '')
      }
    } catch (error: any) {
      toast.error(error.message || 'Error fetching company')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('You must be logged in to manage companies')
      return
    }
    
    if (!name || !websiteUrl) {
      toast.error('Name and website URL are required')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Format website URL if needed
      let formattedUrl = websiteUrl
      if (!formattedUrl.startsWith('http')) {
        formattedUrl = `https://${formattedUrl}`
      }
      
      if (isEditing && id) {
        // Update existing company
        const { error } = await supabase
          .from('companies')
          .update({
            name,
            website_url: formattedUrl,
            meta_description: metaDescription || null
          })
          .eq('id', id)
        
        if (error) throw error
        
        toast.success('Company updated successfully')
      } else {
        // Create new company
        const { error } = await supabase
          .from('companies')
          .insert({
            name,
            website_url: formattedUrl,
            meta_description: metaDescription || null,
            user_id: user.id
          })
        
        if (error) throw error
        
        toast.success('Company created successfully')
      }
      
      navigate('/admin/companies')
    } catch (error: any) {
      toast.error(error.message || 'Error saving company')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMetaDescription = async () => {
    if (!websiteUrl) {
      toast.error('Please enter a website URL first')
      return
    }

    try {
      setIsFetchingMeta(true)
      toast.info('Fetching description from website...')
      
      const metaDesc = await extractMetaDescription(websiteUrl)
      
      if (metaDesc) {
        setMetaDescription(metaDesc)
        toast.success('Meta description fetched successfully')
      } else {
        toast.warning('No meta description found on the website')
      }
    } catch (error: any) {
      toast.error(error.message || 'Error fetching meta description')
    } finally {
      setIsFetchingMeta(false)
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
                onClick={() => navigate('/admin/companies')}
                className="flex items-center mr-4 text-text-primary hover:text-primary transition-colors"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Companies</span>
              </button>
              <h1 className="text-3xl font-bold">
                {isEditing ? 'Edit Company' : 'Add New Company'}
              </h1>
            </div>
            
            <div className="p-8 card">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Company Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="websiteUrl" className="block mb-2 font-medium">
                    Website URL
                  </label>
                  <input
                    id="websiteUrl"
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="metaDescription" className="font-medium">
                      Meta Description
                    </label>
                    <button
                      type="button"
                      onClick={fetchMetaDescription}
                      className="flex items-center text-sm text-primary hover:text-primary-light"
                      disabled={isFetchingMeta || !websiteUrl}
                    >
                      {isFetchingMeta ? (
                        <>
                          <span className="w-4 h-4 mr-2 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                          Fetching...
                        </>
                      ) : (
                        <>
                          <FiRefreshCw className="mr-1" size={14} />
                          Fetch from website
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-surface rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Company description (will be extracted from website if left blank)"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate('/admin/companies')}
                    className="btn btn-secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      'Save Company'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
