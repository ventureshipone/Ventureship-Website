import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { toast } from 'react-toastify'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { Database } from '../types/supabase'
import CompanyForm from '../components/CompanyForm'

type Company = Database['public']['Tables']['companies']['Row']

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setIsLoading(true)
      
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      
      setCompanies(data || [])
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch companies')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) {
      return
    }
    
    try {
      setIsDeleting(id)
      
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setCompanies(companies.filter(company => company.id !== id))
      toast.success('Company deleted successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete company')
    } finally {
      setIsDeleting(null)
    }
  }

  const handleCompanyAdded = () => {
    fetchCompanies()
    setShowAddForm(false)
    toast.success('Company added successfully')
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 md:mb-0"
          >
            Manage Companies
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-primary flex items-center"
            >
              {showAddForm ? (
                <>
                  <FiX className="w-5 h-5 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <FiPlus className="w-5 h-5 mr-2" />
                  Add New Company
                </>
              )}
            </button>
          </motion.div>
        </div>
        
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <CompanyForm onCompanyAdded={handleCompanyAdded} />
          </motion.div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : companies.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl p-8 mx-auto text-center card"
          >
            <h3 className="mb-4 text-2xl font-bold">No Companies Yet</h3>
            <p className="mb-6 text-text-secondary">
              You haven't added any companies to your portfolio yet. Click the button below to add your first company.
            </p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary inline-flex items-center"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Add Your First Company
            </button>
          </motion.div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-surface text-text-primary">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Company Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Meta Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface bg-card">
                {companies.map((company, index) => (
                  <motion.tr 
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{company.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={company.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-light"
                      >
                        {company.website_url}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md truncate">
                        {company.meta_description || 
                          <span className="text-text-secondary italic">No description</span>
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => navigate(`/admin/companies/${company.id}`)}
                          className="p-2 text-primary hover:text-primary-light transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(company.id)}
                          className="p-2 text-error hover:text-error-dark transition-colors"
                          title="Delete"
                          disabled={isDeleting === company.id}
                        >
                          {isDeleting === company.id ? (
                            <div className="w-5 h-5 border-2 border-error border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FiTrash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
