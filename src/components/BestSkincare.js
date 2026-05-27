'use client'

export default function BestSkincare() {
  const stats = [
    { number: '1000+', label: 'Happy Reviews' },
    { number: '300+', label: 'Products Sold' }
  ]

  const ingredients = ['Turmeric', 'Sandal Extraction', 'Niacinamide']

  return (
    <div className="w-full bg-gradient-to-b from-white to-brand-pale py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-100 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-periwinkle mb-3 font-sans">
            In India
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold font-serif text-brand-navy leading-tight">
            Best Skin Care Products
          </h2>
        </div>

        {/* Content Section */}
        <div className="bg-brand-pale/60 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(112,145,230,0.05)] border border-brand-lavender text-center max-w-4xl mx-auto">
          <p className="text-lg lg:text-xl text-brand-steel leading-relaxed font-sans mb-8">
            We believe healthy skin is achievable for everyone. A good skincare routine should be simple. A few things that help you in the long run - cleanse, moisturize, and protect.
          </p>

          <p className="text-lg lg:text-xl text-brand-steel leading-relaxed font-sans mb-10">
            Whitely products help you with perfect moisturization nourishing your skin without harming the skin barrier. We deliver results with perfectly formulated products. We stand out in the crowd and provide you <span className="font-bold text-brand-periwinkle border-b-2 border-violet-200">best skin care products in India</span>, they help you achieve flawless skin. Are you someone looking for even-toned skin? Our best-selling whitening cream helps you achieve exactly that.
          </p>

          {/* Key Ingredients Badges */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 font-sans">
              Key Ingredients
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {ingredients.map((ingredient, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-brand-navy text-brand-periwinkle shadow-sm font-sans"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Highlight */}
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto pt-8 border-t border-brand-lavender">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold font-serif text-brand-periwinkle mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base font-medium text-brand-steel font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Buy Now Button */}
        <div className="flex justify-center mt-12">
          <a
            href="https://wa.me/917306633619?text=product%20details"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-brand-navy to-brand-periwinkle hover:from-brand-periwinkle hover:to-brand-navy rounded-full hover:scale-105 hover:shadow-[0_0_25px_rgba(112,145,230,0.4)]"
          >
            Buy Now
            <svg 
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
