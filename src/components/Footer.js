'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <footer className="w-full bg-brand-navy pt-16 lg:pt-24 pb-8 border-t border-brand-lavender">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Logo & Description Column (Brand) */}
          <motion.div variants={fadeInUp} className="flex flex-col">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold font-serif text-white tracking-wide block">Whitely</span>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-brand-lavender font-sans block mt-1">Beauty</span>
            </Link>
            <p className="text-brand-lavender text-sm leading-relaxed font-sans mb-6 pr-4">
              Premium, nature-infused skincare designed to rejuvenate, protect, and illuminate your skin. Discover your natural glow.
            </p>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-6 font-serif text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 font-sans">
              <li><Link href="/search" className="text-sm text-brand-lavender hover:text-white transition-colors">Search</Link></li>
              <li><Link href="/about" className="text-sm text-brand-lavender hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-brand-lavender hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/track-order" className="text-sm text-brand-lavender hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </motion.div>

          {/* Info Column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-6 font-serif text-white">
              Information
            </h3>
            <ul className="space-y-3 font-sans">
              <li><Link href="/terms" className="text-sm text-brand-lavender hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/shipping" className="text-sm text-brand-lavender hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/privacy" className="text-sm text-brand-lavender hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cancellation" className="text-sm text-brand-lavender hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </motion.div>

          {/* Social & Promise Column */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg font-bold mb-6 font-serif text-white">
              Connect With Us
            </h3>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-8">
              {/* Facebook */}
              <a href="https://www.facebook.com/share/181UEASokN/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-periwinkle hover:bg-gradient-to-r hover:from-brand-periwinkle hover:to-brand-navy hover:text-white hover:border-transparent transition-all duration-300 group">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-periwinkle hover:bg-gradient-to-r hover:from-brand-periwinkle hover:to-brand-navy hover:text-white hover:border-transparent transition-all duration-300 group">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com/@whitelybeauty?si=IeTY0_8lf6nfdntG" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand-periwinkle hover:bg-gradient-to-r hover:from-brand-periwinkle hover:to-brand-navy hover:text-white hover:border-transparent transition-all duration-300 group">
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2 font-sans">Our Promise</h4>
            <p className="text-sm text-brand-lavender font-sans">
              Committed to responsible beauty. 100% results on all skin types.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-brand-lavender flex flex-col md:flex-row justify-between items-center gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <p className="text-sm text-brand-lavender font-sans">
            © {new Date().getFullYear()} Whitely. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-brand-lavender font-sans">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
