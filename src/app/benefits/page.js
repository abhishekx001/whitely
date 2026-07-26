'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BenefitsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const benefits = [
    {
      title: 'Deep Hydration',
      description: 'Locks in moisture for supple, bouncy skin that feels refreshed all day.',
      icon: (
        <svg className="w-8 h-8 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Visible Brightening',
      description: 'Reduces dullness and enhances your natural glow for a radiant complexion.',
      icon: (
        <svg className="w-8 h-8 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Even Skin Tone',
      description: 'Fades dark spots and pigmentation, promoting a uniform and flawless look.',
      icon: (
        <svg className="w-8 h-8 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Natural Ingredients',
      description: 'Harnesses the power of nature with Turmeric and Sandal extracts.',
      icon: (
        <svg className="w-8 h-8 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'For All Skin Types',
      description: 'Gentle and effective formulation suitable for oily, dry, and combination skin.',
      icon: (
        <svg className="w-8 h-8 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      )
    },
    {
      title: 'Dermatologically Tested',
      description: 'Ensuring the highest standards of safety and efficacy for your skin.',
      icon: (
        <svg className="w-8 h-8 text-brand-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const ingredients = ['Turmeric', 'Sandal Extraction', 'Niacinamide', 'Vitamin C', 'Vitamin E']

  return (
    <div className="w-full bg-brand-base relative pb-16 lg:pb-24">
      {/* Hero Section */}
      <div className="w-full py-16 lg:py-24 bg-brand-soft relative overflow-hidden border-b border-brand-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted mb-4 font-sans">
              Our Promise
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-normal font-serif text-brand-ink leading-tight mb-6">
              Why Whitely Works
            </h1>
            <p className="text-lg text-brand-ink/80 font-sans max-w-2xl mx-auto leading-relaxed">
              We believe healthy skin is achievable for everyone. Our products are carefully crafted to deliver visible results while protecting your skin barrier.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-20">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="bg-brand-base rounded-sm p-8 shadow-sm border border-brand-ink/10 transition-all duration-300 hover:shadow-md flex flex-col group"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 rounded-sm bg-brand-soft flex items-center justify-center mb-8 border border-brand-ink/5 group-hover:bg-brand-ink group-hover:text-brand-base transition-colors text-brand-ink">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-normal mb-4 font-serif text-brand-ink">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-ink/70 font-sans">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Ingredients Section */}
      <div className="w-full bg-brand-soft py-20 relative border-y border-brand-ink/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp} className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-10 font-sans">
              Key Ingredients Powering Whitely
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {ingredients.map((ingredient, idx) => (
                <motion.span 
                  key={idx}
                  variants={fadeInUp}
                  className="px-6 py-3 rounded-sm text-sm font-semibold uppercase tracking-wider bg-brand-base border border-brand-ink/20 text-brand-ink shadow-sm font-sans hover:bg-brand-soft transition-colors"
                >
                  {ingredient}
                </motion.span>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-12">
              <Link
                href="/#our-products"
                className="inline-flex items-center justify-center px-12 py-4 text-sm uppercase tracking-wider font-semibold text-brand-base transition-colors duration-300 bg-brand-deep hover:bg-brand-ink rounded-sm shadow-sm"
              >
                Shop the Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
