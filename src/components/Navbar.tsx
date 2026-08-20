import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Settings } from 'lucide-react';
import { CLINIC_NAME, CLINIC_PHONE } from '../data';

interface NavbarProps {
  onOpenBooking: () => void;
  onToggleCMS: () => void;
  cmsOpen: boolean;
}

export default function Navbar({ onOpenBooking, onToggleCMS, cmsOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首頁', href: '#home' },
    { label: '關於我們', href: '#about' },
    { label: '服務項目', href: '#services' },
    { label: '醫師團隊', href: '#doctors' },
    { label: '真實案例', href: '#cases' },
    { label: '門診時間', href: '#schedule' },
    { label: '線上預約', href: '#booking' },
    { label: '聯絡我們', href: '#contact' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800'
          : 'bg-gradient-to-b from-blue-900/40 via-blue-900/10 to-transparent py-3 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2.5 select-none" id="nav-logo">
            <img src="/assets/logo.png" alt={CLINIC_NAME} className="w-12 h-12 object-contain" />
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-wider block leading-tight">
                {CLINIC_NAME}
              </span>
              <span className={`text-[10px] tracking-widest block opacity-75 font-mono`}>
                TOPHAT DENTAL CLINIC
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-7" id="desktop-menu">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium text-sm transition-colors duration-200 hover:text-blue-accent ${
                  isScrolled ? 'text-slate-600' : 'text-slate-100 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* CMS Toggle button */}
            <button
              onClick={onToggleCMS}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                cmsOpen
                  ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                  : isScrolled
                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="後台管理面板"
              id="btn-toggle-cms"
            >
              <Settings className="w-4 h-4 animate-spin-hover" />
              <span>{cmsOpen ? '關閉後台' : '模擬後台'}</span>
            </button>

            {/* Phone CTA */}
            <a
              href={`tel:${CLINIC_PHONE}`}
              className={`hidden xl:flex items-center space-x-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
                isScrolled
                  ? 'border-blue-accent text-blue-accent hover:bg-blue-50'
                  : 'border-white text-white hover:bg-white hover:text-blue-900'
              }`}
              id="nav-phone-cta"
            >
              <Phone className="w-4 h-4" />
              <span>{CLINIC_PHONE}</span>
            </a>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden items-center space-x-2" id="mobile-nav-right">
            <button
              onClick={onToggleCMS}
              className={`p-2 rounded-lg transition-colors text-xs font-semibold flex items-center ${
                cmsOpen ? 'bg-amber-100 text-amber-700' : 'bg-slate-100/10 text-current'
              }`}
              id="mobile-btn-toggle-cms"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-slate-100 text-slate-800 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl" id="mobile-menu">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-accent transition-all duration-150"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 px-4">
              <a
                href={`tel:${CLINIC_PHONE}`}
                className="flex items-center justify-center space-x-2 py-3 rounded-lg bg-blue-50 text-blue-accent font-bold hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>撥打電話：{CLINIC_PHONE}</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center space-x-2 py-3 rounded-lg bg-blue-accent text-white font-bold hover:opacity-95 transition-all shadow-md shadow-blue-900/10"
              >
                <Calendar className="w-4 h-4" />
                <span>立即預約</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
