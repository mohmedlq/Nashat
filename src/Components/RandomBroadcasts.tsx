import React, { useState } from "react";
import { ArrowLeft, BookOpen, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Broadcasts } from "../data/Data";
import BroadcastDetail from "../Pages/Broadcasts/BroadcastDetail";
import type { Broadcast } from "../types/BroadcastTypes";
const getBroadcastPreview = (broadcast: Broadcast): string => {
  return (
    broadcast.content?.find(
      (item) => item.section === "كلمة الصباح"
    )?.content ||
    broadcast.content?.[0]?.content ||
    "محتوى إذاعي جاهز للاستخدام والتعديل."
  );
};
const pickRandomThree = (): Broadcast[] => {
  return [...Broadcasts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
};

const RandomBroadcasts: React.FC = () => {
  const [featured, setFeatured] = useState<Broadcast[]>(
    pickRandomThree
  );

  const [selected, setSelected] = useState<Broadcast | null>(null);

  const refreshBroadcasts = (): void => {
    setFeatured(pickRandomThree());
  };

  if (selected) {
    return (
      <div
        dir="rtl"
        className="overflow-hidden rounded-2xl border border-[#303A34] bg-[#171E1A]"
      >
        <BroadcastDetail
          broadcast={selected}
          onBack={() => setSelected(null)}
        />
      </div>
    );
  }

  return (
    <section dir="rtl">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#B39A63]">
            <BookOpen size={14} />
            من المكتبة
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#E7EAE6] sm:text-4xl">
            نماذج جاهزة للبدء.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#89938C]">
            استعرض بعض النماذج الموجودة في مكتبة الإذاعات، أو ابدأ
            بإنشاء محتوى خاص بك.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refreshBroadcasts}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#303A34] bg-[#171E1A] px-3 text-xs font-semibold text-[#8F9992] transition hover:border-[#4A574F] hover:bg-[#1A221E] hover:text-[#D1D6D2]"
          >
            <RefreshCw size={14} />
            نماذج أخرى
          </button>

          <Link
            to="/broadcast"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#DCE3DD] px-4 text-xs font-bold text-[#18211C] transition hover:bg-white"
          >
            المكتبة كاملة
            <ArrowLeft size={14} />
          </Link>
        </div>
      </div>

      {/* Broadcast Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((broadcast) => {
          const preview = getBroadcastPreview(broadcast);

          return (
            <article
              key={broadcast.id}
              className="group flex min-h-[330px] flex-col rounded-2xl border border-[#303A34] bg-[#171E1A] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#46534B] hover:bg-[#1A221E]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-[#354039] bg-[#202923] px-2.5 py-1 text-[10px] font-bold text-[#9AAA9E]">
                  {broadcast.type || "عام"}
                </span>

                <span className="text-[10px] text-[#58645C]">
                  إذاعة مدرسية
                </span>
              </div>

              {/* Card Content */}
              <div className="mt-8 flex-1">
                <h3 className="line-clamp-2 text-xl font-bold leading-8 text-[#E3E7E3]">
                  {broadcast.title}
                </h3>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-[#7F8A82]">
                  {preview}
                </p>
              </div>

              {/* Card Action */}
              <button
                type="button"
                onClick={() => setSelected(broadcast)}
                className="mt-8 flex w-full items-center justify-between border-t border-[#29332D] pt-5 text-xs font-bold text-[#9AA69E]"
              >
                <span className="transition group-hover:text-[#D5DBD6]">
                  استخدام هذا النموذج
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#303A34] transition group-hover:border-[#4A574F] group-hover:bg-[#202923]">
                  <ArrowLeft size={14} />
                </span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RandomBroadcasts;