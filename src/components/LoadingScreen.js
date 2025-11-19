'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    // Fade out after 1 second
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Remove from DOM after fade out animation completes
      setTimeout(() => {
        setIsMounted(false)
      }, 500) // Match transition duration
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#f5f0ff' }}
    >
      <div className="flex flex-col items-center">
        <span 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
          style={{ 
            fontFamily: 'var(--font-playfair)', 
            letterSpacing: '0.5px', 
            color: '#3a2a55' 
          }}
        >
          whiteLy
        </span>
        <span 
          className="text-sm md:text-base lg:text-lg uppercase tracking-wider font-semibold"
          style={{ 
            fontFamily: 'var(--font-poppins)', 
            color: '#3a2a55' 
          }}
        >
          beauty
        </span>
      </div>
    </div>
  )
}

