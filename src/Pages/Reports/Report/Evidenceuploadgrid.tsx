import React from 'react';
import type { Theme } from '../../../misc/Theme';

export type EvidenceUploadGridProps = {
  evidences: (string | null)[];
  theme: Theme;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onRemove: (index: number) => void;
};

function getEditGridItemClass(index: number, total: number) {
  if (total === 1) {
    return 'col-span-1 md:col-span-2 max-w-[500px] mx-auto w-full';
  }
  if (total === 3 && index === 2) {
    return 'col-span-1 md:col-span-2 w-full';
  }
  return 'w-full';
}

export function EvidenceUploadGrid({
  evidences,
  theme,
  onUpload,
  onRemove,
}: EvidenceUploadGridProps) {
  const activeCount = evidences.filter(Boolean).length;
  const displayCount = activeCount === 0 ? 1 : Math.min(activeCount + 1, 4);

  return (
    <div
      className="report-evidence relative mt-6 rounded-[11px] border-2 px-3 pb-3 pt-4 sm:mt-7 sm:px-5 sm:pb-5 sm:pt-5"
      style={{ borderColor: theme.primaryBorder }}
    >
      <span
        className="absolute -top-4 right-1/2 translate-x-1/2 bg-white px-2 text-lg font-bold sm:-top-5 sm:px-3 sm:text-[24px]"
        style={{ color: theme.labelColor }}
      >
        الشواهد
      </span>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {Array.from({ length: displayCount }).map((_, boxIndex) => {
          const imageSrc = evidences[boxIndex];

          return (
            <div
              key={boxIndex}
              className={`relative min-w-0 ${getEditGridItemClass(boxIndex, displayCount)}`}
            >
              <label
                className="group relative flex h-[150px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[11px] border-2 bg-white transition-all hover:border-dashed hover:bg-gray-50 sm:h-[230px]"
                style={{ borderColor: theme.labelColor }}
                aria-label={`إضافة شاهد ${boxIndex + 1}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onUpload(e, boxIndex)}
                />

                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`شاهد ${boxIndex + 1}`}
                    className="h-full w-full bg-white object-contain"
                  />
                ) : (
                  <div
                    className="flex flex-col items-center opacity-70 transition-opacity group-hover:opacity-100"
                    style={{ color: theme.labelColor }}
                  >
                    <span className="text-3xl leading-none sm:text-4xl">+</span>
                    <span className="mt-2 text-xs font-bold sm:text-sm">إضافة صورة</span>
                  </div>
                )}
              </label>

              {imageSrc && (
                <button
                  type="button"
                  onClick={() => onRemove(boxIndex)}
                  className="absolute right-1.5 top-1.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-base font-bold text-white shadow-md transition-all hover:scale-105 sm:right-2 sm:top-2 sm:h-8 sm:w-8 sm:text-lg"
                  aria-label="حذف الصورة"
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}