'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useWhatsApp } from '../hooks/useWhatsApp'

export default function OurProducts() {
  const { openWhatsAppModal } = useWhatsApp()
  const products = [
    {
      id: 1,
      name: 'Brightening Cream (80g)',
      benefits: [
        'Deep Hydration for soft, smooth skin',
        'Brightens and evens out skin tone',
        'Helps reduce dark spots & dullness',
        'Lightweight, non-greasy formula',
        'Suitable for all skin types'
      ],
      image: '/beautycream-80g.jpeg'
    },
    {
      id: 6,
      name: 'Brightening Cream (40g)',
      benefits: [
        'Deep Hydration for soft, smooth skin',
        'Brightens and evens out skin tone',
        'Helps reduce dark spots & dullness',
        'Lightweight, non-greasy formula',
        'Suitable for all skin types'
      ],
      image: '/beauty-cream 40g.jpeg'
    },
    {
      id: 2,
      name: 'Brightening Body Lotion',
      benefits: [
        'Bright hands, soft touch ✨',
        'Glow at your fingertips 💎',
        'Whitely hands that shine 🌸',
        'Brighten every touch with Whitely 🌿',
        'Soft. Bright. Beautiful. 💫'
      ],
      image: '/bodylotion2.jpg'
    },
    {
      id: 3,
      name: 'Lip Mask',
      benefits: [
        'Hydrated lips look smoother and more "plumped" or supple',
        'Regular use can help maintain a healthy lip color and prevent peeling or flaking',
        'Balms can double as a primer for lipsticks, helping makeup go on more smoothly'
      ],
      image: '/lipbalm-new.jpeg'
    },
    {
      id: 4,
      name: 'Whitely Brightening Soap',
      benefits: [
        'Deep cleansing for brighter, clearer skin',
        'Gentle exfoliation removes dead skin cells',
        'Brightens and evens out skin tone',
        'Natural ingredients for all skin types',
        'Leaves skin feeling fresh and rejuvenated'
      ],
      image: '/soap-new.jpeg'
    },
    {
      id: 5,
      name: 'Sunscreen',
      benefits: [
        'SPF 50 ++++ for maximum UV protection',
        'Enriched with Vitamin C for radiant skin',
        'Ultra hydrating & lightweight formula',
        'Leaves no white cast behind',
        'Perfect for daily use & all skin types'
      ],
      image: '/sunscreen-new.jpeg'
    }
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }
  const generateId = (name) => `product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  return (
    <div id="full-products" className="w-full py-16 lg:py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#EDE9FE] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-brand-navy inline-block relative">
            Complete Collection
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-brand-periwinkle to-transparent"></span>
          </h2>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id} 
              id={generateId(product.name)}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(112,145,230,0.15)] hover:border-brand-lavender flex flex-col sm:flex-row"
              variants={fadeInUp}
            >
              {/* Product Image - Left side */}
              <div className="relative w-full sm:w-2/5 h-[300px] sm:h-auto overflow-hidden bg-brand-pale">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Product Details - Right side */}
              <div className="p-8 sm:w-3/5 flex flex-col">
                {/* Product Name */}
                <h3 className="text-2xl font-bold mb-4 font-serif text-brand-navy">
                  {product.name}
                </h3>

                {/* Face Benefits Title - Only for Brightening Cream */}
                {(product.id === 1 || product.id === 6) && (
                  <h4 className="text-lg font-semibold mb-3 text-brand-periwinkle font-sans tracking-wide">
                    Face Benefits
                  </h4>
                )}

                {/* Benefits List */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      {/* Checkmark Icon */}
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-pale flex items-center justify-center mr-3 mt-0.5">
                        <svg 
                          className="w-3 h-3 text-brand-periwinkle" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                      <span className="text-[15px] leading-relaxed text-brand-steel font-sans">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Buy Now Button - Outlined Variant */}
                <div className="mt-auto">
                  <button
                    onClick={() => openWhatsAppModal(`Product: ${product.name}\nDescription: ${product.benefits.join(', ')}\n\nProduct Details`)}
                    className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-3 rounded-xl border-2 border-brand-navy text-brand-navy font-semibold text-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-periwinkle hover:to-brand-navy hover:text-white hover:border-transparent cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
