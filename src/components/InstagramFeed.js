'use client'

export default function InstagramFeed() {
  const instagramUrl = 'https://www.instagram.com/whitely.beauty?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='

  const handleClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full bg-gradient-to-b from-brand-lavender to-white py-12 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute -left-32 -top-32 w-64 h-64 bg-[#E0D4F5] rounded-full blur-[80px] opacity-60"></div>
      <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-[#E0D4F5] rounded-full blur-[80px] opacity-60"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-brand-pale/80 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 lg:p-16 shadow-[0_8px_30px_rgba(112,145,230,0.08)] border border-brand-lavender text-center">
          {/* Title Section */}
          <div className="mb-6 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-serif text-brand-navy">
              Join Our Community
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-brand-steel font-sans px-2 sm:px-0">
              Follow <span className="font-semibold text-brand-periwinkle">@whitely.beauty</span> for daily skincare tips, exclusive offers, and real results.
            </p>
          </div>

          {/* Follow Button */}
          <div className="flex justify-center w-full">
            <button 
              onClick={handleClick}
              className="group flex items-center justify-center w-auto px-6 py-3 sm:px-10 sm:py-4 rounded-full bg-white border-2 border-brand-navy text-brand-navy font-semibold text-sm sm:text-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-brand-periwinkle hover:to-brand-navy hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(112,145,230,0.3)]"
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow on Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
