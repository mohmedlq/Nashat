import React, { useMemo, useState } from "react";
import { ArrowLeft, Mic2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import type { Broadcast } from "../../types/BroadcastTypes";
import { Broadcasts } from "../../data/Data";
import BroadcastDetail from "./BroadcastDetail";

const LEVEL_FILTERS = [
  "الكل",
  "ابتدائي",
  "متوسط",
  "ثانوي",
];

interface BroadcastsPageProps {
  onBack?: () => void;
}

const BroadcastsPage: React.FC<BroadcastsPageProps> = ({
  onBack,
}) => {
  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const [activeLevel, setActiveLevel] =
    useState(LEVEL_FILTERS[0]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const selectedBroadcast: Broadcast | undefined =
    useMemo(
      () =>
        Broadcasts.find(
          (broadcast) =>
            broadcast.id === selectedId
        ),
      [selectedId]
    );

  const filteredBroadcasts =
    useMemo(
      () =>
        activeLevel === "الكل"
          ? Broadcasts
          : Broadcasts.filter(
              (broadcast) =>
                broadcast.level ===
                activeLevel
            ),
      [activeLevel]
    );

  if (selectedBroadcast) {
    return (
      <BroadcastDetail
        broadcast={selectedBroadcast}
        onBack={() =>
          setSelectedId(null)
        }
      />
    );
  }

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-[#111714]
        font-sans
        antialiased
        text-[#E5E9E5]
        selection:bg-[#B39A63]/20
        selection:text-[#E5E9E5]
      "
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(255,255,255,0.012) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255,255,255,0.012) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Ambient background */}

      <div
        className="
          pointer-events-none
          fixed
          inset-x-0
          top-0
          h-72
          bg-[radial-gradient(circle_at_50%_-20%,rgba(145,163,148,0.09),transparent_65%)]
        "
      />

      <main
        className="
          relative
          mx-auto
          max-w-6xl
          px-5
          pb-16
          pt-8
          sm:px-8
          sm:pb-20
          sm:pt-12
        "
      >
        {/* =====================================================
            Navigation
        ===================================================== */}

        <div
          className="
            mb-10
            flex
            items-center
            justify-between
            border-b
            border-[#29332D]
            pb-6
          "
        >
          <button
            type="button"
            onClick={handleBack}
            className="
              group
              inline-flex
              cursor-pointer
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#89938C]
              transition-colors
              hover:text-[#D8DED9]
            "
          >
            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-[#303A34]
                bg-[#171E1A]
                text-[#89938C]
                transition-all
                duration-200
                group-hover:-translate-x-0.5
                group-hover:border-[#4A574F]
                group-hover:bg-[#202923]
                group-hover:text-[#D8DED9]
              "
            >
              <ArrowLeft
                size={14}
                className="rotate-180"
              />
            </span>

            العودة للرئيسية
          </button>

          <span
            className="
              rounded-md
              border
              border-[#29332D]
              bg-[#151B18]
              px-2.5
              py-1.5
              font-mono
              text-[10px]
              font-semibold
              text-[#68756D]
            "
          >
            المكتبة · {filteredBroadcasts.length}
          </span>
        </div>

        {/* =====================================================
            Header
        ===================================================== */}

        <header className="mb-10">
          <div
            className="
              mb-3
              flex
              items-center
              gap-2
              text-[10px]
              font-bold
              tracking-[0.12em]
              text-[#B39A63]
            "
          >
            <BookOpen
              size={13}
              strokeWidth={1.7}
            />

            فهرس الإذاعات
          </div>

          <h1
            className="
              mb-3
              text-3xl
              font-bold
              leading-snug
              tracking-tight
              text-[#E7EAE6]
              sm:text-4xl
            "
          >
            اختر الإذاعة المناسبة
          </h1>

          <p
            className="
              max-w-xl
              text-sm
              leading-7
              text-[#7F8A82]
              sm:text-base
            "
          >
            تصفح مجموعة الإذاعات المجهزة
            مسبقًا، واضغط على أي بطاقة
            لاستعراض الفقرات كاملةً
            واستخدامها أو طباعتها.
          </p>
        </header>

        {/* =====================================================
            Filters
        ===================================================== */}

        <div
          className="
            mb-8
            flex
            gap-2
            overflow-x-auto
            pb-2
            scrollbar-none
          "
        >
          {LEVEL_FILTERS.map(
            (level) => {
              const isActive =
                activeLevel === level;

              return (
                <button
                  type="button"
                  key={level}
                  onClick={() =>
                    setActiveLevel(
                      level
                    )
                  }
                  className={`
                    shrink-0
                    cursor-pointer
                    rounded-lg
                    border
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "border-[#3A463F] bg-[#202923] text-[#D5DDD7] shadow-sm"
                        : "border-[#303A34] bg-[#171E1A] text-[#78847C] hover:border-[#46534B] hover:bg-[#1A221E] hover:text-[#C7CEC9]"
                    }
                  `}
                >
                  {level}
                </button>
              );
            }
          )}
        </div>

        {/* =====================================================
            Empty State
        ===================================================== */}

        {filteredBroadcasts.length ===
        0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-[#354039]
              bg-[#151B18]
              py-20
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-[#303A34]
                bg-[#1A211D]
                text-[#68756D]
              "
            >
              <Mic2
                size={18}
                strokeWidth={1.6}
              />
            </div>

            <p
              className="
                text-sm
                font-semibold
                text-[#89938C]
              "
            >
              لا توجد إذاعات متاحة
              لهذا المستوى حاليًا.
            </p>
          </div>
        ) : (
          /* ===================================================
             Grid
          =================================================== */

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              md:grid-cols-3
            "
          >
            {filteredBroadcasts.map(
              (broadcast) => {
                const preview =
                  broadcast.content.find(
                    (content) =>
                      content.section ===
                      "كلمة الصباح"
                  )?.content ??
                  broadcast.content[0]
                    ?.content ??
                  "";

                return (
                  <button
                    type="button"
                    key={broadcast.id}
                    onClick={() =>
                      setSelectedId(
                        broadcast.id
                      )
                    }
                    className="
                      group
                      flex
                      min-h-[330px]
                      cursor-pointer
                      flex-col
                      justify-between
                      rounded-2xl
                      border
                      border-[#303A34]
                      bg-[#171E1A]
                      p-6
                      text-right
                      shadow-[0_8px_30px_rgba(0,0,0,0.10)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-[#46534B]
                      hover:bg-[#1A221E]
                      hover:shadow-[0_15px_40px_rgba(0,0,0,0.16)]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#91A394]/20
                    "
                  >
                    <div>
                      {/* Top */}

                      <div
                        className="
                          mb-6
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <span
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-[#354039]
                            bg-[#202923]
                            text-[#B39A63]
                          "
                        >
                          <Mic2
                            size={18}
                            strokeWidth={1.6}
                          />
                        </span>

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >
                          <span
                            className="
                              rounded-md
                              border
                              border-[#354039]
                              bg-[#202923]
                              px-2
                              py-1
                              text-[9px]
                              font-semibold
                              text-[#899A8F]
                            "
                          >
                            {broadcast.type}
                          </span>

                          <span
                            className="
                              rounded-md
                              border
                              border-[#3A4038]
                              bg-[#1A211D]
                              px-2
                              py-1
                              text-[9px]
                              font-semibold
                              text-[#A99A76]
                            "
                          >
                            {broadcast.level}
                          </span>
                        </div>
                      </div>

                      {/* Content */}

                      <h3
                        className="
                          mb-3
                          text-base
                          font-bold
                          leading-7
                          text-[#E1E6E2]
                          transition-colors
                          group-hover:text-[#C9D2CC]
                        "
                      >
                        {broadcast.title}
                      </h3>

                      <p
                        className="
                          mb-6
                          line-clamp-4
                          text-xs
                          leading-7
                          text-[#7D8981]
                        "
                      >
                        {preview}
                      </p>
                    </div>

                    {/* Footer */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        border-t
                        border-[#29332D]
                        pt-4
                        text-xs
                        font-bold
                        text-[#89978E]
                        transition-colors
                        group-hover:text-[#C5CEC8]
                      "
                    >
                      <span>
                        قراءة الإذاعة
                      </span>

                      <span
                        className="
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-[#303A34]
                          transition-all
                          duration-200
                          group-hover:border-[#4A574F]
                          group-hover:bg-[#202923]
                        "
                      >
                        <ArrowLeft
                          size={13}
                        />
                      </span>
                    </div>
                  </button>
                );
              }
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BroadcastsPage;