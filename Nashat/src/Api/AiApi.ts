import type {
  AiGenerateRequest,
  AiGenerateResponse,
} from "../types/AiTypes";

const API_BASE_URL =
  "http://my-gemini-api.somee.com/api/AiApi";

export async function generateAiRequest(
  request: AiGenerateRequest
): Promise<AiGenerateResponse> {
  const response = await fetch(
    `${API_BASE_URL}/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error(
      `AI API request failed: ${response.status}`
    );
  }

  return response.json();
}
