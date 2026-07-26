'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
export default function OurProducts() {

  const products = [
    {
      id: 1,
      name: 'Whitely Beauty Brightening Cream (80g)',
      benefit: 'Fades dark spots & acne marks for a brighter, smoother skin.',
      indiaPrice: '1,599',
      indiaMRP: '1,800',
      qatarPrice: '90',
      image: '/beautycream-80g.jpeg'
    },
    {
      id: 6,
      name: 'Whitely Beauty Brightening Cream (40g)',
      benefit: 'Travel size brightening cream to control blackheads & excess oil.',
      indiaPrice: '999',
      indiaMRP: '1,200',
      qatarPrice: '70',
      image: '/beauty-cream 40g.jpeg'
    },
    {
      id: 2,
      name: 'Whitely Beauty Brightening Body Lotion',
      benefit: 'Removes sun tan & reduces uneven skin tone.',
      indiaPrice: '999',
      indiaMRP: '1,200',
      qatarPrice: '70',
      image: '/bodylotion2.jpg'
    },
    {
      id: 3,
      name: 'Whitely Beauty Lip Mask',
      benefit: 'Deeply moisturizes and repairs dry, cracked lips overnight.',
      indiaPrice: '599',
      indiaMRP: '799',
      qatarPrice: '50',
      image: '/lipbalm-new.jpeg'
    },
    {
      id: 4,
      name: 'Whitely Beauty Brightening Soap',
      benefit: 'Gentle soap for tan removal and brightening glow.',
      indiaPrice: '299',
      indiaMRP: '399',
      image: '/soap-new.jpeg'
    },
    {
      id: 5,
      name: 'Whitely Beauty Sunscreen',
      benefit: 'SPF 50++++ protection enriched with brightening Vitamin C.',
      indiaPrice: '599',
      indiaMRP: '799',
      qatarPrice: '50',
      image: '/sunscreen-new.jpeg'
    }
  ]

  const generateId = (name) => `product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  return (
    <div id="full-products" className="w-full py-16 lg:py-24 bg-brand-base relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-ink/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl lg:text-5xl font-normal mb-4 font-serif text-brand-ink inline-block">
            Complete Collection
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
                  {product.benefit}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
