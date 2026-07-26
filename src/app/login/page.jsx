'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '../../lib/supabase/client'

function LoginContent() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  
  const supabase = createClient()


  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`
      }
    })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-soft flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex flex-col items-center mb-6">
          <span className="text-3xl font-serif text-brand-ink tracking-tight">Whitely</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold -mt-1 text-brand-muted font-sans">Beauty</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-serif text-brand-ink font-normal">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-brand-ink/70 font-sans">
          Sign in to continue to your cart
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-brand-base py-8 px-4 shadow-sm border border-brand-ink/10 sm:rounded-sm sm:px-10">
          {error && (
            <div className="text-red-500 text-sm font-sans bg-red-50 p-3 rounded-sm border border-red-100 mb-6">
              {error}
            </div>
          )}

          <div className="mt-2">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-brand-ink/20 rounded-sm shadow-sm bg-brand-base text-sm font-semibold text-brand-ink hover:bg-brand-soft transition-colors font-sans disabled:opacity-50"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-soft flex items-center justify-center font-sans text-brand-ink/50 text-sm">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
