'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const productsList = [
    { name: 'Brightening Cream (80g)', image: '/beautycream1.jpg' },
    { name: 'Brightening Cream (40g)', image: '/beauty-cream 40g.jpeg' },
    { name: 'Brightening Body Lotion', image: '/bodylotion2.jpg' },
    { name: 'Lip Mask', image: '/lipbalm-new.jpeg' },
    { name: 'Whitely Brightening Soap', image: '/soap-new.jpeg' },
    { name: 'Sunscreen', image: '/sunscreen-new.jpeg' }
  ]

  const generateId = (name) => `product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  const filteredProducts = productsList.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
  const whatsappUrl = 'https://wa.me/917306633619?text=product%20details'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleProductClick = () => {
    setShowSearch(false)
    setIsMenuOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      {/* Announcement bar above navbar */}
      <div className="w-full py-2 overflow-hidden relative bg-brand-navy">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        <div className="marquee-container flex items-center">
          <div className="marquee-content flex items-center whitespace-nowrap">
            <span className="text-white font-medium text-xs sm:text-sm uppercase flex items-center font-sans tracking-wide">
              <span className="mr-2">✨</span>
              ORDER NOW ONLINE TO GET GREAT DISCOUNT
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-brand-pale/90 backdrop-blur-md shadow-sm border-b border-brand-lavender' 
            : 'bg-brand-pale/70 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex flex-col items-center">
                <span className="text-2xl lg:text-3xl font-bold font-serif text-brand-navy tracking-wide">Whitely</span>
                <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] font-semibold -mt-1 text-brand-steel font-sans">Beauty</span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 font-sans flex-shrink-0 lg:ml-12 xl:ml-24">
              <a href="#our-products" className="nav-link font-medium text-brand-steel hover:text-brand-navy transition-colors">
                Products
              </a>
              <a href="#reviews" className="nav-link font-medium text-brand-steel hover:text-brand-navy transition-colors">
                Reviews
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="nav-link font-medium text-brand-steel hover:text-brand-navy transition-colors">
                Contact Us
              </a>
              <a href="#how-to-use" className="nav-link font-medium text-brand-steel hover:text-brand-navy transition-colors">
                How To Use
              </a>
            </div>

            {/* Search Bar - Desktop (Placed in between Nav Links and CTA) */}
            <div className="hidden lg:block relative flex-1 max-w-xs xl:max-w-sm mx-auto pl-4">
              <div className="flex items-center bg-white border border-brand-lavender rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-brand-periwinkle focus-within:border-transparent transition-all shadow-sm">
                <svg className="w-4 h-4 text-brand-steel mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-sm text-brand-navy focus:outline-none w-full placeholder-brand-steel"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSearch(true)
                  }}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                />
              </div>

              {/* Search Dropdown Desktop */}
              {showSearch && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl border border-brand-lavender py-3 z-[100] max-h-[400px] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, idx) => (
                      <a 
                        key={idx}
                        href={`#${generateId(product.name)}`}
                        onMouseDown={() => {
                          setShowSearch(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center px-4 py-3 hover:bg-brand-lavender/50 transition-colors border-b border-brand-lavender/30 last:border-0"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-pale flex-shrink-0 relative border border-brand-lavender/50">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="ml-4">
                          <span className="block text-sm font-bold text-brand-navy">{product.name}</span>
                          <span className="block text-xs text-brand-steel mt-0.5">View details</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-sm text-brand-steel text-center">
                      No products found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right CTA / Mobile Menu */}
            <div className="flex items-center flex-shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-6 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy hover:scale-105 hover:shadow-[0_0_15px_rgba(112,145,230,0.4)]"
              >
                Order Now
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden ml-4 p-2 rounded-md text-brand-navy hover:bg-brand-lavender transition-colors"
              >
                <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Slide-down Drawer */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-b border-brand-lavender transition-all duration-300 ease-in-out overflow-hidden origin-top ${
            isMenuOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-1 px-4 py-6 font-sans">

            <a href="#our-products" className="block text-center font-medium py-3 px-4 rounded-xl text-brand-steel hover:text-brand-periwinkle hover:bg-brand-lavender transition-colors" onClick={() => setIsMenuOpen(false)}>Products</a>
            <a href="#reviews" className="block text-center font-medium py-3 px-4 rounded-xl text-brand-steel hover:text-brand-periwinkle hover:bg-brand-lavender transition-colors" onClick={() => setIsMenuOpen(false)}>Reviews</a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="block text-center font-medium py-3 px-4 rounded-xl text-brand-steel hover:text-brand-periwinkle hover:bg-brand-lavender transition-colors" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
            <a href="#how-to-use" className="block text-center font-medium py-3 px-4 rounded-xl text-brand-steel hover:text-brand-periwinkle hover:bg-brand-lavender transition-colors" onClick={() => setIsMenuOpen(false)}>How To Use</a>
            
            <div className="pt-6 pb-2 px-2 flex justify-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center w-[200px] px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle shadow-md" onClick={() => setIsMenuOpen(false)}>
                Order Now
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
