import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  ArrowLeft,
  FileText,
  Lightbulb,
  Mic2,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";

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

const STORAGE_KEY = "school_ai_chat_history";

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
      navigationState?.mode ?? "report"
    );

  const [input, setInput] =
    useState(
      navigationState?.prompt ?? ""
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
    behavior: ScrollBehavior = "instant"
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

    if (textareaRef.current) {
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

    const defaultMessage: Message[] = [
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
      <div
        dir="rtl"
        className="relative min-h-screen bg-[#111714]"
      >
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
            gap-2
            rounded-lg
            border
            border-[#3A463F]
            bg-[#171E1A]
            px-3
            py-2
            text-xs
            font-semibold
            text-[#C4CCC6]
            shadow-lg
            transition
            hover:border-[#4A574F]
            hover:bg-[#202923]
            hover:text-[#E2E7E3]
            print:hidden
          "
        >
          <ArrowLeft
            size={13}
            className="rotate-180"
          />

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
        bg-[#111714]
        text-[#E5E9E5]
        antialiased
      "
      style={{
        backgroundImage:
          `
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
        backgroundSize:
          "32px 32px",
      }}
    >

      {/* =====================================================
          Ambient Background
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-64
          bg-[radial-gradient(circle_at_50%_-20%,rgba(145,163,148,0.09),transparent_65%)]
        "
      />

      {/* =====================================================
          Header
      ===================================================== */}

      <header
        className="
          relative
          z-10
          shrink-0
          border-b
          border-[#29332D]
          bg-[#111714]/95
          backdrop-blur-xl
        "
      >
        <div
          className="
            flex
            min-h-[72px]
            w-full
            items-center
            justify-between
            gap-3
            px-3
            sm:min-h-[76px]
            sm:px-6
          "
        >

          {/* Brand */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#354039]
                bg-[#1A211D]
                text-[#B39A63]
              "
            >
              <Sparkles
                size={18}
                strokeWidth={1.7}
              />

              <span
                className="
                  absolute
                  -right-0.5
                  -top-0.5
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#B39A63]
                "
              />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-[15px]
                  font-bold
                  tracking-[-0.02em]
                  text-[#E5E9E5]
                "
              >
                المساعد المدرسي
              </p>

              <p
                className="
                  mt-0.5
                  hidden
                  text-[9px]
                  font-semibold
                  tracking-[0.12em]
                  text-[#68756D]
                  sm:block
                "
              >
                إنشاء المحتوى المدرسي
              </p>
            </div>
          </div>

          {/* Header Actions */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            {chatHistory.length > 1 && (
              <button
                type="button"
                onClick={
                  handleClearHistory
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-transparent
                  px-2.5
                  text-xs
                  font-semibold
                  text-[#727E76]
                  transition
                  hover:border-[#303A34]
                  hover:bg-[#171E1A]
                  hover:text-[#C2CAC4]
                "
              >
                <Trash2
                  size={15}
                  strokeWidth={1.7}
                />

                <span className="hidden sm:inline">
                  مسح المحادثة
                </span>
              </button>
            )}

            <Link
              to="/"
              className="
                inline-flex
                h-9
                items-center
                gap-2
                rounded-lg
                border
                border-[#303A34]
                bg-[#171E1A]
                px-3
                text-xs
                font-semibold
                text-[#89938C]
                transition
                hover:border-[#4A574F]
                hover:bg-[#202923]
                hover:text-[#D8DED9]
              "
            >
              <ArrowLeft
                size={14}
                className="rotate-180"
              />

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
          relative
          z-[1]
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

          {chatHistory.length === 1 && (
            <div
              className="
                flex
                flex-col
                items-center
                px-2
                pb-8
                pt-6
                text-center
                sm:pt-12
              "
            >

              <div
                className="
                  relative
                  mb-6
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#354039]
                  bg-[#171E1A]
                  text-[#B39A63]
                  shadow-[0_15px_40px_rgba(0,0,0,0.18)]
                "
              >
                <Sparkles
                  size={22}
                  strokeWidth={1.6}
                />

                <span
                  className="
                    absolute
                    right-2
                    top-2
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#B39A63]
                  "
                />
              </div>

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  font-bold
                  tracking-[0.12em]
                  text-[#91A394]
                "
              >
                <Lightbulb
                  size={12}
                  strokeWidth={1.7}
                />

                مساحة الإنشاء
              </div>

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-[#E7EAE6]
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
                  text-[#7F8A82]
                "
              >
                اكتب فكرتك وسأحوّلها
                إلى محتوى مدرسي منظم
                وجاهز للاستخدام.
              </p>

              {/* Small helper cards */}

              <div
                className="
                  mt-8
                  grid
                  w-full
                  max-w-xl
                  grid-cols-2
                  gap-2
                "
              >
                <div
                  className="
                    rounded-xl
                    border
                    border-[#29332D]
                    bg-[#151B18]
                    px-4
                    py-3
                    text-right
                  "
                >
                  <div
                    className="
                      mb-2
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#202923]
                      text-[#91A394]
                    "
                  >
                    <Mic2
                      size={13}
                      strokeWidth={1.7}
                    />
                  </div>

                  <p
                    className="
                      text-xs
                      font-bold
                      text-[#C4CCC6]
                    "
                  >
                    إذاعة مدرسية
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-[#68756D]
                    "
                  >
                    محتوى متكامل ومنظم
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    border
                    border-[#29332D]
                    bg-[#151B18]
                    px-4
                    py-3
                    text-right
                  "
                >
                  <div
                    className="
                      mb-2
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#202923]
                      text-[#91A394]
                    "
                  >
                    <FileText
                      size={13}
                      strokeWidth={1.7}
                    />
                  </div>

                  <p
                    className="
                      text-xs
                      font-bold
                      text-[#C4CCC6]
                    "
                  >
                    تقرير نشاط
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-[#68756D]
                    "
                  >
                    صياغة رسمية جاهزة
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =================================================
              Messages
          ================================================= */}

          <div
            className="
              space-y-7
            "
          >
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
                      <div
                        className="
                          flex
                          justify-start
                        "
                      >
                        <div
                          className="
                            max-w-[92%]
                            rounded-2xl
                            rounded-bl-md
                            border
                            border-[#303D35]
                            bg-[#202923]
                            px-4
                            py-3.5
                            text-sm
                            leading-7
                            text-[#DCE3DD]
                            shadow-[0_8px_25px_rgba(0,0,0,0.12)]
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
                      <div
                        className="
                          flex
                          justify-start
                        "
                      >
                        <div
                          className="
                            flex
                            w-full
                            gap-3
                          "
                        >
                          <div
                            className="
                              mt-0.5
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              border
                              border-[#354039]
                              bg-[#171E1A]
                              text-[#B39A63]
                            "
                          >
                            <Sparkles
                              size={14}
                              strokeWidth={1.6}
                            />
                          </div>

                          <div
                            className="
                              max-w-[90%]
                              rounded-2xl
                              rounded-br-md
                              border
                              border-[#303A34]
                              bg-[#171E1A]
                              px-4
                              py-3.5
                              text-sm
                              leading-7
                              text-[#9AA49D]
                              shadow-[0_8px_25px_rgba(0,0,0,0.10)]
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
                    <div
                      className="
                        flex
                        justify-start
                      "
                    >
                      <div
                        className="
                          w-full
                        "
                      >
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
                            border-[#303A34]
                            bg-[#171E1A]
                            text-right
                            shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-[#46534B]
                            hover:bg-[#1A221E]
                          "
                        >
                          <div
                            className="
                              border-r-2
                              border-[#B39A63]
                              p-5
                              sm:p-6
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-4
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-start
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
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
                                    size={17}
                                    strokeWidth={1.6}
                                  />
                                </div>

                                <div>
                                  <p
                                    className="
                                      text-[10px]
                                      font-bold
                                      text-[#B39A63]
                                    "
                                  >
                                    إذاعة مدرسية
                                  </p>

                                  <h3
                                    className="
                                      mt-1
                                      text-base
                                      font-bold
                                      text-[#E2E7E3]
                                      sm:text-lg
                                    "
                                  >
                                    {
                                      msg
                                        .broadcastData
                                        .title
                                    }
                                  </h3>
                                </div>
                              </div>

                              <ArrowLeft
                                size={15}
                                strokeWidth={1.6}
                                className="
                                  shrink-0
                                  text-[#68756D]
                                  transition-transform
                                  duration-200
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
                                border-[#29332D]
                                pt-4
                              "
                            >
                              <span
                                className="
                                  rounded-md
                                  border
                                  border-[#354039]
                                  bg-[#202923]
                                  px-2.5
                                  py-1.5
                                  text-[10px]
                                  font-semibold
                                  text-[#899A8F]
                                "
                              >
                                {
                                  msg
                                    .broadcastData
                                    .type
                                }
                              </span>

                              <span
                                className="
                                  rounded-md
                                  border
                                  border-[#354039]
                                  bg-[#202923]
                                  px-2.5
                                  py-1.5
                                  text-[10px]
                                  font-semibold
                                  text-[#899A8F]
                                "
                              >
                                {
                                  msg
                                    .broadcastData
                                    .level
                                }
                              </span>
                            </div>

                            <p
                              className="
                                mt-4
                                text-xs
                                font-semibold
                                text-[#829187]
                                transition-colors
                                group-hover:text-[#B6C0B8]
                              "
                            >
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
                    <div
                      className="
                        flex
                        justify-start
                      "
                    >
                      <div
                        className="
                          w-full
                        "
                      >
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
                            border-[#303A34]
                            bg-[#171E1A]
                            text-right
                            shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:border-[#46534B]
                            hover:bg-[#1A221E]
                          "
                        >
                          <div
                            className="
                              border-r-2
                              border-[#B39A63]
                              p-5
                              sm:p-6
                            "
                          >

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-4
                              "
                            >
                              <div
                                className="
                                  flex
                                  items-start
                                  gap-3
                                "
                              >
                                <div
                                  className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-[#354039]
                                    bg-[#202923]
                                    text-[#B39A63]
                                  "
                                >
                                  <FileText
                                    size={17}
                                    strokeWidth={1.6}
                                  />
                                </div>

                                <div>
                                  <p
                                    className="
                                      text-[10px]
                                      font-bold
                                      text-[#B39A63]
                                    "
                                  >
                                    تقرير نشاط
                                  </p>

                                  <h3
                                    className="
                                      mt-1
                                      text-base
                                      font-bold
                                      text-[#E2E7E3]
                                      sm:text-lg
                                    "
                                  >
                                    {
                                      msg
                                        .reportData
                                        .reportTitle
                                    }
                                  </h3>
                                </div>
                              </div>

                              <ArrowLeft
                                size={15}
                                strokeWidth={1.6}
                                className="
                                  shrink-0
                                  text-[#68756D]
                                  transition-transform
                                  duration-200
                                  group-hover:-translate-x-1
                                "
                              />
                            </div>

                            <div
                              className="
                                mt-5
                                border-t
                                border-[#29332D]
                                pt-4
                              "
                            >
                              <p
                                className="
                                  line-clamp-2
                                  text-xs
                                  leading-6
                                  text-[#7F8A82]
                                "
                              >
                                {
                                  msg
                                    .reportData
                                    .objectives
                                }
                              </p>
                            </div>

                            <p
                              className="
                                mt-4
                                text-xs
                                font-semibold
                                text-[#829187]
                                transition-colors
                                group-hover:text-[#B6C0B8]
                              "
                            >
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
              <div
                className="
                  flex
                  justify-start
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#354039]
                      bg-[#171E1A]
                      text-[#B39A63]
                    "
                  >
                    <Sparkles
                      size={14}
                      strokeWidth={1.6}
                    />
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-2xl
                      rounded-br-md
                      border
                      border-[#303A34]
                      bg-[#171E1A]
                      px-4
                      py-4
                      shadow-sm
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-[#91A394]
                      "
                    />

                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-[#91A394]
                      "
                      style={{
                        animationDelay:
                          "150ms",
                      }}
                    />

                    <span
                      className="
                        h-1.5
                        w-1.5
                        animate-pulse
                        rounded-full
                        bg-[#91A394]
                      "
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
          z-10
          shrink-0
          border-t
          border-[#29332D]
          bg-[#111714]/95
          px-3
          pb-[max(8px,env(safe-area-inset-bottom))]
          pt-3
          backdrop-blur-xl
          sm:px-6
          sm:pb-5
          sm:pt-4
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-4xl
          "
        >

          {/* =================================================
              Mode
          ================================================= */}

          <div
            className="
              mb-2.5
              flex
              items-center
              justify-between
              gap-3
            "
          >

            <div
              className="
                flex
                rounded-lg
                border
                border-[#303A34]
                bg-[#151B18]
                p-1
              "
            >

              {/* Broadcast */}

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
                  gap-1.5
                  rounded-md
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  cursor-pointer
                  ${
                    mode ===
                    "broadcast"
                      ? "bg-[#202923] text-[#C5CEC8] shadow-sm"
                      : "text-[#68756D] hover:text-[#9AA69E]"
                  }
                `}
              >
                <Mic2
                  size={13}
                  strokeWidth={1.7}
                  className={
                    mode ===
                    "broadcast"
                      ? "text-[#B39A63]"
                      : ""
                  }
                />

                إذاعة
              </button>

              {/* Report */}

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
                  gap-1.5
                  rounded-md
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  cursor-pointer
                  ${
                    mode ===
                    "report"
                      ? "bg-[#202923] text-[#C5CEC8] shadow-sm"
                      : "text-[#68756D] hover:text-[#9AA69E]"
                  }
                `}
              >
                <FileText
                  size={13}
                  strokeWidth={1.7}
                  className={
                    mode ===
                    "report"
                      ? "text-[#B39A63]"
                      : ""
                  }
                />

                تقرير
              </button>
            </div>

            <span
              className="
                hidden
                text-[9px]
                text-[#58645C]
                sm:block
              "
            >
              Enter للإرسال · Shift + Enter لسطر جديد
            </span>
          </div>

          {/* =================================================
              Input
          ================================================= */}

          <div
            className="
              relative
              rounded-2xl
              border
              border-[#354039]
              bg-[#171E1A]
              shadow-[0_10px_35px_rgba(0,0,0,0.18)]
              transition-all
              duration-200
              focus-within:border-[#4A574F]
              focus-within:bg-[#1A221E]
              focus-within:ring-4
              focus-within:ring-[#91A394]/[0.05]
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
                px-4
                py-3.5
                pl-14
                text-sm
                leading-7
                text-[#DCE2DD]
                outline-none
                placeholder:text-[#59655D]
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:min-h-[54px]
                sm:px-5
                sm:py-3.5
                sm:pl-16
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
                rounded-xl
                bg-[#DCE3DD]
                text-[#18211C]
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-white
                disabled:cursor-not-allowed
                disabled:opacity-25
                sm:bottom-2.5
                sm:left-2.5
              "
            >
              <Send
                size={14}
                strokeWidth={1.8}
              />
            </button>
          </div>

          <p
            className="
              mt-2
              text-center
              text-[8px]
              text-[#505B54]
              sm:text-[9px]
            "
          >
            قد تحتاج النتائج المولدة إلى مراجعة بسيطة قبل الاستخدام الرسمي.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AiGenerator;