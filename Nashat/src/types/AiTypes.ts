export type AiGenerateRequest = {
  prompt: string;
  tokens: number;
  schema: object;
};

export type AiGenerateResponse = {
  reply?: string;
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};