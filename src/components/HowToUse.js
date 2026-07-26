'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HowToUse() {
  const steps = [
    {
      id: 1,
      title: "Wash",
      description: "Cleanse with Whitely Brightening Soap.",
      image: "/use1.png"
    },
    {
      id: 2,
      title: "Dry",
      description: "Pat dry with a clean towel.",
      image: "/use2.png"
    },
    {
      id: 3,
      title: "Apply",
      description: "Massage Whitely Brightening Cream evenly.",
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
    <div id="how-to-use" className="w-full py-16 lg:py-24 bg-brand-soft relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-ink/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4 font-sans">
            Simple Routine
          </p>
          <h2 className="text-4xl lg:text-5xl font-normal font-serif text-brand-ink">
            How to Use
          </h2>
          {/* Signature motif divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
            <span className="mx-4 text-brand-ink/40 text-lg">✦</span>
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
          </div>
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[140px] left-[15%] right-[15%] h-[1px] bg-brand-ink/10 z-0"></div>

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
               <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] mb-8 rounded-sm bg-brand-base border border-brand-ink/10 overflow-hidden transition-transform duration-500 group-hover:scale-105 flex items-center justify-center shadow-sm">
                 <Image
                   src={step.image}
                   alt={step.title}
                   fill
                   className="object-cover p-2 rounded-sm"
                 />
               </div>
               
               {/* Numbered Step Marker (sharp) */}
               <div className="w-8 h-8 bg-brand-ink text-brand-base flex items-center justify-center text-sm font-bold font-serif mb-4 -mt-12 relative z-20 transition-transform duration-300 group-hover:bg-brand-deep rounded-sm">
                 {step.id}
               </div>
               
               {/* Content */}
               <div className="px-6 py-2 w-full max-w-sm">
                 <h3 className="text-xl font-normal mb-2 font-serif text-brand-ink">
                   {step.title}
                 </h3>
                 <p className="text-sm leading-relaxed text-brand-ink/70 font-sans">
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
