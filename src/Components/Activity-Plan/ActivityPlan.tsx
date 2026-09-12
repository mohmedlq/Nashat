import React from "react";

import { MinistryLogo } from "../../Icons/Icons";

/* =========================================================
   CONSTANTS
========================================================= */

const INK = "#2d4c4d";
const ACCENT = "#2a7c6a";
const HEADER_BG = "#2d4c4d";
const BORDER = "#c9d3d3";
const PLACEHOLDER = "#9aa6a6";
const CONTENT_INK = "#374151";

/* =========================================================
   TYPES
========================================================= */

export interface PlanRow {
  no: string;
  from: string;
  to: string;
  program?: string;
  note?: string;
  content?: string;
}

export interface ActivityPlanProps {
  title?: string;
  stage?: string;
  semester?: string;

  schoolName?: string;
  region?: string;

  teacherName?: string;
  activityLeader?: string;
  managerName?: string;

  logoSrc?: string;

  rows: PlanRow[];
}

/* =========================================================
   PLACEHOLDER
========================================================= */

function DottedPlaceholder({
  text = "—",
}: {
  text?: string;
}) {
  return (
    <span
      className="text-[12px] font-medium"
      style={{
        color: PLACEHOLDER,
      }}
    >
      {text}
    </span>
  );
}

/* =========================================================
   DATE CELL
========================================================= */

