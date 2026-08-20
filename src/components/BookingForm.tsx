import React, { useState, useEffect } from 'react';
import { Calendar, Phone, CheckCircle, ShieldCheck, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { Booking } from '../types';
import { SERVICES, CLINIC_PHONE, CLINIC_LINE_ID, CLINIC_LINE_URL } from '../data';

interface BookingFormProps {
  onSubmitBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
  preselectedDoctor?: string;
  preselectedServiceId?: string;
  onClearPreselects: () => void;
}

export default function BookingForm({
  onSubmitBooking,
  preselectedDoctor,
  preselectedServiceId,
  onClearPreselects
}: BookingFormProps) {
  
  // Set default form values
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('上午診 10:00 - 12:00');
  const [serviceId, setServiceId] = useState('implant');
  const [replyMethod, setReplyMethod] = useState<'電話' | 'LINE'>('電話');
  const [notes, setNotes] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [summaryCopied, setSummaryCopied] = useState(false);
  const [bookingSummary, setBookingSummary] = useState('');

  // Get tomorrow's date formatted as YYYY-MM-DD for input min value
  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Sync pre-selected values
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedDoctor) {
      setNotes((prev) => {
        const docMsg = `【指定醫師：${preselectedDoctor} 醫師】`;
        if (prev.includes(docMsg)) return prev;
        return prev ? `${docMsg}\n${prev}` : docMsg;
      });
    }
  }, [preselectedDoctor]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = '請輸入您的姓名';
    
    // Simple phone regex validation (Taiwan phone number format preferred)
    if (!phone.trim()) {
      newErrors.phone = '請輸入聯絡電話';
    } else if (!/^[0-9\-+\s()]{8,15}$/.test(phone)) {
      newErrors.phone = '請輸入格式正確的聯絡電話';
    }

    if (!date) newErrors.date = '請選擇預約日期';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSubmitBooking({
      name,
      phone,
      email: email.trim() || undefined,
      serviceId,
      date,
      timeSlot,
      replyMethod,
      notes: notes.trim() || undefined
    });

    const serviceName = SERVICES.find((s) => s.id === serviceId)?.name || serviceId;
    const summary = [
      '【線上預約諮詢】',
      `姓名：${name}`,
      `電話：${phone}`,
      email.trim() ? `Email：${email.trim()}` : null,
      `預約日期：${date}`,
      `預約時段：${timeSlot}`,
      `欲諮詢項目：${serviceName}`,
      `首選聯絡方式：${replyMethod}`,
      notes.trim() ? `備註：${notes.trim()}` : null
    ].filter(Boolean).join('\n');

    setBookingSummary(summary);
    navigator.clipboard?.writeText(summary).then(
      () => setSummaryCopied(true),
      () => setSummaryCopied(false)
    );
    window.open(CLINIC_LINE_URL, '_blank', 'noreferrer');

    setIsSuccess(true);

    // Clear inputs except defaults
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setNotes('');
    onClearPreselects();
  };

  return (
    <section id="booking" className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative vector elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-blue-100/20 blur-3xl" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full bg-indigo-100/20 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            線上預約
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            快速預約門診諮詢
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            填寫以下簡短資訊，我們的牙醫小幫手將於 24 小時內與您聯繫，確認最終看診時間與安排。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 bg-white/95 border border-blue-100/40 rounded-3xl card-shadow overflow-hidden max-w-4xl mx-auto">
          
          {/* Left Info Panel (LINE and Phone Booking CTAs) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-accent to-indigo-950 p-8 sm:p-10 text-white text-left flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent z-0" />
            
            <div className="space-y-8 relative z-10">
              
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black tracking-wide font-heading">預約專屬諮詢</h4>
                <p className="text-xs text-blue-200">您也可以透過以下直接便捷的管道預約諮詢：</p>
              </div>

              {/* Direct LINE Booking */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm font-bold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LINE 極速預約</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  加入上新 LINE 好友，發送您的姓名與需求，客服小幫手將會立即為您人工安排，並提供前一日自動回診通知。
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={CLINIC_LINE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/10 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-white text-emerald-500" />
                    <span>加好友預約：{CLINIC_LINE_ID}</span>
                  </a>
                </div>
              </div>

              {/* Direct Phone Booking */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm font-bold text-cyan-300">
                  <Phone className="w-4 h-4" />
                  <span>撥打特約電話</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  如果您需要立即安排今天或明天的急診，建議直接於營業時間撥打客服專利電話。
                </p>
                <a
                  href={`tel:${CLINIC_PHONE}`}
                  className="inline-block text-xl font-mono font-black text-white hover:text-cyan-200 transition-colors"
                >
                  {CLINIC_PHONE}
                </a>
              </div>

            </div>

            {/* Bottom trust badge */}
            <div className="pt-8 border-t border-white/10 flex items-center gap-3 text-slate-400 relative z-10">
              <ShieldCheck className="w-9 h-9 text-cyan-400 flex-shrink-0" />
              <div className="text-[10px] text-slate-300 leading-relaxed">
                <span className="font-bold block text-white text-xs">隱私與資安承諾</span>
                本診所保證絕不將您的個資透露給任何外部第三方，資料傳輸皆經由 SSL 加密。
              </div>
            </div>

          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 text-left">
            
            {isSuccess ? (
              // Success Message Box
              <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-6 animate-fade-in" id="booking-success-box">
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-500 flex items-center justify-center text-emerald-500 animate-scale-up">
                  <CheckCircle className="w-12 h-12 fill-white" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-800 font-heading">預約申請已提交！</h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                    親愛的患者，我們已成功收到您的線上門診諮詢預約。牙醫小幫手將於 24 小時內（營業時間）撥打您的電話或透過 LINE 與您進行細節確認，請留意來電。
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 max-w-sm mx-auto text-left space-y-3">
                  <p className="text-emerald-800 text-xs font-bold leading-relaxed">
                    {summaryCopied
                      ? '✓ 已自動複製您的預約資訊，並為您開啟 LINE。請在對話框中「貼上」並「送出」，加快我們確認您預約的速度！'
                      : '我們已為您開啟 LINE，請將以下預約資訊複製後貼到對話框中送出：'}
                  </p>
                  {!summaryCopied && (
                    <pre className="whitespace-pre-wrap bg-white border border-emerald-100 rounded-xl p-3 text-[11px] text-slate-600 font-mono select-all">
                      {bookingSummary}
                    </pre>
                  )}
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    再次預約
                  </button>
                  <a
                    href="#home"
                    className="px-6 py-2.5 rounded-xl bg-blue-accent text-white font-bold text-xs transition-colors shadow-md shadow-blue-900/10 hover:opacity-95"
                  >
                    返回首頁
                  </a>
                </div>
              </div>
            ) : (
              // Booking Form Elements
              <form onSubmit={handleSubmit} className="space-y-5" id="appointment-form">
                
                {preselectedDoctor && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-center justify-between font-bold animate-fade-in">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>已為您預約：{preselectedDoctor} 醫師</span>
                    </span>
                    <button
                      type="button"
                      onClick={onClearPreselects}
                      className="text-[10px] text-amber-600 hover:text-amber-800 underline uppercase"
                    >
                      清除
                    </button>
                  </div>
                )}

                {/* Form Fields Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                      <span>患者姓名</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例：王小明"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        errors.name
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-slate-200 focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50'
                      }`}
                      id="booking-input-name"
                    />
                    {errors.name && (
                      <span className="text-[10px] font-semibold text-red-500 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                      <span>聯絡電話</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="例：0912-345678"
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        errors.phone
                          ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                          : 'border-slate-200 focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50'
                      }`}
                      id="booking-input-phone"
                    />
                    {errors.phone && (
                      <span className="text-[10px] font-semibold text-red-500 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email field (optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>電子信箱 (選填)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="例：xiaoming@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50 transition-all"
                    id="booking-input-email"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Date Picker */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                      <span>預約日期</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={getTomorrowString()}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                        errors.date
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-slate-200 focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50'
                      }`}
                      id="booking-input-date"
                    />
                    {errors.date && (
                      <span className="text-[10px] font-semibold text-red-500 block">
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time slots selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                      <span>預約門診時段</span>
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50 transition-all"
                      id="booking-select-timeslot"
                    >
                      <option>上午診 10:00 - 12:00</option>
                      <option>下午診 14:00 - 17:00</option>
                      <option>晚上診 18:00 - 21:00</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Service selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                      <span>欲諮詢治療項目</span>
                    </label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold bg-white focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50 transition-all"
                      id="booking-select-service"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.name} ({srv.subtitle})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Reply Method */}
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                      <span>首選聯絡管道</span>
                    </label>
                    <div className="flex space-x-4 h-[45px] items-center">
                      <label className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="replyMethod"
                          checked={replyMethod === '電話'}
                          onChange={() => setReplyMethod('電話')}
                          className="w-4 h-4 text-blue-accent border-slate-300 focus:ring-blue-accent"
                        />
                        <span>電話聯繫</span>
                      </label>
                      <label className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="replyMethod"
                          checked={replyMethod === 'LINE'}
                          onChange={() => setReplyMethod('LINE')}
                          className="w-4 h-4 text-emerald-500 border-slate-300 focus:ring-emerald-500 focus:ring-offset-2"
                        />
                        <span className="text-emerald-600 font-bold">LINE 回信</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Notes Textarea */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                    <span>病情或需求備註說明 (選填)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="例如：牙齦出血已持續數週、需要諮詢人工植牙費用或指定醫師等。"
                    rows={2.5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-accent focus:ring-2 focus:ring-blue-100/50 transition-all"
                    id="booking-input-notes"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-accent hover:opacity-95 text-white rounded-xl font-extrabold text-base transition-all duration-200 shadow-lg shadow-blue-900/10 active:scale-98 cursor-pointer"
                  id="booking-btn-submit"
                >
                  確認並提交預約申請
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
