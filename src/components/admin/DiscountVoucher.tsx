import { useState } from "react";
import DiscountCouponModal from "./ui/DiscountCouponModal";

export default function DiscountVoucher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative max-w-xl w-full mb-20"
        onClick={() => setOpen(true)}
      >
        {/* Top scalloped edge */}
        <div className="absolute z-10 top-0 left-5 right-0 h-4 flex">
          {[...Array(14)].map((_, i) => (
            <div key={`top-${i}`} className="flex-1">
              <div className="w-4 h-3 border-b  border-l border-r border-purple-700 bg-[#06060a] rounded-b-full" />
            </div>
          ))}
        </div>

        {/* Bottom scalloped edge */}
        <div className="absolute bottom-0 left-5 right-0 h-4 z-10 flex ">
          {[...Array(14)].map((_, i) => (
            <div key={`bottom-${i}`} className="flex-1">
              <div
                className="w-4 h-3 border-t mt-1 border-l border-r border-purple-700 
             bg-[#F5A623] rounded-t-full"
              />
            </div>
          ))}
        </div>

        {/* ===== LÍNEA GRUESA AMARILLA + HOYOS NEGROS ===== */}
        {/* 1) la barra amarilla desplazada */}
        <div className="absolute z-0 -bottom-4  left-4 right-0 h-6 bg-[#F5A623] " />

        {/* Hoyos negros (debajo de la línea amarilla) */}
        <div className="absolute -bottom-8 left-5 right-0 h-7 flex translate-x-2 z-10">
          {[...Array(14)].map((_, i) => (
            <div key={`bar-hole-${i}`} className="flex-1 flex justify-center">
              <div className="w-4 h-4 bg-[#06060a] rounded-full " />
            </div>
          ))}
        </div>

        {/* Left hole - center */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 rounded-r-full bg-[#06060a] z-10" />

        {/* Right hole - center */}
        <div
          className="absolute right-0 top-1/2 border-t mt-1 border-l
       mr-4 border-purple-700 -translate-y-1/2 w-7 h-14 rounded-l-full bg-[#F5A623] z-10"
        />

        <div className="absolute z-0   left-5 right-0 h-full bg-[#F5A623] " />

        {/* Right hole - center */}
        <div
          className="absolute right-0 top-1/2  mt-2.5
      -translate-y-1/2 translate-x-1 w-7 h-14 rounded-l-full bg-[#06060a] z-10"
        />

        {/* Main voucher content */}
        <div className="relative mx-4 my-4 flex bg-transparent overflow-hidden border border-purple-700">
          {/* Left section - purple bar */}
          <div className="w-1/4 bg-purple-700 p-4  flex items-center justify-center">
            <div
              className="rotate-180 text-white font-bold text-center border border-dashed border-white/80 p-4"
              style={{ writingMode: "vertical-rl" }}
            >
              <div className="text-2xl tracking-wider">DISCOUNT</div>
              <div className="text-2xl tracking-wider mt-2">COUPON</div>
            </div>
          </div>

          {/* Right section */}
          <div className="w-3/4 p-6 flex flex-col justify-between bg-[#06060a] relative">
            <div className="text-purple-300 text-xl font-bold tracking-wider mb-4">
              VOUCHER TYPE
            </div>

            <div className="text-pink-500 text-7xl font-bold mb-8">75% OFF</div>

            <div className="border border-dashed border-purple-500 p-4 max-w-md">
              <div className="text-purple-300 text-center">
                THIS VOUCHER IS VALID UNTIL
                <br />
                <span className="font-bold">12 DEC 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DiscountCouponModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
