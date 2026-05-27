'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HowToUse() {
  const steps = [
    {
      id: 1,
      title: "Wash",
      description: "Wash Your Face With Whitely Brightening Soap.",
      image: "/use1.png"
    },
    {
      id: 2,
      title: "Dry",
      description: "Pat dry your face with a clean towel.",
      image: "/use2.png"
    },
    {
      id: 3,
      title: "Apply",
      description: "Take required amount of Whitely Brightening Cream and apply evenly to your face. Massage gently.",
      image: "/use3.png"
    }
  ]

  // Animation variants
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
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div id="how-to-use" className="w-full py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#EDE9FE] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-periwinkle mb-3 font-sans">
            Simple Routine
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold font-serif text-brand-navy">
            How to Use
          </h2>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Dashed Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[140px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-brand-navy opacity-30 z-0"></div>

          {/* Steps Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {steps.map((step) => (
              <motion.div 
                key={step.id}
                className="flex flex-col items-center text-center group"
                variants={fadeInUp}
              >
                {/* Image Container with Hover Effect */}
                <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] mb-8 rounded-full bg-white shadow-[0_8px_30px_rgba(112,145,230,0.08)] border-4 border-white overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_15px_40px_rgba(112,145,230,0.15)] flex items-center justify-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover p-2 rounded-full"
                  />
                </div>
                
                <div className="w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center text-xl font-bold font-serif shadow-lg mb-6 -mt-14 relative z-20 border-4 border-white transition-transform duration-300 group-hover:scale-110">
                  {step.id}
                </div>
                
                {/* Content */}
                <div className="bg-white px-6 py-4 rounded-2xl w-full max-w-sm">
                  <h3 className="text-2xl font-bold mb-3 font-serif text-brand-navy">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-brand-steel font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
