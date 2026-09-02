import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import BroadcastDetail from "../Broadcasts/BroadcastDetail";
import Report from "../Reports/Report";

import type { Broadcast } from "../../types/BroadcastTypes";
import type { ReportFormData } from "../../types/ReportsTypes";

import { useUser } from "../../context/Context";

import {
  generateAiContent,
  type GeneratorMode,
} from "../../services/AiGeneratorService";

/* =========================================================
   Types
========================================================= */

interface Message {
  id: string;
  sender: "user" | "bot";
  text?: string;
  broadcastData?: Broadcast;
  reportData?: ReportFormData;
}

interface GeneratorNavigationState {
  prompt?: string;
  mode?: GeneratorMode;
  autoSend?: boolean;
}

const STORAGE_KEY =
  "school_ai_chat_history";

/* =========================================================
   Icons
========================================================= */

const SparkIcon = ({
  className = "h-5 w-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className={className}
  >
    <path d="M12 2.8l1.8 6.4L20.2 11l-6.4 1.8L12 19.2l-1.8-6.4L3.8 11l6.4-1.8L12 2.8Z" />
  </svg>
);

const ArrowIcon = ({
  className = "h-5 w-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const TrashIcon = ({
  className = "h-5 w-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className={className}
  >
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="m7 7 .8 13h8.4L17 7" />
    <path d="M10 11v5" />
    <path d="M14 11v5" />
  </svg>
);

const SendIcon = ({
  className = "h-5 w-5",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
  >
    <path d="m4 4 16 8-16 8 3-8-3-8Z" />
    <path d="M7 12h13" />
  </svg>
);

const BroadcastIcon = ({
  className = "h-4 w-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className={className}
  >
    <path d="M7 10v4" />
    <path d="M10 7v10" />
    <path d="M14 7v10" />
    <path d="M17 10v4" />
    <path d="M4 12h1" />
    <path d="M19 12h1" />
  </svg>
);

const ReportIcon = ({
  className = "h-4 w-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className={className}
  >
    <rect
      x="5"
      y="3"
      width="14"
      height="18"
      rx="2"
    />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </svg>
);

/* =========================================================
   Component
========================================================= */

const AiGenerator: React.FC = () => {
  const location = useLocation();

  const navigationState =
    location.state as GeneratorNavigationState | null;

  /* =========================================================
     Context
  ========================================================= */

  const {
    schoolName,
    teacherName,
    region,
    chatHistory,
    setChatHistory,
  } = useUser();

  /* =========================================================
     State
  ========================================================= */

  const [mode, setMode] =
    useState<GeneratorMode>(
      navigationState?.mode ??
        "broadcast"
    );

  const [input, setInput] =
    useState(
      navigationState?.prompt ??
        ""
    );

  const [isLoading, setIsLoading] =
    useState(false);

  const [activeBroadcast, setActiveBroadcast] =
    useState<Broadcast | null>(null);

  const [activeReport, setActiveReport] =
    useState<ReportFormData | null>(null);

  /* =========================================================
     Refs
  ========================================================= */

  const chatContainerRef =
    useRef<HTMLElement>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const hasAutoSentRef =
    useRef(false);

  /* =========================================================
     Scroll
  ========================================================= */

  const scrollToBottom = (
    behavior: ScrollBehavior = "smooth"
  ) => {
    const container =
      chatContainerRef.current;

    if (!container) {
      return;
    }

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    });
  };

  /* =========================================================
     Save History
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(chatHistory)
    );
  }, [chatHistory]);

  /* =========================================================
     Automatic Scroll
  ========================================================= */

  useEffect(() => {
    scrollToBottom("smooth");
  }, [chatHistory, isLoading]);

  /* =========================================================
     Send
  ========================================================= */

  const handleSend = async (
    providedText?: string,
    providedMode?: GeneratorMode
  ) => {
    const userText =
      (
        providedText ??
        input
      ).trim();

    const currentMode =
      providedMode ?? mode;

    if (
      !userText ||
      isLoading
    ) {
      return;
    }

    /* =======================================================
       User Message
    ======================================================= */

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text: userText,
    };

    setChatHistory(
      (prev) => [
        ...prev,
        userMessage,
      ]
    );

    setInput("");
    setIsLoading(true);

    if (
      textareaRef.current
    ) {
      textareaRef.current.style.height =
        "auto";
    }

    requestAnimationFrame(() => {
      scrollToBottom("smooth");
    });

    /* =======================================================
       AI Generation
    ======================================================= */

    try {
      const result =
        await generateAiContent({
          prompt: userText,
          mode: currentMode,
          schoolName,
          teacherName,
          region,
        });

      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        sender: "bot",
      };

      /* =====================================================
         Broadcast Result
      ===================================================== */

      if (result.broadcast) {
        botMessage.broadcastData =
          result.broadcast;
      }

      /* =====================================================
         Report Result
      ===================================================== */

      if (result.report) {
        botMessage.reportData =
          result.report;
      }

      setChatHistory(
        (prev) => [
          ...prev,
          botMessage,
        ]
      );
    } catch (error) {
      console.error(
        "AI generation error:",
        error
      );

      setChatHistory(
        (prev) => [
          ...prev,
          {
            id: `${Date.now()}-error`,
            sender: "bot",
            text:
              "تعذر إنشاء المحتوى حالياً. حاول مرة أخرى أو غيّر صياغة الطلب.",
          },
        ]
      );
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
        scrollToBottom("smooth");
      }, 100);
    }
  };

  /* =========================================================
     Input
  ========================================================= */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const textarea =
      e.target;

    setInput(
      textarea.value
    );

    textarea.style.height =
      "auto";

    textarea.style.height =
      `${Math.min(
        textarea.scrollHeight,
        140
      )}px`;
  };

  /* =========================================================
     Keyboard
  ========================================================= */

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      handleSend();
    }
  };

  /* =========================================================
     Clear History
  ========================================================= */

  const handleClearHistory = () => {
    if (
      !window.confirm(
        "هل أنت متأكد من رغبتك في مسح المحادثة؟"
      )
    ) {
      return;
    }

    const defaultMessage: Message[] =
      [
        {
          id: "welcome",
          sender: "bot",
          text:
            "مرحباً بك في المساعد المدرسي. يمكنني إعداد إذاعة مدرسية متكاملة أو إنشاء تقرير نشاط رسمي جاهز للتعديل والطباعة.",
        },
      ];

    setChatHistory(
      defaultMessage
    );

    localStorage.removeItem(
      STORAGE_KEY
    );

    requestAnimationFrame(() => {
      chatContainerRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  /* =========================================================
     Auto Send From Home
  ========================================================= */

  useEffect(() => {
    if (
      hasAutoSentRef.current
    ) {
      return;
    }

    if (
      !navigationState?.autoSend ||
      !navigationState.prompt
    ) {
      return;
    }

    hasAutoSentRef.current =
      true;

    const initialPrompt =
      navigationState.prompt;

    const initialMode =
      navigationState.mode ??
      "broadcast";

    setMode(initialMode);
    setInput(initialPrompt);

    const timer =
      window.setTimeout(
        () => {
          handleSend(
            initialPrompt,
            initialMode
          );
        },
        150
      );

    window.history.replaceState(
      {},
      document.title
    );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, []);

  /* =========================================================
     Full Screen Broadcast
  ========================================================= */

  if (activeBroadcast) {
    return (
      <BroadcastDetail
        broadcast={
          activeBroadcast
        }
        onBack={() =>
          setActiveBroadcast(
            null
          )
        }
      />
    );
  }

  /* =========================================================
     Full Screen Report
  ========================================================= */

  if (activeReport) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setActiveReport(
              null
            )
          }
          className="
            fixed
            right-3
            top-3
            z-50
            inline-flex
            items-center
            gap-1.5
            rounded-lg
            bg-[#15213A]
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            shadow-lg
            transition
            hover:bg-[#0D1526]
            print:hidden
          "
        >
          <ArrowIcon className="h-3 w-3 rotate-180" />

          العودة للمحادثة
        </button>

        <Report
          initialData={
            activeReport
          }
        />
      </div>
    );
  }

  /* =========================================================
     Main
  ========================================================= */

  return (
    <div
      dir="rtl"
      className="
        relative
        flex
        h-[100dvh]
        min-h-0
        flex-col
        overflow-hidden
        bg-[#F7F4EA]
        text-[#1B2233]
        antialiased
      "
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(21,33,58,0.035) 28px)",
      }}
    >
      {/* =====================================================
          Header
      ===================================================== */}

      <header
        className="
          relative
          shrink-0
          border-b
          border-[#E4DFC9]
          bg-[#F7F4EA]
        "
      >
        <div
          className="
            flex
            min-h-[72px] sm:min-h-[76px]
            w-full
            items-center
            justify-between
            gap-3
            px-3
            sm:px-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#15213A]
                text-[#D9AE55]
              "
            >
              <SparkIcon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-bold">
                المساعد المدرسي
              </p>

              <p className="hidden text-[10px] text-[#7A8194] sm:block">
                إنشاء المحتوى التعليمي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {chatHistory.length >
              1 && (
              <button
                type="button"
                onClick={
                  handleClearHistory
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  px-2.5
                  py-2
                  text-xs
                  font-semibold
                  text-[#5B6478]
                  transition
                  hover:bg-[#FBF9F0]
                  hover:text-[#1B2233]
                "
              >
                <TrashIcon />

                <span className="hidden sm:inline cursor-pointer">
                  مسح المحادثة
                </span>
              </button>
            )}

            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-[#E4DFC9]
                bg-white
                px-3
                py-2
                text-xs
                font-semibold
                text-[#5B6478]
                transition
                hover:border-[#cfd1ca]
                hover:text-[#1B2233]
              "
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />

              <span className="hidden sm:inline">
                الرئيسية
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          Chat Scroll Container
      ===================================================== */}

      <main
        ref={chatContainerRef}
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          scroll-smooth
          px-3
          py-5
          sm:px-6
          sm:py-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-5xl
          "
        >
          {/* =================================================
              Welcome
          ================================================= */}

          {chatHistory.length ===
            1 && (
            <div
              className="
                flex
                flex-col
                items-center
                px-2
                pb-8
                pt-4
                text-center
                sm:pt-10
              "
            >
              <div
                className="
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#e1e2dc]
                  bg-white
                  text-[#D9AE55]
                  shadow-sm
                "
              >
                <SparkIcon className="h-5 w-5" />
              </div>

              <h1
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  sm:text-3xl
                "
              >
                ماذا تريد أن تنشئ؟
              </h1>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-7
                  text-[#5B6478]
                "
              >
                اكتب فكرتك وسأحوّلها
                إلى محتوى تعليمي منظم
                وجاهز للاستخدام.
              </p>
            </div>
          )}

          {/* =================================================
              Messages
          ================================================= */}

          <div className="space-y-7">
            {chatHistory.map(
              (msg) => (
                <div
                  key={msg.id}
                >
                  {/* =========================================
                      User Message
                  ========================================= */}

                  {msg.sender ===
                    "user" &&
                    msg.text && (
                      <div className="flex justify-start">
                        <div
                          className="
                            max-w-[92%]
                            rounded-2xl
                            rounded-bl-md
                            bg-[#15213A]
                            px-4
                            py-3.5
                            text-sm
                            leading-7
                            text-white
                            shadow-sm
                            sm:max-w-[78%]
                            sm:px-5
                          "
                        >
                          {msg.text}
                        </div>
                      </div>
                    )}

                  {/* =========================================
                      Bot Text
                  ========================================= */}

                  {msg.sender ===
                    "bot" &&
                    msg.text && (
                      <div className="flex justify-start">
                        <div className="flex w-full gap-3">
                          <div
                            className="
                              mt-0.5
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              border
                              border-[#E4DFC9]
                              bg-white
                              text-[#8B681F]
                              shadow-sm
                            "
                          >
                            <SparkIcon className="h-3 w-3" />
                          </div>

                          <div
                            className="
                              max-w-[90%]
                              rounded-2xl
                              rounded-br-md
                              border
                              border-[#E4DFC9]
                              bg-white
                              px-4
                              py-3.5
                              text-sm
                              leading-7
                              text-[#5B6478]
                              shadow-sm
                              sm:px-5
                            "
                          >
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    )}

                  {/* =========================================
                      Broadcast
                  ========================================= */}

                  {msg.broadcastData && (
                    <div className="flex justify-start">
                      <div className="w-full">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveBroadcast(
                              msg.broadcastData!
                            )
                          }
                          className="
                            group
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#E4DFC9]
                            bg-white
                            text-right
                            shadow-sm
                            transition-all
                            hover:border-[#B8862E]/50
                            hover:shadow-lg
                          "
                        >
                          <div className="border-r-4 border-[#B8862E] p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#FBF3DF]
                                    text-[#8B681F]
                                  "
                                >
                                  <BroadcastIcon className="h-4 w-4" />
                                </div>

                                <div>
                                  <p className="text-[11px] font-bold text-[#8B681F]">
                                    إذاعة مدرسية
                                  </p>

                                  <h3 className="mt-1 text-base font-bold text-[#1B2233] sm:text-lg">
                                    {
                                      msg
                                        .broadcastData
                                        .title
                                    }
                                  </h3>
                                </div>
                              </div>

                              <ArrowIcon
                                className="
                                  h-3.5
                                  w-3.5
                                  shrink-0
                                  text-[#9AA0AF]
                                  transition-transform
                                  group-hover:-translate-x-1
                                "
                              />
                            </div>

                            <div
                              className="
                                mt-5
                                flex
                                flex-wrap
                                gap-2
                                border-t
                                border-[#EEE8D6]
                                pt-4
                              "
                            >
                              <span className="rounded-md bg-[#F0EEE3] px-2.5 py-1.5 text-[10px] font-semibold text-[#5B6478]">
                                {
                                  msg
                                    .broadcastData
                                    .type
                                }
                              </span>

                              <span className="rounded-md bg-[#F0EEE3] px-2.5 py-1.5 text-[10px] font-semibold text-[#5B6478]">
                                {
                                  msg
                                    .broadcastData
                                    .level
                                }
                              </span>
                            </div>

                            <p className="mt-4 text-xs font-semibold text-[#5B6478]">
                              فتح الإذاعة واستعراض المحتوى
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =========================================
                      Report
                  ========================================= */}

                  {msg.reportData && (
                    <div className="flex justify-start">
                      <div className="w-full">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveReport(
                              msg.reportData!
                            )
                          }
                          className="
                            group
                            w-full
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#E4DFC9]
                            bg-white
                            text-right
                            shadow-sm
                            transition-all
                            hover:border-[#B8862E]/50
                            hover:shadow-lg
                          "
                        >
                          <div className="border-r-4 border-[#B8862E] p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-[#FBF3DF]
                                    text-[#7A5A1E]
                                  "
                                >
                                  <ReportIcon className="h-4 w-4" />
                                </div>

                                <div>
                                  <p className="text-[11px] font-bold text-[#7A5A1E]">
                                    تقرير نشاط
                                  </p>

                                  <h3 className="mt-1 text-base font-bold text-[#1B2233] sm:text-lg">
                                    {
                                      msg
                                        .reportData
                                        .reportTitle
                                    }
                                  </h3>
                                </div>
                              </div>

                              <ArrowIcon
                                className="
                                  h-3.5
                                  w-3.5
                                  shrink-0
                                  text-[#9AA0AF]
                                  transition-transform
                                  group-hover:-translate-x-1
                                "
                              />
                            </div>

                            <div className="mt-5 border-t border-[#EEE8D6] pt-4">
                              <p className="line-clamp-2 text-xs leading-6 text-[#5B6478]">
                                {
                                  msg
                                    .reportData
                                    .objectives
                                }
                              </p>
                            </div>

                            <p className="mt-4 text-xs font-semibold text-[#7A5A1E]">
                              تعديل التقرير واستعراضه
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}

            {/* =================================================
                Loading
            ================================================= */}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-[#E4DFC9]
                      bg-white
                      text-[#8B681F]
                      shadow-sm
                    "
                  >
                    <SparkIcon className="h-3 w-3" />
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-2xl
                      rounded-br-md
                      border
                      border-[#E4DFC9]
                      bg-white
                      px-4
                      py-4
                      shadow-sm
                    "
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a1a69f]" />

                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a1a69f]"
                      style={{
                        animationDelay:
                          "150ms",
                      }}
                    />

                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#a1a69f]"
                      style={{
                        animationDelay:
                          "300ms",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="h-2" />
          </div>
        </div>
      </main>

      {/* =====================================================
          Composer
      ===================================================== */}

      <footer
        className="
          relative
          shrink-0
          border-t
          border-[#E4DFC9]
          bg-[#F7F4EA]
          px-3
          pb-[max(8px,env(safe-area-inset-bottom))]
          pt-2.5
          sm:px-5
          sm:pb-4
          sm:pt-3
        "
      >
        <div className="mx-auto w-full max-w-4xl">
          {/* =================================================
              Mode
          ================================================= */}

          <div
            className="
              mb-2
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <div
              className="
                flex
                rounded-md
                border
                border-[#E4DFC9]
                bg-[#F7F4EA]
                p-0.5
                         "
            >
              <button
                type="button"
                onClick={() =>
                  setMode(
                    "broadcast"
                  )
                }
                className={`
                  inline-flex
                  items-center
                  gap-1
                  rounded-sm
                 px-3.5
                  py-1.5
                  text-[20px]
                cursor-pointer     
                  
                  font-bold
                  transition-all
                  ${
                    mode ===
                    "broadcast"
                      ? "bg-white text-[#8B681F] shadow-sm"
                      : "text-[#7A8194]"
                  }
                `}
              >
                <BroadcastIcon className="h-2.5 w-2.5" />

                إذاعة
              </button>

              <button
                type="button"
                onClick={() =>
                  setMode(
                    "report"
                  )
                }
                className={`
                  inline-flex
                  items-center
                  gap-1
                  rounded-sm
                  px-3.5
                  py-1.5
                  text-[20px]
                  font-bold
                cursor-pointer     

                  transition-all
                  ${
                    mode ===
                    "report"
                      ? "bg-white text-[#7A5A1E] shadow-sm"
                      : "text-[#7A8194]"
                  }
                `}
              >
                <ReportIcon className="h-2.5 w-2.5" />

                تقرير
              </button>
            </div>

            <span className="hidden text-[9px] text-[#9AA0AF] sm:block">
              Enter للإرسال · Shift + Enter لسطر جديد
            </span>
          </div>

          {/* =================================================
              Input
          ================================================= */}

          <div
            className="
              relative
              rounded-xl
              border
              border-[#E4DFC9]
              bg-white
              shadow-sm
              transition-all
              focus-within:border-[#B8862E]
              focus-within:ring-4 focus-within:ring-[#B8862E]/[0.08]
            "
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={
                handleInputChange
              }
              onKeyDown={
                handleKeyDown
              }
              disabled={isLoading}
              rows={1}
              placeholder={
                mode ===
                "broadcast"
                  ? "اكتب موضوع الإذاعة..."
                  : "اكتب موضوع التقرير..."
              }
              className="
                block
                min-h-[60px]
                max-h-[180px]
                w-full
                resize-none
                overflow-y-auto
                bg-transparent
                px-3.5
                py-3
                pl-12
                text-sm
                leading-7
                text-[#1B2233]
                outline-none
                placeholder:text-[#A6ABBB]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:min-h-[50px]
                sm:px-4
                sm:py-3
                sm:pl-14
              "
            />

            <button
              type="button"
              onClick={() =>
                handleSend()
              }
              disabled={
                !input.trim() ||
                isLoading
              }
              aria-label="إرسال"
              className="
                absolute
                bottom-2
                left-2
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                bg-[#15213A]
                text-white
                shadow-sm
                transition
                hover:bg-[#0D1526]
                disabled:cursor-not-allowed
                disabled:opacity-30
                sm:bottom-2
                sm:left-2
              "
            >
              <SendIcon className="h-3 w-3" />
            </button>
          </div>

          <p className="mt-1.5 text-center text-[8px] text-[#9AA0AF] sm:text-[9px]">
            قد تحتاج النتائج المولدة إلى مراجعة بسيطة قبل الاستخدام الرسمي.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AiGenerator;
