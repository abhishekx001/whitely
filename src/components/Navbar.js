'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  const whatsappUrl = 'https://wa.me/917306633619?text=product%20details'

  useEffect(() => {
    // Navbar always visible - no fade out on scroll
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Marquee Banner */}
      <div 
        className="w-full py-1 overflow-hidden relative"
        style={{ backgroundColor: '#3f2265' }}
      >
        <div className="marquee-container flex items-center">
          <div className="marquee-content flex items-center whitespace-nowrap">
            <span className="text-white font-medium text-xs sm:text-sm uppercase flex items-center" style={{ fontFamily: 'var(--font-poppins)' }}>
              <span className="mr-2">🚀</span>
              ORDER NOW ONLINE TO GET GREAT DISCOUNT
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`shadow-sm sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex flex-col items-center">
                <span className="text-2xl lg:text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '0.5px', color: '#3a2a55' }}>whiteLy</span>
                <span className="text-[10px] lg:text-xs uppercase tracking-wider font-semibold -mt-1" style={{ fontFamily: 'var(--font-poppins)', color: '#3a2a55' }}>beauty</span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              <a href="#our-products" className="nav-link font-normal pb-1 transition-colors hover:opacity-80" style={{ color: '#3f2265' }}>
                Products
              </a>
              <a href="#reviews" className="nav-link font-normal pb-1 transition-colors hover:opacity-80" style={{ color: '#3f2265' }}>
                Reviews
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="nav-link font-normal pb-1 transition-colors hover:opacity-80" style={{ color: '#3f2265' }}>
                Contact Us
              </a>
              <a href="#how-to-use" className="nav-link font-normal pb-1 transition-colors hover:opacity-80" style={{ color: '#3f2265' }}>
                How To Use
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Get in Touch Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-none text-white text-sm font-semibold transition-all hover:scale-105 hover:bg-[#5a3a8a] shadow-md"
                style={{ 
                  backgroundColor: '#3f2265',
                  fontFamily: 'var(--font-poppins)'
                }}
              >
                Order Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden ml-2 transition-all duration-300 hover:opacity-80"
                style={{ color: '#3f2265' }}
              >
                <svg 
                  className={`w-6 h-6 transition-all duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12"
                      className="transition-opacity duration-300"
                    />
                  ) : (
                    <>
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16"
                        className="transition-all duration-300"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 12h16"
                        className="transition-all duration-300"
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 18h16"
                        className="transition-all duration-300"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-2/3 w-64 z-[70] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ backgroundColor: '#4d2d73', pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
            <div className="flex flex-col h-full py-6 px-4">
              {/* Close Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white transition-all duration-300 hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col space-y-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                <a 
                  href="#our-products"
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white bg-[#5a3a8a] hover:bg-[#6b4a9a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
                <a 
                  href="#reviews"
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white bg-[#5a3a8a] hover:bg-[#6b4a9a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reviews
                </a>
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white bg-[#5a3a8a] hover:bg-[#6b4a9a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </a>
                <a 
                  href="#how-to-use" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white bg-[#5a3a8a] hover:bg-[#6b4a9a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How To Use
                </a>
              </div>
            </div>
          </div>

      {/* Promotional Banner */}
      <div 
        className={`py-2 px-4 transition-all duration-300 ease-in-out overflow-hidden ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        style={{ backgroundColor: '#d3ccd1' }}
      >
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-poppins)', color: '#3f2265' }}>
          <span className="text-lg flex-shrink-0">🍃</span>
          <span className="flex-1 min-w-0 truncate">New Launch! Whitely Products – 100% Natural | Visible Results Guaranteed</span>
          <span className="flex-shrink-0">→</span>
        </div>
      </div>
    </>
  )
}

