'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Show navbar at the top
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up - show navbar
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Main Navigation Bar */}
      <nav 
        className={`shadow-sm sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        style={{ backgroundColor: '#f5f0ff' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex flex-col items-center">
                <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '0.5px', color: '#3a2a55' }}>whiteLy</span>
                <span className="text-xs uppercase tracking-wider font-semibold -mt-1" style={{ fontFamily: 'var(--font-poppins)', color: '#3a2a55' }}>beauty</span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              <a href="#our-products" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                Products
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                Contact Us
              </a>
              <Link href="/how-to-use" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                How To Use
              </Link>
              <Link href="/about" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                About Us
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Get in Touch Button */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-none text-white text-sm font-semibold transition-all hover:scale-105 shadow-md"
                style={{ 
                  backgroundColor: '#3f2265',
                  fontFamily: 'var(--font-poppins)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a3a8a'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3f2265'}
              >
                Order Now
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden ml-2 transition-all duration-300"
                style={{ color: '#3f2265' }}
                onMouseEnter={(e) => e.target.style.color = '#5a3a8a'}
                onMouseLeave={(e) => e.target.style.color = '#3f2265'}
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

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Mobile Menu Sidebar */}
          <div 
            className={`lg:hidden fixed top-0 right-0 h-3/5 w-56 z-50 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ backgroundColor: '#4d2d73' }}
          >
            <div className="flex flex-col h-full py-4 px-3 overflow-hidden">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
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
              <div className="flex flex-col space-y-2 overflow-y-auto flex-1" style={{ fontFamily: 'var(--font-poppins)' }}>
                <a 
                  href="#our-products"
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
                <a 
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </a>
                <Link 
                  href="/how-to-use" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How To Use
                </Link>
                <Link 
                  href="/about" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Promotional Banner */}
      <div 
        className={`py-2 px-4 transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
        style={{ backgroundColor: '#d3ccd1' }}
      >
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm" style={{ fontFamily: 'var(--font-poppins)', color: '#3f2265' }}>
          <span className="text-lg">🍃</span>
          <span className="flex-1">New Launch! Whitely Products – 100% Natural | Visible Results Guaranteed</span>
          <span>→</span>
        </div>
      </div>
    </>
  )
}

