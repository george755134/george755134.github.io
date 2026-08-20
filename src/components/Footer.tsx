import React from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Clock, MessageSquare } from 'lucide-react';
import { CLINIC_NAME, CLINIC_PHONE, CLINIC_ADDRESS, CLINIC_EMAIL, CLINIC_HOURS_TEXT, CLINIC_LINE_URL, CLINIC_LINE_ID } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '關於與特色',
      items: [
        { label: '關於診所', href: '#about' },
        { label: '醫師團隊', href: '#doctors' },
        { label: '環境設備', href: '#about' },
        { label: '常見問題', href: '#faq' }
      ]
    },
    {
      title: '專科醫療項目',
      items: [
        { label: '人工植牙', href: '#services' },
        { label: '全口重建 All-on-4/6', href: '#services' },
        { label: '牙周微創雷射', href: '#services' },
        { label: '全瓷冠/陶瓷貼片', href: '#services' }
      ]
    },
    {
      title: '就醫指南',
      items: [
        { label: '門診時刻表', href: '#schedule' },
        { label: '線上門診預約', href: '#booking' },
        { label: '診所交通指南', href: '#contact' },
        { label: '診所 LINE 帳號', href: '#line-promotion' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 text-left pt-20 pb-8 border-t border-slate-800" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-800">
          
          {/* Column 1: Brand & Logo */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="flex items-center space-x-2.5 select-none" id="footer-logo">
              <img src="/assets/logo.png" alt={CLINIC_NAME} className="w-12 h-12 object-contain" />
              <div>
                <span className="font-extrabold text-white text-lg sm:text-xl tracking-wider block leading-tight">
                  {CLINIC_NAME}
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 block font-mono">
                  TOPHAT DENTAL CLINIC
                </span>
              </div>
            </a>
            
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
              創立於 2004 年，深耕桃園八德區的精緻牙科代表。引進頂尖口內數位掃描導航與精密設備，並由醫學中心專科醫師團隊駐診，致力為每位患者提供溫柔、精確與值得託付的口腔治療體驗。
            </p>

            {/* Social links */}
            <div className="flex space-x-3" id="footer-socials">
              <a
                href={CLINIC_LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center"
                title="加入 LINE 好友"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center font-extrabold"
                title="臉書粉絲專頁"
              >
                FB
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-pink-400 hover:bg-pink-600 hover:text-white transition-colors flex items-center justify-center font-extrabold"
                title="Instagram 追蹤"
              >
                IG
              </a>
            </div>
          </div>

          {/* Columns 2-4: Quick Links */}
          {footerLinks.map((cat, idx) => (
            <div key={idx} className="lg:col-span-2 space-y-4">
              <h4 className="text-white font-extrabold text-sm tracking-wider uppercase">
                {cat.title}
              </h4>
              <ul className="space-y-2.5">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-sm text-slate-400 hover:text-blue-accent transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Clinic Hours Summary */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase">
              診所資訊
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex gap-2">
                <Clock className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-300">營業時間</span>
                  <span className="text-slate-500 text-xs block mt-0.5">{CLINIC_HOURS_TEXT}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-300">預約專線</span>
                  <span className="text-slate-500 text-xs block mt-0.5">{CLINIC_PHONE}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-300">診所位置</span>
                  <span className="text-slate-500 text-xs block mt-0.5">{CLINIC_ADDRESS}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Copyright */}
          <div className="text-slate-600 text-xs text-center md:text-left">
            <p>© {currentYear} {CLINIC_NAME}. All rights reserved. 網頁由本院資訊部提供與維護。</p>
            <p className="mt-1">醫器字第 1234567890 號 | 醫療機構代碼 1234567890</p>
          </div>

          {/* Right Privacy and Disclaimer Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-blue-accent transition-colors">診所聲明</a>
            <span>•</span>
            <a href="#booking" className="hover:text-blue-accent transition-colors">隱私權政策</a>
            <span>•</span>
            <a href="#schedule" className="hover:text-blue-accent transition-colors">醫療服務條款</a>
          </div>

        </div>

      </div>
    </footer>
  );
}
