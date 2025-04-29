// VoucherCard.tsx
import React from "react";

export default function VoucherCard() {
  return (
    <div className="relative max-w-xl w-full h-1/3">
      {/* Top scalloped edge (8 holes en móvil, 14 en sm+) */}
      <div className="absolute z-10 top-0 left-5 right-0 h-4 flex sm:hidden">
        {[...Array(8)].map((_, i) => (
          <div key={`top-sm-${i}`} className="flex-1">
            <div className="w-4 h-3 border-b border-l border-r border-purple-700 bg-gray-900 rounded-b-full" />
          </div>
        ))}
      </div>
      <div className="absolute z-10 top-0 left-5 right-0 h-4 hidden sm:flex">
        {[...Array(14)].map((_, i) => (
          <div key={`top-${i}`} className="flex-1">
            <div className="w-4 h-3 border-b border-l border-r border-purple-700 bg-gray-900 rounded-b-full" />
          </div>
        ))}
      </div>

      {/* Bottom scalloped edge (8 holes en móvil, 14 en sm+) */}
      <div className="absolute bottom-0 left-5 right-0 h-4 z-10 flex sm:hidden">
        {[...Array(8)].map((_, i) => (
          <div key={`bottom-sm-${i}`} className="flex-1">
            <div className="w-4 h-3 border-t mt-1 border-l border-r border-purple-700 bg-[#F5A623] rounded-t-full" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-5 right-0 h-4 z-10 hidden sm:flex">
        {[...Array(14)].map((_, i) => (
          <div key={`bottom-${i}`} className="flex-1">
            <div className="w-4 h-3 border-t mt-1 border-l border-r border-purple-700 bg-[#F5A623] rounded-t-full" />
          </div>
        ))}
      </div>

      {/* ===== LÍNEA GRUESA AMARILLA + HOYOS NEGROS ===== */}
      {/* 1) la barra amarilla desplazada */}
      <div className="absolute z-0 -bottom-4 left-4 right-0 h-6 bg-[#F5A623]" />

      {/* Hoyos negros bajo la barra (8 en móvil, 14 en sm+) */}
      <div className="absolute -bottom-8 left-5 right-0 h-7 flex translate-x-2 z-10 sm:hidden">
        {[...Array(8)].map((_, i) => (
          <div key={`bar-hole-sm-${i}`} className="flex-1 flex justify-center">
            <div className="w-4 h-4 bg-gray-900 rounded-full" />
          </div>
        ))}
      </div>
      <div className="absolute -bottom-8 left-5 right-0 h-7 flex translate-x-2 z-10 hidden sm:flex">
        {[...Array(14)].map((_, i) => (
          <div key={`bar-hole-${i}`} className="flex-1 flex justify-center">
            <div className="w-4 h-4 bg-gray-900 rounded-full" />
          </div>
        ))}
      </div>

      {/* Left hole - center */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 rounded-r-full bg-gray-900 z-10" />

      {/* Right hole - center (amarillo) */}
      <div className="absolute right-0 top-1/2 border-t mt-1 border-l mr-4 border-purple-700 -translate-y-1/2 w-7 h-14 rounded-l-full bg-[#F5A623] z-10" />

      {/* Fondo amarillo completo */}
      <div className="absolute z-0 left-5 right-0 h-full bg-[#F5A623]" />

      {/* Right hole - center (frente) */}
      <div className="absolute right-0 top-1/2 mt-2.5 -translate-y-1/2 translate-x-1 w-7 h-14 rounded-l-full bg-gray-900 z-10" />

      {/* Main voucher content */}
      <div className="relative mx-4 flex bg-transparent overflow-hidden border border-purple-700">
        {/* Left section - purple bar */}
        <div className="w-4/12 bg-purple-700 p-4 h-64 flex items-center justify-center">
          <div
            className="rotate-180 text-white font-bold text-center border border-dashed border-white/80 p-4"
            style={{ writingMode: "vertical-rl" }}
          >
            <div className="text-xl sm:text-2xl tracking-wider">DISCOUNT</div>
            <div className="text-xl sm:text-2xl tracking-wider mt-2">
              COUPON
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="w-8/12 p-6 flex h-64 flex-col justify-around bg-gray-900 relative">
          <div className="text-purple-300 text-md sm:text-xl font-bold tracking-wider">
            VOUCHER TYPE
          </div>

          <div className="text-pink-500 text-xl sm:text-4xl font-bold">
            75% OFF
          </div>

          <div className="border border-dashed border-purple-500 mt-8 p-1 sm:p-2">
            <div className="text-purple-300 text-center sm:text-lg text-sm">
              VOUCHER VALID UNTIL
              <br />
              <span className="font-bold">12 DEC 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
