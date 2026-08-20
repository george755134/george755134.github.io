import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, Award, Sparkles, AlertCircle } from 'lucide-react';
import { CLINIC_NAME } from '../data';

export default function About() {
  const environmentImages = [
    {
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      title: '明亮尊榮大廳',
      desc: '寬敞舒適的待診空間，降低看診焦慮'
    },
    {
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      title: '高階數位診療椅',
      desc: '人體工學包覆椅面，坐享精準舒適治療'
    },
    {
      url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800',
      title: '數位精密診療中心',
      desc: '引進高解析數位掃描與精密輔助治療'
    }
  ];

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const features = [
    {
      icon: <Award className="w-6 h-6 text-blue-accent" />,
      title: '國際認證植體',
      desc: '採用原廠精密植體與先進生醫耗材，安心有保障'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-accent" />,
      title: '完善感控措施',
      desc: '嚴格符合美國 CDC 感控標準，100% 醫療級消毒隔離'
    },
    {
      icon: <Heart className="w-6 h-6 text-blue-accent" />,
      title: '專業醫療團隊',
      desc: '醫學中心專科醫師駐診，守護每一顆牙'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-accent" />,
      title: '無痛舒適治療',
      desc: '溫和局部麻醉與靜脈舒眠麻醉，讓看牙如同熟睡'
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with overlays */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5 border border-slate-100">
              {/* Main Image */}
              <img
                src={environmentImages[activeImageIdx].url}
                alt={environmentImages[activeImageIdx].title}
                className="w-full h-[400px] sm:h-[480px] object-cover transition-all duration-500 transform hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 text-white text-left">
                <span className="text-xs bg-blue-accent px-2.5 py-0.5 rounded-full font-bold tracking-wide uppercase mb-1 inline-block">
                  診所環境
                </span>
                <h4 className="text-xl font-bold">{environmentImages[activeImageIdx].title}</h4>
                <p className="text-xs text-slate-200 mt-1">{environmentImages[activeImageIdx].desc}</p>
              </div>

              {/* Google Reviews Float Card */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl card-shadow border border-slate-100 flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-extrabold text-slate-800 text-sm">Google 3.9 分</span>
                    <div className="flex text-amber-400">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <div className="relative">
                        <Star className="w-3 h-3 text-amber-400" />
                        <div className="absolute top-0 left-0 overflow-hidden w-[90%]">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        </div>
                      </div>
                      <Star className="w-3 h-3 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Float Card */}
              <div className="absolute bottom-20 right-6 bg-blue-accent text-white px-5 py-4 rounded-2xl card-shadow flex flex-col items-center justify-center">
                <span className="text-2xl font-black font-mono leading-none">20+</span>
                <span className="text-xs font-bold mt-1 tracking-wider">年豐富經驗</span>
              </div>
            </div>

            {/* Environment Image Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {environmentImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all cursor-pointer ${
                    activeImageIdx === i ? 'border-blue-accent card-shadow scale-[1.03]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Descriptions & Highlights */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div>
              <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-2 border border-blue-100/50">
                關於我們
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
                以患者為中心的<br />專業牙科診所
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {CLINIC_NAME}自創立以來，深耕桃園八德區已達 20 年，我們始終秉持「以患者為本、以技術為根」的核心理念，提供高水準、可信賴的精緻牙科醫療。
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              為求治療的絕對精準，我們引進高精度口內數位掃描儀，不論是一般牙科、多顆高難度植牙或是一日 All-on-4/6 全口重建，皆能在最安全、舒適且近乎無痛的環境下順利完成。
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50/50 flex items-center justify-center shadow-sm border border-blue-100/20">
                    {feat.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-base">{feat.title}</h5>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
