'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useWhatsApp } from '../hooks/useWhatsApp'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { openWhatsAppModal } = useWhatsApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const { user, supabase } = useAuth()
  const { cart } = useCart()
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setShowUserMenu(false)
  }

  const productsList = [
    { name: 'Brightening Cream (80g)', image: '/beautycream-80g.jpeg' },
    { name: 'Brightening Cream (40g)', image: '/beauty-cream 40g.jpeg' },
    { name: 'Brightening Body Lotion', image: '/bodylotion2.jpg' },
    { name: 'Lip Mask', image: '/lipbalm-new.jpeg' },
    { name: 'Whitely Brightening Soap', image: '/soap-new.jpeg' },
    { name: 'Sunscreen', image: '/sunscreen-new.jpeg' }
  ]

  const generateId = (name) => `product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  const filteredProducts = productsList.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

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
      {/* Main Navigation Bar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-brand-base/95 backdrop-blur-md shadow-sm border-b border-brand-ink/10 py-2' 
            : 'bg-brand-base/80 backdrop-blur-sm border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-end lg:justify-between gap-4 lg:gap-8 relative min-h-[44px]">
            {/* Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none flex-shrink-0 flex items-center z-10">
              <Link href="/" className="flex flex-col items-center group">
                <span className="text-2xl lg:text-3xl font-serif text-brand-ink tracking-tight group-hover:text-brand-deep transition-colors">Whitely</span>
                <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] font-medium -mt-1 text-brand-muted font-sans group-hover:text-brand-ink transition-colors">Beauty</span>
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-12 font-sans flex-shrink-0 lg:ml-8 xl:ml-16">
              <Link href="/" className="nav-link text-sm uppercase tracking-wider text-brand-ink hover:text-brand-deep transition-colors">
                Home
              </Link>
              <Link href="/#our-products" className="nav-link text-sm uppercase tracking-wider text-brand-ink hover:text-brand-deep transition-colors">
                Products
              </Link>
              <Link href="/benefits" className="nav-link text-sm uppercase tracking-wider text-brand-ink hover:text-brand-deep transition-colors">
                Benefits
              </Link>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="nav-link text-sm uppercase tracking-wider text-brand-ink hover:text-brand-deep transition-colors">
                Contact Us
              </a>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:block relative flex-1 max-w-xs mx-auto pl-4">
              <div className="flex items-center bg-brand-soft border border-brand-ink/10 rounded-sm px-4 py-2 focus-within:border-brand-ink/30 transition-colors">
                <svg className="w-4 h-4 text-brand-muted mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-brand-ink focus:outline-none w-full placeholder-brand-muted"
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
                <div className="absolute top-full left-0 right-0 mt-2 bg-brand-base border border-brand-ink/10 shadow-lg py-2 z-[100] max-h-[400px] overflow-y-auto rounded-sm">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, idx) => (
                      <a 
                        key={idx}
                        href={`#${generateId(product.name)}`}
                        onMouseDown={() => {
                          setShowSearch(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center px-4 py-3 hover:bg-brand-soft transition-colors border-b border-brand-ink/5 last:border-0"
                      >
                        <div className="w-10 h-10 rounded-sm overflow-hidden bg-brand-soft flex-shrink-0 relative border border-brand-ink/5">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="ml-4">
                          <span className="block text-sm text-brand-ink font-serif">{product.name}</span>
                          <span className="block text-xs text-brand-muted mt-0.5 font-sans">View details</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-sm text-brand-muted text-center font-sans">
                      No products found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right CTA / Mobile Menu */}
            <div className="flex items-center flex-shrink-0 gap-3 sm:gap-5">
              {/* Cart Icon */}
              <Link href="/cart" className="relative p-2 text-brand-ink hover:text-brand-deep transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-brand-base transform translate-x-1/4 -translate-y-1/4 bg-brand-deep rounded-sm">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Menu / Login */}
              <div className="hidden sm:block relative">
                {user ? (
                  <div className="relative">
                    <button 
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center justify-center w-8 h-8 rounded-sm bg-brand-soft border border-brand-ink/10 text-brand-ink font-serif hover:bg-brand-deep hover:text-brand-base transition-colors"
                    >
                      {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-brand-base shadow-lg border border-brand-ink/10 py-1 z-[100] rounded-sm">
                        <div className="px-4 py-3 border-b border-brand-ink/5">
                          <p className="text-sm font-serif text-brand-ink truncate">
                            {user.user_metadata?.full_name || 'User'}
                          </p>
                          <p className="text-xs text-brand-muted truncate font-sans">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-brand-ink hover:bg-brand-soft transition-colors font-sans"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login" className="text-xs uppercase tracking-wider font-semibold text-brand-ink hover:text-brand-deep transition-colors border border-brand-ink/20 px-3 py-1.5 rounded-sm hover:border-brand-deep">
                    Sign In
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-brand-ink hover:text-brand-deep transition-colors"
              >
                <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Announcement bar below navbar */}
      <div className="w-full py-2 overflow-hidden relative bg-brand-ink">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        <div className="marquee-container flex items-center">
          <div className="marquee-content flex items-center whitespace-nowrap">
            <span className="text-brand-base font-medium text-xs sm:text-sm uppercase flex items-center font-sans tracking-widest">
              <span className="mr-2 opacity-80">✦</span>
              ORDER NOW ONLINE TO GET GREAT DISCOUNT
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Slide-in from Right/Bottom Drawer Style */}
      <div 
        className={`lg:hidden fixed inset-0 z-[100] bg-brand-ink/20 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-brand-base shadow-2xl transition-transform duration-300 ease-in-out z-[101] rounded-l-sm flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-brand-ink/10 shrink-0">
          <span className="font-serif text-xl text-brand-ink">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="text-brand-muted hover:text-brand-ink">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 bg-brand-base">
          <div className="flex flex-col space-y-1 px-4 font-sans uppercase tracking-wider text-sm">
            <Link href="/" className="py-3 px-2 text-brand-ink hover:bg-brand-soft rounded-sm transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/#our-products" className="py-3 px-2 text-brand-ink hover:bg-brand-soft rounded-sm transition-colors" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link href="/benefits" className="py-3 px-2 text-brand-ink hover:bg-brand-soft rounded-sm transition-colors" onClick={() => setIsMenuOpen(false)}>Benefits</Link>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="py-3 px-2 text-brand-ink hover:bg-brand-soft rounded-sm transition-colors" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
          </div>
        </div>

        <div className="p-4 border-t border-brand-ink/10 bg-brand-soft shrink-0">
          {user ? (
            <button 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-center font-medium py-3 px-4 border border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-brand-base rounded-sm transition-colors text-sm uppercase tracking-wider"
            >
              Sign Out ({user.user_metadata?.full_name || 'User'})
            </button>
          ) : (
            <Link 
              href="/login" 
              className="block w-full text-center font-medium py-3 px-4 bg-brand-deep text-brand-base hover:bg-brand-ink rounded-sm transition-colors text-sm uppercase tracking-wider" 
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In / Register
            </Link>
          )}
        </div>
      </div>

      {/* Secondary Announcement Bar */}
      <a href="#our-products" className="hidden sm:block w-full bg-brand-soft border-b border-brand-ink/10 py-2.5 px-4 relative cursor-pointer hover:bg-brand-pale transition-colors group">
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center text-brand-ink text-xs font-sans tracking-wide pl-12 uppercase">
            <span className="mr-3 opacity-60">✦</span>
            New Launch! Whitely Products &ndash; 100% Natural | Visible Results
          </div>
          <span className="text-brand-ink font-medium transition-transform group-hover:translate-x-1 pr-12 text-sm">→</span>
        </div>
      </a>
    </>
  )
}
