'use client'

import { useContext } from 'react'
import { WhatsAppContext } from '../components/WhatsAppProvider'

export function useWhatsApp() {
  const context = useContext(WhatsAppContext)
  
  if (!context) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider')
  }
  
  return context
}
