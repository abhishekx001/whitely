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
      description: "Take required amount of Whitely Brightening Cream and apply it evenly to your face. Gently massage in circular motions for deep hydration and brightening.",
      image: "/use3.png"
    }
  ]

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
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
    <div id="how-to-use" className="w-full py-12 lg:py-16" style={{ backgroundColor: '#f8f7fb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-8 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-medium mb-2"
            style={{ 
              color: '#3f2265',
              fontFamily: 'var(--font-playfair)'
            }}
            variants={fadeInUp}
          >
            How to Use
          </motion.h2>
          <motion.p 
            className="text-xs lg:text-sm uppercase tracking-wider font-normal"
            style={{ 
              color: '#3f2265',
              fontFamily: 'var(--font-poppins)' 
            }}
            variants={fadeInUp}
          >
            BRIGHTENING CREAM
          </motion.p>
        </motion.div>

        {/* Steps Grid - Responsive Flex/Grid Layout */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
              variants={fadeInUp}
            >
              {/* Image Container */}
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 text-center">
                <h3 
                  className="text-xl sm:text-2xl lg:text-3xl font-medium mb-2 sm:mb-3"
                  style={{ 
                    color: '#3f2265',
                    fontFamily: 'var(--font-poppins)'
                  }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-sm sm:text-base lg:text-lg leading-relaxed font-normal"
                  style={{ 
                    color: '#3f2265',
                    fontFamily: 'var(--font-poppins)'
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

