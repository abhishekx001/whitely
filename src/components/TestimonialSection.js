'use client'

import { motion } from "framer-motion"
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX, Star } from 'lucide-react'

export default function TestimonialSection({
  title,
  subtitle,
  testimonials,
}) {
  const scrollContainerRef = useRef(null)
  const sectionRef = useRef(null)
  const cardRefs = useRef({})
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [unmutedVideoId, setUnmutedVideoId] = useState(null)
  const videoRefs = useRef({})
  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const firstCard = container.querySelector('.testimonial-card')
    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth
    const gap = 32
    const scrollAmount = cardWidth + gap
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

    const isAtStart = container.scrollLeft <= 10
    setShowLeftArrow(!isAtStart)
    
    const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10
    setShowRightArrow(!isAtEnd)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    setShowLeftArrow(false)
    handleScroll()

    const handleResize = () => {
      setTimeout(() => handleScroll(), 100)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [testimonials])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const testimonialId = parseInt(entry.target.dataset.testimonialId)
        const video = videoRefs.current[testimonialId]
        
        if (!video) return

        if (!entry.isIntersecting) {
          if (unmutedVideoId === testimonialId) {
            setUnmutedVideoId(null)
          }
          video.muted = true
          video.pause()
        } else {
          video.play().catch((e) => console.log("Video play failed:", e))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(cardRefs.current).forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [testimonials, unmutedVideoId])

  const toggleMute = (testimonialId) => {
    if (unmutedVideoId === testimonialId) {
      setUnmutedVideoId(null)
      const video = videoRefs.current[testimonialId]
      if (video) video.muted = true
    } else {
      if (unmutedVideoId !== null) {
        const previousVideo = videoRefs.current[unmutedVideoId]
        if (previousVideo) previousVideo.muted = true
      }
      setUnmutedVideoId(testimonialId)
      const video = videoRefs.current[testimonialId]
      if (video) video.muted = false
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section ref={sectionRef} id="reviews" className="w-full bg-brand-pale py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-brand-periwinkle text-brand-periwinkle" />
            ))}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-brand-navy mb-4">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-brand-steel font-sans">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative group">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md hover:bg-white rounded-full p-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 border border-white/60"
            >
              <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md hover:bg-white rounded-full p-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-110 border border-white/60"
            >
              <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8 pt-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                ref={(el) => { if (el) cardRefs.current[testimonial.id] = el }}
                data-testimonial-id={testimonial.id}
                className="testimonial-card relative rounded-2xl bg-white shadow-sm flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-start transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(112,145,230,0.3)] border-2 border-transparent hover:border-brand-navy overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-[450px] w-full bg-gray-100">
                  {testimonial.videoSrc ? (
                    <>
                      <video
                        ref={(el) => { if (el) videoRefs.current[testimonial.id] = el }}
                        src={testimonial.videoSrc}
                        className="h-full w-full object-cover"
                        loop
                        muted={unmutedVideoId !== testimonial.id}
                        playsInline
                      />
                      <button
                        onClick={() => toggleMute(testimonial.id)}
                        className="absolute bottom-4 right-4 z-10 bg-black/40 hover:bg-brand-navy backdrop-blur-md rounded-full p-3 transition-all duration-300 shadow-lg"
                      >
                        {unmutedVideoId === testimonial.id ? (
                          <Volume2 className="w-5 h-5 text-white" />
                        ) : (
                          <VolumeX className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </>
                  ) : (
                    <Image
                      src={testimonial.imageSrc}
                      alt={testimonial.name || 'Testimonial'}
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
