import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function GET() {
  const models = await ai.models.list();

  return NextResponse.json(
    models.pageInternal.map((m: any) => ({
      name: m.name,
      displayName: m.displayName,
    }))
  );
}