'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProductHero() {
  const [currentPage, setCurrentPage] = useState(0)
  
  // Using images from public folder - grouped in pairs (3 pairs)
  const imagePairs = [
    ['/beautycream 4.jpg', '/skinprob.jpg'],
    ['/handlotion.jpg', '/handcream.jpg'],
    ['/newpic.jpeg', '/lipapply.jpg']
  ]

  const totalPages = imagePairs.length
  const currentPair = imagePairs[currentPage]

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="relative w-full bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Image Section */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full h-full">
              <Image
                src={currentPair[0]}
                alt="Whitely Product"
                fill
                className="object-cover transition-opacity duration-300"
                priority={currentPage === 0}
              />
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <div className="relative w-full h-full">
              <Image
                src={currentPair[1]}
                alt="Whitely Product"
                fill
                className="object-cover transition-opacity duration-300"
                priority={currentPage === 0}
              />
            </div>
          </div>
        </div>

        {/* Pagination Indicator */}
        <div className="flex items-center justify-center mt-6 space-x-2" style={{ fontFamily: 'var(--font-poppins)' }}>
          <button
            onClick={prevPage}
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            style={{ color: '#3f2265' }}
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-sm font-medium px-4" style={{ color: '#3f2265' }}>
            {currentPage + 1}/{totalPages}
          </span>
          
          <button
            onClick={nextPage}
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            style={{ color: '#3f2265' }}
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

