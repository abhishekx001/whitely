'use client'

import React, { createContext, useCallback } from 'react'

export const WhatsAppContext = createContext(null)

export default function WhatsAppProvider({ children }) {
  const openWhatsAppModal = useCallback((messageText) => {
    const indiaNumber = '917306633619'
    const encodedMessage = encodeURIComponent(messageText)
    const whatsappUrl = `https://wa.me/${indiaNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <WhatsAppContext.Provider value={{ openWhatsAppModal }}>
      {children}
    </WhatsAppContext.Provider>
  )
}
