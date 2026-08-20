import React from 'react';
import { Check, Calendar, ArrowRight } from 'lucide-react';
import { DOCTORS } from '../data';

interface DoctorsProps {
  onScrollToBooking: (doctorName?: string) => void;
}

export default function Doctors({ onScrollToBooking }: DoctorsProps) {
  return (
    <section id="doctors" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            醫師團隊
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
            專業 ・ 用心 ・ 值得信賴
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            本診所每位專科醫師皆具備國內外頂尖牙醫學背景與十數年臨床資歷，堅持醫學理論與前沿數位儀器結合，提供溫柔細緻的精緻治療。
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/90 rounded-3xl border border-blue-100/40 card-shadow hover:shadow-xl hover:border-blue-100/80 transition-all duration-300 flex flex-col overflow-hidden text-left"
              id={`doctor-card-${doc.id}`}
            >
              
              {/* Doctor Image Panel */}
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-auto block transition-transform duration-500 hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient overlay for text layout safety */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                
                {/* Float tag on image */}
                <div className="absolute bottom-5 left-5 text-white">
                  <span className="text-xs bg-blue-accent px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider mb-1 inline-block">
                    {doc.title}
                  </span>
                  <h4 className="text-2xl font-black">{doc.name} 醫師</h4>
                  <p className="text-xs text-slate-200 mt-0.5">{doc.specialty}</p>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                
                 {/* Description & Bio */}
                <div className="space-y-5">
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {doc.bio}
                  </p>

                  {/* Specialty Tags */}
                  <div>
                    <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2">
                      擅長項目
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50/50 text-blue-accent text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-100/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Credentials Bullet List */}
                  <div className="border-t border-slate-100 pt-4">
                    <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
                      學歷 / 資歷
                    </h5>
                    <ul className="space-y-1.5">
                      {doc.education.map((edu, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-blue-accent mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-xs leading-relaxed">
                            {edu}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onScrollToBooking(doc.name)}
                  className="w-full mt-7 py-3 px-4 border-2 border-blue-100 text-blue-accent hover:bg-blue-accent hover:text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all duration-200 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>預約此醫師門診</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
