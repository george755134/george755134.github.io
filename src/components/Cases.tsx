import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CASES } from '../data';

interface CasesProps {
  onScrollToBooking: () => void;
}

export default function Cases({ onScrollToBooking }: CasesProps) {
  return (
    <section id="cases" className="py-24 medical-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            真實案例
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            治療成果 ・ 有目共睹
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            每一個案例都是患者對上新醫療團隊的信任。我們秉持嚴謹細膩的心，用令人驚喜的齒列重造成果，回報每一份期待。
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASES.map((cse) => (
            <div
              key={cse.id}
              className="bg-white/90 rounded-3xl border border-blue-100/40 card-shadow hover:shadow-xl hover:border-blue-100/80 transition-all duration-300 overflow-hidden flex flex-col justify-between text-left"
            >
              <div>
                {/* Images Comparison Grid */}
                <div className="grid grid-cols-2 gap-[2px] bg-slate-100 relative h-56 sm:h-60">
                  
                  {/* Before Image */}
                  <div className="relative overflow-hidden h-full">
                    <img
                      src={cse.beforeImg}
                      alt="Before treatment"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Badge */}
                    <span className="absolute bottom-3 left-3 bg-red-600/90 backdrop-blur-sm text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider">
                      治療前
                    </span>
                  </div>

                  {/* After Image */}
                  <div className="relative overflow-hidden h-full">
                    <img
                      src={cse.afterImg}
                      alt="After treatment"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Badge */}
                    <span className="absolute bottom-3 right-3 bg-blue-accent/90 backdrop-blur-sm text-white font-extrabold text-[10px] px-2.5 py-1 rounded-md tracking-wider">
                      治療後
                    </span>
                  </div>

                </div>

                {/* Case Description Info */}
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-extrabold text-slate-800 tracking-tight leading-snug font-heading">
                    {cse.title}
                  </h4>
                  <div className="text-xs text-blue-accent font-bold tracking-wide">
                    {cse.subtitle}
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pt-2 border-t border-slate-100">
                    {cse.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer action link */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={onScrollToBooking}
                  className="w-full py-3 px-4 bg-slate-50 hover:bg-blue-50/50 text-slate-700 hover:text-blue-accent text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 group cursor-pointer border border-slate-100 hover:border-blue-100/50"
                >
                  <span>索取此療程分析預估</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Main CTA underneath cases */}
        <div className="mt-14 text-center">
          <button
            onClick={onScrollToBooking}
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-xl bg-blue-accent text-white font-extrabold text-sm shadow-lg shadow-blue-900/10 cursor-pointer transition-transform duration-150 active:scale-95 hover:opacity-95"
            id="cases-main-cta"
          >
            <span>立即預約免費評估</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
