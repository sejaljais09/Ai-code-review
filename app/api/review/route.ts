import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Code is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are a Senior Java Code Reviewer.

Analyze the following Java code.

Return ONLY valid JSON.

{
  "score": number,
  "summary": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "bugs": [],
  "suggestions": [],
  "improvedCode": ""
}

Java Code:

${code}
`;

   const completion = await client.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
  temperature: 0.2,
});

const review = completion.choices[0].message.content ?? "";

const cleanReview = review
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return NextResponse.json({
  review: JSON.parse(cleanReview),
});
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message || "Failed to review code",
      },
      { status: 500 }
    );
  }
}