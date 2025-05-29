import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 heading-1">Get in <span className="gradient-text">Touch</span></h1>
              <p className="text-xl text-text-secondary">
                Let's start a conversation and see how we can help your business thrive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 card">
                <h2 className="mb-6 text-2xl font-bold">How We Can Help</h2>
                
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold">Strategy</h3>
                  <p className="text-text-secondary">
                    We'll work with you to develop a tailored strategy that aligns with your goals and vision.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold">Implementation</h3>
                  <p className="text-text-secondary">
                    Our team will handle the execution, ensuring smooth and efficient implementation.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold">Support</h3>
                  <p className="text-text-secondary">
                    We're here to provide ongoing support and guidance throughout our partnership.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-4 text-xl font-bold">Email us</h3>
                  <a 
                    href="mailto:zentaraxyz@gmail.com" 
                    className="inline-block text-primary hover:text-primary-light"
                  >
                    zentaraxyz@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="p-8 mt-8 card">
                <h2 className="mb-6 text-2xl font-bold">Get in touch with our team</h2>
                <p className="mb-4 text-text-secondary">
                  Let's start a conversation about how Ventureship can help transform your business and drive unprecedented growth.
                </p>
                <a 
                  href="mailto:zentaraxyz@gmail.com" 
                  className="btn btn-primary"
                >
                  <FiMail className="mr-2" />
                  Email Us Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
