'use client'

import Image from 'next/image'

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: 'Brightening Cream',
      category: 'Beauty Cream',
      description: 'Vitamin C cream for visibly brighter, more even-toned skin.',
      price: '₹1,499.00',
      originalPrice: '₹1,799.00',
      image: '/beautycream1.jpg'
    },
    {
      id: 2,
      name: 'Brightening Body Lotion',
      category: 'Lotion',
      description: 'Lightweight lotion to visibly improve radiance.',
      price: '₹999.00',
      originalPrice: '₹1,200.00',
      image: '/bodylotion2.jpg'
    },
    {
      id: 3,
      name: 'Lip Mask',
      category: 'Lip Care',
      description: 'Moisturizer for smooth, supple skin that feels nourished.',
      price: '₹599.00',
      originalPrice: '₹799.00',
      image: '/lipbalm.jpg'
    }
  ]

  return (
    <div className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: '#2a1a45', fontFamily: 'var(--font-playfair)' }}>
            Featured facial products
          </h2>
          <p className="text-base lg:text-lg" style={{ color: '#2a1a45', fontFamily: 'var(--font-poppins)' }}>
            Curated 2-3 step routine for hydrated, glowing skin.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-[250px] sm:h-[280px] lg:h-[300px] bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-5 lg:p-6">
                {/* Category Badge */}
                <button 
                  className="px-3 py-1 rounded-full text-xs lg:text-sm font-medium mb-3 text-white"
                  style={{ 
                    backgroundColor: '#3f2265',
                    fontFamily: 'var(--font-poppins)'
                  }}
                >
                  {product.category}
                </button>

                {/* Product Name */}
                <h3 
                  className="text-xl lg:text-2xl font-semibold mb-2"
                  style={{ 
                    color: '#2a1a45',
                    fontFamily: 'var(--font-playfair)'
                  }}
                >
                  {product.name}
                </h3>

                {/* Description */}
                <p 
                  className="text-sm lg:text-base mb-4 text-gray-600 leading-relaxed font-normal"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-4 flex items-center gap-3">
                  <span 
                    className="text-xl lg:text-2xl font-semibold"
                    style={{ 
                      color: '#2a1a45',
                      fontFamily: 'var(--font-poppins)'
                    }}
                  >
                    {product.price}
                  </span>
                  <span 
                    className="text-base lg:text-lg line-through opacity-60"
                    style={{ 
                      color: '#2a1a45',
                      fontFamily: 'var(--font-poppins)'
                    }}
                  >
                    {product.originalPrice}
                  </span>
                </div>

                {/* Buy Now Button */}
                <div className="flex justify-center">
                  <a
                    href={`https://wa.me/917306633619?text=${encodeURIComponent(`Product: ${product.name}\nDescription: ${product.description}\n\nProduct Details`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 lg:px-6 lg:py-2.5 rounded-full text-white font-semibold text-sm lg:text-base transition-all hover:scale-105 hover:bg-[#5a3a8a] shadow-md"
                    style={{ 
                      backgroundColor: '#3f2265',
                      fontFamily: 'var(--font-poppins)'
                    }}
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

