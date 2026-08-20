import React, { useState, useEffect } from 'react';
import { Phone, Navigation, MessageSquare, ArrowUp, Calendar } from 'lucide-react';
import { CLINIC_PHONE, CLINIC_LINE_URL } from '../data';

interface FloatingActionsProps {
  onScrollToBooking: () => void;
}

export default function FloatingActions({ onScrollToBooking }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Mobile Bottom Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl flex items-center justify-around h-[72px] px-3">
        {/* Call CTA */}
        <a
          href={`tel:${CLINIC_PHONE}`}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-slate-600 active:text-blue-600 transition-colors py-2 h-14 min-w-[44px]"
          id="mobile-float-phone"
        >
          <Phone className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black tracking-wider uppercase">電話預約</span>
        </a>

        {/* Central high-fidelity Booking button */}
        <button
          onClick={onScrollToBooking}
          className="mx-2 flex-1 flex flex-col items-center justify-center gap-1 bg-blue-600 text-white rounded-xl py-2.5 h-12 active:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/10 min-w-[44px]"
          id="mobile-float-booking"
        >
          <div className="flex items-center gap-1.5 font-extrabold text-xs">
            <Calendar className="w-4 h-4 text-white" />
            <span>線上約診</span>
          </div>
        </button>

        {/* LINE CTA */}
        <a
          href={CLINIC_LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[#06C755] active:opacity-80 transition-opacity py-2 h-14 min-w-[44px]"
          id="mobile-float-line"
        >
          <MessageSquare className="w-5 h-5 fill-[#06C755] text-white" />
          <span className="text-[10px] font-black tracking-wider uppercase">LINE諮詢</span>
        </a>

        {/* Navigation CTA */}
        <a
          href="https://maps.google.com/?q=台北市大安區忠孝東路四段200號"
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1 text-slate-600 active:text-blue-600 transition-colors py-2 h-14 min-w-[44px]"
          id="mobile-float-map"
        >
          <Navigation className="w-5 h-5 text-slate-500" />
          <span className="text-[10px] font-black tracking-wider uppercase">地圖導航</span>
        </a>
      </div>

      {/* Padding spacer to prevent bottom bar from overlapping content on mobile */}
      <div className="h-[72px] lg:hidden w-full select-none" />

      {/* 2. Desktop Right-side Vertical Floating Widgets */}
      <div className="fixed bottom-8 right-8 z-40 hidden lg:flex flex-col gap-3 items-end">
        
        {/* Scroll to Top Widget */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
            title="回到頂端"
            id="desktop-float-scrolltop"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Call Widget */}
        <a
          href={`tel:${CLINIC_PHONE}`}
          className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-blue-600 border border-slate-200 shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
          title={`撥打預約專線: ${CLINIC_PHONE}`}
          id="desktop-float-phone"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* LINE Widget */}
        <a
          href={CLINIC_LINE_URL}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-[#06C755] hover:bg-[#05b04b] text-white shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5 relative group cursor-pointer"
          title="LINE 預約諮詢"
          id="desktop-float-line"
        >
          <MessageSquare className="w-5 h-5 fill-white text-[#06C755]" />
          
          {/* Tooltip */}
          <span className="absolute right-14 bg-[#06C755] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold shadow-md">
            LINE 快速約診
          </span>
        </a>

      </div>
    </>
  );
}
