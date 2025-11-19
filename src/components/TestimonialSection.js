'use client'

import { motion } from "framer-motion"
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function TestimonialSection({
  title,
  subtitle,
  testimonials,
}) {
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    // Get the first card to calculate dimensions
    const firstCard = container.querySelector('.testimonial-card')
    if (!firstCard) return

    // Calculate scroll amount: card width + gap
    const cardWidth = firstCard.offsetWidth
    const gap = 32 // gap-8 = 2rem = 32px
    const scrollAmount = cardWidth + gap

    // Get current scroll position
    const currentScroll = container.scrollLeft
    const newScrollLeft = direction === 'left' 
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount

    container.scrollTo({
      left: Math.max(0, Math.min(newScrollLeft, container.scrollWidth - container.clientWidth)),
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    // Hide left arrow when at the start (with a small threshold for better UX)
    const isAtStart = container.scrollLeft <= 10
    setShowLeftArrow(!isAtStart)
    
    // Hide right arrow when at the end
    const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10
    setShowRightArrow(!isAtEnd)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Check initial scroll position - ensure left arrow is hidden at start
    setShowLeftArrow(false)
    handleScroll()

    // Check on window resize
    const handleResize = () => {
      setTimeout(() => handleScroll(), 100) // Small delay to ensure layout is updated
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [testimonials])

  // Animation variants for the container to orchestrate staggered children animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Animation variants for each testimonial card
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="reviews" className="w-full bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        {/* Section Header */}
        <h2 
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ 
            color: '#2a1a45',
            fontFamily: 'var(--font-playfair)'
          }}
        >
          {title}
        </h2>
        <p 
          className="mx-auto mt-4 max-w-2xl text-lg"
          style={{ 
            color: '#2a1a45',
            fontFamily: 'var(--font-poppins)'
          }}
        >
          {subtitle}
        </p>

        {/* Testimonials Carousel */}
        <div className="mt-12 relative">
          {/* Left Arrow - Hidden on first video */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110"
              style={{ color: '#3f2265', display: showLeftArrow ? 'block' : 'none' }}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 hover:scale-110"
              style={{ color: '#3f2265' }}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2 sm:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card relative overflow-hidden rounded-lg bg-white shadow-sm flex-shrink-0 w-[90%] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] snap-start"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-[350px] sm:h-[400px] lg:h-[450px] w-full">
                  {testimonial.videoSrc ? (
                    <video
                      src={testimonial.videoSrc}
                      className="h-full w-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

