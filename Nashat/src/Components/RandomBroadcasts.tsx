import React, { useState } from "react";
import { Broadcasts } from "../data/Data";
import BroadcastDetail from "../Pages/Broadcasts/BroadcastDetail";
import { Link } from "react-router-dom";
import type { Broadcast } from "../types/BroadcastTypes";

const TYPE_META: Record<string, { label: string; mark: string }> = {
  وطني: { label: "وطني", mark: "و" },
  ثقافي: { label: "ثقافي", mark: "ث" },
  تربوي: { label: "تربوي", mark: "ت" },
  صحي: { label: "صحي", mark: "ص" },
  توعوي: { label: "توعوي", mark: "و" },
  ديني: { label: "ديني", mark: "د" },
};

const pickRandomThree = (): Broadcast[] => [...Broadcasts].sort(() => Math.random() - 0.5).slice(0, 3);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const RandomBroadcasts: React.FC = () => {
  const [featured, setFeatured] = useState<Broadcast[]>(pickRandomThree);
  const [selected, setSelected] = useState<Broadcast | null>(null);

  if (selected) {
    return <BroadcastDetail broadcast={selected} onBack={() => setSelected(null)} />;
  }

  const refreshBroadcasts = () => setFeatured(pickRandomThree());

  return (
    <section dir="rtl" className="border-t border-[#E4DFC9] py-24 sm:py-28">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-[#9A7327]">من المكتبة</p>
          <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] text-[#15213A] sm:text-4xl">
            ابدأ من نموذج جاهز.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-[#5B6478]">
            نماذج مختارة يمكنك استخدامها مباشرة أو تعديلها لتناسب احتياجك.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refreshBroadcasts}
            className="rounded-lg border border-[#E4DFC9] bg-white px-4 py-2.5 text-xs font-bold text-[#15213A] transition-all hover:border-[#B8862E]/50 hover:bg-[#FBF9F0]"
          >
            نموذج آخر
          </button>

          <Link
            to="/broadcast"
            className="inline-flex items-center gap-2 rounded-lg bg-[#15213A] px-4 py-2.5 text-xs font-bold text-[#D9AE55] transition-all hover:-translate-y-0.5 hover:bg-[#0D1526]"
          >
            المكتبة كاملة
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((broadcast, index) => {
          const { id, title, level, type, content } = broadcast;
          const preview = content.find((item) => item.section === "كلمة الصباح")?.content ?? content[0]?.content ?? "";
          const meta = TYPE_META[type] ?? { label: type, mark: "•" };

          return (
            <article
              key={id}
              className="group flex min-h-[330px] flex-col border border-[#E4DFC9] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B8862E]/50 hover:shadow-[0_20px_50px_rgba(21,33,58,0.08)]"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E4DFC9] bg-[#F7F4EA] font-serif text-sm font-bold text-[#15213A]">
                  {meta.mark}
                </span>

                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#9AA0AF]">0{index + 1}</p>
                  <p className="mt-1 text-[11px] text-[#858B9A]">{meta.label}</p>
                </div>
              </div>

              <div className="mt-auto">
                <div className="mb-4 h-px w-full bg-[#EEE8D6]" />

                <div className="mb-3 flex items-center gap-2 text-[11px] text-[#858B9A]">
                  <span>{level}</span>
                  <span className="h-1 w-1 rounded-full bg-[#B8862E]" />
                  <span>إذاعة مدرسية</span>
                </div>

                <h3 className="font-serif text-xl font-bold tracking-[-0.015em] text-[#15213A]">{title}</h3>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5B6478]">{preview}</p>

                <button
                  type="button"
                  onClick={() => setSelected(broadcast)}
                  className="mt-6 flex w-full items-center justify-between border-t border-[#EEE8D6] pt-4 text-xs font-bold text-[#15213A] transition-colors group-hover:text-[#8B681F]"
                >
                  <span>استخدام هذا النموذج</span>
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    <ArrowIcon />
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RandomBroadcasts;