'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { products } from '../../data/products'
import { useWhatsApp } from '../../hooks/useWhatsApp'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, loading } = useCart()
  const { user } = useAuth()
  const { openWhatsAppModal } = useWhatsApp()
  
  const generateId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  // Hydrate cart items with product details from static data
  const cartItems = cart.map(item => {
    const productDetail = products.find(p => p.name === item.product_name || generateId(p.name) === item.product_slug)
    return {
      ...item,
      image: productDetail?.images?.[0] || productDetail?.image || '/placeholder.png', // Adjust based on data structure
      price: productDetail ? parseInt(productDetail.price || productDetail.indiaPrice?.replace(/,/g, '') || 0) : 0,
      mrp: productDetail ? parseInt(productDetail.mrp || productDetail.indiaMRP?.replace(/,/g, '') || 0) : 0,
    }
  })

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    let message = "Hi, I'd like to enquire about the following products:\n\n"
    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. ${item.product_name} x ${item.quantity}\n`
    })
    message += "\nPlease share pricing and availability."
    
    // Open country selector with this message
    openWhatsAppModal(message)
    
    // Optionally clear cart? The user might want to keep it until confirmed, 
    // but the spec mentioned considering it. We'll leave it for now to avoid data loss.
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-brand-soft">
        <div className="bg-brand-base p-8 rounded-sm shadow-sm border border-brand-ink/10 max-w-md w-full text-center">
          <ShoppingBag className="w-16 h-16 text-brand-ink mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-normal font-serif text-brand-ink mb-2">Sign in to view cart</h2>
          <p className="text-brand-muted mb-6 font-sans">You need to be logged in to save and checkout your items.</p>
          <Link 
            href="/login?redirect=/cart"
            className="inline-flex w-full justify-center py-3 px-4 border border-brand-ink/20 rounded-sm shadow-sm text-sm font-semibold text-brand-base bg-brand-deep hover:bg-brand-ink transition-colors uppercase tracking-wider"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-soft py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-normal font-serif text-brand-ink">Your Cart</h1>
          <span className="text-sm font-sans text-brand-muted mt-2 uppercase tracking-wider">{cartItems.length} items</span>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-2 border-brand-ink border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-base rounded-sm p-12 text-center border border-brand-ink/10 shadow-sm"
          >
            <ShoppingBag className="w-16 h-16 text-brand-ink/20 mx-auto mb-6" />
            <h2 className="text-2xl font-normal font-serif text-brand-ink mb-3">Your cart is empty</h2>
            <p className="text-brand-muted mb-8 font-sans">Looks like you haven't added any products yet.</p>
            <Link 
              href="/#our-products"
              className="inline-flex px-8 py-3 rounded-sm text-brand-base font-semibold bg-brand-deep hover:bg-brand-ink transition-colors uppercase tracking-wider text-sm shadow-sm"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.3 }}
                    className="bg-brand-base p-4 sm:p-6 rounded-sm border border-brand-ink/10 shadow-sm flex flex-col sm:flex-row gap-6 items-center"
                  >
                    {/* Product Image */}
                    <Link href={`/products/${item.product_slug}`} className="relative w-24 h-24 sm:w-32 sm:h-32 bg-brand-soft rounded-sm overflow-hidden flex-shrink-0 border border-brand-ink/5">
                      <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full w-full">
                      <Link href={`/products/${item.product_slug}`}>
                        <h3 className="font-normal font-serif text-brand-ink text-lg hover:text-brand-deep transition-colors">
                          {item.product_name}
                        </h3>
                      </Link>
                      
                      <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-start mt-4 sm:mt-auto gap-4 sm:gap-8">
                        <div className="flex items-center border border-brand-ink/20 rounded-sm overflow-hidden bg-brand-soft/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-brand-ink hover:bg-brand-ink hover:text-brand-base transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-bold text-brand-ink font-sans bg-brand-base h-10 leading-[40px]">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-brand-ink hover:bg-brand-ink hover:text-brand-base transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-center sm:text-right">
                          <p className="text-xl font-normal font-serif text-brand-ink">₹{item.price * item.quantity}</p>
                          {item.mrp > item.price && (
                            <p className="text-xs text-brand-muted line-through">₹{item.mrp * item.quantity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-2 text-brand-muted hover:text-brand-base hover:bg-brand-ink rounded-sm transition-colors border border-transparent hover:border-brand-ink/20"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Order Summary */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-brand-base rounded-sm p-6 sm:p-8 border border-brand-ink/10 shadow-sm sticky top-28">
                <h2 className="text-xl font-normal font-serif text-brand-ink mb-6">Order Summary</h2>
                
                <div className="space-y-4 font-sans text-sm mb-6 pb-6 border-b border-brand-ink/10">
                  <div className="flex justify-between text-brand-ink/80">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-ink">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-ink/80">
                    <span>Shipping</span>
                    <span className="text-brand-ink font-medium">Calculated on WhatsApp</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-normal text-xl text-brand-ink mb-8 font-serif">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-sm text-brand-base font-semibold bg-brand-deep hover:bg-brand-ink transition-colors uppercase tracking-wider text-sm shadow-sm"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <p className="mt-4 text-[10px] text-center text-brand-muted font-sans leading-relaxed uppercase tracking-wider">
                  You will be redirected to WhatsApp to confirm availability, shipping details, and complete your order.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
