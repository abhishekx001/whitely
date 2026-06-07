'use client'

import React, { createContext, useState, useCallback } from 'react'
import CountrySelectModal from './CountrySelectModal'

export const WhatsAppContext = createContext(null)

export default function WhatsAppProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')

  const openWhatsAppModal = useCallback((messageText) => {
    setCurrentMessage(messageText)
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
    // Clear message on close? Depending on preference, keeping it can be fine
  }, [])

  return (
    <WhatsAppContext.Provider value={{ openWhatsAppModal }}>
      {children}
      <CountrySelectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        messageText={currentMessage} 
      />
    </WhatsAppContext.Provider>
  )
}
