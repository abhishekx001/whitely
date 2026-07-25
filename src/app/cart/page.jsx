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
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-brand-pale">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-lavender/50 max-w-md w-full text-center">
          <ShoppingBag className="w-16 h-16 text-brand-periwinkle mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-serif text-brand-navy mb-2">Sign in to view cart</h2>
          <p className="text-brand-steel mb-6 font-sans">You need to be logged in to save and checkout your items.</p>
          <Link 
            href="/login?redirect=/cart"
            className="inline-flex w-full justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-pale py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-navy mb-8">Your Cart</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-brand-periwinkle border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center border border-brand-lavender/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <ShoppingBag className="w-20 h-20 text-brand-lavender mx-auto mb-6" />
            <h2 className="text-2xl font-bold font-serif text-brand-navy mb-3">Your cart is empty</h2>
            <p className="text-brand-steel mb-8 font-sans">Looks like you haven't added any products yet.</p>
            <Link 
              href="/#our-products"
              className="inline-flex px-8 py-3 rounded-none text-white font-semibold bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy transition-all"
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
                    className="bg-white p-4 sm:p-6 rounded-3xl border border-brand-lavender/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row gap-6 items-center"
                  >
                    {/* Product Image */}
                    <Link href={`/products/${item.product_slug}`} className="relative w-24 h-24 sm:w-32 sm:h-32 bg-brand-pale rounded-2xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.product_name} fill className="object-cover" />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full w-full">
                      <Link href={`/products/${item.product_slug}`}>
                        <h3 className="font-bold font-serif text-brand-navy text-lg hover:text-brand-periwinkle transition-colors">
                          {item.product_name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center justify-between sm:justify-start mt-4 sm:mt-auto gap-4">
                        <div className="flex items-center border border-brand-lavender rounded-xl overflow-hidden bg-brand-pale/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-brand-navy hover:bg-brand-lavender transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-bold text-brand-navy font-sans">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-brand-navy hover:bg-brand-lavender transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xl font-bold text-brand-navy">₹{item.price * item.quantity}</p>
                          {item.mrp > item.price && (
                            <p className="text-xs text-brand-steel line-through">₹{item.mrp * item.quantity}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
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
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-lavender/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-28">
                <h2 className="text-xl font-bold font-serif text-brand-navy mb-6">Order Summary</h2>
                
                <div className="space-y-4 font-sans text-sm mb-6 pb-6 border-b border-brand-lavender/50">
                  <div className="flex justify-between text-brand-steel">
                    <span>Subtotal</span>
                    <span className="font-semibold text-brand-navy">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-brand-steel">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Calculated on WhatsApp</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg text-brand-navy mb-8 font-sans">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-none text-white font-semibold bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy transition-all hover:scale-[1.02] shadow-md"
                >
                  Checkout via WhatsApp
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="mt-4 text-xs text-center text-brand-steel font-sans leading-relaxed">
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
