import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    const prompt = `
You are a Senior Java Technical Writer.

Generate professional Markdown documentation for this Java code.

Include:

# Overview

# Classes

# Methods

For every method include:
- Purpose
- Parameters
- Return Value
- Time Complexity
- Space Complexity

Finally provide a Usage Example.

Return ONLY Markdown.

Java Code:

${code}
`;

    const completion =
      await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return NextResponse.json({
      documentation:
        completion.choices[0].message.content,
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}