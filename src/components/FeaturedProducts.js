'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { useWhatsApp } from '../hooks/useWhatsApp'

export default function FeaturedProducts() {
  const { openWhatsAppModal } = useWhatsApp()
  const products = [
    {
      id: 1,
      name: 'Brightening Cream (80g)',
      category: 'Beauty Cream',
      description: 'Vitamin C cream for visibly brighter, more even-toned skin.',
      price: '₹1,599.00',
      originalPrice: '₹1,800.00',
      image: '/beautycream-80g.jpeg'
    },
    {
      id: 5,
      name: 'Brightening Cream (40g)',
      category: 'Beauty Cream',
      description: 'Travel-friendly size for visibly brighter, more even-toned skin.',
      price: '₹999.00',
      originalPrice: '₹1,200.00',
      image: '/beauty-cream 40g.jpeg'
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
      image: '/lipbalm-new.jpeg'
    },
    {
      id: 4,
      name: 'Sunscreen',
      category: 'Sun Care',
      description: 'SPF 50 ++++ for maximum UV protection. Enriched with Vitamin C.',
      price: '₹599.00',
      originalPrice: '₹799.00',
      image: '/sunscreen-new.jpeg'
    },
    {
      id: 6,
      name: 'Brightening Soap',
      category: 'Soap',
      description: 'Gentle cleansing soap for a brighter complexion.',
      price: '₹299.00',
      originalPrice: '₹399.00',
      image: '/soap-new.jpeg'
    }
  ]
  const generateId = (name) => `product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  return (
    <div className="w-full bg-brand-pale py-16 lg:py-24" id="our-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 font-serif text-brand-navy inline-block relative">
            Featured facial products
            {/* Thin violet underline accent */}
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-brand-periwinkle to-transparent"></span>
          </h2>
          <p className="text-lg text-brand-steel font-sans mt-4 max-w-2xl mx-auto">
            Curated 2-3 step routine for hydrated, glowing skin.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              id={generateId(product.name)}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-brand-lavender transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(112,145,230,0.2)] flex flex-col h-full"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square sm:aspect-[4/5] bg-brand-pale overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-6 flex flex-col flex-grow">
                {/* Category Badge */}
                <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold mb-2 sm:mb-4 bg-brand-pale text-brand-periwinkle self-start font-sans tracking-wide">
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-1.5 font-serif text-brand-navy line-clamp-2 sm:line-clamp-1 leading-tight sm:leading-normal">
                  {product.name}
                </h3>

                {/* Reviews */}
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[9px] sm:text-[11px] text-brand-steel font-medium">300+ reviews</span>
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-sm text-brand-steel mb-3 sm:mb-6 font-sans leading-relaxed line-clamp-2 flex-grow">
                  {product.description}
                </p>

                {/* Price & Action */}
                <div className="mt-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 mb-3 sm:mb-5">
                    <span className="text-sm sm:text-2xl font-bold text-brand-periwinkle font-sans">
                      {product.price}
                    </span>
                    <span className="text-[10px] sm:text-sm font-medium text-gray-400 line-through font-sans">
                      {product.originalPrice}
                    </span>
                  </div>

                  {/* Buy Now Button */}
                  <button
                    onClick={() => openWhatsAppModal(`Product: ${product.name}\nDescription: ${product.description}\n\nProduct Details`)}
                    className="w-full flex items-center justify-center px-2 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-white font-semibold text-[11px] sm:text-sm transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy hover:shadow-[0_0_15px_rgba(112,145,230,0.4)] cursor-pointer"
                  >
                    <svg 
                      className="w-3 h-3 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" 
                      fill="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
