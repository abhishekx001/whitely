'use client'

import React from 'react'

export default function DualPrice({ indiaPrice, indiaMRP, qatarPrice }) {
  return (
    <div className="flex flex-col gap-1 w-full font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        {/* India Price */}
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="text-sm sm:text-base">🇮🇳</span>
          <span className="text-sm sm:text-xl font-bold text-[#7b34a2]">₹</span>
          <span className="text-sm sm:text-xl font-bold text-brand-navy">{indiaPrice}</span>
        </div>

        {/* Divider - only if qatarPrice exists */}
        {qatarPrice && (
          <>
            <span className="hidden sm:inline-block text-gray-300 font-light mx-1">|</span>
            {/* Qatar Price */}
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-sm sm:text-base">🇶🇦</span>
              <span className="text-xs sm:text-sm font-bold text-[#7b34a2] mr-0.5">QAR</span>
              <span className="text-sm sm:text-xl font-bold text-brand-navy">{qatarPrice}</span>
            </div>
          </>
        )}
      </div>

      {/* India MRP */}
      {indiaMRP && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-xs font-medium text-gray-400 line-through">
            ₹{indiaMRP}
          </span>
          <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            India MRP
          </span>
        </div>
      )}
    </div>
  )
}
