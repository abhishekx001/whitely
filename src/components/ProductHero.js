'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWhatsApp } from '../hooks/useWhatsApp'

export default function ProductHero() {
  const { openWhatsAppModal } = useWhatsApp()
  const [currentPage, setCurrentPage] = useState(0)
  
  // Using images from public folder
  const images = [
    '/beautycream 4.jpg',
    '/handlotion.jpg',
    '/lipbalm-new.jpeg',
    '/sunscreen-new.jpeg'
  ]

  const titles = [
    "Discover Your Natural Glow",
    "Nourish Your Hands Deeply",
    "Revive Your Soft Lips",
    "Protect With Broad Spectrum"
  ]

  const totalPages = images.length

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 6000)
    return () => clearInterval(timer)
  }, [totalPages])

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] sm:h-[85vh] sm:min-h-[600px] overflow-hidden bg-brand-soft flex items-center">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images[currentPage]}
            alt="Whitely Premium Skincare"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Scrim */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-ink/80 via-brand-ink/40 to-transparent sm:via-brand-ink/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent sm:hidden" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-20 h-full flex flex-col justify-center pb-12 sm:pt-0 sm:pb-0">
        <div className="w-full sm:w-2/3 lg:w-1/2 max-w-lg flex flex-col items-start gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-3 py-1.5 bg-brand-base/10 backdrop-blur-md border border-brand-base/20 rounded-sm"
          >
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-base uppercase font-sans">
              100% Natural Ingredients
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-4xl lg:text-5xl font-serif text-brand-base leading-[1.15]"
            >
              {titles[currentPage]}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-brand-base/90 max-w-sm font-sans leading-relaxed drop-shadow-sm"
          >
            Experience the luxury of premium, nature-infused skincare designed to rejuvenate, protect, and illuminate your skin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col gap-2 py-2"
          >
            <div className="flex items-center text-brand-base/90 text-xs sm:text-sm font-sans">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Over 10,000+ Happy Customers
            </div>
            <div className="flex items-center text-brand-base/90 text-xs sm:text-sm font-sans">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Dermatologically Tested
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-4"
          >
            <button
              onClick={() => openWhatsAppModal('product details')}
              className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-wider text-brand-base transition-colors duration-300 bg-brand-deep hover:bg-brand-ink rounded-sm"
            >
              Shop The Collection
            </button>
          </motion.div>
        </div>
      </div>

      {/* Carousel Progress Indicators */}
      <div className="absolute bottom-8 left-5 sm:left-auto sm:right-8 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-1 transition-all duration-500 rounded-none ${
              currentPage === index 
                ? 'w-12 bg-brand-base' 
                : 'w-4 bg-brand-base/30 hover:bg-brand-base/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
