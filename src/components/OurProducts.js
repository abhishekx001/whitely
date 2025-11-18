'use client'

import Image from 'next/image'

export default function OurProducts() {
  const products = [
    {
      id: 1,
      name: 'Vitamin C Facewash',
      benefits: [
        'Deep Cleansing',
        'Brighten Skin Tone',
        'Antioxidant Protection'
      ],
      image: '/photo_2025-11-17_22-30-29.jpg'
    },
    {
      id: 2,
      name: 'Whitening Cream',
      benefits: [
        'Whitens Skin',
        'Removes Acne',
        'Removes Dark Spot'
      ],
      image: '/photo_2025-11-17_22-30-21.jpg'
    },
    {
      id: 3,
      name: 'Vitamin E Sunscreen + Moisturizer',
      benefits: [
        'Daily Defense',
        'Non-Greasy Formula'
      ],
      image: '/photo_2025-11-17_22-30-23.jpg'
    }
  ]

  return (
    <div className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-10 lg:mb-12">
          <h2 
            className="text-3xl lg:text-4xl font-bold"
            style={{ 
              color: '#2a1a45',
              fontFamily: 'var(--font-playfair)'
            }}
          >
            Our Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden"
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
              <div>
                {/* Product Name */}
                <h3 
                  className="text-xl lg:text-2xl font-bold mb-4"
                  style={{ 
                    color: '#2a1a45',
                    fontFamily: 'var(--font-poppins)'
                  }}
                >
                  {product.name}
                </h3>

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
                        {benefit}.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Buy Now Button */}
        <div className="flex justify-center mt-10 lg:mt-12">
          <button 
            className="px-6 py-2.5 lg:px-7 lg:py-3 rounded-full text-white font-semibold text-sm lg:text-base transition-all hover:scale-105 shadow-md"
            style={{ 
              backgroundColor: '#3f2265',
              fontFamily: 'var(--font-poppins)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a3a8a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3f2265'}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

