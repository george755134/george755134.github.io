import React from 'react';
import { Clock, Info, Calendar, AlertTriangle } from 'lucide-react';
import { ClinicSchedule, DayShift } from '../types';
import { WEEKDAYS_TW, CLINIC_HOURS_TEXT, CLINIC_PHONE } from '../data';

interface ScheduleProps {
  schedule: ClinicSchedule;
  activeNotices: string[];
}

export default function Schedule({ schedule, activeNotices }: ScheduleProps) {
  // Get current day of week (0 is Sunday, 1 is Monday, etc.)
  const todayNum = new Date().getDay();
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayKey = dayKeys[todayNum];

  const sessions = [
    { key: 'morning', label: '上午診', time: '10:00 - 12:00' },
    { key: 'afternoon', label: '下午診', time: '14:00 - 17:00' },
    { key: 'evening', label: '晚上診', time: '18:00 - 21:00' }
  ];

  return (
    <section id="schedule" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            門診時間
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            門診班表與特約時段
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4">
            本院採預約優先制，每診次皆有專科醫師駐診。建議您提前預約，以節省您寶貴的時間。
          </p>
        </div>

        {/* Notices and announcements */}
        {activeNotices.length > 0 && (
          <div className="mb-10 max-w-4xl mx-auto animate-pulse-subtle">
            <div className="bg-amber-50/80 border-l-4 border-amber-500 rounded-2xl p-5 text-left flex gap-3.5 card-shadow">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-amber-900 text-base font-heading">診所最新公告 / 特別休診提醒</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  {activeNotices.map((notice, i) => (
                    <li key={i} className="text-amber-800 text-sm font-semibold">
                      {notice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Table Container */}
        <div className="bg-white border border-blue-100/40 rounded-3xl p-4 sm:p-8 card-shadow max-w-5xl mx-auto overflow-hidden">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-200/60 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-accent flex items-center justify-center text-white shadow-md shadow-blue-900/10">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-800 text-lg font-heading">醫師門診排班表</h4>
                <p className="text-xs text-slate-400 mt-0.5">※ 點選線上預約可選擇特定看診時段與醫師</p>
              </div>
            </div>
            
            {/* Live Indicator Legend */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-accent" />
                <span>今日開診</span>
              </span>
              <span className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span>休診</span>
              </span>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse" id="clinic-schedule-table">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  <th className="py-4 px-4 text-left font-extrabold text-slate-800 bg-slate-50 rounded-tl-xl border-r border-slate-100">
                    門診時段 / 時間
                  </th>
                  {WEEKDAYS_TW.map((day) => {
                    const isToday = day.key === todayKey;
                    return (
                      <th
                        key={day.key}
                        className={`py-4 px-3 text-center transition-colors font-extrabold ${
                          isToday
                            ? 'bg-blue-accent text-white rounded-t-xl'
                            : 'text-slate-700 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span>{day.label}</span>
                          {isToday && (
                            <span className="text-[9px] bg-white text-blue-accent px-1.5 py-0.2 rounded-full font-black mt-1 uppercase tracking-wide">
                              TODAY
                            </span>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {sessions.map((sess, idx) => (
                  <tr key={sess.key} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Time cell */}
                    <td className="py-5 px-4 text-left border-r border-slate-100 bg-slate-50/30 min-w-[150px]">
                      <div className="font-extrabold text-slate-800 text-sm">
                        {sess.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-accent" />
                        <span className="font-mono">{sess.time}</span>
                      </div>
                    </td>

                    {/* Day of week cells */}
                    {WEEKDAYS_TW.map((day) => {
                      const dayShift: DayShift = schedule[day.key];
                      const sessionShift = dayShift[sess.key as keyof DayShift];
                      const isOpen = sessionShift.status === '✓' && sessionShift.doctors.length > 0;
                      const isToday = day.key === todayKey;

                      return (
                        <td
                          key={day.key}
                          className={`py-4 px-2 text-center transition-colors border-r border-slate-100 last:border-r-0 ${
                            isToday ? 'bg-blue-50/30 ring-1 ring-blue-100/50' : ''
                          }`}
                        >
                          {isOpen ? (
                            <div className="flex flex-col items-center justify-center space-y-1">
                              {/* Open badge */}
                              <span className="text-blue-accent font-extrabold text-sm flex items-center justify-center">
                                ✓
                              </span>
                              {/* Scheduled Doctors */}
                              <div className="flex flex-col gap-0.5">
                                {sessionShift.doctors.map((doc, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className={`text-xs font-bold block ${
                                      doc === '陳建宏'
                                        ? 'text-slate-800'
                                        : doc === '林雅婷'
                                        ? 'text-indigo-700'
                                        : 'text-sky-600'
                                    }`}
                                  >
                                    {doc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span className="font-black text-xs text-slate-300 block select-none">
                              休
                            </span>
                          )}
                        </td>
                      );
                    })}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Legend/Disclaimers */}
          <div className="mt-6 border-t border-slate-200/60 pt-5 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-2 max-w-xl text-xs text-slate-400 leading-relaxed font-semibold">
              <Info className="w-4.5 h-4.5 text-blue-accent flex-shrink-0 mt-0.5" />
              <p>
                ※ 醫師門診時間偶有異動，如遇特定節日、特別休診公告等請以本院現場公告或首頁特別公告為準。特殊手術或初診患者建議撥打特約電話進行預約。
              </p>
            </div>
            <a
              href={`tel:${CLINIC_PHONE}`}
              className="px-5 py-2.5 rounded-xl bg-blue-accent hover:opacity-95 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-blue-900/10 shrink-0"
              id="schedule-phone-cta"
            >
              <span>撥打預約電話：{CLINIC_PHONE}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
