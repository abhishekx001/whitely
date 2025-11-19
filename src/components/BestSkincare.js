'use client'

export default function BestSkincare() {
  return (
    <div className="w-full bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-4">
          <h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-2"
            style={{ 
              color: '#2a1a45',
              fontFamily: 'var(--font-playfair)'
            }}
          >
            Best skin care products
          </h2>
          <p 
            className="text-sm lg:text-base uppercase tracking-wider text-gray-500"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            IN INDIA
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-6 lg:space-y-8 mt-8 lg:mt-10">
          {/* Introductory Paragraph */}
          <p 
            className="text-base lg:text-lg text-gray-700 leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            We believe healthy skin is achievable for everyone. A good skincare routine should be simple. A few things that help you in the long run - cleanse, moisturize, and protect.
          </p>

          {/* Detailed Product Description */}
          <p 
            className="text-base lg:text-lg text-gray-700 leading-relaxed"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            Whitely products help you with perfect moisturization nourishing your skin without harming the skin barrier. We deliver results with perfectly formulated products. We stand out in the crowd and provide you <span className="font-bold underline" style={{ color: '#2a1a45' }}>best skin care products in India</span>, they help you achieve flawless skin. Are you someone looking for even-toned skin? Our best-selling whitening cream is backed by over 1000 + reviews and we've sold over 1 million products. Some of the impressive main ingredients present in the cream are Turmeric, Sandal Extraction, and Niacinamide.
          </p>
        </div>

        {/* Centered Buy Now Button */}
        <div className="flex justify-center mt-10 lg:mt-12">
          <a
            href="https://wa.me/918921193021?text=product%20details"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 lg:px-7 lg:py-3 rounded-full text-white font-semibold text-sm lg:text-base transition-all hover:scale-105 shadow-md"
            style={{ 
              backgroundColor: '#3f2265',
              fontFamily: 'var(--font-poppins)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a3a8a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3f2265'}
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  )
}

