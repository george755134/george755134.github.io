import React, { useState } from 'react';
import { Calendar, Users, Megaphone, Trash2, Check, X, Plus, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Booking, ClinicSchedule, NewsItem, DayShift, SessionShift } from '../types';
import { SERVICES, WEEKDAYS_TW } from '../data';

interface CMSPanelProps {
  bookings: Booking[];
  schedule: ClinicSchedule;
  news: NewsItem[];
  notices: string[];
  onUpdateBookingStatus: (id: string, status: '待處理' | '已確認' | '取消') => void;
  onDeleteBooking: (id: string) => void;
  onUpdateScheduleSlot: (dayKey: string, sessionKey: 'morning' | 'afternoon' | 'evening', doctors: string[], status: '✓' | '休') => void;
  onAddNotice: (notice: string) => void;
  onDeleteNotice: (idx: number) => void;
  onAddNews: (item: Omit<NewsItem, 'id' | 'date'>) => void;
  onDeleteNews: (id: string) => void;
}

export default function CMSPanel({
  bookings,
  schedule,
  news,
  notices,
  onUpdateBookingStatus,
  onDeleteBooking,
  onUpdateScheduleSlot,
  onAddNotice,
  onDeleteNotice,
  onAddNews,
  onDeleteNews
}: CMSPanelProps) {
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'schedule' | 'notices'>('bookings');
  
  // States for adding custom values
  const [newNoticeText, setNewNoticeText] = useState('');
  
  // State for updating doctors in schedule
  const [editingDay, setEditingDay] = useState<string>('monday');
  const [editingSession, setEditingSession] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [doctorInput, setDoctorInput] = useState('');
  const [slotStatusInput, setSlotStatusInput] = useState<'✓' | '休'>('✓');

  // State for adding news item
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'公告' | '休診' | '活動' | '衛教'>('公告');
  const [newsContent, setNewsContent] = useState('');
  const [newsIsImportant, setNewsIsImportant] = useState(false);

  // Helper to translate serviceId to Name
  const getServiceName = (id: string) => {
    return SERVICES.find((s) => s.id === id)?.name || id;
  };

  const handleAddNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;
    onAddNotice(newNoticeText.trim());
    setNewNoticeText('');
  };

  const handleUpdateScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Split input by comma or space
    const doctors = doctorInput
      .split(/[,，、\s]+/)
      .map((d) => d.trim())
      .filter((d) => d.length > 0);
    
    onUpdateScheduleSlot(editingDay, editingSession, doctors, slotStatusInput);
    alert('班表修改成功！請在下方的「門診時間」區塊查看即時更新。');
  };

  const handleAddNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) return;
    onAddNews({
      title: newsTitle.trim(),
      category: newsCategory,
      content: newsContent.trim(),
      important: newsIsImportant
    });
    setNewsTitle('');
    setNewsContent('');
    setNewsIsImportant(false);
    alert('新聞公告新增成功！');
  };

  return (
    <section id="cms-dashboard" className="py-16 bg-slate-900 text-slate-100 border-b border-slate-800 text-left animate-in fade-in slide-in-from-top-10 duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>ADMIN CLINIC CMS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">上新牙醫 ・ 診所模擬後台管理系統</h3>
            <p className="text-xs text-slate-400 font-semibold">
              此面板用於模擬診所實際運作時，櫃檯與資訊部管理的後台操作。在此進行的預約審核、公告發布與醫師班表修改，均會「即時」更新於前台網站中！
            </p>
          </div>
          
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>預約管理 ({bookings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'schedule' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>班表維護</span>
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'notices' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>公告與新聞</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span>線上掛號諮詢申請列表</span>
                <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full font-bold">
                  實時同步
                </span>
              </h4>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-slate-850 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
                <AlertCircle className="w-12 h-12 text-slate-600" />
                <p className="text-sm font-semibold text-slate-400">目前尚無預約掛號申請。</p>
                <p className="text-xs text-slate-500">當您在前台「線上預約」填寫表單並提交後，掛號資訊將會立即顯示於此！</p>
              </div>
            ) : (
              <div className="bg-slate-850 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-750 text-slate-400 font-bold text-xs uppercase tracking-wider">
                        <th className="py-4 px-4 text-left">申請時間 / 序號</th>
                        <th className="py-4 px-4 text-left">姓名 / 聯絡電話</th>
                        <th className="py-4 px-4 text-left">預約項目</th>
                        <th className="py-4 px-4 text-left">預約時間</th>
                        <th className="py-4 px-4 text-left">通知偏好</th>
                        <th className="py-4 px-4 text-left">狀態</th>
                        <th className="py-4 px-4 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                      {bookings.map((book) => (
                        <tr key={book.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-4">
                            <span className="text-xs text-slate-500 block font-mono">{book.id}</span>
                            <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">{book.createdAt}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-white">{book.name}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">{book.phone}</div>
                            {book.email && <div className="text-[10px] text-slate-500 mt-0.5">{book.email}</div>}
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-blue-300">
                              {getServiceName(book.serviceId)}
                            </span>
                            {book.notes && (
                              <div className="text-xs bg-slate-800/50 p-2 rounded-lg text-slate-300 mt-1 max-w-[220px] whitespace-pre-line border border-slate-750/30 font-normal">
                                {book.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-300">
                            <div className="font-mono">{book.date}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{book.timeSlot}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-md font-bold inline-block ${
                              book.replyMethod === 'LINE'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                              {book.replyMethod}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-black block text-center w-16 ${
                              book.status === '待處理'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20'
                                : book.status === '已確認'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                                : 'bg-red-500/20 text-red-400 border border-red-500/20'
                            }`}>
                              {book.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {book.status === '待處理' && (
                                <>
                                  <button
                                    onClick={() => onUpdateBookingStatus(book.id, '已確認')}
                                    className="p-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
                                    title="核准並確認預約"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => onUpdateBookingStatus(book.id, '取消')}
                                    className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                                    title="取消預約"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => onDeleteBooking(book.id)}
                                className="p-1.5 bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                                title="刪除紀錄"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Doctor Schedule Maintenance */}
        {activeTab === 'schedule' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Update form */}
            <div className="lg:col-span-5 bg-slate-850 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                <Users className="w-5 h-5 text-blue-400" />
                <span>編輯班表時段</span>
              </h4>
              <p className="text-xs text-slate-400">
                選擇星期與診次，輸入該診次看診的醫師姓名，若輸入多位醫師請用逗號分隔。
              </p>

              <form onSubmit={handleUpdateScheduleSubmit} className="space-y-4">
                
                {/* Day selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">選擇星期</label>
                  <select
                    value={editingDay}
                    onChange={(e) => setEditingDay(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none focus:border-blue-500"
                  >
                    {WEEKDAYS_TW.map((day) => (
                      <option key={day.key} value={day.key}>{day.label}</option>
                    ))}
                  </select>
                </div>

                {/* Session selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">選擇診次</label>
                  <select
                    value={editingSession}
                    onChange={(e) => setEditingSession(e.target.value as 'morning' | 'afternoon' | 'evening')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="morning">上午診 (10:00 - 12:00)</option>
                    <option value="afternoon">下午診 (14:00 - 17:00)</option>
                    <option value="evening">晚上診 (18:00 - 21:00)</option>
                  </select>
                </div>

                {/* Status Toggle */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block">開診狀態</label>
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="slotStatus"
                        checked={slotStatusInput === '✓'}
                        onChange={() => setSlotStatusInput('✓')}
                        className="w-4 h-4 text-blue-600 focus:ring-0"
                      />
                      <span>✓ 正常開診</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="slotStatus"
                        checked={slotStatusInput === '休'}
                        onChange={() => setSlotStatusInput('休')}
                        className="w-4 h-4 text-blue-600 focus:ring-0"
                      />
                      <span>休 休診</span>
                    </label>
                  </div>
                </div>

                {/* Doctors list input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400">看診醫師名單 (逗號分隔)</label>
                  <input
                    type="text"
                    value={doctorInput}
                    onChange={(e) => setDoctorInput(e.target.value)}
                    placeholder="例：陳建宏, 林雅婷"
                    disabled={slotStatusInput === '休'}
                    className="w-full bg-slate-800 disabled:opacity-40 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">※ 若該診為休診，不需填寫醫師名單。</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer"
                >
                  確認修改班表
                </button>

              </form>
            </div>

            {/* Current quick list */}
            <div className="lg:col-span-7 bg-slate-850 p-6 rounded-2xl border border-slate-800 text-left space-y-4">
              <h4 className="text-lg font-extrabold text-white">當前排班概覽</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WEEKDAYS_TW.map((day) => {
                  const dayShift = schedule[day.key];
                  return (
                    <div key={day.key} className="bg-slate-800 p-3.5 rounded-xl border border-slate-750">
                      <div className="font-extrabold text-slate-200 text-xs tracking-wider mb-2 pb-1 border-b border-slate-700 flex justify-between">
                        <span>{day.label}</span>
                        {day.key === 'sunday' && <span className="text-red-400 text-[10px]">休</span>}
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div>
                          <span className="text-slate-500">上午：</span>
                          <span className="text-slate-300">
                            {dayShift.morning.status === '✓' ? dayShift.morning.doctors.join(',') || '開診' : '休'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">下午：</span>
                          <span className="text-slate-300">
                            {dayShift.afternoon.status === '✓' ? dayShift.afternoon.doctors.join(',') || '開診' : '休'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">晚上：</span>
                          <span className="text-slate-300">
                            {dayShift.evening.status === '✓' ? dayShift.evening.doctors.join(',') || '開診' : '休'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Announcement / News Notice Management */}
        {activeTab === 'notices' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Left side: Notice manager */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-slate-850 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                  <Megaphone className="w-5 h-5 text-amber-400" />
                  <span>發布特別休診 / 緊急公告</span>
                </h4>
                <p className="text-xs text-slate-400">
                  此公告將會「即時」以高亮黃底警告條形式顯示於「門診排班表」上方。適合發布颱風休診、特定節日放假、特殊停開診等臨時公告。
                </p>

                <form onSubmit={handleAddNoticeSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoticeText}
                    onChange={(e) => setNewNoticeText(e.target.value)}
                    placeholder="例如：本院 7/16 配合大樓配電保養，當日晚診休診。"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white font-semibold focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer"
                  >
                    發布公告
                  </button>
                </form>

                <div className="space-y-2 pt-2">
                  <h5 className="font-extrabold text-slate-300 text-xs uppercase tracking-wider">
                    當前發布中的緊急公告：
                  </h5>
                  {notices.length === 0 ? (
                    <span className="text-xs text-slate-500 block">目前尚無高亮緊急公告。</span>
                  ) : (
                    <div className="space-y-2">
                      {notices.map((not, idx) => (
                        <div key={idx} className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl flex justify-between items-center text-xs">
                          <span className="text-amber-400 font-bold">{not}</span>
                          <button
                            onClick={() => onDeleteNotice(idx)}
                            className="text-red-400 hover:text-red-500 font-black"
                            title="刪除此公告"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right side: News announcement writer */}
            <div className="lg:col-span-6">
              <div className="bg-slate-850 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <span>新增診所最新消息</span>
                </h4>
                
                <form onSubmit={handleAddNewsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">消息標題</label>
                      <input
                        type="text"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        placeholder="例：九月起新增星期日自費預約門診"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400">消息類別</label>
                      <select
                        value={newsCategory}
                        onChange={(e) => setNewsCategory(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none"
                      >
                        <option value="公告">公告</option>
                        <option value="休診">休診</option>
                        <option value="活動">活動</option>
                        <option value="衛教">衛教</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400">消息內容</label>
                    <textarea
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="請輸入消息詳細內容說明..."
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newsImportant"
                      checked={newsIsImportant}
                      onChange={(e) => setNewsIsImportant(e.target.checked)}
                      className="w-4 h-4 text-blue-600 focus:ring-0 rounded bg-slate-800 border-slate-700"
                    />
                    <label htmlFor="newsImportant" className="text-xs font-bold text-slate-300 cursor-pointer select-none">
                      標記為重要消息（紅底高亮）
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer"
                  >
                    發布此消息
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
