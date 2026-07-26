'use client'

import Image from 'next/image'
import Link from 'next/link'
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
    <div className="w-full bg-brand-soft py-16 lg:py-24" id="our-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl lg:text-5xl font-normal mb-4 font-serif text-brand-ink inline-block">
            Featured collection
          </h2>
          {/* Signature motif divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
            <span className="mx-4 text-brand-ink/40 text-lg">✦</span>
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              id={generateId(product.name)}
              className="group bg-brand-base rounded-sm overflow-hidden border border-brand-ink/10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-md flex flex-col h-full shadow-sm"
            >
              {/* Product Image */}
              <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="relative w-full aspect-[4/5] bg-brand-soft overflow-hidden block">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>

              {/* Product Details */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow">
                {/* Product Name */}
                <Link href={`/products/${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                  <h3 className="text-lg sm:text-xl font-normal mb-2 font-serif text-brand-ink leading-snug hover:text-brand-deep transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Single line benefit */}
                <p className="text-xs sm:text-sm text-brand-muted mb-4 font-sans truncate">
                  {product.description}
                </p>

                {/* Price & Action */}
                <div className="mt-auto">
                  <div className="mb-4">
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
                      className="flex-1 inline-flex items-center justify-center px-2 py-2.5 sm:px-4 rounded-sm border border-brand-ink/20 text-brand-ink font-semibold text-xs sm:text-sm transition-colors duration-300 hover:bg-brand-soft cursor-pointer bg-brand-base"
                    >
                      View Product
                    </Link>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={addingToCart === product.id || addedItem === product.id}
                      className="flex-1 inline-flex items-center justify-center px-2 py-2.5 sm:px-4 rounded-sm border border-transparent font-semibold text-xs sm:text-sm transition-colors duration-300 bg-brand-deep text-brand-base hover:bg-brand-ink cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
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
