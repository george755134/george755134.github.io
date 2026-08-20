import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data';

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-white border-y border-blue-100/40 text-slate-800 relative overflow-hidden">
      {/* Background decoration flares */}
      <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-blue-100/20 blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-blue-50/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-block bg-blue-50 border border-blue-100/50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide uppercase">
            患者評價
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
            Google 真實評論
          </h3>
          
          {/* Stars & Score Summary */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="flex text-amber-400 items-center space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
              <div className="relative">
                <Star className="w-6 h-6 text-amber-400" />
                <div className="absolute top-0 left-0 overflow-hidden w-[90%]">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
              </div>
              <Star className="w-6 h-6 text-amber-400" />
              <span className="font-extrabold text-2xl text-slate-900 ml-2">3.9</span>
              <span className="text-slate-400">/ 5.0</span>
            </div>
            <span className="text-xs text-blue-accent font-semibold tracking-wider">
              ( Google 地圖 3.9 星真實好評推薦・共 40 則評論 )
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-blue-100/40 rounded-2xl p-6 text-left flex flex-col justify-between card-shadow hover:border-blue-100/80 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Author Info */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-12 h-12 rounded-full border border-slate-100 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 text-base">{rev.author}</h4>
                      <span className="text-[10px] text-slate-400 block font-mono">{rev.date}</span>
                    </div>
                  </div>
                  
                  {/* Badge for treatment */}
                  <span className="bg-blue-50/50 text-blue-accent border border-blue-100/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {rev.tag}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  「{rev.comment}」
                </p>
              </div>

              {/* Bottom Decoration */}
              <div className="flex items-center text-slate-400 text-xs mt-6 pt-4 border-t border-slate-100 space-x-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-accent" />
                <span className="font-semibold text-[10px] tracking-wider uppercase text-blue-accent">
                  Google 地圖真實評論認證
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
