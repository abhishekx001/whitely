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
    const gap = 24
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
    <section ref={sectionRef} id="reviews" className="w-full bg-brand-base py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-brand-ink text-brand-ink" />
            ))}
          </div>
          <h2 className="text-4xl lg:text-5xl font-normal font-serif text-brand-ink inline-block">
            {title}
          </h2>
          {/* Signature motif divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
            <span className="mx-4 text-brand-ink/40 text-lg">✦</span>
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
          </div>
          <p className="max-w-2xl mx-auto text-base text-brand-muted font-sans mt-6">
            {subtitle}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative group">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 bg-brand-base border border-brand-ink/10 rounded-sm p-3 shadow-md hover:bg-brand-soft transition-all duration-300"
            >
              <svg className="w-5 h-5 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 bg-brand-base border border-brand-ink/10 rounded-sm p-3 shadow-md hover:bg-brand-soft transition-all duration-300"
            >
              <svg className="w-5 h-5 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
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
                className="testimonial-card relative rounded-sm bg-brand-base shadow-sm flex-shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-start transition-transform duration-300 hover:scale-[1.02] border border-brand-ink/10 overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-[450px] w-full bg-brand-soft">
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
                         className="absolute bottom-4 right-4 z-10 bg-brand-ink/60 hover:bg-brand-ink backdrop-blur-sm rounded-sm p-3 transition-colors duration-300 shadow-lg"
                       >
                         {unmutedVideoId === testimonial.id ? (
                           <Volume2 className="w-5 h-5 text-brand-base" />
                         ) : (
                           <VolumeX className="w-5 h-5 text-brand-base" />
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
                  {/* Testimonial text overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none flex flex-col justify-end min-h-[140px]">
                    <p className="text-white font-serif italic text-sm mb-2 line-clamp-3">"{testimonial.quote}"</p>
                    <p className="text-white/80 font-sans text-xs font-bold uppercase tracking-wider">{testimonial.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
