import React, { useMemo, useState } from 'react';
import type { Broadcast } from '../../types/BroadcastTypes';
import { Broadcasts } from '../../data/Data';
import BroadcastDetail from './BroadcastDetail';
import { Link } from 'react-router-dom';

const LEVEL_FILTERS = ['الكل', 'ابتدائي', 'متوسط', 'ثانوي'];

const TYPE_ICONS: Record<string, string> = {
  وطني: '🇸🇦',
  ثقافي: '📖',
  تربوي: '🌱',
};

const getTypeIcon = (type: string) => TYPE_ICONS[type] ?? '🎙️';

interface BroadcastsPageProps {
  onBack?: () => void;
}

const BroadcastsPage: React.FC<BroadcastsPageProps> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeLevel, setActiveLevel] = useState(LEVEL_FILTERS[0]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const selectedBroadcast: Broadcast | undefined = useMemo(
    () => Broadcasts.find((b) => b.id === selectedId),
    [selectedId]
  );

  const filteredBroadcasts = useMemo(
    () =>
      activeLevel === 'الكل'
        ? Broadcasts
        : Broadcasts.filter((b) => b.level === activeLevel),
    [activeLevel]
  );

  if (selectedBroadcast) {
    return <BroadcastDetail broadcast={selectedBroadcast} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7F4EA] text-[#1B2233] font-sans antialiased selection:bg-[#D9AE55]/30 selection:text-[#15213A]">
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-16">

        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#E4DFC9]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#5B6478] hover:text-[#15213A] transition-colors cursor-pointer group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#E4DFC9] text-lg leading-none transition-transform group-hover:translate-x-1">
              →
            </span>
            العودة
          </Link>

          <span className="text-xs font-mono font-semibold text-[#9AA0AF]">
            المكتبة ({filteredBroadcasts.length})
          </span>
        </div>

        <header className="mb-10">
          <span className="text-xs font-semibold text-[#B8862E] tracking-wider uppercase mb-2 block">
            فهرس الإذاعات
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#15213A] tracking-tight leading-snug mb-3">
            اختر الإذاعة المناسبة
          </h1>
          <p className="text-[#5B6478] text-sm sm:text-base max-w-xl leading-relaxed">
            تصفح مجموعة الإذاعات المجهزة مقدماً، واضغط على أي بطاقة لقراءة الفقرات كاملةً وطباعتها.
          </p>
        </header>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {LEVEL_FILTERS.map((level) => {
            const isActive = activeLevel === level;
            return (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#15213A] text-[#D9AE55] shadow-sm'
                    : 'bg-white text-[#5B6478] border border-[#E4DFC9] hover:bg-[#FBF9F0] hover:text-[#15213A]'
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>

        {filteredBroadcasts.length === 0 ? (
          <div className="text-center text-[#5B6478] py-16 bg-white border border-dashed border-[#E4DFC9] rounded-xl">
            <p className="text-sm font-medium">لا توجد إذاعات متاحة لهذا المستوى حاليًا.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {filteredBroadcasts.map((broadcast) => {
              const preview =
                broadcast.content.find((c) => c.section === 'كلمة الصباح')?.content ??
                broadcast.content[0]?.content ??
                '';

              return (
                <button
                  key={broadcast.id}
                  onClick={() => setSelectedId(broadcast.id)}
                  className="group text-right bg-white p-6 rounded-xl border border-[#E4DFC9] transition-all duration-200 hover:border-[#B8862E]/50 hover:shadow-md focus:outline-none flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-11 h-11 rounded-lg bg-[#F7F4EA] border border-[#E4DFC9] flex items-center justify-center text-xl shadow-sm">
                        {getTypeIcon(broadcast.type)}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium px-2 py-1 rounded bg-[#F0EEE3] text-[#5B6478]">
                          {broadcast.type}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded bg-[#FBF3DF] text-[#8B681F] border border-[#E9D5A4]">
                          {broadcast.level}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif font-bold text-[#15213A] text-base mb-2 group-hover:text-[#8B681F] transition-colors leading-snug">
                      {broadcast.title}
                    </h3>
                    <p className="text-xs text-[#5B6478] leading-relaxed line-clamp-3 mb-6">
                      {preview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EEE8D6] flex items-center justify-between text-xs font-bold text-[#15213A] group-hover:text-[#8B681F] transition-colors">
                    <span>قراءة الإذاعة</span>
                    <span className="text-base transition-transform duration-200 group-hover:-translate-x-1">←</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BroadcastsPage;