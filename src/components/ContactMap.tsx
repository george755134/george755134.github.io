import React from 'react';
import { MapPin, Phone, Mail, Navigation, MessageSquare, Car, Train, Bus } from 'lucide-react';
import { CLINIC_ADDRESS, CLINIC_PHONE, CLINIC_EMAIL, CLINIC_NAME, CLINIC_LINE_URL } from '../data';

export default function ContactMap() {
  const mapEmbedUrl = "https://maps.google.com/maps?q=%E6%A1%83%E5%9C%92%E5%B8%82%E5%85%AB%E5%BE%B7%E5%8D%80%E4%BB%8B%E5%A3%BD%E8%B7%AF%E4%B8%80%E6%AE%B51001%E8%99%9F&hl=zh-TW&z=16&output=embed";

  const transportInfo = [
    {
      icon: <Train className="w-5 h-5 text-blue-accent" />,
      title: '搭乘大眾運輸 / 捷運 (Transit / MRT)',
      desc: '可搭乘台鐵至【桃園火車站】轉乘公車 GR2、5096、102 或 201 於【麻園】或【瑞祥里】站下車，步行 1-2 分鐘即可抵達。未來鄰近桃園捷運綠線 G05 站。'
    },
    {
      icon: <Bus className="w-5 h-5 text-blue-accent" />,
      title: '搭乘公車 (Bus)',
      desc: '搭乘 GR2、5096、102、201、GR2A、5044 等市區公車路線，至【麻園】站下車即可抵達診所前。'
    },
    {
      icon: <Car className="w-5 h-5 text-blue-accent" />,
      title: '自行開車 / 停車 (Parking)',
      desc: '可停靠【大湳公有停車場】、【廣豐新天地 (置地生活廣場) 停車場】或周邊路邊收費停車格，步行約 3-5 分鐘即可抵達。'
    }
  ];

  return (
    <section id="contact" className="py-24 medical-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            聯絡與交通
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            診所位置與交通指南
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            本院位處桃園市八德區核心路段，緊鄰介壽路大湳商圈，不論搭乘公車、台鐵轉乘或自行開車前往皆十分便利。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Map frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-blue-100/40 card-shadow min-h-[350px] sm:min-h-[450px] relative">
            <iframe
              src={mapEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Google Map Location of Shangxin Dental"
              id="google-maps-iframe"
            />
          </div>

          {/* Right Column: Contact info and transport guidelines */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-slate-800 tracking-wide font-heading">{CLINIC_NAME}</h4>
              
              {/* Contact Grid details */}
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex gap-3.5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-accent border border-blue-100/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">診所地址</span>
                    <p className="text-slate-700 text-sm font-semibold mt-0.5">{CLINIC_ADDRESS}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3.5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-accent border border-blue-100/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">特約電話</span>
                    <p className="text-slate-700 text-sm font-semibold mt-0.5">{CLINIC_PHONE}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3.5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-accent border border-blue-100/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">電子信箱</span>
                    <p className="text-slate-700 text-sm font-semibold mt-0.5">{CLINIC_EMAIL}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={`tel:${CLINIC_PHONE}`}
                className="py-3.5 px-2 bg-blue-accent hover:opacity-95 text-white font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-1.5 shadow-md shadow-blue-900/10 cursor-pointer"
                id="contact-btn-phone"
              >
                <Phone className="w-4 h-4" />
                <span>撥打預約</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC_ADDRESS)}`}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer border border-slate-150"
                id="contact-btn-navigate"
              >
                <Navigation className="w-4 h-4 text-slate-600" />
                <span>路線導航</span>
              </a>
              <a
                href={CLINIC_LINE_URL}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl flex flex-col items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer"
                id="contact-btn-line"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>LINE 加好友</span>
              </a>
            </div>

            {/* Transport details */}
            <div className="border-t border-slate-100 pt-6 space-y-4">
              <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                詳細交通指引
              </h5>
              <div className="space-y-3.5">
                {transportInfo.map((info, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center mt-0.5 border border-blue-100/30">
                      {info.icon}
                    </div>
                    <div>
                      <h6 className="font-bold text-slate-800 text-xs sm:text-sm">
                        {info.title}
                      </h6>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        {info.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
