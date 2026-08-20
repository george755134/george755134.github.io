import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Reviews from './components/Reviews';
import Cases from './components/Cases';
import FAQ from './components/FAQ';
import Schedule from './components/Schedule';
import BookingForm from './components/BookingForm';
import ContactMap from './components/ContactMap';
import LINEBlock from './components/LINEBlock';
import Footer from './components/Footer';
import CMSPanel from './components/CMSPanel';
import FloatingActions from './components/FloatingActions';

import { Booking, ClinicSchedule, NewsItem } from './types';
import { INITIAL_NEWS, INITIAL_SCHEDULE } from './data';

export default function App() {
  
  // Real-time CMS and Client Synchronized states
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'B-10254',
      name: '林美雲',
      phone: '0935-123***',
      serviceId: 'implant',
      date: '2026-06-29',
      timeSlot: '上午診 10:00 - 12:00',
      notes: '想諮詢微創人工植牙，希望能由陳建宏院長親自評估。',
      replyMethod: '電話',
      status: '已確認',
      createdAt: '2026-06-25 10:24'
    },
    {
      id: 'B-10255',
      name: '張家瑋',
      phone: '0912-987***',
      serviceId: 'allon4',
      date: '2026-07-02',
      timeSlot: '下午診 14:00 - 17:00',
      notes: '幫爸爸預約 All-on-4 一日全口重建諮詢。爸爸長年戴活動假牙不合，想看能不能當天做好固定牙。',
      replyMethod: 'LINE',
      status: '待處理',
      createdAt: '2026-06-26 09:12'
    }
  ]);

  const [schedule, setSchedule] = useState<ClinicSchedule>(INITIAL_SCHEDULE);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [notices, setNotices] = useState<string[]>([
    '【活動公告】本院全面引進最新款 3D 數位口內掃描系統，不需咬牙模、無噁心感，精確舒適度提升 100%！',
    '【醫療特報】週六上午新增特別植牙特約門診，歡迎撥打電話或加入 LINE 預約諮詢。'
  ]);

  // UI state managers
  const [cmsOpen, setCmsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('implant');
  const [preselectedDoctor, setPreselectedDoctor] = useState('');

  // Auto-scroll utility helpers
  const handleScrollToBooking = (doctorName?: string) => {
    if (doctorName) {
      setPreselectedDoctor(doctorName);
    }
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreselects = () => {
    setPreselectedDoctor('');
  };

  // CMS state handlers
  const handleUpdateBookingStatus = (id: string, status: '待處理' | '已確認' | '取消') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const handleDeleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddBooking = (newBooking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const randomId = `B-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const bookingRecord: Booking = {
      ...newBooking,
      id: randomId,
      status: '待處理',
      createdAt: formattedDate
    };

    setBookings((prev) => [bookingRecord, ...prev]);
  };

  const handleUpdateScheduleSlot = (
    dayKey: string,
    sessionKey: 'morning' | 'afternoon' | 'evening',
    doctors: string[],
    status: '✓' | '休'
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [sessionKey]: { doctors, status }
      }
    }));
  };

  const handleAddNotice = (notice: string) => {
    setNotices((prev) => [notice, ...prev]);
  };

  const handleDeleteNotice = (idx: number) => {
    setNotices((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddNews = (newItem: Omit<NewsItem, 'id' | 'date'>) => {
    const randomId = `news-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    const newsRecord: NewsItem = {
      ...newItem,
      id: randomId,
      date: formattedDate
    };

    setNews((prev) => [newsRecord, ...prev]);
  };

  const handleDeleteNews = (id: string) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleScrollToBooking()}
        onToggleCMS={() => setCmsOpen(!cmsOpen)}
        cmsOpen={cmsOpen}
      />

      {/* 2. CMS Administrative Panel (Toggled by user in Navbar) */}
      {cmsOpen && (
        <CMSPanel
          bookings={bookings}
          schedule={schedule}
          news={news}
          notices={notices}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onDeleteBooking={handleDeleteBooking}
          onUpdateScheduleSlot={handleUpdateScheduleSlot}
          onAddNotice={handleAddNotice}
          onDeleteNotice={handleDeleteNotice}
          onAddNews={handleAddNews}
          onDeleteNews={handleDeleteNews}
        />
      )}

      {/* 3. Main Landing Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          onScrollToBooking={() => handleScrollToBooking()}
          onScrollToServices={handleScrollToServices}
        />

        {/* About Section */}
        <About />

        {/* Services Tab Section */}
        <Services
          selectedServiceId={selectedServiceId}
          onSelectService={setSelectedServiceId}
          onScrollToBooking={() => handleScrollToBooking()}
        />

        {/* Doctors Profiles Section */}
        <Doctors onScrollToBooking={handleScrollToBooking} />

        {/* Before / After Cases Grid */}
        <Cases onScrollToBooking={() => handleScrollToBooking()} />

        {/* Patient Reviews Segment */}
        <Reviews />

        {/* Detailed Q&A Segment */}
        <FAQ />

        {/* Clinic Calendar & Scheduling Table */}
        <Schedule schedule={schedule} activeNotices={notices} />

        {/* LINE Promotional banner */}
        <LINEBlock />

        {/* Dynamic Online Booking Form */}
        <BookingForm
          onSubmitBooking={handleAddBooking}
          preselectedDoctor={preselectedDoctor}
          preselectedServiceId={selectedServiceId}
          onClearPreselects={handleClearPreselects}
        />

        {/* Maps Traffic Location block */}
        <ContactMap />

      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Mobile Fixed Action Bar & Desktop Widgets */}
      <FloatingActions onScrollToBooking={() => handleScrollToBooking()} />

    </div>
  );
}
