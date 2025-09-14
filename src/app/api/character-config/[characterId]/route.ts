import { NextRequest, NextResponse } from "next/server";
import { getCharacterPrompts } from "@/lib/prompts/index";
import { getCharacterConfig } from "@/lib/consts";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ characterId: string }> }
) {
  try {
    const { characterId } = await params;
    
    const prompts = getCharacterPrompts(characterId);
    const config = getCharacterConfig(characterId);
    
    // Extract the prompt templates (this is a simplified version)
    const data = {
      initialStory: prompts.INITIAL_STORY || "",
      continueStoryTemplate: prompts.CONTINUE_STORY.toString() || "",
      generateImageTemplate: prompts.GENERATE_IMAGE.toString() || "",
      mainCharacterReference: config.IMAGE.MAIN_CHARACTER_REFERENCE || "",
      environmentReference: config.IMAGE.ENVIRONMENT_REFERENCE || "",
      characterReferences: config.IMAGE.CHARACTER_REFERENCES || [],
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error loading character config:", error);
    return NextResponse.json(
      { error: "Failed to load character config" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ characterId: string }> }
) {
  try {
    const { characterId } = await params;
    const data = await request.json();
    
    // This is a simplified implementation
    // In a real application, you'd want to write to the actual files
    // For now, we'll just return success to show the UI works
    
    console.log(`Updating character config for ${characterId}:`, data);
    
    // TODO: Actually update the prompt files and config files
    // This would involve:
    // 1. Reading the existing files
    // 2. Updating the content
    // 3. Writing back to the files
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving character config:", error);
    return NextResponse.json(
      { error: "Failed to save character config" },
      { status: 500 }
    );
  }
}