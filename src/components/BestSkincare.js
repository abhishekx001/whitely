'use client'

import { useWhatsApp } from '../hooks/useWhatsApp'

export default function BestSkincare() {
  const { openWhatsAppModal } = useWhatsApp()
  
  const cards = [
    { title: '1000+', subtitle: 'Happy Reviews', text: 'Real results from our growing community.' },
    { title: '300+', subtitle: 'Products Sold', text: 'Trusted formulations delivered nationwide.' },
    { title: 'Turmeric', subtitle: 'Key Ingredient', text: 'Brightens and evens out skin tone naturally.' },
    { title: 'Sandalwood', subtitle: 'Key Ingredient', text: 'Soothes inflammation and reduces acne.' },
    { title: 'Niacinamide', subtitle: 'Key Ingredient', text: 'Strengthens the skin barrier and minimizes pores.' },
    { title: 'Cruelty Free', subtitle: 'Our Promise', text: 'Never tested on animals. Always ethical.' }
  ]

  return (
    <div className="w-full bg-brand-soft py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-ink/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4 font-sans">
            In India
          </p>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-normal font-serif text-brand-ink leading-tight">
            Premium Skin Care
          </h2>
          {/* Signature motif divider */}
          <div className="flex items-center justify-center mt-6">
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
            <span className="mx-4 text-brand-ink/40 text-lg">✦</span>
            <div className="h-[1px] w-12 bg-brand-ink/20"></div>
          </div>
        </div>

        {/* Intro Text */}
        <div className="max-w-3xl mx-auto text-center mb-16 px-4">
          <p className="text-base lg:text-lg text-brand-ink/80 leading-relaxed font-sans mb-6">
            We believe healthy skin is achievable for everyone. A good skincare routine should be simple. A few things that help you in the long run &mdash; cleanse, moisturize, and protect.
          </p>
          <p className="text-base lg:text-lg text-brand-ink/80 leading-relaxed font-sans">
            Whitely products provide perfect moisturization, nourishing your skin without harming the skin barrier. We stand out in the crowd and provide you <span className="font-semibold text-brand-ink border-b border-brand-ink/30 pb-0.5">the best skin care products in India</span> to help you achieve flawless skin.
          </p>
        </div>

        {/* Horizontal Scroll-Snap Cards */}
        <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory scrollbar-hide">
            {cards.map((card, idx) => (
              <div 
                key={idx} 
                className="snap-center sm:snap-start shrink-0 w-[260px] sm:w-[280px] bg-brand-base border border-brand-ink/10 rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 font-sans">{card.subtitle}</h3>
                  <div className="text-2xl font-serif text-brand-ink mb-4">{card.title}</div>
                </div>
                <p className="text-sm text-brand-ink/70 font-sans leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => openWhatsAppModal('product details')}
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-bold tracking-wide text-brand-base transition-colors duration-300 bg-brand-deep hover:bg-brand-ink rounded-sm"
          >
            Buy Now
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
