import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
     if (!session?.user?.email) {
        return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}
    const { code } = await req.json();
    const user = await prisma.user.findUnique({
    where: {
    email: session.user.email,
  },
});

if (!user) {
  return NextResponse.json(
    { message: "User not found" },
    { status: 404 }
  );
}

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

const parsedReview = JSON.parse(cleanReview);

await prisma.review.create({
  data: {
    code,
    language: "Java",

    score: parsedReview.score,
    summary: parsedReview.summary,

    timeComplexity: parsedReview.timeComplexity,
    spaceComplexity: parsedReview.spaceComplexity,

    bugs: parsedReview.bugs,
    suggestions: parsedReview.suggestions,

    improvedCode: parsedReview.improvedCode,

    userId: user.id,
  },
});
return NextResponse.json({
 review: parsedReview
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