'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useWhatsApp } from '../../../hooks/useWhatsApp'
import { Star, ShieldCheck, Truck, Leaf } from 'lucide-react'
import TestimonialSection from '../../../components/TestimonialSection'
import HowToUse from '../../../components/HowToUse'
import Link from 'next/link'
import { products } from '../../../data/products'
import { useAuth } from '../../../context/AuthContext'
import { useCart } from '../../../context/CartContext'
import { useRouter } from 'next/navigation'

export default function ProductDetailClient({ product }) {
  const { openWhatsAppModal } = useWhatsApp()
  const [selectedImage, setSelectedImage] = useState(product.images[0])
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const { user } = useAuth()
  const { addToCart } = useCart()
  const router = useRouter()
  
  const [addingToCart, setAddingToCart] = useState(false)
  const [addedItem, setAddedItem] = useState(false)
  
  const [addingRec, setAddingRec] = useState(null)
  const [addedRec, setAddedRec] = useState(null)

  const generateId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  // For sticky mobile bottom bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const handleAddToCart = async (e, customProduct = null) => {
    e?.preventDefault()
    const targetProduct = customProduct || product
    
    if (!user) {
      router.push(`/login?redirect=/products/${generateId(targetProduct.name)}`)
      return
    }

    if (customProduct) {
      setAddingRec(targetProduct.name)
    } else {
      setAddingToCart(true)
    }
    
    const success = await addToCart({ ...targetProduct, slug: generateId(targetProduct.name) })
    
    if (success) {
      if (customProduct) {
        setAddedRec(targetProduct.name)
        setTimeout(() => setAddedRec(null), 2000)
      } else {
        setAddedItem(true)
        setTimeout(() => setAddedItem(false), 2000)
      }
    }
    
    if (customProduct) {
      setAddingRec(null)
    } else {
      setAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    openWhatsAppModal(`Hi, I'd like to enquire about the following product:\n\n1. ${product.name} x 1\n\nPlease share pricing and availability.`)
  }

  return (
    <div className="w-full bg-white relative pb-24 lg:pb-0">
      {/* Mobile Sticky Buy Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-brand-lavender p-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="flex flex-col mr-2 shrink-0">
            <span className="text-xs text-brand-steel font-sans line-through leading-none">₹{product.mrp}</span>
            <span className="text-lg font-bold font-serif text-brand-navy leading-tight">₹{product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || addedItem}
            className="flex-1 bg-brand-pale text-brand-navy font-semibold py-2.5 px-2 rounded-xl border border-brand-lavender shadow-sm active:scale-95 transition-all disabled:opacity-80 disabled:cursor-not-allowed text-xs text-center"
          >
            {addedItem ? 'Added!' : addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-gradient-to-r from-brand-navy to-brand-periwinkle text-white font-semibold py-2.5 px-2 rounded-xl shadow-lg active:scale-95 transition-all text-xs text-center"
          >
            Order Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image with Carousel Controls */}
            <motion.div
              className="relative w-full aspect-square bg-brand-pale rounded-3xl overflow-hidden border border-brand-lavender/50 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-contain transition-transform duration-500 lg:group-hover:scale-105"
              />

              {/* Carousel Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  {product.images.indexOf(selectedImage) > 0 && (
                    <button
                      onClick={() => {
                        const currentIndex = product.images.indexOf(selectedImage)
                        setSelectedImage(product.images[currentIndex - 1])
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-brand-navy shadow-sm hover:bg-white/80 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                  )}
                  {product.images.indexOf(selectedImage) < product.images.length - 1 && (
                    <button
                      onClick={() => {
                        const currentIndex = product.images.indexOf(selectedImage)
                        setSelectedImage(product.images[currentIndex + 1])
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-brand-navy shadow-sm hover:bg-white/80 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  )}

                  {/* Dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedImage === img ? 'bg-brand-navy w-6' : 'bg-brand-navy/30'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: Product Info */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Category & Title */}
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-lavender/50 text-brand-periwinkle text-xs font-bold uppercase tracking-wider font-sans">
                {product.category}
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-brand-navy mb-4 leading-tight">
              {product.name}
            </motion.h1>

            {/* Rating */}
            <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
              <div className="flex items-center bg-brand-navy text-white px-2 py-1 rounded text-sm font-bold">
                {product.rating} <Star className="w-3 h-3 ml-1 fill-white" />
              </div>
              <span className="text-sm text-brand-steel font-sans font-medium">{product.reviewCount}</span>
            </motion.div>

            {/* Pricing Block */}
            <motion.div variants={fadeInUp} className="flex items-end gap-3 mb-6">
              <span className="text-3xl lg:text-4xl font-bold font-serif text-brand-navy">
                ₹{product.price}
              </span>
              <span className="text-lg text-brand-steel line-through mb-1">
                ₹{product.mrp}
              </span>
              <span className="text-sm font-bold text-brand-periwinkle bg-brand-lavender px-2 py-1 rounded-md mb-1">
                {product.discountPercent}
              </span>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-base lg:text-lg text-brand-steel font-sans leading-relaxed mb-8">
              {product.description}
            </motion.p>
            
            {/* Desktop Add to Cart & Buy Now */}
            <motion.div variants={fadeInUp} className="hidden lg:flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || addedItem}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-4 rounded-xl shadow-md font-semibold text-lg transition-all duration-300 bg-white border-2 border-brand-lavender text-brand-navy hover:border-brand-periwinkle hover:text-brand-periwinkle cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {addedItem ? 'Added to Cart!' : addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-12 py-4 rounded-xl shadow-md font-semibold text-lg transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle text-white hover:from-brand-periwinkle hover:to-brand-navy cursor-pointer hover:scale-[1.02]"
              >
                Order Now
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-lavender/50">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-periwinkle">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-brand-navy font-sans">100% Natural</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-periwinkle">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-brand-navy font-sans">Dermatologically<br />Tested</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-periwinkle">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-brand-navy font-sans">Cash on<br />Delivery</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Below the Fold Sections */}

      {/* Benefits Section */}
      <div className="w-full mt-12 py-16 bg-brand-pale relative border-y border-brand-lavender/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-xl md:text-3xl font-bold font-serif text-brand-navy">
              Key Benefits
            </h2>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-brand-lavender/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <ul className="space-y-4">
              {product.benefits.map((benefit, index) => (
                <motion.li key={index} variants={fadeInUp} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pale flex items-center justify-center mr-4 mt-0.5">
                    <svg className="w-4 h-4 text-brand-periwinkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] sm:text-base leading-relaxed text-brand-steel font-sans">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* How To Use Section - Only for Brightening Cream */}
      {(product.id === 1 || product.id === 6 || product.name.includes('Brightening Cream')) && (
        <div className="w-full py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-xl md:text-3xl font-bold font-serif text-brand-navy">
                How to Use
              </h2>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-[140px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-brand-navy opacity-30 z-0"></div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                {product.howToUse.map((step) => (
                  <motion.div key={step.step} className="flex flex-col items-center text-center group" variants={fadeInUp}>
                    <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] mb-6 rounded-full bg-white shadow-sm border-4 border-white overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:shadow-md flex items-center justify-center">
                      <Image src={step.image} alt={step.title} fill className="object-cover p-2 rounded-full" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-lg font-bold font-serif shadow-lg mb-4 -mt-12 relative z-20 border-4 border-white">
                      {step.step}
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl w-full max-w-[280px]">
                      <h3 className="text-xl font-bold mb-2 font-serif text-brand-navy">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-brand-steel font-sans">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}


      {/* Customer Reviews Section */}
      <div className="w-full py-16 bg-brand-pale relative border-t border-brand-lavender/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-xl md:text-3xl font-bold font-serif text-brand-navy">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-brand-lavender">
              <span className="font-bold text-brand-navy">{product.rating}</span>
              <Star className="w-4 h-4 fill-brand-periwinkle text-brand-periwinkle" />
              <span className="text-sm text-brand-steel ml-1">({product.reviewCount})</span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {product.reviews.map((review, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lavender/50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold font-serif text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm">{review.name}</h4>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-brand-periwinkle text-brand-periwinkle' : 'fill-gray-200 text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-brand-steel font-sans leading-relaxed">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Reviews Section */}
      <TestimonialSection
        title="Video Testimonials"
        subtitle="See the visible results and hear from our happy customers"
        testimonials={[
          { id: 7, quote: "Whitely has completely transformed my skincare routine! I am obsessed with the results.", name: "Customer", role: "Customer", videoSrc: "/videos/vid1.mp4" },
          { id: 6, quote: "Excellent products! Highly satisfied with the results and quality.", name: "Customer", role: "Customer", videoSrc: "/videos/vid2.mp4" },
          { id: 5, quote: "Absolutely love Whitely products! The quality is outstanding and the results speak for themselves.", name: "Customer", role: "Customer", videoSrc: "/videos/vid3.mp4" },
          { id: 3, quote: "Whitely products transformed my skincare routine. Visible results in just weeks!", name: "Sneha Reddy", role: "Customer", videoSrc: "/videos/vid4.mp4" },
          { id: 2, quote: "Love the body lotion! It keeps my skin soft and glowing all day long. Highly recommend!", name: "Anjali Patel", role: "Customer", videoSrc: "/videos/vid5.mp4" }
        ]}
      />


      {/* Product Recommendations (Horizontal Scroll) */}
      <div className="w-full py-12 bg-white relative border-t border-brand-lavender/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl md:text-3xl font-bold font-serif text-brand-navy">
              You May Also Like
            </h2>
          </div>

          {/* Slider Arrows */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="flex absolute left-2 sm:left-0 top-[55%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md items-center justify-center text-brand-navy shadow-lg hover:bg-white transition-colors z-10 border border-brand-lavender/50"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="flex absolute right-2 sm:right-0 top-[55%] -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-md items-center justify-center text-brand-navy shadow-lg hover:bg-white transition-colors z-10 border border-brand-lavender/50"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          <div 
            ref={scrollRef} 
            onScroll={checkScroll} 
            className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-4 scrollbar-hide snap-x scroll-smooth after:content-[''] after:w-px after:flex-shrink-0"
          >
            {products.filter(p => p.name !== product.name).map((recProduct, idx) => (
              <div key={idx} className="w-[240px] sm:w-[280px] flex-shrink-0 snap-start bg-white rounded-2xl border border-brand-lavender/60 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <Link href={`/products/${recProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="relative h-[240px] sm:h-[280px] w-full bg-brand-pale overflow-hidden block">
                  <Image
                    src={recProduct.images[0]}
                    alt={recProduct.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <span className="text-xs font-bold text-brand-navy">{recProduct.rating}</span>
                    <Star className="w-3 h-3 fill-brand-periwinkle text-brand-periwinkle" />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/products/${recProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                    <h3 className="font-bold font-serif text-brand-navy text-base sm:text-lg line-clamp-1 mb-1 group-hover:text-brand-periwinkle transition-colors">
                      {recProduct.name}
                    </h3>
                  </Link>
                  <p className="text-brand-steel text-xs sm:text-sm line-clamp-2 mb-4 flex-1 font-sans">
                    {recProduct.description}
                  </p>
                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] sm:text-xs text-brand-steel line-through mb-0.5">₹{recProduct.mrp}</span>
                        <span className="text-base sm:text-lg font-bold text-brand-navy">₹{recProduct.price}</span>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, recProduct)}
                        disabled={addingRec === recProduct.name || addedRec === recProduct.name}
                        className="text-xs sm:text-sm px-3 py-1.5 rounded-lg bg-brand-pale text-brand-navy font-semibold hover:bg-brand-lavender hover:text-brand-periwinkle transition-colors disabled:opacity-50"
                      >
                        {addedRec === recProduct.name ? 'Added!' : addingRec === recProduct.name ? '...' : '+ Cart'}
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
