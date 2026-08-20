import React from 'react';
import { MessageSquare, Bell, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { CLINIC_LINE_ID, CLINIC_LINE_URL } from '../data';

export default function LINEBlock() {
  const lineBookingSlots = [
    { label: '上午', time: '10:00–12:00' },
    { label: '下午', time: '14:00–17:00' },
    { label: '晚上', time: '18:00–21:00' }
  ];

  const lineBenefits = [
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      title: '一對一私密線上諮詢',
      desc: '專業護理師及客服在線回覆，解答您的看診疑問、初估費用與安排醫師。'
    },
    {
      icon: <Bell className="w-5 h-5 text-emerald-600" />,
      title: '自動化門診預約與回診提醒',
      desc: '完成約診後，自動發送預約詳情，並在看診前一日自動提醒，絕不遺漏。'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
      title: '即時特約公告與最新衛教新知',
      desc: '第一時間獲取診所特定節日門診異動、醫生休診通知、暑期活動與潔牙常識。'
    }
  ];

  return (
    <section id="line-promotion" className="py-20 medical-gradient border-y border-emerald-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">

          {/* Left: Text & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 uppercase">
                診所 LINE 帳號
              </span>
              <h3 className="text-2xl sm:text-3.5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                加入 LINE 好友<br />享受極速便捷的智慧口腔照護
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              上新牙醫數位 LINE 正式開通！不論您是需要初估植牙費用、預約洗牙、指定醫師排班，還是接收自動門診通知，加入我們的好友，一機在手，預約牙醫就像聊天一樣輕鬆。
            </p>

            {/* LINE Booking Time Slots */}
            <div className="bg-white/70 border border-emerald-100 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-emerald-600" />
                <h4 className="font-extrabold text-slate-800 text-sm">LINE 可預約時段</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {lineBookingSlots.map((slot, idx) => (
                  <div key={idx} className="text-center bg-emerald-50/60 rounded-xl py-2.5 px-1">
                    <div className="text-[11px] font-bold text-emerald-700">{slot.label}</div>
                    <div className="text-xs sm:text-sm font-black text-slate-800 mt-0.5">{slot.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits list */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {lineBenefits.map((b, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">{b.title}</h4>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: QR Code Mock Display Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-center shadow-xl relative overflow-hidden max-w-sm mx-auto">
              
              {/* Decorative light ring */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-emerald-400/10 blur-xl" />

              <div className="space-y-4">
                <span className="text-[10px] tracking-widest font-black text-emerald-600 block uppercase">
                  掃描 QR Code 加好友
                </span>

                {/* Simulated QR Code box */}
                <div className="mx-auto w-44 h-44 p-3 bg-white border border-slate-100 rounded-2xl shadow-inner flex items-center justify-center relative group">
                  
                  {/* Subtle target lines */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500" />

                  {/* Trustworthy mock QR pattern illustration */}
                  <div className="w-full h-full bg-slate-50 border border-slate-200/50 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1614680376593-902f74fa0d41?auto=format&fit=crop&q=80&w=300&blur=4" // Simulated digital asset
                      alt="LINE QR Code Mock"
                      className="w-full h-full object-cover opacity-10"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Centered Logo block */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      {/* Stylized QR dots */}
                      <div className="grid grid-cols-5 gap-2.5 opacity-60">
                        {[...Array(25)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2.5 h-2.5 rounded-sm ${
                              i % 3 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24
                                ? 'bg-emerald-600'
                                : 'bg-slate-400/40'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Logo badge in center */}
                      <div className="absolute bg-white rounded-lg p-1.5 shadow-md border border-slate-100 font-extrabold text-emerald-600 text-xs">
                        LINE
                      </div>
                    </div>

                  </div>
                </div>

                <div>
                  <div className="text-slate-800 text-base font-extrabold tracking-wide">
                    LINE ID: <span className="text-emerald-600 font-black font-mono select-all">{CLINIC_LINE_ID}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    ※ 手機看網頁可以直接點選下方按鈕一鍵加好友
                  </p>
                </div>

                {/* Add Friend Green Button */}
                <a
                  href={CLINIC_LINE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-[#06C755] hover:bg-[#05b04b] text-white rounded-xl font-extrabold text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#06C755]/10 hover:shadow-[#06C755]/20 cursor-pointer active:scale-98"
                  id="line-add-friend-btn"
                >
                  <MessageSquare className="w-5 h-5 fill-white text-[#06C755]" />
                  <span>加我們好友預約諮詢</span>
                </a>

                {/* Security and notification pledge */}
                <div className="flex items-center justify-center space-x-1.5 text-slate-400 text-[10px] pt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-emerald-700/80">真人客服，用心即時回覆</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
