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

Return ONLY a valid JSON object.

Rules:
- Do NOT wrap the response in markdown.
- Do NOT use \`\`\`json.
- The response must be valid JSON.
- "bugs" must be an array of strings.
- "suggestions" must be an array of strings.
- "improvedCode" must be a STRING.
- Preserve Java formatting.
- Use \\n for new lines and proper indentation.
Identify Java code smells such as:
- Long Method
- Magic Numbers
- Poor Variable Naming
- Duplicate Code
- Dead Code
- Deep Nesting
- Large Class
- Empty Catch Blocks
- Unused Variables
- Missing Validation

Return them in the "codeSmells" array.

JSON format:

{
  "score": 0,
  "summary": "",
  "timeComplexity": "",
  "spaceComplexity": "",
  "bugs": [],
  "codeSmells":[],
  "suggestions": [],
  "improvedCode": ""
}

Java Code:

${code}
`;

 const completion = await client.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  response_format: {
    type: "json_object",
  },
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

const review = completion.choices[0].message.content ?? "";

const cleanReview = review
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

console.log("========== AI RESPONSE ==========");
console.log(cleanReview);
console.log("================================");

let parsedReview;

try {
  parsedReview = JSON.parse(cleanReview);
} catch (err) {
  console.error("Invalid JSON returned by AI");
  console.log(cleanReview);

  return NextResponse.json(
    {
      message: "AI returned invalid JSON",
      raw: cleanReview,
    },
    {
      status: 500,
    }
  );
}

await prisma.review.create({
  data: {
    code,
    language: "Java",

    score: parsedReview.score,
    summary: parsedReview.summary,

    timeComplexity: parsedReview.timeComplexity,
    spaceComplexity: parsedReview.spaceComplexity,

    bugs: parsedReview.bugs,
    codeSmells:parsedReview.codeSmells,
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