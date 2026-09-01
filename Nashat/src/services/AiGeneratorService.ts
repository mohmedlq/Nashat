import type { Broadcast } from "../types/BroadcastTypes";
import type { ReportFormData } from "../types/ReportsTypes";

import {
  createBroadcastPrompt,
  createReportPrompt,
} from "../prompts/AiPrompts";

import {
  broadcastSchema,
  reportSchema,
} from "../schemas/AiSchemas";

import { generateAiRequest } from "../Api/AiApi";

export type GeneratorMode =
  | "broadcast"
  | "report";

interface GenerateParams {
  prompt: string;
  mode: GeneratorMode;
  schoolName?: string;
  teacherName?: string;
  region?: string;
}

interface GenerateResponse {
  broadcast?: Broadcast;
  report?: ReportFormData;
}

/* =========================================================
   Helpers
========================================================= */

function cleanJsonResponse(
  value: string
): string {
  return value
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
}

function extractResponse(
  data: unknown
): unknown {
  if (typeof data === "string") {
    return data;
  }

  if (
    typeof data === "object" &&
    data !== null
  ) {
    const response = data as {
      reply?: string;
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    };

    return (
      response.reply ??
      response.candidates?.[0]
        ?.content?.parts?.[0]?.text ??
      data
    );
  }

  return data;
}

/* =========================================================
   Service
========================================================= */

export async function generateAiContent({
  prompt,
  mode,
  schoolName,
  teacherName,
  region,
}: GenerateParams): Promise<GenerateResponse> {
  const instruction =
    mode === "broadcast"
      ? createBroadcastPrompt(prompt)
      : createReportPrompt(
          prompt,
          schoolName ?? "",
          teacherName ?? "",
          region ?? ""
        );

  const schema =
    mode === "broadcast"
      ? broadcastSchema
      : reportSchema;

  const response =
    await generateAiRequest({
      prompt: instruction,
      tokens: 5000,
      schema,
    });

  const rawContent =
    extractResponse(response);

  const result =
    typeof rawContent === "string"
      ? JSON.parse(
          cleanJsonResponse(
            rawContent
          )
        )
      : rawContent;

  if (
    !result ||
    typeof result !== "object"
  ) {
    throw new Error(
      "استجابة الذكاء الاصطناعي غير صالحة"
    );
  }

  /* =======================================================
     Broadcast
  ======================================================= */

  if (mode === "broadcast") {
    const broadcast =
      result as Broadcast;

    if (
      !broadcast.title ||
      !Array.isArray(
        broadcast.content
      )
    ) {
      throw new Error(
        "بيانات الإذاعة غير مكتملة"
      );
    }

    return {
      broadcast: {
        id: Date.now(),
        title: broadcast.title,
        type:
          broadcast.type ||
          "عام",
        level:
          broadcast.level ||
          "جميع المراحل",
        content:
          broadcast.content,
      },
    };
  }

  /* =======================================================
     Report
  ======================================================= */

 const report = result as ReportFormData;

if (!report.reportTitle) {
  throw new Error("بيانات التقرير غير مكتملة");
}

return {
  report: {
    ...report,

    schoolName:
      report.schoolName?.trim() ||
      schoolName?.trim() ||
      "",

    region:
      report.region?.trim() ||
      "",

    reportTitle:
      report.reportTitle?.trim() ||
      "",

    implementer:
      report.implementer?.trim() ||
      teacherName?.trim() ||
      "",

    location:
      report.location?.trim() ||
      "",

    target:
      report.target?.trim() ||
      "",

    beneficiaries:
      report.beneficiaries?.trim()||"33",
    

    date:
      report.date?.trim() ||
      "",

    objectives:
      report.objectives?.trim() ||
      "",

    evidences: [
      null,
      null,
      null,
      null,
    ],
  },
};
}
