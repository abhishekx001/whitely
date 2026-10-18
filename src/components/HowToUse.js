'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * @typedef {Object} RoutineStep
 * @property {number} id - Step sequential number
 * @property {string} title - Short title for the step
 * @property {string} description - Full step instructions
 * @property {string} image - Image asset path
 * @property {string} imageAlt - Accessible image description
 * @property {'photo'} type - Visual display type
 */

/**
 * @typedef {Object} RoutineConfig
 * @property {string} id - Identifier key ('night' | 'morning')
 * @property {string} name - Display tab label
 * @property {string} badge - Step count badge
 * @property {RoutineStep[]} steps - Ordered routine steps
 */

/**
 * Calibrated Black & White routine photoshoot data.
 * All 5 steps use unified studio monochrome tones with matching exposure.
 * @type {Record<'night' | 'morning', RoutineConfig>}
 */
const ROUTINES_DATA = {
  night: {
    id: 'night',
    name: 'Night Routine',
    badge: '5 steps',
    steps: [
      {
        id: 1,
        title: 'Wash',
        description: 'Wash your face thoroughly with Whitely Beauty Soap.',
        image: '/use1.png',
        imageAlt: 'Wash face thoroughly with Whitely Beauty Soap',
        type: 'photo',
      },
      {
        id: 2,
        title: 'Dry',
        description: 'Gently pat your face dry with a clean towel.',
        image: '/use2.png',
        imageAlt: 'Gently pat face dry with a clean towel',
        type: 'photo',
      },
      {
        id: 3,
        title: 'Apply',
        description: 'Take a moderate amount of Whitely Beauty Face Cream and apply it evenly over your face.',
        image: '/use3.png',
        imageAlt: 'Apply Whitely Beauty Face Cream evenly over face',
        type: 'photo',
      },
      {
        id: 4,
        title: 'Under-Eye Care',
        description: 'Apply a very thin layer around the under-eye area, especially where dark circles are visible. Avoid direct contact with the eyes.',
        image: '/use4.png',
        imageAlt: 'Apply Whitely Beauty Face Cream around under-eye area',
        type: 'photo',
      },
      {
        id: 5,
        title: 'Overnight Rest',
        description: 'Leave the cream on overnight while you sleep.',
        image: '/use-44.png',
        imageAlt: 'Leave Whitely cream on overnight while you sleep',
        type: 'photo',
      },
    ],
  },
  morning: {
    id: 'morning',
    name: 'Morning Routine',
    badge: '2 steps',
    steps: [
      {
        id: 1,
        title: 'Wash',
        description: 'Wash your face thoroughly with Whitely Beauty Soap.',
        image: '/use1.png',
        imageAlt: 'Wash face thoroughly with Whitely Beauty Soap',
        type: 'photo',
      },
      {
        id: 2,
        title: 'Dry',
        description: 'Gently pat your face dry with a clean towel.',
        image: '/use2.png',
        imageAlt: 'Gently pat face dry with a clean towel',
        type: 'photo',
      },
    ],
  },
}

