import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

export default function CompanyForm({ onCompanyAdded }: { onCompanyAdded: () => void }) {
  const [name, setName] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const fetchMetaDescription = async (url: string): Promise<string> => {
    try {
      // This is a mock function since we can't actually scrape websites in this environment
      // In a real implementation, you would use a server-side function or API to fetch the meta description
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Return a generated description based on the company name and URL
      return `${name} is a leading company in its industry, providing innovative solutions and exceptional services to clients worldwide.`
    } catch (error) {
      console.error('Error fetching meta description:', error)
      return ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('You must be logged in to add a company')
      return
    }
    
    if (!name || !websiteUrl) {
      toast.error('Please fill in all required fields')
      return
    }
    
    // Basic URL validation
    try {
      new URL(websiteUrl)
    } catch (error) {
      toast.error('Please enter a valid URL (include http:// or https://)')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Fetch meta description
      const metaDescription = await fetchMetaDescription(websiteUrl)
      
      // Insert company into database
      const { error } = await supabase
        .from('companies')
        .insert({
          name,
          website_url: websiteUrl,
          meta_description: metaDescription,
          user_id: user.id
        })
      
      if (error) throw error
      
      toast.success('Company added successfully')
      setName('')
      setWebsiteUrl('')
      onCompanyAdded()
    } catch (error: any) {
      toast.error(error.message || 'Error adding company')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="p-6 card">
      <h2 className="mb-6 text-2xl font-bold">Add New Company</h2>
      
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium">
          Company Name <span className="text-accent-red">*</span>
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
          Website URL <span className="text-accent-red">*</span>
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
            Processing...
          </span>
        ) : (
          'Add Company'
        )}
      </button>
    </form>
  )
}
