'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { products } from '../data/products'
import { useWhatsApp } from '../hooks/useWhatsApp'
import Link from 'next/link'

const CHIPS = [
  'Sunscreen',
  'Lip Mask',
  'Soap',
  'Body Lotion',
  'Beauty Cream'
]

const INTENT_MAP = {
  'sunscreen': 'whitely-beauty-sunscreen',
  'spf': 'whitely-beauty-sunscreen',
  'lip': 'whitely-beauty-lip-mask',
  'lip mask': 'whitely-beauty-lip-mask',
  'lip balm': 'whitely-beauty-lip-mask',
  'soap': 'whitely-beauty-brightening-soap',
  'body': 'whitely-beauty-brightening-body-lotion',
  'lotion': 'whitely-beauty-brightening-body-lotion',
  'hand': 'whitely-beauty-brightening-body-lotion',
  'cream': 'whitely-beauty-brightening-cream-80g',
  'beauty cream': 'whitely-beauty-brightening-cream-80g',
  'face cream': 'whitely-beauty-brightening-cream-80g'
}

export default function ProductChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeProductSlug, setActiveProductSlug] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! What product are you looking for today? 🌿',
      type: 'initial'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const { openWhatsAppModal } = useWhatsApp()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const findProduct = (query) => {
    const lowerQuery = query.toLowerCase().trim()
    for (const [keyword, slug] of Object.entries(INTENT_MAP)) {
      if (lowerQuery.includes(keyword)) {
        return products.find(p => p.slug === slug)
      }
    }
    return products.find(p => p.name.toLowerCase().includes(lowerQuery))
  }

  const getFaqType = (query) => {
    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes('ingredient') || lowerQuery.includes('contain') || lowerQuery.includes('made of')) return 'ingredients'
    if (lowerQuery.includes('use') || lowerQuery.includes('apply') || lowerQuery.includes('usage') || lowerQuery.includes('how to')) return 'usage'
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('how much')) return 'price'
    if (lowerQuery.includes('benefit') || lowerQuery.includes('good for') || lowerQuery.includes('why')) return 'benefits'
    if (lowerQuery.includes('order') || lowerQuery.includes('buy') || lowerQuery.includes('purchase')) return 'order'
    return null
  }

  const getFaqAnswer = (type, product) => {
    switch (type) {
      case 'ingredients':
        return `The key ingredients for ${product.name} are: ${product.ingredients?.join(', ') || 'Natural ingredients'}.`
      case 'usage':
        if (product.howToUse && product.howToUse.length > 0) {
          return `Here's how to use it:\n` + product.howToUse.map(step => `${step.step}. ${step.title}: ${step.description}`).join('\n')
        }
        return 'Just apply it directly to your skin!'
      case 'price':
        return `The price is ₹${product.price} (Originally ₹${product.mrp}).`
      case 'benefits':
        return `Here are the benefits:\n- ` + (product.benefits?.slice(0, 3).join('\n- ') || product.description)
      case 'order':
        return `You can easily order this by clicking the "Order via WhatsApp" button on the product card!`
      default:
        return null
    }
  }

  const getRecommendations = (currentProduct) => {
    let similar = products.filter(p => p.category === currentProduct.category && p.slug !== currentProduct.slug)
    if (similar.length < 2) {
      const others = products.filter(p => p.slug !== currentProduct.slug && !similar.find(s => s.slug === p.slug))
      similar = [...similar, ...others].slice(0, 2)
    }
    return similar.slice(0, 2)
  }

  const showProductCard = (product) => {
    setActiveProductSlug(product.slug)
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        sender: 'bot',
        type: 'product',
        product: product
      }
    ])
  }

  const handleSend = (text, bypassUserMessage = false) => {
    if (!text.trim()) return

    if (!bypassUserMessage) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }])
      setInputValue('')
    }

    setTimeout(() => {
      const targetProduct = findProduct(text)
      const faqType = getFaqType(text)

      if (targetProduct) {
        setActiveProductSlug(targetProduct.slug)
        if (faqType) {
          const faqAnswer = getFaqAnswer(faqType, targetProduct)
          setMessages(prev => [
            ...prev,
            { 
              id: Date.now() + 1, 
              sender: 'bot', 
              text: faqAnswer, 
              type: 'faq_answer',
              recommendations: getRecommendations(targetProduct)
            }
          ])
        } else {
          showProductCard(targetProduct)
        }
      } else {
        if (faqType) {
          if (activeProductSlug) {
            const currentProduct = products.find(p => p.slug === activeProductSlug)
            const faqAnswer = getFaqAnswer(faqType, currentProduct)
            setMessages(prev => [
              ...prev,
              { 
                id: Date.now() + 1, 
                sender: 'bot', 
                text: faqAnswer, 
                type: 'faq_answer',
                recommendations: getRecommendations(currentProduct)
              }
            ])
          } else {
            setMessages(prev => [
              ...prev,
              {
                id: Date.now() + 1,
                sender: 'bot',
                text: "Sure! Which product would you like to know about?",
                type: 'fallback'
              }
            ])
          }
        } else {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + 1,
              sender: 'bot',
              text: "I couldn't find an exact match for that. Which of these products would you like to know more about?",
              type: 'fallback'
            }
          ])
        }
      }
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputValue)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -8, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[90px] right-6 z-[80] w-14 h-14 rounded-full flex items-center justify-center shadow-lg bg-brand-periwinkle hover:bg-brand-navy transition-colors duration-300 text-white cursor-pointer group"
            aria-label="Open product assistant"
          >
            <MessageCircle className="w-6 h-6 absolute transition-opacity duration-300 group-hover:opacity-0" />
            <Sparkles className="w-6 h-6 absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-0 right-0 sm:bottom-[90px] sm:right-6 z-[90] w-full sm:w-[360px] h-[80vh] sm:h-[480px] bg-white sm:rounded-2xl shadow-2xl flex flex-col border border-brand-periwinkle/20 overflow-hidden font-sans"
          >
            <div className="bg-brand-navy p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-periwinkle flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Product Assistant</h3>
                  <p className="text-xs text-brand-periwinkle/80">We reply instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-pale">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-brand-periwinkle text-white rounded-br-sm' 
                        : 'bg-brand-lavender text-brand-navy shadow-sm rounded-bl-sm border border-brand-periwinkle/10'
                    }`}
                  >
                    {msg.text && <p className="whitespace-pre-line">{msg.text}</p>}
                    
                    {(msg.type === 'initial' || msg.type === 'fallback') && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {CHIPS.map(chip => (
                          <button
                            key={chip}
                            onClick={() => handleSend(chip)}
                            className="text-xs px-3 py-1.5 bg-white text-brand-navy rounded-full border border-brand-periwinkle/30 hover:bg-brand-periwinkle hover:text-white transition-colors"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.type === 'product' && msg.product && (
                      <div className="mt-2 space-y-3 w-full">
                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-white">
                          <img 
                            src={msg.product.image} 
                            alt={msg.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-brand-navy">{msg.product.name}</h4>
                          <p className="text-xs font-medium text-brand-periwinkle mt-1">₹{msg.product.price}</p>
                        </div>
                        <div className="space-y-1 pb-2 border-b border-brand-periwinkle/10">
                          {msg.product.benefits?.slice(0, 3).map((benefit, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-brand-steel">
                              <span className="text-brand-periwinkle mt-0.5">•</span>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <Link 
                            href={`/products/${msg.product.slug}`}
                            className="w-full py-2 bg-white border border-brand-periwinkle text-brand-navy hover:bg-brand-periwinkle hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center text-center leading-tight"
                          >
                            View Product
                          </Link>
                          <button
                            onClick={() => openWhatsAppModal(`Hi, I'm interested in ordering ${msg.product.name}`)}
                            className="w-full py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center text-center leading-tight"
                          >
                            WhatsApp
                          </button>
                        </div>
                      </div>
                    )}

                    {msg.type === 'faq_answer' && msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-brand-periwinkle/20">
                        <p className="text-xs font-semibold text-brand-navy mb-2">You might also like:</p>
                        <div className="space-y-2">
                          {msg.recommendations.map(rec => (
                            <button
                              key={rec.slug}
                              onClick={() => showProductCard(rec)}
                              className="w-full flex items-center gap-3 p-2 bg-white rounded-lg hover:bg-brand-pale transition-colors border border-transparent hover:border-brand-periwinkle/30 text-left"
                            >
                              <div className="w-10 h-10 shrink-0 rounded bg-brand-lavender overflow-hidden">
                                <img src={rec.image} alt={rec.name} className="w-full h-full object-cover" />
                              </div>
                              <span className="text-xs font-medium text-brand-navy line-clamp-2">{rec.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-brand-periwinkle/20 shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full pl-4 pr-12 py-3 bg-brand-lavender border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-periwinkle text-brand-navy placeholder:text-brand-steel/60"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-2 text-brand-periwinkle hover:text-brand-navy disabled:opacity-50 disabled:hover:text-brand-periwinkle transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
