'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CountrySelectModal({ isOpen, onClose, messageText }) {
  const handleCountrySelect = (countryCode) => {
    // Phone numbers configuration
    const numbers = {
      india: '917306633619',
      qatar: '97471965716'
    }

    const number = numbers[countryCode]
    const encodedMessage = encodeURIComponent(messageText)
    const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden pointer-events-auto border border-[#7b34a2]/20"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#7b34a2]">
                  Where are you ordering from?
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 font-sans text-sm sm:text-base">
                  Please select your location so we can direct you to the correct regional WhatsApp support.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* India Card */}
                  <button
                    onClick={() => handleCountrySelect('india')}
                    className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl border-2 border-gray-100 hover:border-[#7b34a2] hover:bg-[#7b34a2]/5 transition-all duration-300 group"
                  >
                    <span className="text-5xl sm:text-6xl mb-3 sm:mb-4 drop-shadow-sm group-hover:scale-110 transition-transform duration-300">🇮🇳</span>
                    <span className="font-semibold text-lg text-gray-800 group-hover:text-[#7b34a2] transition-colors font-sans">
                      India
                    </span>
                  </button>

                  {/* Qatar Card */}
                  <button
                    onClick={() => handleCountrySelect('qatar')}
                    className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl border-2 border-gray-100 hover:border-[#7b34a2] hover:bg-[#7b34a2]/5 transition-all duration-300 group"
                  >
                    <span className="text-5xl sm:text-6xl mb-3 sm:mb-4 drop-shadow-sm group-hover:scale-110 transition-transform duration-300">🇶🇦</span>
                    <span className="font-semibold text-lg text-gray-800 group-hover:text-[#7b34a2] transition-colors font-sans">
                      Qatar
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
