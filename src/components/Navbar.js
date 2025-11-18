'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '0.5px', color: '#2a1a45' }}>whiteLy</span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6" style={{ fontFamily: 'var(--font-poppins)' }}>
              <Link href="/" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                Home
              </Link>
              <Link href="/about" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                About Us
              </Link>
              <Link href="/contact" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                Contact Us
              </Link>
              <Link href="/how-to-use" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                How To Use
              </Link>
              <Link href="/products" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                Products
              </Link>
              <Link href="/blog" className="nav-link font-normal pb-1 transition-colors" style={{ color: '#3f2265' }} onMouseEnter={(e) => e.target.style.color = '#5a3a8a'} onMouseLeave={(e) => e.target.style.color = '#3f2265'}>
                Blog
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Buy Now Button */}
              <button 
                className="px-4 py-2 rounded-full text-white font-semibold transition-all hover:scale-105 shadow-md"
                style={{ 
                  backgroundColor: '#3f2265',
                  fontFamily: 'var(--font-poppins)'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a3a8a'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3f2265'}
              >
                Buy Now
              </button>

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
                <Link 
                  href="/" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  href="/contact" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link 
                  href="/how-to-use" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How To Use
                </Link>
                <Link 
                  href="/products" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/blog" 
                  className="font-normal py-2.5 px-3 transition-all duration-200 rounded text-white hover:bg-[#5a3a8a]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Promotional Banner */}
      <div className="py-2 px-4" style={{ backgroundColor: '#d3ccd1' }}>
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm" style={{ fontFamily: 'var(--font-poppins)', color: '#3f2265' }}>
          <span className="text-lg">🍃</span>
          <span className="flex-1">New Launch! Whitely Products – 100% Natural | Visible Results Guaranteed</span>
          <span>→</span>
        </div>
      </div>
    </>
  )
}

