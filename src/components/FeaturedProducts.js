'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import DualPrice from './DualPrice'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function FeaturedProducts() {
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
      category: 'Beauty Cream',
      description: 'Vitamin C cream for visibly brighter, more even-toned skin.',
      indiaPrice: '1,599',
      indiaMRP: '1,800',
      qatarPrice: '90',
      image: '/beautycream-80g.jpeg'
    },
    {
      id: 5,
      name: 'Whitely Beauty Brightening Cream (40g)',
      category: 'Beauty Cream',
      description: 'Travel-friendly size for visibly brighter, more even-toned skin.',
      indiaPrice: '999',
      indiaMRP: '1,200',
      qatarPrice: '70',
      image: '/beauty-cream 40g.jpeg'
    },
    {
      id: 2,
      name: 'Whitely Beauty Brightening Body Lotion',
      category: 'Lotion',
      description: 'Lightweight lotion to visibly improve radiance.',
      indiaPrice: '999',
      indiaMRP: '1,200',
      qatarPrice: '70',
      image: '/bodylotion2.jpg'
    },
    {
      id: 3,
      name: 'Whitely Beauty Lip Mask',
      category: 'Lip Care',
      description: 'Moisturizer for smooth, supple skin that feels nourished.',
      indiaPrice: '599',
      indiaMRP: '799',
      qatarPrice: '50',
      image: '/lipbalm-new.jpeg'
    },
    {
      id: 4,
      name: 'Whitely Beauty Sunscreen',
      category: 'Sun Care',
      description: 'SPF 50 ++++ for maximum UV protection. Enriched with Vitamin C.',
      indiaPrice: '599',
      indiaMRP: '799',
      qatarPrice: '50',
      image: '/sunscreen-new.jpeg'
    },
    {
      id: 6,
      name: 'Whitely Beauty Brightening Soap',
      category: 'Soap',
      description: 'Gentle cleansing soap for a brighter complexion.',
      indiaPrice: '299',
      indiaMRP: '399',
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
              <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="relative w-full aspect-square sm:aspect-[4/5] bg-brand-pale overflow-hidden block">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Product Details */}
              <div className="p-3 sm:p-6 flex flex-col flex-grow">
                {/* Category Badge */}
                <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold mb-2 sm:mb-4 bg-brand-pale text-brand-periwinkle self-start font-sans tracking-wide">
                  {product.category}
                </span>

                {/* Product Name */}
                <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                  <h3 className="text-sm sm:text-lg font-bold mb-1 sm:mb-1.5 font-serif text-brand-navy leading-tight hover:text-brand-periwinkle transition-colors">
                    {product.name}
                  </h3>
                </Link>

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
                  <div className="mb-3 sm:mb-5">
                    <DualPrice 
                      indiaPrice={product.indiaPrice} 
                      indiaMRP={product.indiaMRP} 
                      qatarPrice={product.qatarPrice} 
                    />
                  </div>

                  {/* Buttons Layout */}
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                      className="flex-[0.8] inline-flex items-center justify-center px-2 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-brand-lavender text-brand-navy font-semibold text-[11px] sm:text-sm transition-all duration-300 hover:border-brand-periwinkle hover:text-brand-periwinkle cursor-pointer bg-white"
                    >
                      View
                    </Link>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={addingToCart === product.id || addedItem === product.id}
                      className="flex-[1.2] inline-flex items-center justify-center px-2 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-transparent font-semibold text-[11px] sm:text-sm transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle text-white hover:from-brand-periwinkle hover:to-brand-navy cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                      {addedItem === product.id ? 'Added!' : addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
