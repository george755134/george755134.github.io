import React from 'react';
import { CheckCircle2, Calendar, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { SERVICES, CLINIC_PHONE } from '../data';

interface ServicesProps {
  selectedServiceId: string;
  onSelectService: (id: string) => void;
  onScrollToBooking: () => void;
}

export default function Services({ selectedServiceId, onSelectService, onScrollToBooking }: ServicesProps) {
  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-24 medical-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            服務項目
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            全方位牙科醫療服務
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            我們引進醫學中心級精密數位系統，從單顆微創植牙、全口重建、美齒貼片到一般牙周、牙髓照護，皆由專科醫師精準診斷，為您打造安全長效的客製化治療計畫。
          </p>
        </div>

        {/* Dynamic Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tab Menu Buttons */}
          <div className="lg:col-span-4 space-y-3" id="services-tabs-menu">
            {SERVICES.map((srv) => {
              const isActive = srv.id === currentService.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => onSelectService(srv.id)}
                  className={`w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'bg-blue-accent border-blue-accent text-white shadow-lg shadow-blue-900/10 scale-[1.01]'
                      : 'bg-white/80 border-slate-100 text-slate-700 hover:bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-2xl select-none filter drop-shadow-sm">
                      {srv.icon}
                    </span>
                    <span className={`font-bold text-sm sm:text-base ${isActive ? 'text-white' : 'text-slate-800'}`}>
                      {srv.name}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-all ${
                      isActive
                        ? 'text-white translate-x-1'
                        : 'text-slate-400 group-hover:text-blue-accent group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Tab Content Details Card */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-blue-100/50 rounded-3xl p-6 sm:p-10 card-shadow text-left relative overflow-hidden animate-fade-in">
              
              {/* Backgroud Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

              {/* Icon & Title Heading */}
              <div className="flex items-start space-x-5 relative z-10">
                <span className="text-5xl sm:text-6xl select-none p-4 rounded-2xl bg-slate-50 shadow-sm border border-slate-100 inline-block">
                  {currentService.icon}
                </span>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight font-heading">
                    {currentService.name}
                  </h4>
                  <p className="blue-accent font-semibold text-sm sm:text-base mt-1.5">
                    {currentService.subtitle}
                  </p>
                </div>
              </div>

              {/* Description Text */}
              <p className="text-slate-600 text-sm sm:text-base mt-6 sm:mt-8 leading-relaxed relative z-10">
                {currentService.desc}
              </p>

              {/* Key Features Checkbox Grid */}
              <div className="mt-8 border-t border-slate-200/60 pt-6">
                <h5 className="font-bold text-slate-800 text-xs tracking-wider uppercase mb-4">
                  療程特色與核心優勢
                </h5>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-5 h-5 text-blue-accent flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call To Action Block */}
              <div className="mt-10 border-t border-slate-200/60 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Sub Action Buttons */}
                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={onScrollToBooking}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-accent text-white font-bold text-sm hover:opacity-95 active:scale-95 transition-all shadow-md shadow-blue-900/10 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>預約諮詢</span>
                  </button>
                  <a
                    href={`tel:${CLINIC_PHONE}`}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>電話預約</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
