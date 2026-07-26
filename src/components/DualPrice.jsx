'use client'

import React from 'react'

export default function DualPrice({ indiaPrice, indiaMRP }) {
  return (
    <div className="flex flex-col gap-1 w-full font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        {/* Price */}
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-sm sm:text-xl font-bold text-brand-ink">₹</span>
          <span className="text-sm sm:text-xl font-bold text-brand-ink">{indiaPrice}</span>
        </div>
      </div>

      {/* MRP */}
      {indiaMRP && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-xs font-medium text-brand-muted line-through">
            ₹{indiaMRP}
          </span>
          <span className="text-[9px] sm:text-[10px] text-brand-muted uppercase tracking-wider font-semibold">
            MRP
          </span>
        </div>
      )}
    </div>
  )
}
