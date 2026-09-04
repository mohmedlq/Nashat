import React, { useState } from "react";
import {
  ArrowLeft,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { MOCK_REPORTS } from "../data/ReportsData";
import type { MockReport } from "../types/ReportsTypes";

const getReportPreview = (
  report: MockReport
): string => {
  return (
    report.formData?.objectives ||
    "تقرير جاهز للاستخدام والتعديل."
  );
};

const pickRandomThree = (): MockReport[] => {
  return [...MOCK_REPORTS]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
};

const RandomReports: React.FC = () => {
  const navigate = useNavigate();

  const [featured, setFeatured] =
    useState<MockReport[]>(pickRandomThree);

  const refreshReports = (): void => {
    setFeatured(pickRandomThree());
  };

  return (
    <section dir="rtl">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#B39A63]">
            <FileText size={14} />

            من المكتبة
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#E7EAE6] sm:text-4xl">
            نماذج جاهزة للبدء.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#89938C]">
            استعرض بعض التقارير الموجودة في المكتبة، أو اختر نموذجًا
            مناسبًا وابدأ بتعديله حسب احتياجك.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refreshReports}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#303A34] bg-[#171E1A] px-3 text-xs font-semibold text-[#8F9992] transition hover:border-[#4A574F] hover:bg-[#1A221E] hover:text-[#D1D6D2]"
          >
            <RefreshCw size={14} />

            نماذج أخرى
          </button>

          <Link
            to="/reports"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#DCE3DD] px-4 text-xs font-bold text-[#18211C] transition hover:bg-white"
          >
            المكتبة كاملة

            <ArrowLeft size={14} />
          </Link>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {featured.map((report) => {
          const preview =
            getReportPreview(report);

          return (
            <article
              key={report.id}
              className="group flex min-h-[330px] flex-col rounded-2xl border border-[#303A34] bg-[#171E1A] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#46534B] hover:bg-[#1A221E]"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-[#354039] bg-[#202923] px-2.5 py-1 text-[10px] font-bold text-[#9AAA9E]">
                  {report.type || "عام"}
                </span>

                <span className="text-[10px] text-[#58645C]">
                  تقرير مدرسي
                </span>
              </div>

              {/* Card Content */}
              <div className="mt-8 flex-1">
                <h3 className="line-clamp-2 text-xl font-bold leading-8 text-[#E3E7E3]">
                  {report.formData.reportTitle}
                </h3>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-[#7F8A82]">
                  {preview}
                </p>
              </div>

              {/* Card Action */}
              <button
                type="button"
                onClick={() =>
                  navigate(`/reports/${report.id}`)
                }
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

export default RandomReports;