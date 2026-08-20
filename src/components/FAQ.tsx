import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { IMPLANT_FAQ, ALLON4_FAQ, SEDATION_FAQ, HOME_VISIT_FAQ } from '../data';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<'implant' | 'allon4' | 'sedation' | 'homevisit'>('implant');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>('implant-q1');

  const currentQuestions =
    activeCategory === 'implant'
      ? IMPLANT_FAQ
      : activeCategory === 'allon4'
        ? ALLON4_FAQ
        : activeCategory === 'sedation'
          ? SEDATION_FAQ
          : HOME_VISIT_FAQ;

  const handleToggleQuestion = (id: string) => {
    if (openQuestionId === id) {
      setOpenQuestionId(null);
    } else {
      setOpenQuestionId(id);
    }
  };

  return (
    <section id="faq" className="py-24 medical-gradient relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-50 text-blue-accent text-xs px-3 py-1 rounded-full font-bold tracking-wide mb-3 border border-blue-100/50">
            常見問題
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            您可能想知道的事
          </h3>
          <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            我們整理了關於人工植牙、All-on-4/6 全口重建與牙科舒眠最常見、患者最關心的疑惑，為您提供最誠實、透明且專業的解答。
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/80 border border-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 justify-center card-shadow">
            <button
              onClick={() => {
                setActiveCategory('implant');
                setOpenQuestionId('implant-q1');
              }}
              className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
                activeCategory === 'implant'
                  ? 'bg-blue-accent text-white shadow-md shadow-blue-900/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <span>🦷 人工植牙 Q&A</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('allon4');
                setOpenQuestionId('allon-q1');
              }}
              className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
                activeCategory === 'allon4'
                  ? 'bg-blue-accent text-white shadow-md shadow-blue-900/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <span>😁 全口重建 Q&A</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('sedation');
                setOpenQuestionId('sedation-q1');
              }}
              className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
                activeCategory === 'sedation'
                  ? 'bg-blue-accent text-white shadow-md shadow-blue-900/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <span>😴 牙科舒眠 Q&A</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('homevisit');
                setOpenQuestionId('homevisit-q1');
              }}
              className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
                activeCategory === 'homevisit'
                  ? 'bg-blue-accent text-white shadow-md shadow-blue-900/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <span>🏠 到宅牙科 Q&A</span>
            </button>
          </div>
        </div>

        {/* FAQ List Accordions */}
        <div className="space-y-4" id="faq-accordions">
          {currentQuestions.map((item) => {
            const isOpen = openQuestionId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white/95 border rounded-2xl transition-all duration-300 overflow-hidden text-left ${
                  isOpen
                    ? 'border-blue-200 card-shadow ring-1 ring-blue-100'
                    : 'border-slate-100/80 card-shadow hover:border-blue-100/40'
                }`}
              >
                {/* Header button */}
                <button
                  onClick={() => handleToggleQuestion(item.id)}
                  className="w-full px-6 py-5 flex justify-between items-center gap-4 text-left font-bold text-sm sm:text-base text-slate-800 hover:text-blue-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-blue-accent' : 'text-slate-400'}`} />
                    <span>{item.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-blue-accent flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Answer slide */}
                <div
                  className={`transition-all duration-300 ease-in-out border-slate-100 ${
                    isOpen ? 'max-h-[500px] border-t py-5 px-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-normal">
                    {item.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Friendly disclaimer */}
        <div className="mt-10 bg-blue-50/70 border border-blue-100/50 rounded-2xl p-5 text-left flex items-start space-x-3 max-w-3xl mx-auto">
          <HelpCircle className="w-5 h-5 text-blue-accent mt-0.5 flex-shrink-0" />
          <p className="text-blue-950 text-xs leading-relaxed font-medium">
            每個人的牙周狀況、骨骼密度與全身系統條件各不相同，以上 Q&A 為一般醫學通則。強烈建議您親自到院進行掃描檢查，由專業醫師進行客製化精準診斷，並為您打造最適合、最長效且安全的治療方案。
          </p>
        </div>

      </div>
    </section>
  );
}
