'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useWhatsApp } from '../hooks/useWhatsApp'

export default function ProductHero() {
  const { openWhatsAppModal } = useWhatsApp()
  const [currentPage, setCurrentPage] = useState(0)
  
  // Using images from public folder - grouped in pairs (4 pairs)
  const imagePairs = [
    ['/beautycream 4.jpg', '/skinprob.jpg'],
    ['/handlotion.jpg', '/handcream.jpg'],
    ['/lipbalm-new.jpeg', '/lipapply.jpg'],
    ['/sunscreen-new.jpeg', '/sunscreen2.PNG']
  ]

  const totalPages = imagePairs.length
  const currentPair = imagePairs[currentPage]

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  // Optional: Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextPage()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentPage])

  return (
    <div className="relative w-full min-h-[auto] md:min-h-[calc(100vh-80px)] bg-brand-pale overflow-hidden flex items-center">
      {/* Subtle Background Blob */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-brand-lavender to-brand-pale rounded-full blur-[100px] opacity-60 pointer-events-none transform translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-5 pt-3 pb-6 sm:px-6 lg:px-8 md:py-8 lg:py-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-0 md:space-y-8 z-20">
            
            {/* Desktop Floating Badge */}
            <div className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-brand-pale/60 backdrop-blur-md border border-brand-lavender shadow-[0_4px_20px_rgba(112,145,230,0.05)]">
              <span className="flex w-2 h-2 rounded-full bg-brand-navy mr-2 animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider text-brand-steel uppercase font-sans">
                100% Natural | Visible Results
              </span>
            </div>

            {/* Mobile Badge */}
            <div className="flex justify-center md:hidden w-full">
              <span className="bg-white/80 backdrop-blur-sm border border-brand-lavender text-brand-navy text-[10px] font-semibold px-3 py-1 rounded-full shadow-sm">
                ✨ 100% Natural | Visible Results
              </span>
            </div>

            {/* Editorial Heading */}
            <h1 className="text-[2rem] md:text-5xl sm:text-6xl lg:text-7xl font-bold font-serif leading-tight md:leading-[1.1] text-brand-navy md:mt-4 bg-transparent">
              Discover Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy">Natural Glow</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-lg text-brand-steel max-w-md font-sans leading-relaxed px-2 md:px-0 bg-transparent">
              Experience the luxury of premium, nature-infused skincare designed to rejuvenate, protect, and illuminate your skin.
            </p>

            {/* Mobile Image Stack */}
            <div className="relative w-full h-[300px] mt-3 mb-3 md:hidden">
              {/* Main product image — full width, centered */}
              <div className="w-full h-[280px] rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src={currentPair[0]}
                  alt="Whitely Product"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Small floating second image — bottom right corner */}
              <div className="absolute bottom-[0px] right-3 w-[100px] h-[120px] rounded-2xl overflow-hidden border-2 border-white shadow-lg z-10">
                <Image
                  src={currentPair[1]}
                  alt="Whitely Product Detail"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stat badge — bottom left */}
              <div className="absolute bottom-[10px] left-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-brand-lavender shadow-sm">
                <p className="text-sm font-bold text-brand-navy leading-none">1000+</p>
                <p className="text-[9px] text-brand-steel mt-0.5 font-semibold uppercase">Happy Reviews</p>
              </div>

              {/* Soft glow blob */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[200px] h-[200px] rounded-full bg-brand-periwinkle opacity-15 blur-3xl" />
              </div>
            </div>

            <div className="flex justify-center md:justify-start w-full mt-3 md:mt-0">
              <button
                onClick={() => openWhatsAppModal('product details')}
                className="group w-auto inline-flex items-center justify-center px-8 py-3.5 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy rounded-full md:hover:scale-105 shadow-md hover:shadow-[0_0_20px_rgba(112,145,230,0.5)] cursor-pointer"
              >
                Shop The Collection
                <svg 
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[520px] items-center justify-center mt-12 lg:mt-0 hidden md:flex">
            
            {/* Decorative blob behind images */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full bg-brand-periwinkle opacity-20 sm:opacity-10 blur-3xl" />
            </div>

            {/* Back image — product shot, larger, slightly rotated */}
            <div className="absolute top-0 right-0 sm:right-4 w-full sm:w-[340px] h-[300px] sm:h-[420px] rounded-3xl overflow-hidden sm:rotate-2 shadow-sm transition-transform duration-700 ease-out hover:scale-[1.02]">
              <Image
                src={currentPair[0]}
                alt="Whitely Product"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Front image — skin/application shot, smaller, counter-rotated */}
            <div className="absolute bottom-0 left-0 sm:left-4 w-[200px] sm:w-[260px] h-[240px] sm:h-[320px] rounded-3xl overflow-hidden sm:-rotate-2 z-10 shadow-sm transition-transform duration-700 ease-out hover:scale-[1.05] hidden sm:block">
              <Image
                src={currentPair[1]}
                alt="Whitely Product Detail"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating badge — top left of image area */}
            <div className="absolute top-6 left-0 sm:-left-4 z-20 bg-white/80 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-semibold text-brand-navy border border-brand-lavender shadow-sm hidden sm:block hover:bg-white transition-colors cursor-default">
              ✨ 100% Natural | Visible Results
            </div>

            {/* Small stat badge — bottom right */}
            <div className="absolute bottom-6 right-0 sm:-right-4 z-20 bg-white/80 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-3 rounded-2xl text-center border border-brand-lavender shadow-sm hidden sm:block hover:bg-white transition-colors cursor-default">
              <p className="text-xl sm:text-2xl font-bold text-brand-navy">1000+</p>
              <p className="text-[10px] sm:text-xs font-semibold text-brand-steel uppercase tracking-wider mt-0.5">Happy Reviews</p>
            </div>
            
            {/* Carousel Dots */}
            <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
              {imagePairs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentPage === index 
                      ? 'w-8 bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy' 
                      : 'w-2 bg-brand-lavender hover:bg-brand-periwinkle'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
