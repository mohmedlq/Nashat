export function createBroadcastPrompt(userText: string): string {
  return `
You are generating content for a school morning broadcast (الإذاعة المدرسية) in Arabic.

USER REQUEST:
"${userText}"

TASK:
1. Understand the topic from the request, even if it is just one or two words.
2. Infer a suitable title, main topic, and school stage (المرحلة الدراسية) from context. If a stage is explicitly mentioned, use it exactly; otherwise choose the most reasonable stage for the topic.
3. Write the introduction so it introduces the topic itself (not a generic opening) — it must clearly relate to the specific subject requested.
4. Include, when relevant to the topic: مقدمة (introduction), آية قرآنية مناسبة, حديث شريف مناسب, كلمة الصباح, هل تعلم, خاتمة.
5. Every section must contain at least 5 lines of real, substantive content — no filler or repeated sentences just to reach the count.
6. Use formal, natural, fluent Arabic appropriate for a school setting (no slang, no informal phrasing).
7. Do not ask the user any questions and do not add commentary, explanations, or notes outside the JSON.
8. Do not wrap the output in markdown code fences.

OUTPUT:
Return only the JSON object required by the schema. No text before or after it.
`;
}

export function createReportPrompt(
  userText: string,
  schoolName: string,
  teacherName: string,
  region: string
): string {
  return `
You are generating a formal Arabic school activity report (تقرير نشاط مدرسي).

USER REQUEST (free text, may contain the activity description plus extra details like the school name, implementer name, region, beneficiaries, and their count, in any order and without labels):
"${userText}"

FIELDS TO FILL — PRIORITY ORDER:
For each of the three fields below (schoolName, implementer, region), decide the value using this exact priority:
  1) If the value appears anywhere inside USER REQUEST (even informally, e.g. "اسم المنفذ ...", "مدرسة ...", "منطقة ..."), extract and use that value.
  2) Otherwise, if a non-empty value was passed in below, use it exactly as given — do not alter, translate, or reformat it.
  3) Otherwise, use "".

Provided values (used only per the priority rule above, and only if step 1 finds nothing):
- schoolName: "${schoolName}"
- implementer: "${teacherName}"
- region: "${region}"

STRICT RULES FOR THESE THREE FIELDS:
- Never invent, guess, or substitute a different name/school/region than what was extracted or provided.
- Never merge or alter the provided/extracted text beyond the typo correction described below.
- If the final value is empty, keep the field as "" — do not fabricate a placeholder.

TYPO CORRECTION (spelling only, not identity):
- If the extracted/provided text contains an obvious spelling mistake in a well-known word (e.g. a city, region, or common Arabic name), correct the spelling to the standard form — e.g. "مكة المكرة" → "مكة المكرمة", "محد" → "محمد".
- Only fix clear, obvious misspellings of recognizable words. Do not "correct" an uncommon or unfamiliar name into a different name — if it's not obviously a typo, leave it exactly as written.
- This correction must never change the person's, school's, or region's actual identity — only fix how it is spelled.

OTHER CONTENT RULES:
1. Understand the activity from the request even if it is brief (one or two words).
2. Generate a suitable "reportTitle" based on the activity.
3. Infer a suitable "targetGroup" (الفئة المستهدفة) from context. If the request mentions beneficiaries and/or their count (e.g. "الطلاب عددهم 60"), extract and include that exact number/group — do not invent a different number.
4. Use "الفصل الدراسي" as the default "location" only if no location is mentioned in the request.
5. Write "objectives" (الأهداف) as concise, formal bullet-style lines — minimum 5 lines, each a distinct, meaningful objective (no repetition or filler).
6. Do not invent personal information, names, numbers, or locations that were not provided or extracted.
8. Do not ask any questions. Generate the full report immediately.
9. Do not add commentary, explanations, or notes outside the JSON. Do not wrap the output in markdown code fences.

OUTPUT:
Return only the JSON object required by the schema. No text before or after it.
`;
}