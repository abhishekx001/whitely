'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useWhatsApp } from '../../../hooks/useWhatsApp'
import { Star, ShieldCheck, Truck, Leaf } from 'lucide-react'
import TestimonialSection from '../../../components/TestimonialSection'
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
    <div className="w-full bg-brand-base relative pb-24 lg:pb-0">
      {/* Mobile Sticky Buy Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 bg-brand-base border-t border-brand-ink/10 p-3 z-50 shadow-lg transition-transform duration-300 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <div className="flex flex-col mr-2 shrink-0">
            <span className="text-[10px] text-brand-muted font-sans line-through leading-none">₹{product.mrp}</span>
            <span className="text-lg font-normal font-serif text-brand-ink leading-tight">₹{product.price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || addedItem}
            className="flex-1 bg-brand-soft text-brand-ink font-semibold py-2.5 px-2 rounded-sm border border-brand-ink/20 hover:bg-brand-pale transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs text-center uppercase tracking-wider"
          >
            {addedItem ? 'Added!' : addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-brand-deep hover:bg-brand-ink text-brand-base font-semibold py-2.5 px-2 rounded-sm transition-colors text-xs text-center uppercase tracking-wider"
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
              className="relative w-full aspect-[4/5] bg-brand-soft rounded-sm overflow-hidden border border-brand-ink/5 group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 lg:group-hover:scale-105"
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-brand-base/80 backdrop-blur-sm flex items-center justify-center text-brand-ink shadow-sm hover:bg-brand-base transition-colors border border-brand-ink/10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                  )}
                  {product.images.indexOf(selectedImage) < product.images.length - 1 && (
                    <button
                      onClick={() => {
                        const currentIndex = product.images.indexOf(selectedImage)
                        setSelectedImage(product.images[currentIndex + 1])
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-brand-base/80 backdrop-blur-sm flex items-center justify-center text-brand-ink shadow-sm hover:bg-brand-base transition-colors border border-brand-ink/10"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  )}

                  {/* Dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`h-1 transition-all duration-300 rounded-none ${selectedImage === img ? 'bg-brand-ink w-8' : 'bg-brand-ink/30 w-4'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: Product Info */}
          <motion.div
            className="flex flex-col pt-4 lg:pt-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Category & Title */}
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block px-3 py-1 bg-brand-soft border border-brand-ink/10 text-brand-muted text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                {product.category}
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-brand-ink mb-6 leading-tight">
              {product.name}
            </motion.h1>

            {/* Rating */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <div className="flex items-center text-brand-ink">
                {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-ink text-brand-ink' : 'text-brand-ink/20'}`} />
                ))}
              </div>
              <span className="text-sm text-brand-muted font-sans uppercase tracking-wider">{product.reviewCount} Reviews</span>
            </motion.div>

            {/* Pricing Block */}
            <motion.div variants={fadeInUp} className="flex items-end gap-4 mb-8 pb-8 border-b border-brand-ink/10">
              <span className="text-3xl lg:text-4xl font-normal font-serif text-brand-ink">
                ₹{product.price}
              </span>
              <span className="text-lg text-brand-muted line-through mb-1">
                ₹{product.mrp}
              </span>
              <span className="text-xs font-semibold text-brand-ink bg-brand-soft border border-brand-ink/10 px-2 py-1 mb-1 uppercase tracking-wider">
                {product.discountPercent}
              </span>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-sm lg:text-base text-brand-ink/80 font-sans leading-relaxed mb-10">
              {product.description}
            </motion.p>
            
            {/* Desktop Add to Cart & Buy Now */}
            <motion.div variants={fadeInUp} className="hidden lg:flex gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || addedItem}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 shadow-sm font-semibold text-sm uppercase tracking-wider transition-colors duration-300 bg-brand-base border border-brand-ink/20 text-brand-ink hover:bg-brand-soft disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                {addedItem ? 'Added to Cart' : addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 inline-flex items-center justify-center px-12 py-4 shadow-sm font-semibold text-sm uppercase tracking-wider transition-colors duration-300 bg-brand-deep text-brand-base hover:bg-brand-ink rounded-sm"
              >
                Order Now
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-ink/10">
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-sm bg-brand-soft flex items-center justify-center text-brand-ink transition-colors group-hover:bg-brand-ink group-hover:text-brand-base border border-brand-ink/5">
                  <Leaf className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">100%<br />Natural</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-sm bg-brand-soft flex items-center justify-center text-brand-ink transition-colors group-hover:bg-brand-ink group-hover:text-brand-base border border-brand-ink/5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Derm<br />Tested</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-sm bg-brand-soft flex items-center justify-center text-brand-ink transition-colors group-hover:bg-brand-ink group-hover:text-brand-base border border-brand-ink/5">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted font-sans">Cash on<br />Delivery</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Below the Fold Sections */}

      {/* Benefits Section */}
      <div className="w-full mt-12 py-16 bg-brand-soft relative border-y border-brand-ink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4 font-sans">
              Why it works
            </p>
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-brand-ink">
              Key Benefits
            </h2>
            <div className="flex items-center justify-center mt-6">
              <div className="h-[1px] w-8 bg-brand-ink/20"></div>
              <span className="mx-4 text-brand-ink/40 text-sm">✦</span>
              <div className="h-[1px] w-8 bg-brand-ink/20"></div>
            </div>
          </motion.div>

          <motion.div
            className="bg-brand-base rounded-sm p-8 lg:p-12 border border-brand-ink/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <ul className="space-y-6">
              {product.benefits.map((benefit, index) => (
                <motion.li key={index} variants={fadeInUp} className="flex items-start group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-sm bg-brand-soft flex items-center justify-center mr-6 border border-brand-ink/10 group-hover:bg-brand-ink group-hover:text-brand-base transition-colors text-brand-ink">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base leading-relaxed text-brand-ink/80 font-sans pt-0.5">
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
        <div className="w-full py-16 bg-brand-base relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4 font-sans">
                Simple Routine
              </p>
              <h2 className="text-3xl md:text-4xl font-normal font-serif text-brand-ink">
                How to Use
              </h2>
              <div className="flex items-center justify-center mt-6">
                <div className="h-[1px] w-8 bg-brand-ink/20"></div>
                <span className="mx-4 text-brand-ink/40 text-sm">✦</span>
                <div className="h-[1px] w-8 bg-brand-ink/20"></div>
              </div>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-[140px] left-[15%] right-[15%] h-[1px] bg-brand-ink/10 z-0"></div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                {product.howToUse.map((step) => (
                  <motion.div key={step.step} className="flex flex-col items-center text-center group" variants={fadeInUp}>
                    <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] mb-8 rounded-sm bg-brand-base shadow-sm border border-brand-ink/10 overflow-hidden transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                      <Image src={step.image} alt={step.title} fill className="object-cover p-2 rounded-sm" />
                    </div>
                    <div className="w-8 h-8 rounded-sm bg-brand-ink text-brand-base flex items-center justify-center text-sm font-bold font-serif mb-4 -mt-12 relative z-20 group-hover:bg-brand-deep transition-colors">
                      {step.step}
                    </div>
                    <div className="px-4 py-2 w-full max-w-[280px]">
                      <h3 className="text-lg font-normal mb-2 font-serif text-brand-ink">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-brand-ink/70 font-sans">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      )}


      {/* Customer Reviews Section */}
      <div className="w-full py-20 bg-brand-soft relative border-t border-brand-ink/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-brand-ink">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3 bg-brand-base px-6 py-3 rounded-sm border border-brand-ink/10">
              <span className="font-serif text-xl text-brand-ink">{product.rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-ink text-brand-ink' : 'text-brand-ink/20'}`} />
                ))}
              </div>
              <span className="text-sm text-brand-muted uppercase tracking-wider ml-2">{product.reviewCount} Reviews</span>
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
                className="bg-brand-base rounded-sm p-8 border border-brand-ink/10 transition-shadow duration-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-sm bg-brand-soft text-brand-ink flex items-center justify-center font-serif text-lg border border-brand-ink/5">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold font-sans text-brand-ink text-sm uppercase tracking-wider">{review.name}</h4>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-brand-ink text-brand-ink' : 'fill-brand-ink/10 text-brand-ink/10'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-brand-ink/80 font-sans leading-relaxed italic">
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
      <div className="w-full py-20 bg-brand-base relative border-t border-brand-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal font-serif text-brand-ink">
              You May Also Like
            </h2>
            <div className="flex items-center justify-center mt-6">
              <div className="h-[1px] w-8 bg-brand-ink/20"></div>
              <span className="mx-4 text-brand-ink/40 text-sm">✦</span>
              <div className="h-[1px] w-8 bg-brand-ink/20"></div>
            </div>
          </div>

          {/* Slider Arrows */}
          {showLeftArrow && (
            <button 
              onClick={() => scroll('left')}
              className="flex absolute left-2 sm:left-0 top-[60%] -translate-y-1/2 w-12 h-12 rounded-sm bg-brand-base/90 backdrop-blur-sm items-center justify-center text-brand-ink shadow-sm hover:bg-brand-soft transition-colors z-10 border border-brand-ink/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          
          {showRightArrow && (
            <button 
              onClick={() => scroll('right')}
              className="flex absolute right-2 sm:right-0 top-[60%] -translate-y-1/2 w-12 h-12 rounded-sm bg-brand-base/90 backdrop-blur-sm items-center justify-center text-brand-ink shadow-sm hover:bg-brand-soft transition-colors z-10 border border-brand-ink/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          <div 
            ref={scrollRef} 
            onScroll={checkScroll} 
            className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 gap-6 scrollbar-hide snap-x scroll-smooth"
          >
            {products.filter(p => p.name !== product.name).map((recProduct, idx) => (
              <div key={idx} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start bg-brand-base rounded-sm border border-brand-ink/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <Link href={`/products/${recProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="relative h-[320px] w-full bg-brand-soft overflow-hidden block">
                  <Image
                    src={recProduct.images[0]}
                    alt={recProduct.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/products/${recProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                    <h3 className="font-normal font-serif text-brand-ink text-lg line-clamp-1 mb-2 group-hover:text-brand-deep transition-colors">
                      {recProduct.name}
                    </h3>
                  </Link>
                  <p className="text-brand-muted text-xs sm:text-sm line-clamp-2 mb-6 flex-1 font-sans">
                    {recProduct.description}
                  </p>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-brand-muted line-through mb-1">₹{recProduct.mrp}</span>
                      <span className="text-lg font-normal font-serif text-brand-ink">₹{recProduct.price}</span>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, recProduct)}
                      disabled={addingRec === recProduct.name || addedRec === recProduct.name}
                      className="text-xs uppercase tracking-wider px-4 py-2 rounded-sm bg-brand-base border border-brand-ink/20 text-brand-ink font-semibold hover:bg-brand-soft transition-colors disabled:opacity-50"
                    >
                      {addedRec === recProduct.name ? 'Added' : addingRec === recProduct.name ? '...' : '+ Cart'}
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
