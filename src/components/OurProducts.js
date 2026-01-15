'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function OurProducts() {
  const products = [
    {
      id: 1,
      name: 'Brightening Cream',
      benefits: [
        'Deep Hydration for soft, smooth skin',
        'Brightens and evens out skin tone',
        'Helps reduce dark spots & dullness',
        'Lightweight, non-greasy formula',
        'Suitable for all skin types'
      ],
      image: '/beautycream1.jpg'
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
      image: '/newpic.jpeg'
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
      image: '/brightening soap.jpg'
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

  return (
    <div id="our-products" className="w-full py-12 lg:py-16" style={{ backgroundColor: '#f5f0ff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          className="mb-10 lg:mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 
            className="text-3xl lg:text-4xl font-bold"
            style={{ 
              color: '#2a1a45',
              fontFamily: 'var(--font-playfair)'
            }}
          >
            Our Products
          </h2>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {products.map((product) => (
            <motion.div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden w-full max-w-sm"
              variants={fadeInUp}
            >
              {/* Product Image */}
              <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[350px] bg-gray-50 mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-5 lg:p-6">
                {/* Product Name */}
                <h3 
                  className="text-xl lg:text-2xl font-semibold mb-4"
                  style={{ 
                    color: '#2a1a45',
                    fontFamily: 'var(--font-poppins)'
                  }}
                >
                  {product.name}
                </h3>

                {/* Face Benefits Title - Only for Brightening Cream */}
                {product.id === 1 && (
                  <h4 
                    className="text-lg lg:text-xl font-semibold mb-3 mt-2"
                    style={{ 
                      color: '#2a1a45',
                      fontFamily: 'var(--font-poppins)'
                    }}
                  >
                    Face Benefits:
                  </h4>
                )}

                {/* Benefits List */}
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      {/* Checkmark Icon */}
                      <svg 
                        className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        style={{ color: '#3f2265' }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span 
                        className="text-base lg:text-lg font-normal"
                        style={{ 
                          color: '#2a1a45',
                          fontFamily: 'var(--font-poppins)'
                        }}
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Buy Now Button */}
                <div className="flex justify-center mt-6">
                  <a
                    href={`https://wa.me/917306633619?text=${encodeURIComponent(`Product: ${product.name}\nDescription: ${product.benefits.join(', ')}\n\nProduct Details`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 lg:px-7 lg:py-3 rounded-full text-white font-semibold text-sm lg:text-base transition-all hover:scale-105 hover:bg-[#5a3a8a] shadow-md"
                    style={{ 
                      backgroundColor: '#3f2265',
                      fontFamily: 'var(--font-poppins)'
                    }}
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

