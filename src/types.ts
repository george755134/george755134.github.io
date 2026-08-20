export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  tags: string[];
  education: string[];
  photo: string;
}

export interface Service {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  features: string[];
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  tag: string;
}

export interface Case {
  id: string;
  title: string;
  subtitle: string;
  beforeImg: string;
  afterImg: string;
  desc: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: '公告' | '休診' | '活動' | '衛教';
  date: string;
  content: string;
  important?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  replyMethod: '電話' | 'LINE';
  status: '待處理' | '已確認' | '取消';
  createdAt: string;
}

export interface SessionShift {
  doctors: string[];
  status: '✓' | '休';
}

export interface DayShift {
  morning: SessionShift;
  afternoon: SessionShift;
  evening: SessionShift;
}

export interface ClinicSchedule {
  [key: string]: DayShift; // 'monday', 'tuesday', etc.
}
