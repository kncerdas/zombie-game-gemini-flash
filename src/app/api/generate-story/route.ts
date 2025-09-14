import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { getCharacterPrompts } from "@/lib/prompts/index";
import { GAME_CONFIG } from "@/lib/consts";
import type { GenerateStoryRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const {
      userMessage,
      conversationHistory,
      isStart,
      characterId,
    }: GenerateStoryRequest = await request.json();

    const characterPrompts = getCharacterPrompts(characterId);
    let prompt: string = characterPrompts.INITIAL_STORY;

    if (!isStart) {
      const historyText = conversationHistory
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");

      prompt = characterPrompts.CONTINUE_STORY(historyText, userMessage);
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash-lite"),
      prompt,
    });

    const [narrative, imagePrompt] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);

    return NextResponse.json({ narrative, imagePrompt });
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Error generating story" },
      { status: 500 },
    );
  }
}
