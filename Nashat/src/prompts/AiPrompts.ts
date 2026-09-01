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
  userText: string
): string {
  return `
Create a formal Arabic school activity report based on this request:

"${userText}"

Rules:
- Understand the activity even if the request is only one or two words.
- Do not ask questions.
- Generate the report immediately.
- Generate a suitable reportTitle based on the activity.
- Infer a suitable target group from the activity.
- Use "الفصل الدراسي" as the default location when no location is specified.
- Generate concise, formal objectives suitable for the activity.
- Do not invent personal information, names, numbers, dates, or specific locations.
- Return only the JSON object required by the schema.
`;
}