function DateCell({
  value,
}: {
  value?: string;
}) {
  if (!value) {
    return <DottedPlaceholder />;
  }

  return (
    <div
      className="
        flex
        min-h-[15mm]
        items-center
        justify-center
        px-[1mm]
        text-center
      "
    >
      <div
        className="
          rounded-[3px]
          px-[2mm]
          py-[1.5mm]
          text-[12.5px]
          font-black
          leading-[1.7]
          tracking-[0.1px]
        "
        style={{
          color: INK,
          backgroundColor: `${ACCENT}08`,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   PROGRAM CELL
========================================================= */

function ProgramCell({
  row,
}: {
  row: PlanRow;
}) {
  return (
    <div
      className="
        flex
        min-h-[15mm]
        flex-col
        justify-center
        text-right
      "
    >
      {row.program ? (
        <div
          className="
            text-[12px]
            font-black
            leading-[1.7]
          "
          style={{
            color: INK,
          }}
        >
          {row.program}
        </div>
      ) : (
        <DottedPlaceholder />
      )}

      {row.note && (
        <div
          className="
            mt-[1mm]
            text-[9px]
            font-medium
            leading-[1.5]
          "
          style={{
            color: PLACEHOLDER,
          }}
        >
          {row.note}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   CONTENT CELL
========================================================= */

function ContentCell({
  value,
}: {
  value?: string;
}) {
  return (
    <div
      className="
        min-h-[15mm]
        text-right
        text-[10px]
        font-medium
        leading-[1.8]
      "
      style={{
        color: CONTENT_INK,
      }}
    >
      {value || <DottedPlaceholder />}
    </div>
  );
}

/* =========================================================
   PLAN TABLE
========================================================= */

function PlanTable({
  rows,
}: {
  rows: PlanRow[];
}) {
  return (
    <table
      className="
        w-full
        table-fixed
        border-collapse
      "
      dir="rtl"
    >
      <colgroup>
        <col style={{ width: "8%" }} />
        <col style={{ width: "13%" }} />
        <col style={{ width: "13%" }} />
        <col style={{ width: "27%" }} />
        <col style={{ width: "39%" }} />
      </colgroup>

      {/* ================================================
          HEADER
      ================================================ */}

      <thead className="table-header-group">
        <tr>
          <th
            className="
              border
              px-[2mm]
              py-[3mm]
              text-center
              text-[10px]
              font-black
            "
            style={{
              backgroundColor: HEADER_BG,
              borderColor: BORDER,
              color: "#ffffff",
            }}
          >
            م
          </th>

          <th
            className="
              border
              px-[2mm]
              py-[3mm]
              text-center
              text-[10px]
              font-black
            "
            style={{
              backgroundColor: HEADER_BG,
              borderColor: BORDER,
              color: "#ffffff",
            }}
          >
            من
          </th>

          <th
            className="
              border
              px-[2mm]
              py-[3mm]
              text-center
              text-[10px]
              font-black
            "
            style={{
              backgroundColor: HEADER_BG,
              borderColor: BORDER,
              color: "#ffffff",
            }}
          >
            إلى
          </th>

          <th
            className="
              border
              px-[2mm]
              py-[3mm]
              text-center
              text-[10px]
              font-black
            "
            style={{
              backgroundColor: HEADER_BG,
              borderColor: BORDER,
              color: "#ffffff",
            }}
          >
            البرنامج / المناسبة
          </th>

          <th
            className="
              border
              px-[2mm]
              py-[3mm]
              text-center
              text-[10px]
              font-black
            "
            style={{
              backgroundColor: HEADER_BG,
              borderColor: BORDER,
              color: "#ffffff",
            }}
          >
            المحتوى والتنفيذ
          </th>
        </tr>
      </thead>

      {/* ================================================
          BODY
      ================================================ */}

      <tbody>
        {rows.map((row, index) => (
          <tr
            key={`${row.no}-${index}`}
            className="break-inside-avoid"
            style={{
              pageBreakInside: "avoid",
              breakInside: "avoid",
            }}
          >
            {/* NUMBER */}

            <td
              className="
                border
                px-[2mm]
                py-[2mm]
                align-middle
              "
              style={{
                borderColor: BORDER,
              }}
            >
              <div
                className="
                  flex
                  items-center
                  justify-center
                  text-[11px]
                  font-black
                "
                style={{
                  color: INK,
                }}
              >
                {row.no}
              </div>
            </td>

            {/* FROM */}

            <td
              className="
                border
                px-[1.5mm]
                py-[2mm]
                align-middle
              "
              style={{
                borderColor: BORDER,
              }}
            >
              <DateCell value={row.from} />
            </td>

            {/* TO */}

            <td
              className="
                border
                px-[1.5mm]
                py-[2mm]
                align-middle
              "
              style={{
                borderColor: BORDER,
              }}
            >
              <DateCell value={row.to} />
            </td>

            {/* PROGRAM */}

            <td
              className="
                border
                px-[2mm]
                py-[2mm]
                align-middle
              "
              style={{
                borderColor: BORDER,
              }}
            >
              <ProgramCell row={row} />
            </td>

            {/* CONTENT */}

            <td
              className="
                border
                px-[2mm]
                py-[2mm]
                align-middle
              "
              style={{
                borderColor: BORDER,
              }}
            >
              <ContentCell value={row.content} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* =========================================================
   SIGNATURE FIELD
========================================================= */

function SignatureField({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div
      className="
        flex
        min-h-[24mm]
        flex-col
        justify-between
        rounded-[4px]
        border-[1.5px]
        bg-white
        px-[4mm]
        py-[3mm]
        text-center
      "
      style={{
        borderColor: BORDER,
      }}
    >
      <div
        className="
          text-[10px]
          font-black
        "
        style={{
          color: INK,
        }}
      >
        {label}
      </div>

      <div
        className="
          border-b
          border-dashed
          pb-[2mm]
          text-[11px]
          font-bold
        "
        style={{
          borderColor: BORDER,
          color: CONTENT_INK,
        }}
      >
        {value || " "}
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export const ActivityPlan: React.FC<ActivityPlanProps> = ({
  title = "خطة الأنشطة الطلابية",
  stage = "",
  semester = "",

  schoolName = "",
  region = "",

  teacherName = "",
  activityLeader = "",
  managerName = "",

  logoSrc,

  rows,
}) => {
  return (
    <div
      dir="rtl"
      className="
        relative
        m-0
        box-border
        min-h-[297mm]
        w-[210mm]
        bg-white
        font-[Arial,sans-serif]
        shadow-none
      "
      style={{
        pageBreakAfter: "always",
      }}
    >
      {/* =====================================================
          PRINT SETTINGS
      ===================================================== */}

      <style type="text/css">
        {`
          @media print {
            @page {
              size: A4;
              margin: 0;
            }

            html,
            body {
              margin: 0;
              padding: 0;
            }

            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            table {
              width: 100%;
              border-collapse: collapse;
            }

            thead {
              display: table-header-group;
            }

            tbody {
              display: table-row-group;
            }

            tr {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            th,
            td {
              break-inside: avoid;
            }

            .activity-plan-signatures {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            .activity-plan-footer {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        `}
      </style>

      {/* =====================================================
          TOP LINE
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          z-20
          h-[6px]
          w-full
        "
        style={{
          background: `linear-gradient(90deg, ${ACCENT}, ${HEADER_BG})`,
        }}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          relative
          z-10
          w-full
          px-[13mm]
          pb-[7mm]
          pt-[12mm]
        "
      >
        {/* ================= TOP HEADER ================= */}

        <div
          className="
            flex
            w-full
            items-center
            justify-between
            gap-[8mm]
          "
        >
          {/* RIGHT — MINISTRY */}

          <div className="w-[38%] text-right">
            <div
              className="
                text-[20px]
                font-black
              "
              style={{
                color: INK,
              }}
            >
              وزارة التعليم
            </div>

            <div
              className="
                mt-1
                text-[12px]
                font-medium
                tracking-wide
              "
              style={{
                color: INK,
                opacity: 0.7,
              }}
            >
              Ministry of Education
            </div>
          </div>

          {/* CENTER — LOGO */}

          <div className="flex w-[24%] justify-center">
            <div
              className="
                flex
                h-[27mm]
                w-[27mm]
                items-center
                justify-center
                rounded-full
                border-[2.5px]
                bg-white
                p-[3.5mm]
              "
              style={{
                borderColor: ACCENT,
              }}
            >
              <MinistryLogo src={logoSrc} />
            </div>
          </div>

          {/* LEFT — REGION */}

          <div className="w-[38%] text-center">
            <div
              className="
                mb-2
                text-[16px]
                font-bold
              "
              style={{
                color: INK,
              }}
            >
              الإدارة العامة للتعليم
            </div>

            <div
              className="
                w-full
                min-w-0
                text-center
                text-[20px]
                font-black
              "
              style={{
                color: INK,
              }}
            >
              {region || "غير محدد"}
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}

        <div className="mt-[7mm] flex items-center gap-3">
          <div
            className="h-[1.5px] flex-1"
            style={{
              backgroundColor: `${ACCENT}60`,
            }}
          />

          <div
            className="
              h-[7px]
              w-[7px]
              rotate-45
            "
            style={{
              backgroundColor: ACCENT,
            }}
          />

          <div
            className="h-[1.5px] flex-1"
            style={{
              backgroundColor: `${ACCENT}60`,
            }}
          />
        </div>

        {/* ================= SCHOOL ================= */}

        <div
          className="
            mt-[5mm]
            rounded-[5px]
            border-[2px]
            px-[6mm]
            py-[4mm]
            text-center
          "
          style={{
            backgroundColor: `${ACCENT}08`,
            borderColor: ACCENT,
          }}
        >
          <div
            className="
              mb-1
              text-[12px]
              font-bold
            "
            style={{
              color: INK,
            }}
          >
            المدرسة
          </div>

          <div
            className="
              w-full
              min-w-0
              text-center
              text-[21px]
              font-black
            "
            style={{
              color: INK,
            }}
          >
            {schoolName || "غير محدد"}
          </div>
        </div>

        {/* ================= PLAN TITLE ================= */}

        <div
          className="
            relative
            mt-[4mm]
            overflow-hidden
            rounded-[5px]
            border-[2px]
            px-[7mm]
            py-[5mm]
            text-center
          "
          style={{
            background: `linear-gradient(135deg, ${HEADER_BG}, ${ACCENT})`,
            borderColor: ACCENT,
          }}
        >
          <div
            className="
              absolute
              right-0
              top-0
              h-full
              w-[3mm]
            "
            style={{
              backgroundColor: ACCENT,
            }}
          />

          <div className="relative">
            <div
              className="
                text-[23px]
                font-black
                text-white
              "
            >
              {title}
            </div>

            {stage && (
              <div
                className="
                  mt-[2mm]
                  text-[13px]
                  font-bold
                  text-white
                  opacity-90
                "
              >
                {stage}
              </div>
            )}

            {semester && (
              <div
                className="
                  mt-[1.5mm]
                  text-[11px]
                  font-medium
                  text-white
                  opacity-75
                "
              >
                {semester}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          relative
          z-10
          w-full
          px-[13mm]
          pb-[15mm]
        "
      >
        {/* =====================================================
            TABLE TITLE
        ===================================================== */}

        <section>
          <div
            className="
              mb-[3mm]
              flex
              items-center
              justify-between
            "
          >
            <div
              className="
                text-[14px]
                font-black
              "
              style={{
                color: INK,
              }}
            >
              جدول خطة النشاط
            </div>

            <div
              className="
                text-[10px]
                font-bold
              "
              style={{
                color: PLACEHOLDER,
              }}
            >
              الخطة الزمنية والتنفيذية
            </div>
          </div>

          {/* TABLE */}

          <div
            className="
              overflow-visible
              rounded-[5px]
              border-[2px]
              bg-white
            "
            style={{
              borderColor: BORDER,
            }}
          >
            <PlanTable rows={rows} />
          </div>
        </section>

        {/* =====================================================
            SIGNATURES
        ===================================================== */}

      ```tsx
<section
  className="
    activity-plan-signatures
    mt-[8mm]
  "
>
  <div
    className="
      mb-[4mm]
      text-[13px]
      font-black
      text-right
    "
    style={{
      color: INK,
    }}
  >
    الاعتماد والتوقيعات
  </div>

  <div
    className="
      flex
      w-full
      items-end
      justify-between
    "
    dir="rtl"
  >
    {/* ================= RIGHT ================= */}

    <div className="w-[38%] text-center">
      <div
        className="
          text-[11px]
          font-black
        "
        style={{
          color: INK,
        }}
      >
        منفذ النشاط
      </div>

      <div
        className="
          mt-[10mm]
          text-[11px]
          font-bold
        "
        style={{
          color: CONTENT_INK,
        }}
      >
        {teacherName || " "}
      </div>

      <div
        className="
          mx-auto
          mt-[2mm]
          w-[42mm]
          border-b-[1.5px]
        "
        style={{
          borderColor: BORDER,
        }}
      />
    </div>

    {/* ================= LEFT ================= */}

    <div className="w-[38%] text-center">
      <div
        className="
          text-[11px]
          font-black
        "
        style={{
          color: INK,
        }}
      >
        مدير المدرسة
      </div>

      <div
        className="
          mt-[10mm]
          text-[11px]
          font-bold
        "
        style={{
          color: CONTENT_INK,
        }}
      >
        {managerName || " "}
      </div>

      <div
        className="
          mx-auto
          mt-[2mm]
          w-[42mm]
          border-b-[1.5px]
        "
        style={{
          borderColor: BORDER,
        }}
      />
    </div>
  </div>
</section>
```

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          activity-plan-footer
          mt-[3mm]
          h-[10px]
          w-full
        "
      >
        <div
          className="h-[5px] w-full"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, ${HEADER_BG})`,
          }}
        />

        <div
          className="h-[5px] w-full"
          style={{
            backgroundColor: ACCENT,
          }}
        />
      </footer>
    </div>
  );
};

ActivityPlan.displayName = "ActivityPlan";

export default ActivityPlan;