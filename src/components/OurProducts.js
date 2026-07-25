'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useWhatsApp } from '../hooks/useWhatsApp'
import DualPrice from './DualPrice'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'

export default function OurProducts() {
  const { openWhatsAppModal } = useWhatsApp()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()
  const [addingToCart, setAddingToCart] = useState(null)
  const [addedItem, setAddedItem] = useState(null)

  const handleAddToCart = async (e, product) => {
    e.preventDefault()
    
    if (!user) {
      router.push('/login?redirect=/#our-products')
      return
    }

    setAddingToCart(product.id)
    const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const success = await addToCart({ ...product, slug: productSlug })
    
    if (success) {
      setAddedItem(product.id)
      setTimeout(() => setAddedItem(null), 2000)
    }
    setAddingToCart(null)
  }

  const products = [
    {
      id: 1,
      name: 'Whitely Beauty Brightening Cream (80g)',
      benefits: [
        'Helps reduce pimples & acne',
        'Fades dark spots & acne marks',
        'Improves pigmentation & uneven skin tone',
        'Removes sun tan & dullness',
        'Controls blackheads & excess oil',
        'Gives brighter, smoother skin',
        'Deeply hydrates & nourishes skin',
        'Supports clear, healthy glow'
      ],
      indiaPrice: '1,599',
      indiaMRP: '1,800',
      qatarPrice: '90',
      image: '/beautycream-80g.jpeg'
    },
    {
      id: 6,
      name: 'Whitely Beauty Brightening Cream (40g)',
      benefits: [
        'Helps reduce pimples & acne',
        'Fades dark spots & acne marks',
        'Improves pigmentation & uneven skin tone',
        'Removes sun tan & dullness',
        'Controls blackheads & excess oil',
        'Gives brighter, smoother skin',
        'Deeply hydrates & nourishes skin',
        'Supports clear, healthy glow'
      ],
      indiaPrice: '999',
      indiaMRP: '1,200',
      qatarPrice: '70',
      image: '/beauty-cream 40g.jpeg'
    },
    {
      id: 2,
      name: 'Whitely Beauty Brightening Body Lotion',
      benefits: [
        'Removes sun tan & dark sun damage',
        'Reduces black tanning & uneven skin tone',
        'Deeply brightens dull hands',
        'Helps fade pigmentation & dark patches',
        'Smoothens rough and dry skin',
        'Gives soft, hydrated, glowing hands'
      ],
      indiaPrice: '999',
      indiaMRP: '1,200',
      qatarPrice: '70',
      image: '/bodylotion2.jpg'
    },
    {
      id: 3,
      name: 'Whitely Beauty Lip Mask',
      benefits: [
        'Deeply moisturizes and repairs dry, cracked lips',
        'Smoothens rough lip texture from first use',
        'Helps remove dark pigmentation and tan on lips',
        'Gradually gives a natural soft pink / red lip tone',
        'Reduces lip lines and improves softness',
        'Nourishes lips overnight for a healthy glow'
      ],
      indiaPrice: '599',
      indiaMRP: '799',
      qatarPrice: '50',
      image: '/lipbalm-new.jpeg'
    },
    {
      id: 4,
      name: 'Whitely Beauty Brightening Soap',
      benefits: [
        'Week 1: Clean & Tan Removal',
        'Week 2: Brightening Glow',
        'Week 3: Repair & Anti-Aging',
        'Week 4: Clear & Healthy Skin'
      ],
      indiaPrice: '299',
      indiaMRP: '399',
      image: '/soap-new.jpeg'
    },
    {
      id: 5,
      name: 'Whitely Beauty Sunscreen',
      benefits: [
        'High Sun Protection (SPF 50++++)',
        'Brightening with Vitamin C',
        'Removes Sun Tan & Prevents Pigmentation',
        'Ultra Hydrating Formula',
        'Controls Oil & Sweat',
        'Lightweight & Non-Sticky'
      ],
      indiaPrice: '599',
      indiaMRP: '799',
      qatarPrice: '50',
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
              <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="relative w-full sm:w-2/5 h-[300px] sm:h-auto overflow-hidden bg-brand-pale block">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              {/* Product Details - Right side */}
              <div className="p-8 sm:w-3/5 flex flex-col">
                {/* Product Name */}
                <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                  <h3 className="text-2xl font-bold mb-4 font-serif text-brand-navy hover:text-brand-periwinkle transition-colors">
                    {product.name}
                  </h3>
                </Link>

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

                <div className="mb-4">
                  <DualPrice 
                    indiaPrice={product.indiaPrice} 
                    indiaMRP={product.indiaMRP} 
                    qatarPrice={product.qatarPrice} 
                  />
                </div>

                {/* Buttons Layout */}
                <div className="mt-auto flex gap-3">
                  <Link
                    href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl border border-brand-lavender text-brand-navy font-semibold text-sm transition-all duration-300 hover:border-brand-periwinkle hover:text-brand-periwinkle cursor-pointer bg-white"
                  >
                    View
                  </Link>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={addingToCart === product.id || addedItem === product.id}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl border border-transparent font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle text-white hover:from-brand-periwinkle hover:to-brand-navy cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {addedItem === product.id ? 'Added!' : addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
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
