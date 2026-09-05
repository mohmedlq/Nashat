import React from 'react';
import type { Theme } from '../../../misc/Theme';

export type EvidenceUploadGridProps = {
  evidences: (string | null)[];
  theme: Theme;
  onUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  onRemove: (index: number) => void;
  label?: string;
};

export function EvidenceUploadGrid({
  evidences,
  theme,
  onUpload,
  onRemove,
  label = 'الشواهد',
}: EvidenceUploadGridProps) {
  // دائمًا 4 خانات
  const boxes = Array.from({ length: 4 });

  return (
    <div
      className="report-evidence relative mt-6 rounded-xl border-2 bg-white px-3 pb-3 pt-6 sm:mt-7 sm:px-5 sm:pb-5 sm:pt-7"
      style={{
        borderColor: theme.primaryBorder,
      }}
    >
      {/* =====================================================
          LABEL
      ===================================================== */}

      <span
        className="absolute -top-4 right-1/2 translate-x-1/2 bg-white px-4 text-lg font-bold sm:-top-5 sm:text-[22px]"
        style={{
          color: theme.labelColor,
        }}
      >
        {label}
      </span>

      {/* =====================================================
          4 IMAGE BOXES
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {boxes.map((_, boxIndex) => {
          const imageSrc = evidences[boxIndex];

          return (
            <div
              key={boxIndex}
              className="relative min-w-0"
            >
              {/* =================================================
                  UPLOAD BOX
              ================================================= */}

              <label
                htmlFor={`evidence-upload-${boxIndex}`}
                className="group relative flex aspect-[4/3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-white transition-all duration-200 hover:border-dashed hover:bg-gray-50"
                style={{
                  borderColor: theme.labelColor,
                }}
                aria-label={`إضافة شاهد ${boxIndex + 1}`}
              >
                {/* Hidden input */}

                <input
                  id={`evidence-upload-${boxIndex}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onUpload(e, boxIndex)}
                />

                {/* =================================================
                    IMAGE
                ================================================= */}

                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`شاهد ${boxIndex + 1}`}
                    className="h-full w-full bg-white object-contain"
                  />
                ) : (
                  /* =================================================
                     EMPTY STATE
                  ================================================= */

                  <div
                    className="flex flex-col items-center opacity-70 transition-all duration-200 group-hover:scale-105 group-hover:opacity-100"
                    style={{
                      color: theme.labelColor,
                    }}
                  >
                    <span className="text-4xl font-light leading-none">
                      +
                    </span>

                    <span className="mt-2 text-xs font-bold sm:text-sm">
                      إضافة صورة
                    </span>
                  </div>
                )}
              </label>

              {/* =================================================
                  REMOVE BUTTON
              ================================================= */}

              {imageSrc && (
                <button
                  type="button"
                  onClick={() => onRemove(boxIndex)}
                  className="absolute right-2 top-2 z-20 flex size-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold leading-none text-white shadow-md transition-all hover:scale-105 hover:bg-red-600 sm:size-9"
                  aria-label="حذف الصورة"
                >
                  ×
                </button>
              )}

              {/* =================================================
                  NUMBER
              ================================================= */}

              <div
                className="pointer-events-none absolute bottom-2 left-2 flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white opacity-90"
                style={{
                  backgroundColor: theme.primaryBorder,
                }}
              >
                {boxIndex + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}