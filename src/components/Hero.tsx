import React from 'react';
import { Calendar, MessageSquare, Star, ArrowRight, ShieldCheck, Smile } from 'lucide-react';
import { CLINIC_NAME, CLINIC_LINE_URL } from '../data';

interface HeroProps {
  onScrollToBooking: () => void;
  onScrollToServices: (serviceId?: string) => void;
}

export default function Hero({ onScrollToBooking, onScrollToServices }: HeroProps) {
  const stats = [
    { value: '20+', label: '年豐富經驗', desc: '深厚臨床資歷' },
    { value: '3,000+', label: '成功復原案例', desc: '重獲飲食與微笑' },
    { value: '3.9★', label: 'Google 評分', desc: '40 則真實好評' }
  ];

  const quickServices = [
    { id: 'implant', title: '人工植牙', subtitle: '高階精密人工植體', emoji: '🦷' },
    { id: 'implant-rescue', title: '植牙重新連線計畫', subtitle: '找回你的植牙照護，外院植牙問題也能接手', emoji: '🔄' },
    { id: 'allon4', title: '全口重建 All-on-4/6', subtitle: '一日重建、當天戴臨時牙', emoji: '😁' },
    { id: 'sleep-dentistry', title: '舒眠無痛治療', subtitle: 'TCI 靜脈舒眠麻醉、在睡夢中輕鬆看牙', emoji: '😴' },
    { id: 'ceramic-crown', title: '全瓷冠貼片', subtitle: 'E.max 高透光微晶瓷、超透氧二氧化鋯', emoji: '👑' },
    { id: 'root-canal', title: '根管治療', subtitle: '高階精密輔助、保留真牙', emoji: '🔬' }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center medical-gradient overflow-hidden border-b border-blue-100"
    >
      {/* Darker top vignette so the fixed navbar reads clearly over the hero */}
      <div className="absolute top-0 left-0 w-full h-[5.5rem] bg-slate-900 pointer-events-none" />

      {/* Absolute decorative geometric circles from the theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-blue-50/60 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-2xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-slate-800 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100/70 px-4 py-1.5 rounded-full text-blue-accent text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>桃園八德區 ・ 專業口腔美學中心</span>
            </div>
 
            {/* Main Title Block */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900 font-heading">
                {CLINIC_NAME}
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold blue-accent tracking-wide">
                專業植牙 ・ 全口重建 ・ 美齒修復
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
                「守護您的口腔健康，打造自信笑容」—— 專業牙科團隊，引進高解析口內數位掃描、精密輔助治療等領先設備，提供全方位安心、精準且無痛的牙齒照護服務。
              </p>
            </div>
 
            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={onScrollToBooking}
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-blue-accent text-white font-extrabold text-base hover:opacity-95 active:scale-95 transition-all duration-150 shadow-lg shadow-blue-900/10 cursor-pointer"
                id="hero-booking-cta"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>立即線上預約</span>
              </button>
              <a
                href={CLINIC_LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base active:scale-95 transition-all duration-150 shadow-lg shadow-emerald-500/10 cursor-pointer"
                id="hero-line-cta"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>LINE 預約諮詢</span>
              </a>
            </div>
 
            {/* Stats list */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-100">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black blue-accent font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
 
          </div>
 
          {/* Right Floating Bento Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-blue-100/50 p-6 sm:p-8 card-shadow text-slate-800 text-left relative overflow-hidden">
              
              {/* Subtle geometric circle top right inside the card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />

              <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-md sm:text-lg font-black tracking-wide flex items-center space-x-2 text-slate-900">
                  <Smile className="w-5 h-5 blue-accent" />
                  <span>主要治療項目</span>
                </h3>
                <span className="text-[10px] bg-blue-50 text-blue-accent px-2.5 py-0.5 rounded-full font-bold border border-blue-100/50">
                  熱門推薦
                </span>
              </div>
 
              {/* Treatment Items List */}
              <div className="space-y-3 relative z-10">
                {quickServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => onScrollToServices(service.id)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100/50 hover:shadow-sm transition-all duration-200 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl select-none filter drop-shadow">
                        {service.emoji}
                      </span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm group-hover:blue-accent transition-colors">
                          {service.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {service.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:blue-accent group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
 
              {/* Card Action Button */}
              <button
                onClick={onScrollToBooking}
                className="w-full mt-6 py-3.5 px-4 bg-blue-accent text-white hover:opacity-95 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/10 transition-all group cursor-pointer"
                id="hero-free-consult"
              >
                <span>預約免費諮詢評估</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
 
            </div>
          </div>
 
        </div>
 
        {/* Down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center space-y-1 text-slate-400 hover:text-blue-600 transition-colors pointer-events-none">
          <span className="text-[10px] tracking-widest font-sans font-black uppercase">向下探索</span>
          <div className="w-4 h-7 border-2 border-slate-300 rounded-full p-1 flex justify-center">
            <div className="w-0.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
          </div>
        </div>
 
      </div>
    </section>
  );
}
