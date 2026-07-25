'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user, supabase } = useAuth()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart([])
      setLoading(false)
    }
  }, [user])

  const fetchCart = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (!error && data) {
      setCart(data)
    }
    setLoading(false)
  }

  const addToCart = async (product, quantity = 1) => {
    if (!user) return false

    // Check if item already exists
    const existingItem = cart.find(item => item.product_slug === product.slug)
    
    if (existingItem) {
      return updateQuantity(existingItem.id, existingItem.quantity + quantity)
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert([
        {
          user_id: user.id,
          product_name: product.name,
          product_slug: product.slug,
          quantity: quantity
        }
      ])
      .select()
      .single()

    if (!error && data) {
      setCart(prev => [...prev, data])
      return true
    }
    return false
  }

  const updateQuantity = async (id, quantity) => {
    if (!user) return false
    
    if (quantity <= 0) {
      return removeFromCart(id)
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (!error && data) {
      setCart(prev => prev.map(item => item.id === id ? data : item))
      return true
    }
    return false
  }

  const removeFromCart = async (id) => {
    if (!user) return false

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (!error) {
      setCart(prev => prev.filter(item => item.id !== id))
      return true
    }
    return false
  }

  const clearCart = async () => {
    if (!user) return false

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)

    if (!error) {
      setCart([])
      return true
    }
    return false
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
