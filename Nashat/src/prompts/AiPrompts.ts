export function createBroadcastPrompt(
  userText: string
): string {
  return `
Create a complete school broadcast in Arabic based on this request:

"${userText}"

Rules:
- Understand the topic even if the request is only one or two words.
- Generate a suitable title, main topic, and school stage.
- Create coherent broadcast sections.
- Use formal, natural Arabic suitable for a school environment.
- Include when appropriate: introduction, Quran, Hadith, morning speech, did-you-know, conclusion.
- If a specific stage is mentioned, adapt the content to it.
- Do not ask questions.
- Return only the JSON object required by the schema.
`;
}
export function createReportPrompt(
  userText: string,
  schoolName: string,
  teacherName: string,
  region: string
): string {
  return `
Create a formal Arabic school activity report based on this request:

"${userText}"

Use the following school information exactly as provided:

- schoolName: "${schoolName}"
- implementer: "${teacherName}"
- region: "${region}"

Rules:
- Understand the activity even if the request is only one or two words.
- Do not ask questions.
- Generate the report immediately.
- Generate a suitable reportTitle based on the activity.
- Set "schoolName" to the exact value provided above. Do not change it, infer it, or invent another school name.
- Set "implementer" to the exact value provided above. Do not change it, infer it, or invent another person's name.
- Set "region" to the exact value provided above. Do not change it, infer it, or invent another region.
- If any of the provided values is an empty string "", keep that field as "".
- Infer a suitable target group from the activity.
- Use "الفصل الدراسي" as the default location when no location is specified.
- Generate concise, formal objectives suitable for the activity.
- Do not invent personal information, names, numbers, dates, or specific locations.
- Return only the JSON object required by the schema.
-make the objectives 5 lines at least 
-on the date section return current Today date in hijri the arabic date
`;
}