export default function HowToUse() {
  const shouldReduceMotion = useReducedMotion()

  // Tab State: default to Night, optionally default to Morning if between 5am and 12pm
  const [activeTab, setActiveTab] = useState('night')
  const [activeSlide, setActiveSlide] = useState(0)

  // Carousel refs for mobile scroll sync
  const carouselRef = useRef(null)
  const tabRefs = useRef({ night: null, morning: null })

  // Initialize time-based default on client mount (avoids SSR hydration mismatch)
  useEffect(() => {
    try {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setActiveTab('morning')
      }
    } catch {
      // Fallback stays 'night'
    }
  }, [])

  // Reset slide index on routine switch
  useEffect(() => {
    setActiveSlide(0)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [activeTab])

  // Setup mobile carousel scroll observation
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    const handleScroll = () => {
      const firstCard = container.firstElementChild
      const cardWidth = firstCard ? firstCard.clientWidth : 280
      const gap = 16
      const scrollPos = container.scrollLeft
      const index = Math.round(scrollPos / (cardWidth + gap))
      const total = ROUTINES_DATA[activeTab].steps.length
      const clamped = Math.max(0, Math.min(index, total - 1))
      setActiveSlide(clamped)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeTab])

  // Scroll carousel to selected slide
  const scrollToSlide = useCallback((index) => {
    const container = carouselRef.current
    if (!container) return
    const children = container.children
    if (children && children[index]) {
      children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      setActiveSlide(index)
    } else {
      const firstCard = container.firstElementChild
      const cardWidth = firstCard ? firstCard.clientWidth : 280
      const gap = 16
      const targetScroll = index * (cardWidth + gap)
      container.scrollTo({ left: targetScroll, behavior: 'smooth' })
      setActiveSlide(index)
    }
  }, [])

  // Keyboard navigation for tablist
  const handleTabKeyDown = (e, currentKey) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const nextTab = currentKey === 'night' ? 'morning' : 'night'
      setActiveTab(nextTab)
      tabRefs.current[nextTab]?.focus()
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  const tabContentVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.35,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -16,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.25,
        ease: 'easeIn',
      },
    },
  }

  const currentRoutine = ROUTINES_DATA[activeTab]

  return (
    <section
      id="how-to-use"
      aria-label="How to Use Simple Skincare Routine"
      className="w-full py-16 sm:py-20 lg:py-28 pb-28 sm:pb-32 lg:pb-36 bg-brand-soft relative overflow-hidden"
    >
      {/* Decorative top border & subtle ambient glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-ink/10" />
      <div
        aria-hidden="true"
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[640px] h-[360px] bg-brand-pale/40 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: 'easeOut' },
            },
          }}
        >
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-brand-muted mb-3 font-sans">
            Simple Routine
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-brand-ink tracking-tight">
            How to Use
          </h2>

          {/* Signature Motif Divider */}
          <div className="flex items-center justify-center mt-5 mb-8">
            <div className="h-[1px] w-12 bg-brand-ink/20" />
            <span className="mx-4 text-brand-ink/40 text-base select-none" aria-hidden="true">
              ✦
            </span>
            <div className="h-[1px] w-12 bg-brand-ink/20" />
          </div>

          {/* Segmented Routine Toggle */}
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label="Skincare Routine Selection"
              className="inline-flex p-1.5 rounded-full bg-brand-pale/60 backdrop-blur-md border border-brand-ink/10 shadow-inner"
            >
              {(['night', 'morning']).map((tabKey) => {
                const routine = ROUTINES_DATA[tabKey]
                const isActive = activeTab === tabKey

                return (
                  <button
                    key={tabKey}
                    ref={(el) => (tabRefs.current[tabKey] = el)}
                    id={`routine-tab-${tabKey}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`routine-panel-${tabKey}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tabKey)}
                    onKeyDown={(e) => handleTabKeyDown(e, tabKey)}
                    className={`relative min-h-[44px] px-5 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 z-10 flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-deep cursor-pointer select-none ${
                      isActive ? 'text-brand-base' : 'text-brand-ink/70 hover:text-brand-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : 'activeRoutinePill'}
                        className="absolute inset-0 bg-brand-ink rounded-full shadow-md -z-10"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span>{routine.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? 'bg-brand-base/20 text-brand-base'
                          : 'bg-brand-ink/5 text-brand-muted'
                      }`}
                    >
                      {routine.badge}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Tab Panel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`routine-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`routine-tab-${activeTab}`}
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            {/* Desktop View (md: 768px and up) */}
            <div className="hidden md:block relative">
              {/* Desktop Grid Layout */}
              {activeTab === 'morning' ? (
                // Morning: 2 Centered Cards
                <motion.div
                  className="grid grid-cols-2 gap-8 lg:gap-12 max-w-2xl mx-auto items-stretch relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {currentRoutine.steps.map((step, idx) => (
                    <motion.div
                      key={step.id}
                      variants={cardVariants}
                      className="group h-full flex flex-col relative"
                    >
                      {/* Connecting Line Between Step 1 and 2 */}
                      {idx === 0 && (
                        <div
                          aria-hidden="true"
                          className="hidden md:block absolute top-[28%] -right-6 lg:-right-10 w-8 lg:w-12 h-[1px] bg-brand-ink/20 z-0 pointer-events-none"
                        />
                      )}
                      <StepCard step={step} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // Night: 5 Steps layout (5 across on lg, 3 + 2 centered on md)
                <motion.div
                  className="relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* On lg screens (1024px+): 5-column grid with equal height cards */}
                  <div className="hidden lg:grid lg:grid-cols-5 lg:gap-5 xl:gap-6 items-stretch">
                    {currentRoutine.steps.map((step, idx) => (
                      <motion.div
                        key={step.id}
                        variants={cardVariants}
                        className="group h-full flex flex-col relative"
                      >
                        {/* Connecting Line between adjacent steps on desktop */}
                        {idx < currentRoutine.steps.length - 1 && (
                          <div
                            aria-hidden="true"
                            className="hidden lg:block absolute top-[26%] -right-3 xl:-right-3.5 w-5 xl:w-6 h-[1px] bg-brand-ink/20 z-0 pointer-events-none"
                          />
                        )}
                        <StepCard step={step} />
                      </motion.div>
                    ))}
                  </div>

                  {/* On md screens (768px - 1023px): 3 on top row, 2 centered below */}
                  <div className="lg:hidden space-y-8">
                    <div className="grid grid-cols-3 gap-5 items-stretch">
                      {currentRoutine.steps.slice(0, 3).map((step, idx) => (
                        <motion.div
                          key={step.id}
                          variants={cardVariants}
                          className="group h-full flex flex-col relative"
                        >
                          {idx < 2 && (
                            <div
                              aria-hidden="true"
                              className="hidden md:block absolute top-[26%] -right-3 w-5 h-[1px] bg-brand-ink/20 z-0 pointer-events-none"
                            />
                          )}
                          <StepCard step={step} />
                        </motion.div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-5 max-w-xl mx-auto items-stretch">
                      {currentRoutine.steps.slice(3, 5).map((step, idx) => (
                        <motion.div
                          key={step.id}
                          variants={cardVariants}
                          className="group h-full flex flex-col relative"
                        >
                          {idx === 0 && (
                            <div
                              aria-hidden="true"
                              className="hidden md:block absolute top-[26%] -right-3 w-5 h-[1px] bg-brand-ink/20 z-0 pointer-events-none"
                            />
                          )}
                          <StepCard step={step} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile View (below 768px): Swipeable Carousel with Blurred Navigation Arrows Directly Over Images */}
            <div className="block md:hidden relative">
              {/* Blurred Floating Left Arrow (positioned directly over the image) */}
              <button
                type="button"
                onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                disabled={activeSlide === 0}
                aria-label="Previous step"
                className={`absolute left-2 sm:left-4 top-[175px] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-xl shadow-brand-ink/15 flex items-center justify-center text-brand-ink transition-all duration-300 active:scale-95 cursor-pointer hover:bg-white hover:scale-105 ${
                  activeSlide === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5 -ml-0.5 text-brand-ink stroke-[2.5]" />
              </button>

              {/* Blurred Floating Right Arrow (positioned directly over the image) */}
              <button
                type="button"
                onClick={() => scrollToSlide(Math.min(currentRoutine.steps.length - 1, activeSlide + 1))}
                disabled={activeSlide === currentRoutine.steps.length - 1}
                aria-label="Next step"
                className={`absolute right-2 sm:right-4 top-[175px] -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-xl shadow-brand-ink/15 flex items-center justify-center text-brand-ink transition-all duration-300 active:scale-95 cursor-pointer hover:bg-white hover:scale-105 ${
                  activeSlide === currentRoutine.steps.length - 1
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100'
                }`}
              >
                <ChevronRight className="w-5 h-5 -mr-0.5 text-brand-ink stroke-[2.5]" />
              </button>

              {/* Carousel Container */}
              <div
                ref={carouselRef}
                tabIndex={0}
                role="region"
                aria-label={`${currentRoutine.name} steps swipeable carousel`}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-6 pt-2 pb-6 -mx-4 scroll-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep rounded-2xl"
              >
                {currentRoutine.steps.map((step) => (
                  <div
                    key={step.id}
                    className="w-[82vw] max-w-[310px] flex-shrink-0 snap-center focus:outline-none group flex flex-col"
                  >
                    <StepCard step={step} isMobile />
                  </div>
                ))}
              </div>

              {/* Progress Dots Navigation */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {currentRoutine.steps.map((step, index) => {
                  const isCurrent = activeSlide === index
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => scrollToSlide(index)}
                      aria-label={`Go to step ${step.id}: ${step.title}`}
                      className="min-w-[36px] min-h-[44px] flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep rounded-full"
                    >
                      <span
                        className={`transition-all duration-300 rounded-full ${
                          isCurrent
                            ? 'w-7 h-2 bg-brand-ink shadow-sm'
                            : 'w-2 h-2 bg-brand-ink/20 hover:bg-brand-ink/40'
                        }`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Subtle Note for Night Routine */}
            {activeTab === 'night' && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="mt-8 sm:mt-12 flex items-center justify-center gap-2 text-xs sm:text-sm text-brand-muted font-sans text-center px-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-deep shrink-0" aria-hidden="true" />
                <p>
                  <span className="font-semibold text-brand-ink/90">Tip:</span> Avoid direct contact with the eyes.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/**
 * Reusable Card component for individual routine steps.
 * Features glassmorphism style, fixed 4:5 aspect ratio,
 * overlapping floating numbered badge, and calibrated black & white photography.
 */
function StepCard({ step, isMobile = false }) {
  return (
    <div
      className={`h-full flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/75 backdrop-blur-md border border-white/80 shadow-lg shadow-brand-pale/40 transition-all duration-300 hover:shadow-xl hover:shadow-brand-deep/10 hover:border-brand-pale ${
        isMobile ? 'shadow-md' : ''
      }`}
    >
      {/* Visual Top Container with 4:5 fixed aspect ratio */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-brand-pale/30 border border-brand-ink/5 shrink-0">
        <Image
          src={step.image}
          alt={step.imageAlt || step.title}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 320px, 240px"
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle soft gradient scrim for visual polish */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-ink/15 via-transparent to-transparent pointer-events-none"
        />
      </div>

      {/* Floating Numbered Badge overlapping the image bottom edge */}
      <div
        className="relative -mt-5 z-20 w-10 h-10 rounded-full bg-brand-ink text-brand-base flex items-center justify-center font-serif text-sm font-bold shadow-md border-2 border-brand-base transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-deep shrink-0"
        aria-hidden="true"
      >
        {step.id}
      </div>

      {/* Step Text Information */}
      <div className="mt-3 flex-1 flex flex-col justify-start w-full px-1">
        <h3 className="font-serif text-lg sm:text-xl font-normal text-brand-ink mb-2">
          {step.title}
        </h3>
        <p className="font-sans text-[15px] sm:text-base leading-relaxed text-brand-ink/80">
          {step.description}
        </p>
      </div>
    </div>
  )
}
