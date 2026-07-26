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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 bg-brand-base ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl lg:text-6xl font-normal mb-2 font-serif text-brand-ink tracking-tight">
          Whitely
        </span>
        <span className="text-[10px] md:text-xs lg:text-sm uppercase tracking-[0.3em] font-semibold text-brand-muted font-sans -mt-1">
          Beauty
        </span>
      </div>
    </div>
  )
}

